(function () {
  const content = window.BREVET_CONTENT;

  content.exercises.push(
    {
      id: "extra9_math_prob_001",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Decouverte",
      type: "qcm",
      question: "Une roue a 8 secteurs de meme taille. 3 secteurs sont rouges. Quelle est la probabilite de tomber sur rouge ?",
      choices: ["3/8", "5/8", "3/5", "8/3"],
      answer: "3/8",
      explanation: "Il y a 8 issues possibles et 3 issues favorables. La probabilite est 3/8."
    },
    {
      id: "extra9_math_prob_002",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans une classe de 25 eleves, 10 font espagnol. Quelle est la probabilite de choisir au hasard un eleve qui fait espagnol ?",
      choices: ["2/5", "10/15", "15/25", "25/10"],
      answer: "2/5",
      explanation: "La probabilite est 10/25, que l'on simplifie en divisant par 5 : 2/5."
    },
    {
      id: "extra9_math_stats_001",
      subject: "mathematiques",
      chapter: "Statistiques",
      stage: "Consolidation",
      type: "qcm",
      question: "Quelle est la mediane de la serie 4 ; 7 ; 9 ; 12 ; 18 ?",
      choices: ["9", "7", "10", "12"],
      answer: "9",
      explanation: "La serie est deja rangee. La valeur du milieu est 9."
    },
    {
      id: "extra9_math_geo_001",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Type brevet",
      type: "qcm",
      question: "Un triangle ABC est rectangle en A. Quel cote est l'hypotenuse ?",
      choices: ["BC", "AB", "AC", "A"],
      answer: "BC",
      explanation: "L'hypotenuse est le cote oppose a l'angle droit. Si l'angle droit est en A, le cote oppose est BC."
    },
    {
      id: "extra9_math_func_001",
      subject: "mathematiques",
      chapter: "Fonctions",
      stage: "Decouverte",
      type: "qcm",
      question: "Si f(x) = 3x + 2, combien vaut f(4) ?",
      choices: ["14", "9", "12", "20"],
      answer: "14",
      explanation: "On remplace x par 4 : f(4) = 3 x 4 + 2 = 14."
    },
    {
      id: "extra9_math_eq_001",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Consolidation",
      type: "qcm",
      question: "Quelle est la solution de x - 7 = 12 ?",
      choices: ["19", "5", "-19", "84"],
      answer: "19",
      explanation: "On ajoute 7 des deux cotes : x = 19."
    },
    {
      id: "extra9_fr_gram_001",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Decouverte",
      type: "qcm",
      question: "Dans la phrase 'Le chat dort sur le fauteuil', quel groupe est le sujet ?",
      choices: ["Le chat", "dort", "sur le fauteuil", "le fauteuil"],
      answer: "Le chat",
      explanation: "Le sujet indique qui fait l'action. Ici, c'est le chat qui dort."
    },
    {
      id: "extra9_fr_gram_002",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans 'Elle donne un livre a son frere', quel groupe est COD ?",
      choices: ["un livre", "Elle", "a son frere", "donne"],
      answer: "un livre",
      explanation: "On demande : elle donne quoi ? un livre. C'est le COD."
    },
    {
      id: "extra9_fr_orth_001",
      subject: "francais",
      chapter: "Orthographe",
      stage: "Consolidation",
      type: "qcm",
      question: "Choisis la phrase correctement accordee.",
      choices: ["Les feuilles sont tombees.", "Les feuilles sont tombee.", "Les feuille sont tombees.", "Les feuilles est tombees."],
      answer: "Les feuilles sont tombees.",
      explanation: "Le sujet 'Les feuilles' est feminin pluriel : le participe passe avec etre s'accorde, donc tombees."
    },
    {
      id: "extra9_fr_conj_001",
      subject: "francais",
      chapter: "Conjugaison",
      stage: "Decouverte",
      type: "qcm",
      question: "Quelle forme est au futur simple ?",
      choices: ["nous partirons", "nous partons", "nous partions", "nous sommes partis"],
      answer: "nous partirons",
      explanation: "Le futur simple annonce une action qui aura lieu plus tard : nous partirons."
    },
    {
      id: "extra9_fr_lecture_001",
      subject: "francais",
      chapter: "Lecture",
      stage: "Type brevet",
      type: "qcm",
      question: "Pour justifier une reponse de lecture, il faut surtout...",
      choices: ["citer un indice du texte et l'expliquer", "donner son avis sans exemple", "recopier toute la page", "changer le sens du texte"],
      answer: "citer un indice du texte et l'expliquer",
      explanation: "Au brevet, une reponse de lecture doit s'appuyer sur le texte."
    },
    {
      id: "extra9_fr_reecriture_001",
      subject: "francais",
      chapter: "Reecriture",
      stage: "Consolidation",
      type: "qcm",
      question: "Si on remplace 'il' par 'elles' dans 'il est arrive', quelle forme convient ?",
      choices: ["elles sont arrivees", "elles est arrive", "elles sont arrive", "elles etaient arrive"],
      answer: "elles sont arrivees",
      explanation: "Avec 'elles', on met l'auxiliaire au pluriel et le participe passe s'accorde : arrivees."
    },
    {
      id: "extra9_hist_ww2_001",
      subject: "histoire",
      chapter: "Seconde Guerre mondiale",
      stage: "Decouverte",
      type: "qcm",
      question: "La Seconde Guerre mondiale commence en Europe en...",
      choices: ["1939", "1914", "1945", "1957"],
      answer: "1939",
      explanation: "La guerre commence en Europe en 1939 avec l'invasion de la Pologne par l'Allemagne nazie."
    },
    {
      id: "extra9_hist_ww2_002",
      subject: "histoire",
      chapter: "Seconde Guerre mondiale",
      stage: "Consolidation",
      type: "qcm",
      question: "Le regime nazi est un regime...",
      choices: ["totalitaire et raciste", "democratique", "fonde sur le vote libre de tous", "sans propagande"],
      answer: "totalitaire et raciste",
      explanation: "Le regime nazi controle la societe, utilise la terreur et defend une ideologie raciste."
    },
    {
      id: "extra9_hist_froide_001",
      subject: "histoire",
      chapter: "Guerre froide",
      stage: "Consolidation",
      type: "qcm",
      question: "Pendant la guerre froide, les deux superpuissances principales sont...",
      choices: ["les Etats-Unis et l'URSS", "la France et l'Espagne", "l'Allemagne et l'Italie", "la Chine et le Japon"],
      answer: "les Etats-Unis et l'URSS",
      explanation: "La guerre froide oppose surtout le bloc de l'Ouest mene par les Etats-Unis et le bloc de l'Est mene par l'URSS."
    },
    {
      id: "extra9_emc_001",
      subject: "histoire",
      chapter: "EMC",
      stage: "Decouverte",
      type: "qcm",
      question: "La laicite signifie que...",
      choices: ["l'Etat ne favorise aucune religion", "tout le monde doit avoir la meme religion", "les citoyens ne votent plus", "les lois sont ecrites par une religion"],
      answer: "l'Etat ne favorise aucune religion",
      explanation: "La laicite garantit la liberte de conscience et la neutralite de l'Etat."
    },
    {
      id: "extra9_geo_france_001",
      subject: "histoire",
      chapter: "France",
      stage: "Consolidation",
      type: "qcm",
      question: "Une metropole est une ville qui...",
      choices: ["concentre des habitants, des emplois et des fonctions importantes", "n'a aucun transport", "est toujours rurale", "ne change jamais"],
      answer: "concentre des habitants, des emplois et des fonctions importantes",
      explanation: "Une metropole attire et organise un territoire grace a ses fonctions importantes."
    },
    {
      id: "extra9_geo_monde_001",
      subject: "histoire",
      chapter: "Geographie",
      stage: "Type brevet",
      type: "qcm",
      question: "La mondialisation designe...",
      choices: ["l'augmentation des echanges entre les espaces du monde", "la disparition de toutes les villes", "la fin de tous les transports", "l'isolement complet des pays"],
      answer: "l'augmentation des echanges entre les espaces du monde",
      explanation: "La mondialisation relie les territoires par des flux de marchandises, d'informations, de personnes et de capitaux."
    },
    {
      id: "extra9_sci_phys_001",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Decouverte",
      type: "qcm",
      question: "L'unite de la tension electrique est...",
      choices: ["le volt", "le metre", "le gramme", "la seconde"],
      answer: "le volt",
      explanation: "La tension electrique se mesure en volts, symbole V."
    },
    {
      id: "extra9_sci_phys_002",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Consolidation",
      type: "qcm",
      question: "Si U = 12 V et I = 3 A, quelle est la resistance R avec la loi U = R x I ?",
      choices: ["4 ohms", "15 ohms", "36 ohms", "9 ohms"],
      answer: "4 ohms",
      explanation: "R = U / I, donc R = 12 / 3 = 4 ohms."
    },
    {
      id: "extra9_sci_svt_001",
      subject: "sciences",
      chapter: "SVT",
      stage: "Decouverte",
      type: "qcm",
      question: "Dans le corps humain, le sang est mis en mouvement par...",
      choices: ["le coeur", "les poumons", "l'estomac", "les os"],
      answer: "le coeur",
      explanation: "Le coeur agit comme une pompe qui met le sang en circulation."
    },
    {
      id: "extra9_sci_svt_002",
      subject: "sciences",
      chapter: "SVT",
      stage: "Consolidation",
      type: "qcm",
      question: "Un caractere hereditaire est un caractere...",
      choices: ["transmis par les informations genetiques", "appris seulement a l'ecole", "choisi chaque matin", "toujours lie au sport"],
      answer: "transmis par les informations genetiques",
      explanation: "Un caractere hereditaire depend d'informations genetiques transmises par les parents."
    },
    {
      id: "extra9_sci_tech_001",
      subject: "sciences",
      chapter: "Technologie",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans un programme, une boucle sert a...",
      choices: ["repeter des instructions", "supprimer toutes les donnees", "changer la taille de l'ecran", "eteindre l'ordinateur"],
      answer: "repeter des instructions",
      explanation: "Une boucle permet d'executer plusieurs fois la meme instruction ou le meme groupe d'instructions."
    },
    {
      id: "extra9_sci_doc_001",
      subject: "sciences",
      chapter: "Donnees",
      stage: "Type brevet",
      type: "qcm",
      question: "Dans un tableau de mesures, avant de calculer, il faut d'abord...",
      choices: ["identifier la grandeur et l'unite", "ignorer les titres", "prendre le plus grand nombre au hasard", "changer les valeurs"],
      answer: "identifier la grandeur et l'unite",
      explanation: "Les titres et les unites indiquent ce que mesurent les nombres. Ils evitent les erreurs de calcul."
    }
  );
}());
