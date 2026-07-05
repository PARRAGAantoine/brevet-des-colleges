(function () {
  const content = window.BREVET_CONTENT;

  content.exercises.push(
    {
      id: "extra14_math_short_001",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Decouverte",
      type: "short_answer",
      question: "Calcule : 7 + 3 x 5.",
      answer: "22",
      explanation: "La multiplication est prioritaire : 3 x 5 = 15, puis 7 + 15 = 22."
    },
    {
      id: "extra14_math_short_002",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Consolidation",
      type: "short_answer",
      question: "Calcule : (-4) + 11.",
      answer: "7",
      explanation: "On avance de 11 a partir de -4 : on arrive a 7."
    },
    {
      id: "extra14_math_short_003",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Consolidation",
      type: "short_answer",
      question: "Ecris 45 % sous forme decimale.",
      answer: "0,45",
      acceptedAnswers: ["0.45"],
      explanation: "45 % signifie 45/100, donc 0,45."
    },
    {
      id: "extra14_math_short_004",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Type brevet",
      type: "short_answer",
      question: "Un prix de 120 euros baisse de 10 %. Quel est le nouveau prix ?",
      answer: "108",
      acceptedAnswers: ["108 euros", "108 euro", "108e", "108 €"],
      explanation: "10 % de 120 vaut 12. Le nouveau prix est 120 - 12 = 108 euros."
    },
    {
      id: "extra14_math_short_005",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Decouverte",
      type: "short_answer",
      question: "Resous : x + 8 = 19.",
      answer: "11",
      acceptedAnswers: ["x=11", "x = 11"],
      explanation: "On enleve 8 des deux cotes : x = 19 - 8 = 11."
    },
    {
      id: "extra14_math_short_006",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Consolidation",
      type: "short_answer",
      question: "Resous : 4x = 28.",
      answer: "7",
      acceptedAnswers: ["x=7", "x = 7"],
      explanation: "On divise par 4 : x = 28 / 4 = 7."
    },
    {
      id: "extra14_math_short_007",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Type brevet",
      type: "short_answer",
      question: "Resous : 3x - 2 = 13.",
      answer: "5",
      acceptedAnswers: ["x=5", "x = 5"],
      explanation: "On ajoute 2 : 3x = 15. Puis on divise par 3 : x = 5."
    },
    {
      id: "extra14_math_short_008",
      subject: "mathematiques",
      chapter: "Calcul litteral",
      stage: "Consolidation",
      type: "short_answer",
      question: "Pour x = 3, calcule 2x + 5.",
      answer: "11",
      explanation: "On remplace x par 3 : 2 x 3 + 5 = 6 + 5 = 11."
    },
    {
      id: "extra14_math_short_009",
      subject: "mathematiques",
      chapter: "Calcul litteral",
      stage: "Type brevet",
      type: "short_answer",
      question: "Developpe : 5(x - 2).",
      answer: "5x-10",
      acceptedAnswers: ["5x - 10"],
      explanation: "On multiplie chaque terme par 5 : 5 x x - 5 x 2 = 5x - 10."
    },
    {
      id: "extra14_math_short_010",
      subject: "mathematiques",
      chapter: "Fonctions",
      stage: "Decouverte",
      type: "short_answer",
      question: "Si f(x) = 2x + 1, calcule f(4).",
      answer: "9",
      explanation: "On remplace x par 4 : f(4) = 2 x 4 + 1 = 9."
    },
    {
      id: "extra14_math_short_011",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Consolidation",
      type: "short_answer",
      question: "Un triangle rectangle a pour cotes de l'angle droit 5 cm et 12 cm. Quelle est l'hypotenuse ?",
      answer: "13",
      acceptedAnswers: ["13 cm", "13cm"],
      explanation: "Avec Pythagore : 5² + 12² = 25 + 144 = 169. La racine carree de 169 est 13."
    },
    {
      id: "extra14_math_short_012",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Type brevet",
      type: "short_answer",
      question: "Dans une configuration de Thales, le rapport est 3/5 et la grande longueur vaut 20 cm. Quelle est la petite longueur ?",
      answer: "12",
      acceptedAnswers: ["12 cm", "12cm"],
      explanation: "On calcule 20 x 3/5 = 12."
    },
    {
      id: "extra14_math_short_013",
      subject: "mathematiques",
      chapter: "Probabilites et statistiques",
      notionId: "math.probabilites",
      stage: "Decouverte",
      type: "short_answer",
      question: "Dans une urne, il y a 10 boules dont 4 rouges. Quelle est la probabilite de tirer une boule rouge ?",
      answer: "4/10",
      acceptedAnswers: ["2/5", "0,4", "0.4", "40%"],
      explanation: "Il y a 4 issues favorables sur 10 issues possibles : 4/10, soit 2/5."
    },
    {
      id: "extra14_math_short_014",
      subject: "mathematiques",
      chapter: "Probabilites et statistiques",
      notionId: "math.statistiques",
      stage: "Consolidation",
      type: "short_answer",
      question: "Quelle est la mediane de la serie : 4 ; 7 ; 8 ; 10 ; 12 ?",
      answer: "8",
      explanation: "La serie est deja rangee. La valeur du milieu est 8."
    },
    {
      id: "extra14_math_short_015",
      subject: "mathematiques",
      chapter: "Algorithmique et tableur",
      stage: "Decouverte",
      type: "short_answer",
      question: "Dans un tableur, A1 vaut 9 et B1 vaut 6. Que vaut =A1-B1 ?",
      answer: "3",
      explanation: "La formule fait 9 - 6, donc le resultat est 3."
    },
    {
      id: "extra14_math_short_016",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Consolidation",
      type: "short_answer",
      question: "Convertis 3,2 L en mL.",
      answer: "3200",
      acceptedAnswers: ["3200 ml", "3200ml"],
      explanation: "1 L = 1000 mL, donc 3,2 L = 3200 mL."
    },
    {
      id: "extra14_science_short_001",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Decouverte",
      type: "short_answer",
      question: "Quelle est l'unite de l'intensite electrique ?",
      answer: "ampere",
      acceptedAnswers: ["ampere", "a", "A"],
      explanation: "L'intensite electrique se mesure en ampere, de symbole A."
    },
    {
      id: "extra14_science_short_002",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Consolidation",
      type: "short_answer",
      question: "Calcule la tension si R = 5 ohms et I = 2 A. On utilise U = R x I.",
      answer: "10",
      acceptedAnswers: ["10 v", "10V", "10 volts"],
      explanation: "U = R x I = 5 x 2 = 10 V."
    },
    {
      id: "extra14_science_short_003",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Type brevet",
      type: "short_answer",
      question: "Une solution a un pH de 3. Est-elle acide, neutre ou basique ?",
      answer: "acide",
      explanation: "Un pH inferieur a 7 correspond a une solution acide."
    },
    {
      id: "extra14_science_short_004",
      subject: "sciences",
      chapter: "SVT",
      stage: "Decouverte",
      type: "short_answer",
      question: "Quel organe permet de pomper le sang dans le corps ?",
      answer: "coeur",
      acceptedAnswers: ["le coeur", "cœur", "le cœur"],
      explanation: "Le coeur est un muscle qui pompe le sang."
    },
    {
      id: "extra14_science_short_005",
      subject: "sciences",
      chapter: "SVT",
      stage: "Consolidation",
      type: "short_answer",
      question: "Quel gaz les plantes absorbent-elles pour la photosynthese ?",
      answer: "dioxyde de carbone",
      acceptedAnswers: ["co2", "CO2"],
      explanation: "Les plantes utilisent le dioxyde de carbone, de l'eau et de la lumiere pour produire de la matiere."
    },
    {
      id: "extra14_science_short_006",
      subject: "sciences",
      chapter: "Technologie",
      stage: "Decouverte",
      type: "short_answer",
      question: "Dans un algorithme, quel mot utilise-t-on souvent pour repeter une action ?",
      answer: "boucle",
      acceptedAnswers: ["une boucle"],
      explanation: "Une boucle permet de repeter une ou plusieurs instructions."
    },
    {
      id: "extra14_science_short_007",
      subject: "sciences",
      chapter: "Donnees",
      stage: "Consolidation",
      type: "short_answer",
      question: "Sur un graphique, comment s'appelle la ligne horizontale ?",
      answer: "axe des abscisses",
      acceptedAnswers: ["abscisses", "axe x", "x"],
      explanation: "La ligne horizontale s'appelle l'axe des abscisses."
    },
    {
      id: "extra14_science_short_008",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Type brevet",
      type: "short_answer",
      question: "Un objet parcourt 60 m en 10 s. Quelle est sa vitesse en m/s ?",
      answer: "6",
      acceptedAnswers: ["6 m/s", "6m/s"],
      explanation: "Vitesse = distance / temps = 60 / 10 = 6 m/s."
    },
    {
      id: "extra14_fr_short_001",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Decouverte",
      type: "short_answer",
      question: "Dans la phrase 'Le chat dort', quel est le verbe ?",
      answer: "dort",
      explanation: "Le verbe indique l'action ou l'etat : ici, c'est 'dort'."
    },
    {
      id: "extra14_fr_short_002",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Consolidation",
      type: "short_answer",
      question: "Dans 'Les enfants jouent', quel est le sujet ?",
      answer: "les enfants",
      acceptedAnswers: ["enfants"],
      explanation: "Le sujet repond a la question 'qui joue ?' : les enfants."
    },
    {
      id: "extra14_fr_short_003",
      subject: "francais",
      chapter: "Orthographe",
      stage: "Decouverte",
      type: "short_answer",
      question: "Complete : Elles sont parti__.",
      answer: "es",
      acceptedAnswers: ["parties"],
      explanation: "Avec l'auxiliaire etre, le participe passe s'accorde avec le sujet : elles sont parties."
    },
    {
      id: "extra14_fr_short_004",
      subject: "francais",
      chapter: "Conjugaison",
      notionId: "fr.orthographe",
      stage: "Consolidation",
      type: "short_answer",
      question: "Conjugue le verbe 'finir' avec 'nous' au present.",
      answer: "finissons",
      acceptedAnswers: ["nous finissons"],
      explanation: "Au present, avec 'nous', le verbe finir devient 'nous finissons'."
    },
    {
      id: "extra14_fr_short_005",
      subject: "francais",
      chapter: "Vocabulaire",
      notionId: "fr.grammaire",
      stage: "Decouverte",
      type: "short_answer",
      question: "Quel est le contraire de 'possible' ?",
      answer: "impossible",
      explanation: "Le prefixe im- donne le contraire : possible / impossible."
    },
    {
      id: "extra14_fr_short_006",
      subject: "francais",
      chapter: "Reecriture",
      stage: "Type brevet",
      type: "short_answer",
      question: "Transforme au pluriel : 'un cheval'.",
      answer: "des chevaux",
      acceptedAnswers: ["chevaux"],
      explanation: "Au pluriel, 'un cheval' devient 'des chevaux'."
    },
    {
      id: "extra14_hist_short_001",
      subject: "histoire",
      chapter: "Histoire",
      notionId: "hist.reperes",
      stage: "Decouverte",
      type: "short_answer",
      question: "En quelle annee commence la Premiere Guerre mondiale ?",
      answer: "1914",
      explanation: "La Premiere Guerre mondiale commence en 1914."
    },
    {
      id: "extra14_hist_short_002",
      subject: "histoire",
      chapter: "Histoire",
      notionId: "hist.seconde-guerre",
      stage: "Consolidation",
      type: "short_answer",
      question: "En quelle annee se termine la Seconde Guerre mondiale ?",
      answer: "1945",
      explanation: "La Seconde Guerre mondiale se termine en 1945."
    },
    {
      id: "extra14_hist_short_003",
      subject: "histoire",
      chapter: "Geographie",
      stage: "Decouverte",
      type: "short_answer",
      question: "Comment appelle-t-on une ville tres grande qui concentre population et activites ?",
      answer: "metropole",
      acceptedAnswers: ["une metropole", "métropole", "une métropole"],
      explanation: "Une metropole est une grande ville qui concentre des habitants, des emplois et des services."
    },
    {
      id: "extra14_hist_short_004",
      subject: "histoire",
      chapter: "Geographie",
      stage: "Consolidation",
      type: "short_answer",
      question: "Quel mot designe le depart des habitants des campagnes vers les villes ?",
      answer: "exode rural",
      explanation: "L'exode rural est le depart des habitants des campagnes vers les villes."
    },
    {
      id: "extra14_hist_short_005",
      subject: "histoire",
      chapter: "EMC",
      stage: "Decouverte",
      type: "short_answer",
      question: "Complete une valeur de la Republique : liberte, egalite, ...",
      answer: "fraternite",
      acceptedAnswers: ["fraternité"],
      explanation: "La devise de la Republique francaise est Liberte, Egalite, Fraternite."
    },
    {
      id: "extra14_hist_short_006",
      subject: "histoire",
      chapter: "EMC",
      stage: "Consolidation",
      type: "short_answer",
      question: "Quel texte de 1789 affirme les droits et libertes des citoyens ?",
      answer: "declaration des droits de l'homme et du citoyen",
      acceptedAnswers: ["ddhc", "declaration des droits de l homme et du citoyen", "déclaration des droits de l'homme et du citoyen"],
      explanation: "La Declaration des droits de l'homme et du citoyen date de 1789."
    }
  );
}());
