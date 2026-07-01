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
  "data/notions.js"
].filter((file) => fs.existsSync(file));

const sandbox = { window: {} };
files.forEach((file) => {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
});

const content = sandbox.window.BREVET_CONTENT;
const qcm = content.exercises.filter((exercise) => String(exercise.type || "qcm").toLowerCase() === "qcm");
const warnings = [];

const suspicious = /(hasard|decorer|faire joli|couleur de la page|nom du correcteur|prenom du candidat|copier tout|un seul mot|effacer le programme|changer la langue|remplacer le brevet|choisir les notes|meteo|cantine|pH x|citation latine)/i;

qcm.forEach((exercise) => {
  const choices = exercise.choices || [];
  const normalized = choices.map((choice) => String(choice).trim().toLowerCase());
  if (new Set(normalized).size !== normalized.length) warnings.push(`${exercise.id}: choix dupliques`);
  if (!choices.includes(exercise.answer)) warnings.push(`${exercise.id}: reponse absente`);
  if (choices.some((choice) => choice !== exercise.answer && suspicious.test(choice))) warnings.push(`${exercise.id}: distracteur suspect`);

  const lengths = choices.map((choice) => String(choice).length);
  const answerLength = String(exercise.answer).length;
  const numericChoices = choices.every((choice) => /^[0-9,./ -]+$/.test(String(choice).trim()));
  const averageDistractorLength = choices
    .filter((choice) => choice !== exercise.answer)
    .reduce((sum, choice) => sum + String(choice).length, 0) / Math.max(1, choices.length - 1);
  if (answerLength > averageDistractorLength * 2.2 && answerLength > 35) warnings.push(`${exercise.id}: bonne reponse beaucoup plus longue`);
  if (!numericChoices && answerLength < Math.min(...lengths.filter((length) => length !== answerLength)) / 2 && answerLength < 4) warnings.push(`${exercise.id}: bonne reponse tres courte`);
});

const bySubject = {};
const byStage = {};
qcm.forEach((exercise) => {
  bySubject[exercise.subject] = (bySubject[exercise.subject] || 0) + 1;
  byStage[exercise.stage] = (byStage[exercise.stage] || 0) + 1;
});

const summary = {
  qcm: qcm.length,
  bySubject,
  byStage,
  warnings
};

console.log(JSON.stringify(summary, null, 2));
if (warnings.length) process.exitCode = 1;
