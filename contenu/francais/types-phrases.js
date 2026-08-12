module.exports = {
  id: 'types-phrases',
  matiere: 'Français',
  matiereSlug: 'francais',
  chapitre: 'Grammaire, conjugaison, orthographe',
  chapitreSlug: 'chapitre1-grammaire',
  titre: 'Les types et formes de phrases',
  icone: '📖',
  sections: {
    s1: `<p>À la fin de ce cours, tu sauras reconnaître les quatre types de phrases et les deux formes de phrases. Tu pourras aussi les utiliser correctement dans tes propres écrits.</p>`,
    s2: `<ul>
<li><strong>Phrase déclarative</strong> : elle donne une information ou raconte quelque chose.</li>
<li><strong>Phrase interrogative</strong> : elle pose une question.</li>
<li><strong>Phrase exclamative</strong> : elle exprime une émotion forte (joie, surprise, colère...).</li>
<li><strong>Phrase injonctive</strong> : elle donne un ordre ou un conseil.</li>
<li><strong>Forme négative</strong> : elle dit que quelque chose n’est pas vrai ou n’existe pas.</li>
<li><strong>Forme affirmative</strong> : elle dit que quelque chose est vrai.</li>
</ul>`,
    s3: `<p>Pour bien suivre ce cours, tu dois savoir reconnaître les signes de ponctuation : le point ( . ), le point d’interrogation ( ? ) et le point d’exclamation ( ! ). Si tu sais déjà lire une phrase à voix haute, tu es prêt.</p>`,
    s4: `<p>Chaque phrase a un <strong>type</strong> (ce qu’elle fait : informer, questionner, s’exclamer ou ordonner) et une <strong>forme</strong> (affirmative ou négative). Le type et la forme sont deux choses différentes : une phrase peut être interrogative ET négative en même temps, par exemple.</p>`,
    s5: `<h3>1. Trouve le type de la phrase</h3>
<p>Regarde le signe de ponctuation à la fin et pose-toi ces questions :</p>
<ul>
<li>Elle se termine par un point et donne une info ? → <strong>déclarative</strong></li>
<li>Elle se termine par un point d’interrogation ? → <strong>interrogative</strong></li>
<li>Elle se termine par un point d’exclamation et montre une émotion ? → <strong>exclamative</strong></li>
<li>Elle donne un ordre ou un conseil ? → <strong>injonctive</strong></li>
</ul>
<h3>2. Trouve la forme de la phrase</h3>
<p>Cherche des mots de négation comme <strong>ne...pas</strong>, <strong>ne...jamais</strong>, <strong>ne...rien</strong>. S’il y en a, la phrase est <strong>négative</strong>. Sinon, elle est <strong>affirmative</strong>.</p>`,
    s6: `<p><strong>Phrase : « Est-ce que tu n’as pas fini tes devoirs ? »</strong></p>
<p>1. Elle se termine par un point d’interrogation → elle pose une question → type <strong>interrogatif</strong>.</p>
<p>2. Elle contient « n’...pas » → forme <strong>négative</strong>.</p>
<p>Conclusion : c’est une phrase <strong>interrogative à la forme négative</strong>.</p>`,
    s7: `<ul>
<li>Ne confonds pas le type et la forme : une phrase exclamative peut très bien être négative aussi.</li>
<li>Une phrase injonctive n’a pas toujours de point d’exclamation (« Range ta chambre. » est injonctive avec un simple point).</li>
<li>« Ne...que » n’est pas une vraie négation, fais attention.</li>
</ul>`,
    s8: `<ul>
<li>4 types de phrases : déclarative, interrogative, exclamative, injonctive.</li>
<li>2 formes de phrases : affirmative, négative.</li>
<li>Le type et la forme se combinent toujours.</li>
</ul>`,
    s9: `<p>Pour ne jamais te tromper, lis la phrase à voix haute avec le bon ton. Si tu entends une question dans ta tête, c’est interrogatif. Si tu entends un ordre, c’est injonctif.</p>`,
  },
  exercices: [
    {
      enonce: 'Quelle est la phrase interrogative ?',
      choix: [
        { texte: 'Il fait beau aujourd’hui.', correct: false },
        { texte: 'Est-ce qu’il fait beau ?', correct: true },
        { texte: 'Quel beau temps !', correct: false },
      ],
      aide1: 'Regarde le signe de ponctuation à la fin de la phrase.',
      aide2: 'La phrase interrogative pose une question et se termine toujours par un point d’interrogation (?).',
    },
    {
      enonce: 'Quelle phrase est à la forme négative ?',
      choix: [
        { texte: 'Je n’aime pas les épinards.', correct: true },
        { texte: 'J’aime les épinards.', correct: false },
        { texte: 'Aimes-tu les épinards ?', correct: false },
      ],
      aide1: 'Cherche les mots « ne...pas », « ne...jamais » ou « ne...rien » dans la phrase.',
      aide2: 'La forme négative utilise toujours deux mots de négation encadrant le verbe, comme « ne...pas ».',
    },
    {
      enonce: 'Quel est le type de la phrase « Range ta chambre immédiatement ! » ?',
      choix: [
        { texte: 'Déclarative', correct: false },
        { texte: 'Injonctive', correct: true },
        { texte: 'Interrogative', correct: false },
      ],
      aide1: 'Cette phrase donne-t-elle un ordre ?',
      aide2: 'La phrase injonctive donne un ordre ou un conseil. Ici, on ordonne à quelqu’un de ranger sa chambre.',
    },
    {
      enonce: 'Quelle phrase est à la fois interrogative et négative ?',
      choix: [
        { texte: 'Tu ne viens pas ?', correct: true },
        { texte: 'Tu viens ?', correct: false },
        { texte: 'Ne viens pas !', correct: false },
      ],
      aide1: 'Il faut à la fois un point d’interrogation ET un mot de négation.',
      aide2: '« Tu ne viens pas ? » se termine par un point d’interrogation (type interrogatif) et contient « ne...pas » (forme négative).',
    },
  ],
};
