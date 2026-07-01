const fs = require("fs");
const vm = require("vm");

const files = [
  "data/content.js",
  "data/extra-content.js",
  "data/extra-content-2.js",
  "data/extra-content-3.js",
  "data/extra-content-4.js",
  "data/extra-content-5.js",
  "data/extra-content-6.js",
  "data/extra-content-7.js",
  "data/extra-content-8.js",
  "data/notions.js",
  "generators/registry.js",
  "generators/math-calcul.js",
  "generators/science-calcul.js",
  "generators/french-language.js"
].filter((file) => fs.existsSync(file));

const sandbox = { window: {} };
files.forEach((file) => {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
});

const content = sandbox.window.BREVET_CONTENT;
const generators = sandbox.window.BREVET_GENERATORS;

const stageOrder = ["Decouverte", "Consolidation", "Type brevet"];
const rows = (content.notions || []).map((notion) => {
  const lessons = (content.lessons || []).filter((lesson) => lesson.notionId === notion.id);
  const exercises = (content.exercises || []).filter((exercise) => exercise.notionId === notion.id);
  const generated = (notion.generators || [])
    .map((generatorId) => generators.items[generatorId] ? generatorId : null)
    .filter(Boolean);
  const stages = stageOrder.filter((stage) => exercises.some((exercise) => exercise.stage === stage));
  const automaticPool = exercises.length + generated.length * 5;
  const warnings = [];

  if (!lessons.length) warnings.push("aucun cours rattache");
  if (!exercises.length && !generated.length) warnings.push("aucun exercice automatique");
  if (automaticPool < 8) warnings.push("reserve courte pour une seance de 10 questions");
  if (stages.length < 2 && automaticPool < 12) warnings.push("progression de niveaux limitee");

  return {
    id: notion.id,
    subject: notion.subject,
    title: notion.title,
    lessons: lessons.length,
    staticExercises: exercises.length,
    generators: generated.length,
    stages,
    automaticPool,
    warnings
  };
});

const summary = {
  notions: rows.length,
  warnings: rows.filter((row) => row.warnings.length).length,
  weakest: rows
    .filter((row) => row.warnings.length)
    .map((row) => ({
      id: row.id,
      subject: row.subject,
      title: row.title,
      lessons: row.lessons,
      staticExercises: row.staticExercises,
      generators: row.generators,
      stages: row.stages,
      warnings: row.warnings
    }))
};

console.log(JSON.stringify(summary, null, 2));
