module.exports = {
  id: 'temps-simples',
  matiere: 'Français',
  matiereSlug: 'francais',
  chapitre: 'Grammaire, conjugaison, orthographe',
  chapitreSlug: 'chapitre1-grammaire',
  titre: 'Conjugaison aux temps simples',
  icone: '📖',
  sections: {
    s1: `<p>À la fin de ce cours, tu sauras conjuguer les verbes aux principaux temps simples : présent, imparfait et futur simple. Tu sauras aussi reconnaître ces temps quand tu les lis.</p>`,
    s2: `<ul>
<li><strong>Temps simple</strong> : un temps de conjugaison qui ne s’écrit qu’avec un seul mot (« je mange », pas « j’ai mangé »).</li>
<li><strong>Radical</strong> : la partie du verbe qui ne change pas (pour « manger », le radical est « mang- »).</li>
<li><strong>Terminaison</strong> : la fin du verbe qui change selon la personne et le temps.</li>
<li><strong>Présent</strong> : ce qui se passe maintenant.</li>
<li><strong>Imparfait</strong> : une action passée qui dure ou se répète.</li>
<li><strong>Futur simple</strong> : ce qui va se passer plus tard.</li>
</ul>`,
    s3: `<p>Pour bien suivre ce cours, tu dois connaître les pronoms personnels sujets : je, tu, il/elle, nous, vous, ils/elles. Tu dois aussi savoir si un verbe se termine en -er, -ir ou -re à l’infinitif.</p>`,
    s4: `<p>Un verbe conjugué est formé d’un <strong>radical</strong> (qui porte le sens du verbe) et d’une <strong>terminaison</strong> (qui indique la personne et le temps). Apprendre les terminaisons par groupe de verbes te permet de conjuguer n’importe quel verbe régulier.</p>`,
    s5: `<h3>1. Trouve le groupe du verbe</h3>
<p>1er groupe : infinitif en -er (aimer). 2ème groupe : infinitif en -ir avec « nous...issons » (finir). 3ème groupe : tous les autres (venir, prendre, aller...).</p>
<h3>2. Trouve le radical</h3>
<p>Enlève la terminaison de l’infinitif : « aimer » → radical « aim- ».</p>
<h3>3. Ajoute la bonne terminaison selon le temps</h3>
<p>Présent (1er groupe) : -e, -es, -e, -ons, -ez, -ent.<br>
Imparfait (tous les groupes) : -ais, -ais, -ait, -ions, -iez, -aient.<br>
Futur simple (tous les groupes) : -rai, -ras, -ra, -rons, -rez, -ront.</p>`,
    s6: `<p><strong>Conjuguer « chanter » (1er groupe) à trois temps :</strong></p>
<p>Présent : je chante, tu chantes, il chante, nous chantons, vous chantez, ils chantent.<br>
Imparfait : je chantais, tu chantais, il chantait, nous chantions, vous chantiez, ils chantaient.<br>
Futur simple : je chanterai, tu chanteras, il chantera, nous chanterons, vous chanterez, ils chanteront.</p>`,
    s7: `<ul>
<li>Ne confonds pas « je chantais » (imparfait) et « je chanterai » (futur), ils se ressemblent mais ne se prononcent pas pareil.</li>
<li>Au futur, le radical du verbe garde souvent son « r » de l’infinitif : chanter → je chanterai.</li>
<li>Certains verbes du 3ème groupe changent complètement de radical (aller → j’irai), il faut les apprendre par cœur.</li>
</ul>`,
    s8: `<ul>
<li>Un verbe conjugué = radical + terminaison.</li>
<li>Les terminaisons de l’imparfait et du futur simple sont presque toujours les mêmes, quel que soit le groupe du verbe.</li>
<li>Le futur simple garde souvent le son « r » de l’infinitif.</li>
</ul>`,
    s9: `<p>Pour vérifier un temps, remplace le sujet par « nous » : au présent tu entends « -ons », à l’imparfait « -ions », au futur « -rons ». C’est un bon repère à l’oreille.</p>`,
  },
  exercices: [
    {
      enonce: 'Comment conjugue-t-on « chanter » au présent avec « nous » ?',
      choix: [
        { texte: 'nous chantons', correct: true },
        { texte: 'nous chantions', correct: false },
        { texte: 'nous chanterons', correct: false },
      ],
      aide1: 'Au présent, la terminaison avec « nous » est « -ons ».',
      aide2: '« nous chantons » : radical « chant- » + terminaison du présent « -ons ».',
    },
    {
      enonce: 'Quel est le temps de « je chantais » ?',
      choix: [
        { texte: 'Présent', correct: false },
        { texte: 'Imparfait', correct: true },
        { texte: 'Futur simple', correct: false },
      ],
      aide1: 'Regarde la terminaison « -ais ».',
      aide2: 'La terminaison « -ais » à la première personne du singulier est caractéristique de l’imparfait.',
    },
    {
      enonce: 'Comment conjugue-t-on « aimer » au futur simple avec « tu » ?',
      choix: [
        { texte: 'tu aimais', correct: false },
        { texte: 'tu aimes', correct: false },
        { texte: 'tu aimeras', correct: true },
      ],
      aide1: 'Le futur simple garde le « r » de l’infinitif « aimer ».',
      aide2: '« tu aimeras » : radical « aimer- » (avec le r de l’infinitif) + terminaison du futur « -as ».',
    },
    {
      enonce: 'Quel est le radical du verbe « manger » ?',
      choix: [
        { texte: 'man-', correct: false },
        { texte: 'mang-', correct: true },
        { texte: 'manger-', correct: false },
      ],
      aide1: 'Enlève la terminaison « -er » de l’infinitif.',
      aide2: 'Le radical est ce qui reste quand tu enlèves la terminaison de l’infinitif (-er, -ir ou -re). Applique cette règle au verbe de la question.',
    },
  ],
};
