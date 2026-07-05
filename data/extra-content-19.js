(function () {
  const content = window.BREVET_CONTENT;
  if (!content || !Array.isArray(content.lessons)) return;

  function enrichLesson(id, patch) {
    const lesson = content.lessons.find((item) => item.id === id);
    if (lesson) Object.assign(lesson, patch);
  }

  enrichLesson("math_conversions", {
    title: "Convertir des unités simples",
    prerequisite: "Savoir que 1 km = 1000 m, 1 m = 100 cm et 1 L = 100 cL.",
    summary: "Convertir, c'est garder la même grandeur, mais changer l'unité utilisée. La quantité ne change pas : seule l'écriture change.",
    example: "2,5 km = 2500 m, car 1 km vaut 1000 m. On multiplie donc 2,5 par 1000.",
    mistake: "Multiplier quand il fallait diviser, ou oublier que l'unité devient plus petite ou plus grande.",
    takeaway: "Si l'unité devient plus petite, le nombre devient plus grand. Si l'unité devient plus grande, le nombre devient plus petit."
  });

  enrichLesson("math_aires_volumes", {
    prerequisite: "Savoir reconnaître une longueur, une surface et un solide simple.",
    summary: "Une longueur mesure une distance, une aire mesure une surface et un volume mesure la place prise par un solide.",
    example: "Un rectangle de longueur 5 cm et de largeur 3 cm a pour aire 5 x 3 = 15 cm².",
    mistake: "Donner une aire en cm ou un volume en cm². L'unité aide à voir si la réponse correspond à la question.",
    takeaway: "Longueur : cm. Aire : cm². Volume : cm³. Commence toujours par dire ce que l'on cherche."
  });

  enrichLesson("math_echelle", {
    prerequisite: "Savoir multiplier par 10, 100 ou 1000 et convertir des centimètres en mètres.",
    summary: "Une échelle relie une distance dessinée sur un plan à une distance réelle. Elle sert à passer du plan à la réalité, ou de la réalité au plan.",
    example: "À l'échelle 1:1000, 1 cm sur le plan représente 1000 cm en réalité. Donc 2 cm représentent 2000 cm, soit 20 m.",
    mistake: "Oublier la conversion finale : le calcul donne souvent des centimètres, mais la réponse attendue est parfois en mètres ou kilomètres.",
    takeaway: "Lis l'échelle, multiplie ou divise dans le bon sens, puis convertis l'unité."
  });

  enrichLesson("hist_decolonisation", {
    prerequisite: "Savoir qu'une colonie est un territoire dominé par un autre pays.",
    summary: "La décolonisation est le moment où des colonies deviennent indépendantes. Après 1945, beaucoup de peuples réclament le droit de se gouverner eux-mêmes.",
    example: "L'Inde devient indépendante en 1947. L'Algérie devient indépendante en 1962 après une guerre.",
    mistake: "Croire que toutes les indépendances se font de la même manière. Certaines sont négociées, d'autres passent par une guerre.",
    takeaway: "Décolonisation = fin de la domination coloniale + naissance de nouveaux États indépendants."
  });

  enrichLesson("fr_point_vue", {
    prerequisite: "Savoir repérer qui raconte une histoire : je, il, elle ou un narrateur extérieur.",
    summary: "Le point de vue indique ce que le lecteur sait dans un récit. On peut suivre les pensées d'un personnage ou observer la scène de l'extérieur.",
    example: "Si le texte dit ce que Léa pense et ressent, le lecteur voit surtout la scène à travers Léa.",
    mistake: "Confondre le narrateur avec l'auteur. Le narrateur raconte l'histoire ; l'auteur est la personne réelle qui a écrit le texte.",
    takeaway: "Demande-toi : qui voit la scène ? Qui connaît les pensées ?"
  });

  enrichLesson("fr_argument", {
    prerequisite: "Savoir distinguer une idée personnelle et un exemple concret.",
    summary: "Argumenter, c'est défendre une idée avec des raisons. Une bonne réponse ne donne pas seulement un avis : elle explique pourquoi.",
    example: "Avis : il faut protéger la nature. Argument : cela préserve les animaux et les ressources. Exemple : trier les déchets réduit la pollution.",
    mistake: "Écrire seulement je pense que sans donner de raison ou d'exemple.",
    takeaway: "Une réponse solide suit souvent : idée, raison, exemple."
  });
})();
