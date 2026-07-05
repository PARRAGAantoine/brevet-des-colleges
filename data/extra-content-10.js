(function () {
  const content = window.BREVET_CONTENT;

  content.exercises.push(
    {
      id: "extra10_math_short_001",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Decouverte",
      type: "short_answer",
      question: "Calcule : 18 - 4 x 3.",
      answer: "6",
      explanation: "On calcule d'abord la multiplication : 4 x 3 = 12. Puis 18 - 12 = 6."
    },
    {
      id: "extra10_math_short_002",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Consolidation",
      type: "short_answer",
      question: "Ecris sous forme simplifiee la fraction 18/24.",
      answer: "3/4",
      acceptedAnswers: ["0.75", "18/24"],
      explanation: "On divise 18 et 24 par 6 : 18/24 = 3/4."
    },
    {
      id: "extra10_math_short_003",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Consolidation",
      type: "short_answer",
      question: "Calcule : 2/5 + 1/5.",
      answer: "3/5",
      acceptedAnswers: ["0.6"],
      explanation: "Les denominateurs sont les memes, on additionne les numerateurs : 2/5 + 1/5 = 3/5."
    },
    {
      id: "extra10_math_short_004",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Decouverte",
      type: "short_answer",
      question: "Convertis 2,5 km en metres.",
      answer: "2500",
      acceptedAnswers: ["2500 m", "2500m"],
      explanation: "1 km = 1000 m, donc 2,5 km = 2500 m."
    },
    {
      id: "extra10_math_short_005",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Consolidation",
      type: "short_answer",
      question: "Un trajet de 45 km est fait en 3 h. Quelle est la vitesse moyenne en km/h ?",
      answer: "15",
      acceptedAnswers: ["15 km/h", "15km/h"],
      explanation: "Vitesse = distance / temps, donc 45 / 3 = 15 km/h."
    },
    {
      id: "extra10_math_short_006",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Type brevet",
      type: "short_answer",
      question: "Un article coute 80 euros. Il augmente de 25 %. Quel est le nouveau prix ?",
      answer: "100",
      acceptedAnswers: ["100 euros", "100€"],
      explanation: "25 % de 80 vaut 20. Le nouveau prix est donc 80 + 20 = 100 euros."
    },
    {
      id: "extra10_math_short_007",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Decouverte",
      type: "short_answer",
      question: "Resous : x - 9 = 14.",
      answer: "23",
      acceptedAnswers: ["x=23", "x = 23"],
      explanation: "On ajoute 9 des deux cotes : x = 14 + 9 = 23."
    },
    {
      id: "extra10_math_short_008",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Consolidation",
      type: "short_answer",
      question: "Resous : 3x + 2 = 17.",
      answer: "5",
      acceptedAnswers: ["x=5", "x = 5"],
      explanation: "On retire 2 : 3x = 15. Puis on divise par 3 : x = 5."
    },
    {
      id: "extra10_math_short_009",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Type brevet",
      type: "short_answer",
      question: "Resous : 5x - 7 = 18.",
      answer: "5",
      acceptedAnswers: ["x=5", "x = 5"],
      explanation: "On ajoute 7 : 5x = 25. Puis on divise par 5 : x = 5."
    },
    {
      id: "extra10_math_short_010",
      subject: "mathematiques",
      chapter: "Fonctions",
      stage: "Consolidation",
      type: "short_answer",
      question: "On donne f(x) = 4x - 1. Calcule f(3).",
      answer: "11",
      acceptedAnswers: ["f(3)=11", "f(3) = 11"],
      explanation: "On remplace x par 3 : f(3) = 4 x 3 - 1 = 11."
    },
    {
      id: "extra10_math_short_011",
      subject: "mathematiques",
      chapter: "Fonctions",
      stage: "Type brevet",
      type: "short_answer",
      question: "On donne f(x) = 2x + 6. Pour quelle valeur de x a-t-on f(x) = 14 ?",
      answer: "4",
      acceptedAnswers: ["x=4", "x = 4"],
      explanation: "On resout 2x + 6 = 14. Donc 2x = 8, puis x = 4."
    },
    {
      id: "extra10_math_short_012",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Decouverte",
      type: "short_answer",
      question: "On lance un de equilibre a 6 faces. Quelle est la probabilite d'obtenir 6 ?",
      answer: "1/6",
      explanation: "Il y a 6 issues possibles et une seule issue favorable : obtenir 6."
    },
    {
      id: "extra10_math_short_013",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Consolidation",
      type: "short_answer",
      question: "Une urne contient 12 boules dont 3 vertes. Ecris la probabilite de tirer une boule verte sous forme simplifiee.",
      answer: "1/4",
      acceptedAnswers: ["3/12", "0.25"],
      explanation: "La probabilite est 3/12. On simplifie par 3 : 1/4."
    },
    {
      id: "extra10_math_short_014",
      subject: "mathematiques",
      chapter: "Statistiques",
      stage: "Decouverte",
      type: "short_answer",
      question: "Calcule la moyenne de 5, 7, 9 et 11.",
      answer: "8",
      explanation: "5 + 7 + 9 + 11 = 32. Il y a 4 valeurs, donc 32 / 4 = 8."
    },
    {
      id: "extra10_math_short_015",
      subject: "mathematiques",
      chapter: "Statistiques",
      stage: "Consolidation",
      type: "short_answer",
      question: "Quelle est la mediane de la serie 2 ; 5 ; 8 ; 9 ; 12 ?",
      answer: "8",
      explanation: "La serie est rangee et contient 5 valeurs. La valeur du milieu est 8."
    },
    {
      id: "extra10_math_short_016",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Consolidation",
      type: "short_answer",
      question: "Un rectangle mesure 7 cm de long et 4 cm de large. Calcule son aire en cm2.",
      answer: "28",
      acceptedAnswers: ["28 cm2", "28cm2"],
      explanation: "Aire d'un rectangle = longueur x largeur, donc 7 x 4 = 28 cm2."
    },
    {
      id: "extra10_math_short_017",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Type brevet",
      type: "short_answer",
      question: "Dans un triangle rectangle, les deux cotes de l'angle droit mesurent 6 cm et 8 cm. Quelle est la longueur de l'hypotenuse ?",
      answer: "10",
      acceptedAnswers: ["10 cm", "10cm"],
      explanation: "Avec Pythagore : 6^2 + 8^2 = 36 + 64 = 100. La racine carree de 100 est 10."
    },
    {
      id: "extra10_math_short_018",
      subject: "mathematiques",
      chapter: "Calcul litteral",
      stage: "Consolidation",
      type: "short_answer",
      question: "Developpe : 3(x + 5).",
      answer: "3x+15",
      acceptedAnswers: ["3x + 15"],
      explanation: "On multiplie chaque terme par 3 : 3 x x + 3 x 5 = 3x + 15."
    },
    {
      id: "extra10_math_short_019",
      subject: "mathematiques",
      chapter: "Algorithmique et tableur",
      stage: "Consolidation",
      type: "short_answer",
      question: "Dans un tableur, B2 vaut 6 et C2 vaut 4. Que vaut la formule =B2*C2 ?",
      answer: "24",
      explanation: "La formule multiplie les valeurs des cellules B2 et C2 : 6 x 4 = 24."
    },
    {
      id: "extra10_math_short_020",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Type brevet",
      type: "short_answer",
      question: "Sur une carte, 1 cm represente 5 km. Quelle distance reelle represente 3 cm ?",
      answer: "15",
      acceptedAnswers: ["15 km", "15km"],
      explanation: "Si 1 cm represente 5 km, alors 3 cm representent 3 x 5 = 15 km."
    }
  );
}());
