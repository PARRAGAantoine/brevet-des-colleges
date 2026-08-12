// Outil de fabrication des pages de cours et d'exercices.
// Usage : node outils/generer.js
// Lit les fichiers de contenu dans contenu/<matiere>/*.js et fabrique
// les pages HTML finales dans matieres/<matiere>/<chapitre>/<cours>/.

const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..');
const DOSSIER_CONTENU = path.join(RACINE, 'contenu');
const DOSSIER_OUTILS = __dirname;
const DOSSIER_MATIERES = path.join(RACINE, 'matieres');

const MODELE_COURS = fs.readFileSync(path.join(DOSSIER_OUTILS, 'modele-cours.html'), 'utf8');
const MODELE_EXERCICE = fs.readFileSync(path.join(DOSSIER_OUTILS, 'modele-exercice.html'), 'utf8');

function remplacer(gabarit, valeurs) {
  let resultat = gabarit;
  for (const cle in valeurs) {
    resultat = resultat.split('{{' + cle + '}}').join(valeurs[cle]);
  }
  return resultat;
}

function construireQuestion(question, index) {
  const num = index + 1;
  const choixHtml = question.choix
    .map((c) => `      <button class="reponse" data-correct="${c.correct}">${c.texte}</button>`)
    .join('\n');
  return [
    `  <div class="question" data-id="q${num}">`,
    `    <h2>Question ${num}</h2>`,
    `    <p class="enonce">${question.enonce}</p>`,
    `    <div class="choix">`,
    choixHtml,
    `    </div>`,
    `    <p class="feedback"></p>`,
    `    <div class="aides">`,
    `      <button class="btn-aide" data-niveau="1">Aide</button>`,
    `      <div class="aide-texte" data-niveau="1">${question.aide1}</div>`,
    `      <button class="btn-aide" data-niveau="2">Aide supplémentaire</button>`,
    `      <div class="aide-texte" data-niveau="2">${question.aide2}</div>`,
    `    </div>`,
    `  </div>`,
  ].join('\n');
}

function fabriquerCours(cours) {
  const dossierCours = path.join(
    DOSSIER_MATIERES,
    cours.matiereSlug,
    cours.chapitreSlug,
    cours.id
  );
  const dossierExercices = path.join(dossierCours, 'exercices');
  fs.mkdirSync(dossierExercices, { recursive: true });

  // Page de cours
  const pageCours = remplacer(MODELE_COURS, {
    TITRE: cours.titre,
    MATIERE: cours.matiere,
    CHAPITRE: cours.chapitre,
    ID: cours.id,
    ICONE: cours.icone || '📘',
    RETOUR_MATIERE: '../../index.html',
    EXERCICE_HREF: 'exercices/ex1.html',
    S1: cours.sections.s1,
    S2: cours.sections.s2,
    S3: cours.sections.s3,
    S4: cours.sections.s4,
    S5: cours.sections.s5,
    S6: cours.sections.s6,
    S7: cours.sections.s7,
    S8: cours.sections.s8,
    S9: cours.sections.s9,
  });
  fs.writeFileSync(path.join(dossierCours, 'index.html'), pageCours, 'utf8');

  // Page d'exercices
  const questionsHtml = cours.exercices.map(construireQuestion).join('\n\n');
  const pageExercices = remplacer(MODELE_EXERCICE, {
    TITRE: cours.titre,
    MATIERE: cours.matiere,
    CHAPITRE: cours.chapitre,
    ID: cours.id,
    COURS_HREF: '../index.html',
    QUESTIONS: questionsHtml,
  });
  fs.writeFileSync(path.join(dossierExercices, 'ex1.html'), pageExercices, 'utf8');

  console.log(`OK  ${cours.matiereSlug}/${cours.chapitreSlug}/${cours.id}`);
}

function construireIndexMatiere(matiereSlug, listeCours) {
  const items = listeCours
    .map(
      (c) =>
        `<li><a href="${c.chapitreSlug}/${c.id}/index.html">${c.titre}</a> <span style="color:#94a3b8;font-size:.85rem">— ${c.chapitre}</span></li>`
    )
    .join('\n      ');

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Français — Brevet Sprint 2027</title>
<style>
:root{--bg:#0d1418;--card:#16222a;--border:#243442;--text:#e0e6ed;--muted:#94a3b8;--blue:#38bdf8}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.7}
.container{max-width:720px;margin:0 auto;padding:28px 16px}
h1{font-size:1.6rem;color:#fff;margin-bottom:6px}
p.note{color:var(--muted);margin-bottom:20px;font-size:.9rem}
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px}
ul{list-style:none}
li{margin-bottom:14px}
a{color:var(--blue);text-decoration:none;font-weight:700;font-size:1.05rem}
</style>
</head>
<body>
<div class="container">
  <h1>📖 Français</h1>
  <p class="note">Page provisoire (Phase 1) — la navigation complète arrive en Phase 2.</p>
  <div class="card">
    <ul>
      ${items}
    </ul>
  </div>
  <p style="margin-top:16px"><a href="annales/index.html">📄 Annales officielles (PDF)</a></p>
</div>
</body>
</html>
`;
  fs.mkdirSync(path.join(DOSSIER_MATIERES, matiereSlug), { recursive: true });
  fs.writeFileSync(path.join(DOSSIER_MATIERES, matiereSlug, 'index.html'), html, 'utf8');
  console.log(`OK  ${matiereSlug}/index.html (page provisoire)`);
}

function main() {
  const matieres = fs.readdirSync(DOSSIER_CONTENU).filter((f) =>
    fs.statSync(path.join(DOSSIER_CONTENU, f)).isDirectory()
  );

  matieres.forEach((matiereSlug) => {
    const dossier = path.join(DOSSIER_CONTENU, matiereSlug);
    const fichiers = fs.readdirSync(dossier).filter((f) => f.endsWith('.js'));
    const listeCours = fichiers.map((f) => require(path.join(dossier, f)));

    listeCours.forEach(fabriquerCours);
    construireIndexMatiere(matiereSlug, listeCours);
  });

  console.log('\nTerminé.');
}

main();
