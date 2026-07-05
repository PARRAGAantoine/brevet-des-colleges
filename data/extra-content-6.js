(function () {
  const content = window.BREVET_CONTENT;

  content.exercises.push(
    {
      id: "mixed-type-tf-hg-1",
      subject: "histoire",
      chapter: "Analyse de document",
      stage: "Decouverte",
      type: "true_false",
      question: "Vrai ou faux : presenter un document, c'est seulement recopier son titre.",
      choices: ["Vrai", "Faux"],
      answer: "Faux",
      explanation: "Presenter un document consiste a indiquer sa nature, sa source, sa date, son auteur si possible et son sujet."
    },
    {
      id: "mixed-type-tf-hg-2",
      subject: "histoire",
      chapter: "EMC",
      stage: "Decouverte",
      type: "true_false",
      question: "Vrai ou faux : la laicite garantit la liberte de croire ou de ne pas croire.",
      choices: ["Vrai", "Faux"],
      answer: "Vrai",
      explanation: "La laicite protege la liberte de conscience et impose la neutralite de l'Etat."
    },
    {
      id: "mixed-type-tf-fr-1",
      subject: "francais",
      chapter: "Interpretation",
      stage: "Consolidation",
      type: "true_false",
      question: "Vrai ou faux : une citation suffit toujours a justifier une reponse, meme sans explication.",
      choices: ["Vrai", "Faux"],
      answer: "Faux",
      explanation: "Une citation doit etre reliee a l'idee defendue. Il faut expliquer ce qu'elle prouve."
    },
    {
      id: "mixed-type-tf-fr-2",
      subject: "francais",
      chapter: "Orthographe",
      stage: "Decouverte",
      type: "true_false",
      question: "Vrai ou faux : dans 'elles parlaient', la terminaison -aient indique un verbe a l'imparfait.",
      choices: ["Vrai", "Faux"],
      answer: "Vrai",
      explanation: "Avec 'elles' a l'imparfait, la terminaison reguliere est -aient."
    },
    {
      id: "mixed-type-tf-math-1",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Decouverte",
      type: "true_false",
      question: "Vrai ou faux : une probabilite peut etre egale a 2.",
      choices: ["Vrai", "Faux"],
      answer: "Faux",
      explanation: "Une probabilite est toujours comprise entre 0 et 1."
    },
    {
      id: "mixed-type-tf-math-2",
      subject: "mathematiques",
      chapter: "Statistiques",
      stage: "Consolidation",
      type: "true_false",
      question: "Vrai ou faux : pour trouver une mediane, il faut d'abord ranger la serie.",
      choices: ["Vrai", "Faux"],
      answer: "Vrai",
      explanation: "La mediane est la valeur centrale d'une serie rangee dans l'ordre croissant."
    },
    {
      id: "mixed-type-tf-sci-1",
      subject: "sciences",
      chapter: "Physique-Chimie",
      stage: "Decouverte",
      type: "true_false",
      question: "Vrai ou faux : un pH inferieur a 7 indique une solution acide.",
      choices: ["Vrai", "Faux"],
      answer: "Vrai",
      explanation: "Une solution est acide si son pH est inferieur a 7, neutre si le pH vaut 7, basique au-dessus de 7."
    },
    {
      id: "mixed-type-tf-sci-2",
      subject: "sciences",
      chapter: "SVT",
      stage: "Consolidation",
      type: "true_false",
      question: "Vrai ou faux : dans une experience, on peut faire varier plusieurs facteurs a la fois pour conclure plus vite.",
      choices: ["Vrai", "Faux"],
      answer: "Faux",
      explanation: "Pour conclure correctement, on ne fait varier qu'un seul facteur a la fois."
    },
    {
      id: "mixed-type-order-hg-1",
      subject: "histoire",
      chapter: "Analyse de document",
      stage: "Consolidation",
      type: "order",
      question: "Remets dans l'ordre les etapes d'analyse d'un document.",
      choices: ["Presenter le document", "Relever les informations utiles", "Expliquer avec ses connaissances", "Repondre a la consigne"],
      answer: "Presenter le document|||Relever les informations utiles|||Expliquer avec ses connaissances|||Repondre a la consigne",
      explanation: "On identifie d'abord le document, puis on preleve les informations, on les explique et on repond precisement a la question."
    },
    {
      id: "mixed-type-order-hg-2",
      subject: "histoire",
      chapter: "Developpement construit",
      stage: "Consolidation",
      type: "order",
      question: "Remets dans l'ordre une methode simple pour un developpement construit.",
      choices: ["Comprendre la question", "Choisir deux ou trois idees", "Ajouter des exemples precis", "Rediger une conclusion courte"],
      answer: "Comprendre la question|||Choisir deux ou trois idees|||Ajouter des exemples precis|||Rediger une conclusion courte",
      explanation: "Un developpement construit doit etre organise : comprendre, classer les idees, illustrer, puis conclure."
    },
    {
      id: "mixed-type-order-fr-1",
      subject: "francais",
      chapter: "Interpretation",
      stage: "Consolidation",
      type: "order",
      question: "Remets dans l'ordre une reponse de comprehension bien justifiee.",
      choices: ["Formuler l'idee", "Citer un passage court", "Expliquer la citation", "Relier l'explication a la question"],
      answer: "Formuler l'idee|||Citer un passage court|||Expliquer la citation|||Relier l'explication a la question",
      explanation: "Une bonne reponse annonce l'idee, donne une preuve, explique cette preuve et revient a la question posee."
    },
    {
      id: "mixed-type-order-fr-2",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Decouverte",
      type: "order",
      question: "Remets dans l'ordre les etapes pour trouver le sujet d'un verbe.",
      choices: ["Reperer le verbe conjugue", "Poser la question qui est-ce qui", "Identifier le groupe qui fait l'action", "Verifier l'accord avec le verbe"],
      answer: "Reperer le verbe conjugue|||Poser la question qui est-ce qui|||Identifier le groupe qui fait l'action|||Verifier l'accord avec le verbe",
      explanation: "On part du verbe, on cherche qui fait l'action, puis on verifie l'accord sujet-verbe."
    },
    {
      id: "mixed-type-order-math-1",
      subject: "mathematiques",
      chapter: "Statistiques",
      stage: "Decouverte",
      type: "order",
      question: "Remets dans l'ordre les etapes pour calculer une moyenne.",
      choices: ["Additionner toutes les valeurs", "Compter le nombre de valeurs", "Diviser la somme par l'effectif", "Ecrire une phrase de reponse"],
      answer: "Additionner toutes les valeurs|||Compter le nombre de valeurs|||Diviser la somme par l'effectif|||Ecrire une phrase de reponse",
      explanation: "La moyenne est la somme des valeurs divisee par le nombre de valeurs."
    },
    {
      id: "mixed-type-order-math-2",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Consolidation",
      type: "order",
      question: "Remets dans l'ordre une utilisation du theoreme de Pythagore.",
      choices: ["Verifier que le triangle est rectangle", "Identifier l'hypotenuse", "Ecrire l'egalite de Pythagore", "Calculer la longueur cherchee"],
      answer: "Verifier que le triangle est rectangle|||Identifier l'hypotenuse|||Ecrire l'egalite de Pythagore|||Calculer la longueur cherchee",
      explanation: "Pythagore s'utilise dans un triangle rectangle. Il faut identifier l'hypotenuse avant d'ecrire l'egalite."
    },
    {
      id: "mixed-type-order-sci-1",
      subject: "sciences",
      chapter: "Donnees",
      stage: "Decouverte",
      type: "order",
      question: "Remets dans l'ordre les etapes pour lire un graphique.",
      choices: ["Lire le titre", "Identifier les axes et les unites", "Reperer la valeur demandee", "Rediger la reponse avec l'unite"],
      answer: "Lire le titre|||Identifier les axes et les unites|||Reperer la valeur demandee|||Rediger la reponse avec l'unite",
      explanation: "Un graphique se lit toujours avec son titre, ses axes, ses unites et une phrase de reponse."
    },
    {
      id: "mixed-type-order-sci-2",
      subject: "sciences",
      chapter: "Technologie",
      stage: "Consolidation",
      type: "order",
      question: "Remets dans l'ordre une chaine d'information simplifiee.",
      choices: ["Acquerir l'information avec un capteur", "Traiter l'information", "Transmettre un ordre", "Agir avec un actionneur"],
      answer: "Acquerir l'information avec un capteur|||Traiter l'information|||Transmettre un ordre|||Agir avec un actionneur",
      explanation: "Un systeme automatique capte une information, la traite, transmet un ordre puis agit."
    }
  );
}());
