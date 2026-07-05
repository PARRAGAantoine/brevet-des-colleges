(function () {
  const content = window.BREVET_CONTENT;

  function addLessonOnce(lesson) {
    if (!content.lessons.some((item) => item.id === lesson.id)) {
      content.lessons.push(lesson);
    }
  }

  function enrichLesson(id, patch) {
    const lesson = content.lessons.find((item) => item.id === id);
    if (lesson) Object.assign(lesson, patch);
  }

  addLessonOnce({
    id: "math_nombres_relatifs",
    subject: "mathematiques",
    chapter: "Nombres et calculs",
    notionId: "math.nombres-calculs",
    stage: "Decouverte",
    prerequisite: "Savoir placer 0, des nombres positifs et des nombres négatifs sur une droite graduée.",
    title: "Calculer avec des nombres relatifs",
    summary: "Un nombre relatif peut être positif ou négatif. Le signe indique de quel côté de 0 se trouve le nombre.",
    example: "-3 + 7 = 4 ; -5 - 2 = -7 ; (-3) x (-4) = 12.",
    mistake: "Changer le signe au hasard. Pour une multiplication ou une division, on regarde d'abord les signes, puis les nombres.",
    takeaway: "Addition : pense à la droite graduée. Multiplication et division : deux signes identiques donnent un résultat positif."
  });

  addLessonOnce({
    id: "math_puissances",
    subject: "mathematiques",
    chapter: "Nombres et calculs",
    notionId: "math.nombres-calculs",
    stage: "Consolidation",
    prerequisite: "Savoir multiplier un nombre plusieurs fois par lui-même.",
    title: "Comprendre les puissances",
    summary: "Une puissance sert à écrire une multiplication répétée. L'exposant indique combien de facteurs identiques on utilise.",
    example: "10^3 = 10 x 10 x 10 = 1000. Attention : ce n'est pas 10 x 3.",
    mistake: "Lire 5^2 comme 5 x 2. En réalité, 5^2 = 5 x 5.",
    takeaway: "Lis l'exposant comme le nombre de répétitions de la multiplication."
  });

  addLessonOnce({
    id: "math_developpements",
    subject: "mathematiques",
    chapter: "Nombres et calculs",
    notionId: "math.nombres-calculs",
    stage: "Consolidation",
    prerequisite: "Savoir multiplier un nombre par chaque terme d'une parenthèse.",
    title: "Développer une expression",
    summary: "Développer, c'est enlever des parenthèses en distribuant la multiplication sur tous les termes à l'intérieur.",
    example: "3(x + 4) = 3x + 12 ; 2(x - 5) = 2x - 10.",
    mistake: "Multiplier seulement le premier terme de la parenthèse et oublier le second.",
    takeaway: "Le nombre devant la parenthèse multiplie chaque terme placé dans la parenthèse."
  });

  addLessonOnce({
    id: "math_factorisation",
    subject: "mathematiques",
    chapter: "Nombres et calculs",
    notionId: "math.nombres-calculs",
    stage: "Type brevet",
    prerequisite: "Savoir reconnaître un diviseur commun simple.",
    title: "Factoriser avec un facteur commun",
    summary: "Factoriser, c'est faire l'inverse de développer : on remet un facteur commun devant une parenthèse.",
    example: "6x + 9 = 3(2x + 3), car 3 x 2x = 6x et 3 x 3 = 9.",
    mistake: "Prendre un facteur qui ne divise pas tous les termes de l'expression.",
    takeaway: "Cherche ce qui est commun à tous les termes, puis vérifie en redéveloppant."
  });

  addLessonOnce({
    id: "math_proportionnalite_simple",
    subject: "mathematiques",
    chapter: "Fonctions",
    notionId: "math.fonctions",
    stage: "Consolidation",
    prerequisite: "Savoir multiplier et diviser par un même nombre.",
    title: "Reconnaître une situation de proportionnalité",
    summary: "Deux grandeurs sont proportionnelles quand on passe toujours de l'une à l'autre avec le même coefficient.",
    example: "Si 3 cahiers coûtent 6 euros, alors 1 cahier coûte 2 euros et 10 cahiers coûtent 20 euros.",
    mistake: "Croire que tout tableau qui augmente est proportionnel. Il faut vérifier que le même coefficient fonctionne partout.",
    takeaway: "Cherche le coefficient, le retour à l'unité ou le produit en croix selon la question."
  });

  addLessonOnce({
    id: "math_pourcentages",
    subject: "mathematiques",
    chapter: "Fonctions",
    notionId: "math.fonctions",
    stage: "Consolidation",
    prerequisite: "Savoir qu'une fraction sur 100 représente une partie d'un tout.",
    title: "Calculer un pourcentage",
    summary: "Un pourcentage est une proportion sur 100. Calculer 20 % d'une quantité, c'est prendre 20 parts sur 100.",
    example: "20 % de 50 = 20/100 x 50 = 10.",
    mistake: "Ajouter le pourcentage au nombre de départ alors que la question demande seulement une partie.",
    takeaway: "Transforme le pourcentage en fraction sur 100, puis multiplie par la quantité de départ."
  });

  addLessonOnce({
    id: "math_fonctions_affines",
    subject: "mathematiques",
    chapter: "Fonctions",
    notionId: "math.fonctions",
    stage: "Type brevet",
    prerequisite: "Savoir remplacer x par une valeur dans une formule.",
    title: "Comprendre une fonction affine",
    summary: "Une fonction affine a la forme f(x) = ax + b. Elle sert à calculer une valeur à partir d'une autre.",
    example: "Si f(x) = 2x + 3, alors f(4) = 2 x 4 + 3 = 11.",
    mistake: "Confondre l'image et l'antécédent : x est le nombre de départ, f(x) est le résultat.",
    takeaway: "Pour calculer une image, remplace x par la valeur donnée et respecte les priorités de calcul."
  });

  addLessonOnce({
    id: "math_transformations",
    subject: "mathematiques",
    chapter: "Géométrie",
    notionId: "math.geometrie",
    stage: "Consolidation",
    prerequisite: "Savoir reconnaître une figure et comparer deux figures.",
    title: "Reconnaître les transformations",
    summary: "Une transformation déplace, retourne, tourne, agrandit ou réduit une figure. Certaines gardent les longueurs, d'autres changent la taille.",
    example: "Une translation fait glisser la figure. Une rotation la fait tourner. Une symétrie la retourne. Une homothétie l'agrandit ou la réduit.",
    mistake: "Confondre translation et rotation : dans une translation, la figure ne tourne pas.",
    takeaway: "Regarde si la figure glisse, tourne, se retourne ou change de taille."
  });

  enrichLesson("math_proba_base", {
    prerequisite: "Savoir compter tous les cas possibles d'une situation simple.",
    summary: "Une probabilité mesure la chance qu'un événement arrive. Dans un exercice simple, on compte les cas favorables et les cas possibles.",
    example: "Dans une urne avec 6 boules dont 4 paires, la probabilité de tirer un nombre pair est 4/6, donc 2/3.",
    mistake: "Mettre au dénominateur seulement les cas qui t'intéressent. Le dénominateur doit être le nombre total de cas possibles.",
    takeaway: "Probabilité = cas favorables / cas possibles."
  });

  enrichLesson("math_pythagore", {
    prerequisite: "Savoir reconnaître un triangle rectangle et son hypoténuse.",
    summary: "Le théorème de Pythagore sert seulement dans un triangle rectangle. Il permet de calculer une longueur ou de vérifier si un triangle est rectangle.",
    example: "Si les côtés de l'angle droit mesurent 3 cm et 4 cm, alors l'hypoténuse vérifie h^2 = 3^2 + 4^2 = 25, donc h = 5 cm.",
    mistake: "Utiliser Pythagore sans triangle rectangle, ou mettre la mauvaise longueur comme hypoténuse.",
    takeaway: "Commence toujours par repérer l'angle droit et le côté le plus long."
  });

  enrichLesson("math_trigo", {
    title: "Utiliser la trigonométrie",
    prerequisite: "Savoir reconnaître le côté opposé, le côté adjacent et l'hypoténuse dans un triangle rectangle.",
    summary: "La trigonométrie sert dans un triangle rectangle quand on relie un angle et des longueurs. On utilise cosinus, sinus ou tangente selon les côtés connus.",
    example: "Pour un angle donné : cosinus = adjacent / hypoténuse ; sinus = opposé / hypoténuse ; tangente = opposé / adjacent.",
    mistake: "Choisir une formule sans nommer les côtés par rapport au bon angle.",
    takeaway: "Commence par choisir l'angle, puis nomme opposé, adjacent et hypoténuse."
  });

  enrichLesson("math_thales_base", {
    prerequisite: "Savoir reconnaître des points alignés et des droites parallèles.",
    summary: "Le théorème de Thalès sert dans une figure avec deux droites sécantes et deux droites parallèles. Il permet de calculer une longueur avec des rapports.",
    example: "Si A, D, B sont alignés, A, E, C sont alignés et (DE) est parallèle à (BC), alors AD/AB = AE/AC = DE/BC.",
    mistake: "Écrire les rapports dans un ordre différent ou oublier de vérifier le parallélisme.",
    takeaway: "Points alignés, droites parallèles, rapports dans le même ordre."
  });

  enrichLesson("math_programme_calcul", {
    prerequisite: "Savoir suivre une consigne de calcul étape par étape.",
    summary: "Un programme de calcul est une suite d'actions appliquées à un nombre de départ. Avec une lettre, on obtient une expression.",
    example: "Choisir x, multiplier par 4, puis ajouter 3 donne 4x + 3.",
    mistake: "Changer l'ordre des étapes ou simplifier trop vite.",
    takeaway: "Écris une ligne par étape pour ne pas perdre le fil."
  });

  enrichLesson("math_fractions_priorites", {
    prerequisite: "Savoir additionner, soustraire, multiplier et diviser des nombres simples.",
    summary: "Dans un calcul, on respecte un ordre précis : parenthèses, puissances, multiplications et divisions, puis additions et soustractions.",
    example: "3 + 4 x 2 = 3 + 8 = 11, et non 14.",
    mistake: "Calculer automatiquement de gauche à droite.",
    takeaway: "Repère d'abord l'opération prioritaire, puis fais une seule étape par ligne."
  });

  enrichLesson("math_statistiques", {
    prerequisite: "Savoir ranger une liste de nombres dans l'ordre croissant.",
    summary: "Les statistiques servent à résumer une série de valeurs. Au brevet, on rencontre souvent moyenne, médiane, étendue et lecture de graphique.",
    example: "Dans 4 ; 7 ; 9 ; 10 ; 15, la médiane est 9 car c'est la valeur du milieu.",
    mistake: "Chercher la médiane sans ranger les valeurs.",
    takeaway: "Moyenne : addition puis division. Médiane : ranger puis chercher le milieu."
  });
}());
