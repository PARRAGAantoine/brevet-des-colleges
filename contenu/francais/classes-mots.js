module.exports = {
  id: 'classes-mots',
  matiere: 'Français',
  matiereSlug: 'francais',
  chapitre: 'Grammaire, conjugaison, orthographe',
  chapitreSlug: 'chapitre1-grammaire',
  titre: 'Les classes de mots',
  icone: '📖',
  sections: {
    s1: `<p>À la fin de ce cours, tu sauras reconnaître les principales classes de mots (aussi appelées « natures ») : nom, verbe, adjectif, déterminant, pronom et adverbe.</p>`,
    s2: `<ul>
<li><strong>Classe de mots</strong> (ou nature) : la catégorie grammaticale d’un mot, par exemple nom ou verbe.</li>
<li><strong>Nom</strong> : désigne une personne, un animal, une chose ou une idée.</li>
<li><strong>Verbe</strong> : exprime une action ou un état, il se conjugue.</li>
<li><strong>Adjectif</strong> : donne une information sur un nom (sa qualité, sa couleur...).</li>
<li><strong>Déterminant</strong> : se place devant le nom (le, la, un, mon, ce...).</li>
<li><strong>Pronom</strong> : remplace un nom (il, elle, celui-ci...).</li>
</ul>`,
    s3: `<p>Pour bien suivre ce cours, tu dois savoir repérer le verbe conjugué et le sujet dans une phrase simple. Si tu sais déjà faire ça, tu es prêt.</p>`,
    s4: `<p>Chaque mot d’une phrase appartient à une <strong>classe grammaticale</strong>. Contrairement à la fonction (qui dépend de la phrase), la classe d’un mot ne change presque jamais : « chat » est toujours un nom, où qu’il soit dans la phrase.</p>`,
    s5: `<h3>1. Cherche le verbe conjugué</h3>
<p>C’est le mot qui change quand tu changes le sujet ou le temps (je mange, tu manges, il mangeait).</p>
<h3>2. Cherche les noms</h3>
<p>Ce sont les mots qu’on peut précéder d’un déterminant (le, la, un, des...) : « le chat », « une idée ».</p>
<h3>3. Cherche les adjectifs</h3>
<p>Ils accompagnent un nom et s’accordent avec lui : « un grand chat », « une grande maison ».</p>
<h3>4. Range les autres mots</h3>
<p>Déterminants (devant les noms), pronoms (remplacent un nom), adverbes (modifient un verbe ou un adjectif), prépositions (à, de, dans, avec...) et conjonctions (et, mais, ou, donc...).</p>`,
    s6: `<p><strong>Phrase : « Le petit chien noir dort tranquillement. »</strong></p>
<ul>
<li>« Le » → déterminant</li>
<li>« petit » et « noir » → adjectifs (ils qualifient « chien »)</li>
<li>« chien » → nom</li>
<li>« dort » → verbe conjugué</li>
<li>« tranquillement » → adverbe (il précise comment il dort)</li>
</ul>`,
    s7: `<ul>
<li>Ne confonds pas la classe d’un mot avec sa fonction : « chien » est toujours un nom (classe), mais il peut être sujet ou complément selon la phrase (fonction).</li>
<li>Un même mot peut changer de classe selon la phrase : « la ferme » (nom) et « je ferme la porte » (verbe).</li>
<li>Les adverbes ne s’accordent jamais, contrairement aux adjectifs.</li>
</ul>`,
    s8: `<ul>
<li>Les classes principales : nom, verbe, adjectif, déterminant, pronom, adverbe, préposition, conjonction.</li>
<li>La classe d’un mot est presque toujours fixe, contrairement à sa fonction.</li>
<li>Pour trouver un nom : essaie de mettre « le/la/un/une » devant.</li>
</ul>`,
    s9: `<p>Pour identifier un adjectif, essaie de l’enlever de la phrase : si la phrase garde son sens sans lui, c’est probablement un adjectif.</p>`,
  },
  exercices: [
    {
      enonce: 'Dans « Le petit chien noir dort. », quelle est la classe du mot « petit » ?',
      choix: [
        { texte: 'Nom', correct: false },
        { texte: 'Adjectif', correct: true },
        { texte: 'Verbe', correct: false },
      ],
      aide1: 'Ce mot donne une précision sur le nom « chien ».',
      aide2: 'Essaie d’accorder ce mot avec le nom : « un petit chien » devient « une petite chienne ». S’il s’accorde en genre et en nombre avec le nom qu’il précise, c’est un adjectif.',
    },
    {
      enonce: 'Quel mot est un verbe dans « Elle mange une pomme. » ?',
      choix: [
        { texte: 'Elle', correct: false },
        { texte: 'mange', correct: true },
        { texte: 'pomme', correct: false },
      ],
      aide1: 'Cherche le mot qui changerait si tu disais « je » à la place de « elle ».',
      aide2: 'Change le sujet de la phrase : si le mot change de forme (elle mange → je mange, tu manges), c’est qu’il se conjugue. Seuls les verbes se conjuguent ainsi.',
    },
    {
      enonce: 'Quelle est la classe du mot « rapidement » dans « Il court rapidement. » ?',
      choix: [
        { texte: 'Adjectif', correct: false },
        { texte: 'Adverbe', correct: true },
        { texte: 'Nom', correct: false },
      ],
      aide1: 'Ce mot précise comment il court, et il ne s’accorde jamais.',
      aide2: 'Essaie d’accorder ce mot au féminin ou au pluriel : s’il ne change jamais de forme, ce n’est pas un adjectif. Les mots en « -ment » qui précisent un verbe sont souvent des adverbes.',
    },
    {
      enonce: 'Quel mot est un déterminant dans « La maison est grande. » ?',
      choix: [
        { texte: 'maison', correct: false },
        { texte: 'La', correct: true },
        { texte: 'grande', correct: false },
      ],
      aide1: 'Ce mot se place juste devant le nom.',
      aide2: 'Cherche le mot placé juste avant le nom, qui change selon son genre (la maison / le jardin). C’est le rôle du déterminant.',
    },
  ],
};
