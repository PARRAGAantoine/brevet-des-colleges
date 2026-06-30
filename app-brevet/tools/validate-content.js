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
  "data/notions.js",
  "generators/registry.js",
  "generators/math-calcul.js",
  "generators/science-calcul.js",
  "generators/french-language.js"
];

const sandbox = { window: {} };
files.forEach((file) => {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
});

const content = sandbox.window.BREVET_CONTENT;
const generators = sandbox.window.BREVET_GENERATORS;
const subjectIds = new Set(content.subjects.map((subject) => subject.id));
const notionIds = new Set((content.notions || []).map((notion) => notion.id));
const errors = [];

function requireField(item, field, label) {
  if (item[field] === undefined || item[field] === null || item[field] === "") {
    errors.push(`${label} ${item.id || "(sans id)"} : champ manquant ${field}`);
  }
}

function validateExercise(exercise, label = "exercise") {
  ["id", "subject", "chapter", "question", "answer", "explanation"].forEach((field) => requireField(exercise, field, label));
  const exerciseType = String(exercise.type || "qcm").toLowerCase();
  if (!subjectIds.has(exercise.subject)) errors.push(`${label} ${exercise.id} : matiere inconnue ${exercise.subject}`);
  if (!exercise.notionId) errors.push(`${label} ${exercise.id} : notionId manquant`);
  if (exercise.notionId && !notionIds.has(exercise.notionId)) errors.push(`${label} ${exercise.id} : notionId inconnu ${exercise.notionId}`);
  if (!["qcm", "true_false", "order"].includes(exerciseType)) errors.push(`${label} ${exercise.id} : type inconnu ${exercise.type}`);
  const minChoices = exerciseType === "true_false" ? 2 : 3;
  if (!Array.isArray(exercise.choices) || exercise.choices.length < minChoices) errors.push(`${label} ${exercise.id} : choix insuffisants`);
  if (exerciseType !== "order" && Array.isArray(exercise.choices) && !exercise.choices.includes(String(exercise.answer)) && !exercise.choices.includes(exercise.answer)) {
    errors.push(`${label} ${exercise.id} : la bonne reponse est absente des choix`);
  }
  if (exerciseType === "true_false") {
    const expected = ["Vrai", "Faux"];
    expected.forEach((choice) => {
      if (!exercise.choices.includes(choice)) errors.push(`${label} ${exercise.id} : choix vrai/faux manquant ${choice}`);
    });
  }
  if (exerciseType === "order") {
    const ordered = String(exercise.answer).split("|||");
    if (ordered.length !== exercise.choices.length) errors.push(`${label} ${exercise.id} : ordre attendu incoherent`);
    ordered.forEach((choice) => {
      if (!exercise.choices.includes(choice)) errors.push(`${label} ${exercise.id} : element d'ordre absent des choix`);
    });
  }
}

content.exercises.forEach((exercise) => validateExercise(exercise, "static"));

(content.lessons || []).forEach((lesson) => {
  ["id", "subject", "chapter", "title"].forEach((field) => requireField(lesson, field, "lesson"));
  if (!subjectIds.has(lesson.subject)) errors.push(`lesson ${lesson.id} : matiere inconnue ${lesson.subject}`);
  if (!lesson.notionId) errors.push(`lesson ${lesson.id} : notionId manquant`);
  if (lesson.notionId && !notionIds.has(lesson.notionId)) errors.push(`lesson ${lesson.id} : notionId inconnu ${lesson.notionId}`);
});

(content.guidedTasks || []).forEach((task) => {
  ["id", "subject", "chapter", "title", "task"].forEach((field) => requireField(task, field, "guidedTask"));
  if (!subjectIds.has(task.subject)) errors.push(`guidedTask ${task.id} : matiere inconnue ${task.subject}`);
  if (!task.notionId) errors.push(`guidedTask ${task.id} : notionId manquant`);
  if (task.notionId && !notionIds.has(task.notionId)) errors.push(`guidedTask ${task.id} : notionId inconnu ${task.notionId}`);
});

(content.notions || []).forEach((notion) => {
  ["id", "subject", "chapter", "title", "type"].forEach((field) => requireField(notion, field, "notion"));
  if (!subjectIds.has(notion.subject)) errors.push(`notion ${notion.id} : matiere inconnue ${notion.subject}`);
  (notion.generators || []).forEach((generatorId) => {
    if (!generators.items[generatorId]) errors.push(`notion ${notion.id} : generateur absent ${generatorId}`);
  });
});

(content.notions || []).forEach((notion, notionIndex) => {
  (notion.generators || []).forEach((generatorId, generatorIndex) => {
    for (let sample = 0; sample < 5; sample += 1) {
      const seed = 1000 + notionIndex * 100 + generatorIndex * 10 + sample;
      const exercise = generators.generate(generatorId, seed, { notion });
      if (!exercise) {
        errors.push(`generator ${generatorId} : aucun exercice pour seed ${seed}`);
      } else {
        validateExercise(exercise, "generated");
        if (exercise.generatorId !== generatorId) errors.push(`generated ${exercise.id} : generatorId incoherent`);
        if (exercise.seed !== seed) errors.push(`generated ${exercise.id} : seed incoherent`);
      }
    }
  });
});

(generators.errors || []).forEach((error) => {
  errors.push(`generator ${error.generatorId} seed ${error.seed} : ${error.message}`);
});

const allIds = [
  ...content.exercises.map((exercise) => exercise.id),
  ...(content.guidedTasks || []).map((task) => task.id)
];
const duplicates = Object.entries(allIds.reduce((acc, id) => {
  acc[id] = (acc[id] || 0) + 1;
  return acc;
}, {})).filter(([, count]) => count > 1);

duplicates.forEach(([id]) => errors.push(`identifiant duplique : ${id}`));

const summary = {
  subjects: content.subjects.length,
  lessons: content.lessons.length,
  staticExercises: content.exercises.length,
  guidedTasks: (content.guidedTasks || []).length,
  notions: (content.notions || []).length,
  generators: Object.keys(generators.items).length,
  errors
};

console.log(JSON.stringify(summary, null, 2));
if (errors.length) process.exit(1);
