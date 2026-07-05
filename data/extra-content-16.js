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
    id: "math_fraction_simplifier",
    subject: "mathematiques",
    chapter: "Nombres et calculs",
    notionId: "math.nombres-calculs",
    stage: "Decouverte",
    prerequisite: "Savoir diviser deux nombres entiers simples.",
    title: "Simplifier une fraction",
    summary: "Simplifier une fraction, c'est diviser le numerateur et le denominateur par le meme nombre pour obtenir une fraction egale plus simple.",
    example: "18/30 se simplifie par 6 : 18/30 = 3/5.",
    mistake: "Diviser seulement le nombre du haut ou seulement le nombre du bas.",
    takeaway: "Cherche un diviseur commun au haut et au bas, puis divise les deux nombres par ce diviseur."
  });

  enrichLesson("math_trigo", {
    prerequisite: "Savoir reconnaitre le cote oppose, le cote adjacent et l'hypotenuse dans un triangle rectangle.",
    summary: "La trigonometrie sert a relier un angle d'un triangle rectangle avec deux cotes. Cosinus utilise adjacent / hypotenuse, sinus utilise oppose / hypotenuse, tangente utilise oppose / adjacent.",
    example: "Si la question demande le cosinus d'un angle, on choisit toujours adjacent / hypotenuse.",
    mistake: "Confondre avec Pythagore : Pythagore calcule une longueur, alors que cosinus, sinus et tangente utilisent un angle.",
    takeaway: "Cosinus = adjacent / hypotenuse ; sinus = oppose / hypotenuse ; tangente = oppose / adjacent."
  });
}());
