(function () {
  const content = window.BREVET_CONTENT;
  const storageKey = "brevetSprintProgress";
  const today = () => new Date().toISOString().slice(0, 10);
  const dayMs = 24 * 60 * 60 * 1000;

  const initialProgress = {
    points: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    badges: [],
    sessions: [],
    answers: [],
    mistakes: [],
    repairs: [],
    chapterStatus: {},
    guidedTasks: [],
    perfectRuns: 0
  };

  let progress = loadProgress();
  let activeSubject = getRecommendation().subject;
  let currentPracticeQuestion = null;
  let currentSession = null;
  let selectedCourseSubject = "all";
  let selectedCourseStage = "all";
  let selectedRoadmapSubject = "all";
  let selectedGuidedSubject = "all";

  function loadProgress() {
    try {
      return { ...initialProgress, ...JSON.parse(localStorage.getItem(storageKey)) };
    } catch (error) {
      return { ...initialProgress };
    }
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  function subjectLabel(subjectId) {
    if (subjectId === "mixed") return "Melange type brevet";
    return content.subjects.find((subject) => subject.id === subjectId)?.label || subjectId;
  }

  function stageLabel(stage) {
    const labels = {
      Decouverte: "J'apprends",
      Consolidation: "Je m'entraine",
      "Type brevet": "Comme au brevet"
    };
    return labels[stage] || stage || "Progressif";
  }

  function getNotionForChapter(subjectId, chapter) {
    return (content.notions || []).find((notion) => notion.subject === subjectId && chapterMatches(notion.chapter, chapter));
  }

  function getGeneratedSeedBase(subjectId, chapter, offset = 0) {
    const dateSeed = Number(today().replace(/-/g, ""));
    return Math.abs(seededHash(`${subjectId}:${chapter}:${dateSeed}:${progress.answers.length}:${offset}`));
  }

  function generateQuestionsForChapter(subjectId, chapter, count, offset = 0) {
    const registry = window.BREVET_GENERATORS;
    const notion = getNotionForChapter(subjectId, chapter);
    if (!registry || !notion || !notion.generators?.length) return [];
    return registry.generateForNotion(notion, count, getGeneratedSeedBase(subjectId, chapter, offset));
  }

  function generateQuestionsForNotion(notion, count, offset = 0) {
    const registry = window.BREVET_GENERATORS;
    if (!registry || !notion || !notion.generators?.length) return [];
    return registry.generateForNotion(notion, count, getGeneratedSeedBase(notion.subject, notion.id, offset));
  }

  function findExerciseByReference(reference) {
    const staticExercise = content.exercises.find((exercise) => exercise.id === reference.exerciseId);
    if (staticExercise) return staticExercise;
    if (reference.generatorId && Number.isFinite(Number(reference.seed)) && window.BREVET_GENERATORS) {
      return window.BREVET_GENERATORS.generate(reference.generatorId, Number(reference.seed));
    }
    return null;
  }

  function getSubjectStats(subjectId) {
    const answers = progress.answers.filter((answer) => answer.subject === subjectId);
    const correct = answers.filter((answer) => answer.correct).length;
    const rate = answers.length ? Math.round((correct / answers.length) * 100) : 0;
    return { total: answers.length, correct, rate };
  }

  function getCurriculumStats(item) {
    const manualStatus = progress.chapterStatus?.[item.id] || "active";
    const itemText = `${item.chapter} ${item.title}`.toLowerCase();
    const answers = progress.answers.filter((answer) => {
      const answerChapter = String(answer.chapter || "").toLowerCase();
      const chapterWords = answerChapter.split(/[^a-z0-9]+/).filter((word) => word.length >= 5);
      const itemWords = itemText.split(/[^a-z0-9]+/).filter((word) => word.length >= 5);
      const fuzzyMatch = chapterWords.some((chapterWord) =>
        itemWords.some((itemWord) => itemWord.includes(chapterWord) || chapterWord.includes(itemWord) || itemWord.slice(0, 6) === chapterWord.slice(0, 6))
      );
      return answer.subject === item.subject && (itemText.includes(answerChapter) || answerChapter.includes(item.chapter.toLowerCase()) || fuzzyMatch);
    });
    const correct = answers.filter((answer) => answer.correct).length;
    const rate = answers.length ? Math.round((correct / answers.length) * 100) : 0;
    let status = "A decouvrir";
    let stage = "Decouverte";
    if (answers.length > 0 && answers.length < 3) {
      status = "En decouverte";
      stage = "Decouverte";
    } else if (answers.length >= 3 && rate < 50) {
      status = "A reprendre avec un cours";
      stage = "Decouverte";
    } else if (answers.length >= 3 && rate < 80) {
      status = "A renforcer";
      stage = "Consolidation";
    } else if (answers.length >= 3) {
      status = "Pret pour le brevet";
      stage = "Type brevet";
    }
    if (manualStatus === "unseen") {
      status = "Pas encore vu en classe";
      stage = "Decouverte";
    }
    return { total: answers.length, correct, rate, status, stage, manualStatus };
  }

  function getRecommendation() {
    if (!progress.answers.length) {
      return {
        subject: "mixed",
        title: "Melange decouverte",
        status: "Pour commencer",
        mode: "first-run",
        text: "Choisis une matiere pour commencer, ou lance un petit melange pour decouvrir l'application."
      };
    }

    const availableSubjects = content.subjects.filter((subject) =>
      content.curriculum.some((item) => item.subject === subject.id && progress.chapterStatus?.[item.id] !== "unseen")
    );
    const ranked = (availableSubjects.length ? availableSubjects : content.subjects)
      .map((subject) => {
        const stats = getSubjectStats(subject.id);
        const openMistakes = progress.mistakes.filter((mistake) => mistake.subject === subject.id && !mistake.repaired).length;
        const lastAnswerIndex = progress.answers.map((answer) => answer.subject).lastIndexOf(subject.id);
        const notWorkedRecently = lastAnswerIndex === -1 ? progress.answers.length : progress.answers.length - lastAnswerIndex - 1;
        const score = openMistakes * 35 + (100 - stats.rate) + Math.max(0, 6 - stats.total) * 8 + Math.min(20, notWorkedRecently * 2);
        return { ...subject, stats, openMistakes, score };
      })
      .sort((a, b) => {
        return b.score - a.score || content.subjects.findIndex((item) => item.id === a.id) - content.subjects.findIndex((item) => item.id === b.id);
      });
    const subject = ranked[0] || content.subjects[0];
    const status = subject.openMistakes ? "Erreur a reprendre" : subject.stats.total === 0 ? "A essayer" : subject.stats.rate < 50 ? "Prioritaire" : "A renforcer";
    return {
      subject: subject.id,
      title: subject.label,
      status,
      text: subject.stats.total === 0
        ? `${subject.label} n'a pas encore ete travaille. Une courte seance aidera a voir ou tu en es.`
        : subject.openMistakes
          ? `${subject.label} a ${subject.openMistakes} question${subject.openMistakes > 1 ? "s" : ""} a retravailler. On reprend avec le cours avant de recommencer.`
          : `${subject.label} est a ${subject.stats.rate} % de reussite. Quelques questions ciblees aideront.`
    };
  }

  function getOverallSuccess() {
    if (!progress.answers.length) return 0;
    const correct = progress.answers.filter((answer) => answer.correct).length;
    return Math.round((correct / progress.answers.length) * 100);
  }

  function getTodayAnswers() {
    return progress.answers.filter((answer) => answer.date === today());
  }

  function updateStreakIfValid() {
    const date = today();
    if (progress.lastActiveDate === date) return false;

    const previous = progress.lastActiveDate ? new Date(progress.lastActiveDate + "T00:00:00") : null;
    const current = new Date(date + "T00:00:00");
    const diffDays = previous ? Math.round((current - previous) / dayMs) : null;

    if (!previous || diffDays > 1) {
      progress.currentStreak = 1;
    } else if (diffDays === 1) {
      progress.currentStreak += 1;
    }

    progress.bestStreak = Math.max(progress.bestStreak, progress.currentStreak);
    progress.lastActiveDate = date;
    return true;
  }

  function awardBadges() {
    const before = progress.badges.length;
    const subjectsDone = new Set(progress.answers.map((answer) => answer.subject)).size;
    content.badges.forEach((badge) => {
      if (progress.badges.includes(badge.id)) return;
      const [kind, rawValue] = badge.test.split(":");
      const value = Number(rawValue);
      const parts = badge.test.split(":");
      const stageName = parts[1];
      const stageValue = Number(parts[2]);
      const stageCorrect = progress.answers.filter((answer) => answer.correct && answer.stage === stageName).length;
      const unlocked =
        (kind === "sessions" && progress.sessions.length >= value) ||
        (kind === "streak" && progress.currentStreak >= value) ||
        (kind === "points" && progress.points >= value) ||
        (kind === "questions" && progress.answers.length >= value) ||
        (kind === "stage" && stageCorrect >= stageValue) ||
        (kind === "perfect" && progress.perfectRuns >= value) ||
        (kind === "subjects" && subjectsDone >= value) ||
        (kind === "repairs" && progress.repairs.length >= value) ||
        (kind === "bounce" && progress.repairs.some((repair) => repair.afterSessionError));
      if (unlocked) progress.badges.push(badge.id);
    });
    if (progress.badges.length > before) showToast("Nouveau badge debloque.");
  }

  function addPoints(value) {
    progress.points += value;
  }

  function registerGuidedScore(taskId, score) {
    const task = (content.guidedTasks || []).find((item) => item.id === taskId);
    if (!task) return;
    progress.guidedTasks = progress.guidedTasks || [];
    const existing = progress.guidedTasks.find((item) => item.taskId === taskId);
    if (existing) {
      existing.score = score;
      existing.date = today();
    } else {
      progress.guidedTasks.push({
        taskId,
        subject: task.subject,
        chapter: task.chapter,
        score,
        date: today()
      });
      addPoints(score >= 4 ? 20 : score >= 3 ? 12 : 6);
    }
    updateStreakIfValid();
    saveProgress();
    showToast(score >= 4 ? "Sujet guide valide : solide." : score >= 3 ? "Sujet guide termine : correct." : "Sujet guide note pour retravail.");
    render();
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 2400);
  }

  function setView(viewName) {
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    document.getElementById(`${viewName}View`).classList.add("active");
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.view === viewName);
    });
    render();
  }

  function render() {
    renderDashboard();
    renderRoadmap();
    renderSubjectSelects();
    renderCourses();
    renderPracticeQuestion();
    renderGuidedTasks();
    renderProgress();
    renderBadges();
  }

  function renderDashboard() {
    const recommendation = getRecommendation();
    activeSubject = recommendation.subject;
    const todayAnswers = getTodayAnswers();
    const dailyPercent = Math.min(100, Math.round((todayAnswers.length / 10) * 100));

    document.getElementById("pointsValue").textContent = progress.points;
    document.getElementById("streakValue").textContent = `${progress.currentStreak} j`;
    document.getElementById("bestStreakValue").textContent = `${progress.bestStreak} j`;
    document.getElementById("successValue").textContent = `${getOverallSuccess()} %`;
    document.getElementById("recommendationTitle").textContent = recommendation.title;
    document.getElementById("recommendationStatus").textContent = recommendation.status;
    document.getElementById("recommendationText").textContent = recommendation.text;
    document.getElementById("dailyProgressBar").style.width = `${dailyPercent}%`;
    document.getElementById("dailyProgressText").textContent = `${todayAnswers.length} / 10 questions pour valider la journee.`;
    document.getElementById("sidebarGoal").textContent = `${todayAnswers.length} question${todayAnswers.length > 1 ? "s" : ""} repondue${todayAnswers.length > 1 ? "s" : ""}`;
    document.getElementById("dailyMission").textContent = recommendation.mode === "first-run"
      ? "Choisis une matiere pour commencer"
      : `Construire les bases en ${recommendation.title}`;
    document.getElementById("dailyHint").textContent = recommendation.mode === "first-run"
      ? "Tu peux choisir une matiere precise ou lancer un melange decouverte de 5 questions."
      : `${recommendation.text} Objectif : arriver progressivement au niveau brevet avant juin 2027.`;

    const overview = document.getElementById("subjectOverview");
    overview.innerHTML = content.subjects.map((subject) => {
      const stats = getSubjectStats(subject.id);
      const level = stats.total === 0 ? "Pas encore commence" : stats.rate >= 80 ? "Solide" : stats.rate >= 50 ? "En progres" : "A reprendre";
      return `
        <article class="subject-card">
          <div class="subject-meta"><span>${subject.label}</span><strong>${stats.rate} %</strong></div>
          <div class="progress-track"><div style="width:${stats.rate}%; background:${subject.color}"></div></div>
          <span class="status-pill">${level}</span>
        </article>
      `;
    }).join("");
  }

  function renderSubjectSelects() {
    const options = content.subjects.map((subject) => `<option value="${subject.id}">${subject.label}</option>`).join("");
    const sessionSelect = document.getElementById("sessionSubject");
    const previousSessionSubject = sessionSelect.value || activeSubject;
    if (!sessionSelect.dataset.ready) {
      sessionSelect.dataset.ready = "true";
    }
    sessionSelect.innerHTML = `<option value="mixed">${progress.answers.length ? "Melange type brevet" : "Melange decouverte"}</option>${options}`;
    sessionSelect.value = ["mixed", ...content.subjects.map((subject) => subject.id)].includes(previousSessionSubject) ? previousSessionSubject : activeSubject;
    renderSessionNotions();

    const practiceSelect = document.getElementById("practiceSubject");
    if (!practiceSelect.dataset.ready) {
      practiceSelect.innerHTML = options;
      practiceSelect.dataset.ready = "true";
    }
    if (!practiceSelect.value) practiceSelect.value = activeSubject;
    renderPracticeChapters();
  }

  function renderSessionNotions() {
    const subject = document.getElementById("sessionSubject").value || activeSubject;
    const select = document.getElementById("sessionNotion");
    const current = select.value || "auto";
    if (subject === "mixed") {
      select.innerHTML = `<option value="auto">L'application choisit le melange</option>`;
      select.disabled = true;
      return;
    }
    const notions = (content.notions || [])
      .filter((notion) => notion.subject === subject)
      .slice()
      .sort((a, b) => a.chapter.localeCompare(b.chapter) || a.title.localeCompare(b.title));
    select.disabled = false;
    select.innerHTML = `<option value="auto">Laisser l'application choisir</option>${notions.map((notion) => `<option value="${notion.id}">${notion.title}</option>`).join("")}`;
    select.value = notions.some((notion) => notion.id === current) ? current : "auto";
  }

  function renderPracticeChapters() {
    const subject = document.getElementById("practiceSubject").value || activeSubject;
    const chapters = [...new Set(content.exercises.filter((exercise) => exercise.subject === subject).map((exercise) => exercise.chapter))].sort();
    const select = document.getElementById("practiceChapter");
    const current = select.value || "all";
    select.innerHTML = `<option value="all">Tous les chapitres</option>${chapters.map((chapter) => `<option value="${chapter}">${chapter}</option>`).join("")}`;
    select.value = chapters.includes(current) ? current : "all";
  }

  function renderCourses() {
    const filters = document.getElementById("courseFilters");
    filters.innerHTML = [
      `<button class="ghost-action" data-course-filter="all" type="button">Tout</button>`,
      ...content.subjects.map((subject) => `<button class="ghost-action" data-course-filter="${subject.id}" type="button">${subject.label}</button>`)
    ].join("");

    const lessons = content.lessons.filter((lesson) => {
      const subjectOk = selectedCourseSubject === "all" || lesson.subject === selectedCourseSubject;
      const stageOk = selectedCourseStage === "all" || lesson.stage === selectedCourseStage;
      return subjectOk && stageOk;
    });

    document.getElementById("courseList").innerHTML = lessons.map((lesson) => `
      <article class="course-card">
        <span class="tag">${stageLabel(lesson.stage)} - ${subjectLabel(lesson.subject)} - ${lesson.chapter}</span>
        <h3>${lesson.title}</h3>
        ${renderLessonBody(lesson)}
        <button class="secondary-action" data-train-subject="${lesson.subject}" type="button">S'entrainer</button>
      </article>
    `).join("");
  }

  function getLessonTakeaway(lesson) {
    return lesson.takeaway || lesson.summary || "Retenir la methode, puis l'appliquer sur un exemple simple avant de passer aux questions.";
  }

  function getLessonMistake(lesson) {
    return lesson.mistake || "Aller trop vite sans verifier la consigne, les unites, les accords ou les informations donnees.";
  }

  function getCourseDetails(lesson) {
    const chapter = String(lesson.chapter || "").toLowerCase();
    const title = String(lesson.title || "").toLowerCase();
    const subject = lesson.subject;
    const fallback = {
      theory: [
        `Ce chapitre sert a resoudre une famille de questions que l'on retrouve souvent au brevet. Il faut d'abord comprendre ce que la consigne demande, puis choisir une methode stable.`,
        `Le point important est de ne pas apprendre une phrase par coeur : il faut savoir reconnaitre la situation, utiliser les informations donnees et justifier la reponse.`
      ],
      method: [
        "Lire la consigne et entourer le verbe d'action.",
        "Reperer les donnees utiles et ecarter ce qui ne sert pas.",
        "Appliquer la methode du cours en ecrivant les etapes.",
        "Relire la reponse pour verifier qu'elle repond exactement a la question."
      ],
      exampleDetail: "Refais l'exemple en cachant la solution, puis compare chaque etape avec la correction.",
      check: "Peux-tu expliquer la methode a voix haute en moins d'une minute ?"
    };

    const templates = [
      {
        match: subject === "mathematiques" && chapter.includes("statistique"),
        theory: [
          "Les statistiques servent a resumer une serie de valeurs. Au brevet, les questions portent souvent sur moyenne, mediane, et lecture de tableau ou graphique.",
          "La moyenne se calcule en additionnant toutes les valeurs puis en divisant par le nombre de valeurs. Elle donne une idee generale du niveau de la serie.",
          "La mediane est la valeur du milieu quand la serie est rangee. Elle partage la serie en deux groupes de meme effectif ou presque."
        ],
        method: ["Ranger les valeurs si on cherche une mediane.", "Compter le nombre de valeurs.", "Pour la moyenne : additionner puis diviser.", "Pour la mediane : reperer la ou les valeurs centrales.", "Rediger une phrase qui explique le resultat."],
        exampleDetail: "Dans la serie 4 ; 7 ; 9 ; 10 ; 15, il y a 5 valeurs. La valeur du milieu est la 3e : la mediane est 9.",
        check: "As-tu range la serie avant de chercher la mediane ?"
      },
      {
        match: subject === "mathematiques" && chapter.includes("litteral"),
        theory: [
          "Le calcul litteral utilise des lettres pour representer des nombres inconnus ou variables. La lettre se manipule comme un nombre, mais on garde l'ecriture avec x.",
          "Developper, c'est transformer un produit en somme : on distribue le facteur a tous les termes de la parenthese.",
          "Factoriser, c'est transformer une somme en produit : on cherche un facteur commun aux termes."
        ],
        method: ["Identifier l'action demandee : developper, factoriser ou calculer une valeur.", "Pour developper, distribuer le facteur a chaque terme.", "Pour factoriser, chercher le plus grand facteur commun evident.", "Pour evaluer, remplacer la lettre par la valeur donnee.", "Verifier en redeveloppant ou en recalculant."],
        exampleDetail: "6x + 9 se factorise en 3(2x + 3), car 6x = 3 x 2x et 9 = 3 x 3.",
        check: "Si tu redeveloppes ta forme factorisee, retrouves-tu l'expression de depart ?"
      },
      {
        match: subject === "mathematiques" && chapter.includes("equation"),
        theory: [
          "Une equation est une egalite avec une inconnue. Resoudre l'equation, c'est trouver la valeur qui rend l'egalite vraie.",
          "La regle principale est simple : on garde l'egalite vraie en faisant la meme operation des deux cotes.",
          "Une fois la solution trouvee, on peut la verifier en la remplacant dans l'equation de depart."
        ],
        method: ["Regrouper les nombres connus d'un cote si besoin.", "Annuler l'addition ou la soustraction autour de l'inconnue.", "Annuler ensuite la multiplication ou division.", "Ecrire la solution clairement.", "Verifier en remplacant l'inconnue."],
        exampleDetail: "Pour 4x + 3 = 23, on retire 3 : 4x = 20. Puis on divise par 4 : x = 5.",
        check: "La valeur trouvee donne-t-elle bien la meme chose a gauche et a droite ?"
      },
      {
        match: subject === "mathematiques" && chapter.includes("probabil"),
        theory: [
          "Une probabilite mesure la chance qu'un evenement se produise. Elle est comprise entre 0 et 1 : 0 signifie impossible, 1 signifie certain.",
          "Dans une situation simple, on compte toutes les issues possibles, puis seulement les issues favorables. La probabilite est le quotient : issues favorables / issues possibles.",
          "Au brevet, la difficulte vient souvent du vocabulaire : 'au moins', 'exactement', 'superieur a', 'pair', 'multiple de'. Ces mots changent les issues favorables."
        ],
        method: ["Lister toutes les issues possibles.", "Compter les issues qui verifient la condition.", "Ecrire la fraction favorables / possibles.", "Simplifier si c'est possible et conclure avec une phrase."],
        exampleDetail: "Avec 6 boules dont 4 paires, il y a 6 issues possibles et 4 issues favorables. On obtient 4/6, que l'on simplifie en 2/3.",
        check: "Si l'evenement est impossible, ta probabilite doit etre 0 ; s'il est certain, elle doit etre 1."
      },
      {
        match: subject === "mathematiques" && chapter.includes("nombres"),
        theory: [
          "Les calculs du brevet testent surtout l'ordre des operations, les fractions, les puissances et les conversions d'ecriture.",
          "Une expression se traite dans un ordre precis : parentheses, puissances, multiplications/divisions, additions/soustractions.",
          "Pour les puissances de 10, l'exposant indique le nombre de decalages de la virgule, pas une multiplication par l'exposant."
        ],
        method: ["Recopier l'expression proprement.", "Identifier l'operation prioritaire.", "Faire une seule transformation par ligne.", "Verifier le signe, l'ordre de grandeur et l'unite s'il y en a une."],
        exampleDetail: "Pour 3,2 x 10^4, on deplace la virgule de 4 rangs vers la droite : 32000.",
        check: "Ton resultat est-il coherent avec l'ordre de grandeur attendu ?"
      },
      {
        match: subject === "mathematiques" && (chapter.includes("litteral") || chapter.includes("equation")),
        theory: [
          "Le calcul litteral utilise des lettres pour representer des nombres. On peut developper, factoriser ou remplacer la lettre par une valeur.",
          "Developper transforme un produit en somme. Factoriser fait l'inverse : on met en evidence un facteur commun.",
          "Dans une equation, le but est d'isoler l'inconnue en gardant l'egalite vraie."
        ],
        method: ["Identifier ce qu'on demande : developper, factoriser, calculer ou resoudre.", "Effectuer la meme operation des deux cotes si c'est une equation.", "Garder des lignes courtes et lisibles.", "Verifier en remplacant la lettre par la solution trouvee."],
        exampleDetail: "Pour 5x - 7 = 18, on ajoute 7 des deux cotes : 5x = 25, puis on divise par 5 : x = 5.",
        check: "Si tu remplaces x par ta solution, l'egalite de depart est-elle vraie ?"
      },
      {
        match: subject === "mathematiques" && chapter.includes("grandeurs"),
        theory: [
          "En geometrie et grandeurs, la premiere etape est toujours de reconnaitre la situation : triangle rectangle, parallelisme, proportionnalite, aire, volume ou vitesse.",
          "Un theoreme ne s'applique que si ses conditions sont verifiees. Par exemple, Pythagore demande un triangle rectangle ; Thales demande des droites paralleles.",
          "Les unites sont une partie de la reponse : cm, cm2, cm3, km/h ou minutes ne se manipulent pas au hasard."
        ],
        method: ["Faire un schema ou relire celui donne.", "Noter les informations connues et ce que l'on cherche.", "Choisir la formule ou le theoreme avec ses conditions.", "Calculer, arrondir si demande, puis conclure avec l'unite."],
        exampleDetail: "Pour une vitesse, on utilise d = v x t ou v = d / t, mais il faut convertir 30 min en 0,5 h.",
        check: "As-tu cite la condition qui autorise le theoreme ou la formule ?"
      },
      {
        match: subject === "mathematiques" && chapter.includes("geometrie") && (title.includes("pythagore") || title.includes("thales") || title.includes("trigonometrie") || title.includes("volume")),
        theory: [
          "La geometrie du brevet demande de choisir le bon outil : Pythagore pour un triangle rectangle, Thales pour des droites paralleles, trigonometrie pour relier angle et longueurs.",
          "Avant tout calcul, il faut justifier que les conditions sont reunies. Un theoreme utilise sans condition claire risque de faire perdre des points.",
          "Les longueurs doivent etre dans la meme unite, et la conclusion doit repondre a la question posee."
        ],
        method: ["Identifier la figure : triangle rectangle, paralleles, angle aigu.", "Ecrire la condition qui autorise le theoreme.", "Poser l'egalite ou le rapport adapte.", "Calculer proprement en gardant les unites.", "Conclure par une phrase."],
        exampleDetail: "Si un triangle est rectangle et que les deux cotes de l'angle droit mesurent 3 cm et 4 cm, alors l'hypotenuse mesure 5 cm par Pythagore.",
        check: "As-tu choisi le theoreme a cause d'un indice precis de la figure ?"
      },
      {
        match: subject === "mathematiques" && chapter.includes("geometrie"),
        theory: [
          "La geometrie demande de lire une figure avec precision : longueurs, angles, parallelisme, perpendicularite et solides.",
          "La methode depend de ce que l'on cherche : une longueur, un angle, une aire, un volume ou une justification.",
          "Une reponse de geometrie doit toujours citer la propriete ou la formule utilisee."
        ],
        method: ["Lire la figure et noter les donnees utiles.", "Identifier ce que l'on cherche.", "Choisir la propriete ou la formule adaptee.", "Effectuer le calcul avec les bonnes unites.", "Conclure avec une phrase claire."],
        exampleDetail: "Pour un volume de pave droit, on multiplie longueur, largeur et hauteur, puis on donne une unite en cm3 ou m3.",
        check: "As-tu indique si ta reponse est une longueur, une aire ou un volume ?"
      },
      {
        match: subject === "mathematiques" && (chapter.includes("fonction") || chapter.includes("statistique") || chapter.includes("tableur") || chapter.includes("algorithm")),
        theory: [
          "Ces chapitres demandent de lire une information organisee : formule, graphique, tableau, programme ou algorithme.",
          "Une fonction associe une valeur de depart a une valeur d'arrivee. Une statistique resume une serie de valeurs. Un algorithme decrit des actions dans l'ordre.",
          "Au brevet, il faut souvent passer du langage courant au langage mathematique : formule, cellule, variable, moyenne, mediane ou boucle."
        ],
        method: ["Identifier le support : tableau, graphique, formule ou programme.", "Lire les etiquettes, les axes, les cellules ou les variables.", "Effectuer le calcul demande sans changer les donnees.", "Formuler une reponse courte avec le vocabulaire exact."],
        exampleDetail: "Si f(x) = 2x + 1, calculer f(3) signifie remplacer x par 3 : 2 x 3 + 1 = 7.",
        check: "As-tu confondu la valeur de depart avec la valeur obtenue ?"
      },
      {
        match: subject === "francais" && (chapter.includes("lecture") || chapter.includes("interpretation")),
        theory: [
          "Lire un texte au brevet, ce n'est pas seulement comprendre l'histoire. Il faut aussi expliquer comment le texte produit un effet sur le lecteur.",
          "Une bonne reponse s'appuie sur le texte : mot precis, expression, citation courte, champ lexical, temps verbal ou point de vue.",
          "Interpreter signifie relier un indice a une idee : peur, solitude, admiration, critique, tension, humour ou emotion."
        ],
        method: ["Lire la question avant de relire le passage.", "Souligner un indice precis dans le texte.", "Repondre en une phrase claire.", "Ajouter une citation courte et expliquer ce qu'elle montre."],
        exampleDetail: "Si plusieurs mots evoquent l'obscurite et le silence, on peut expliquer que le texte cree une atmosphere inquietante.",
        check: "Ta reponse contient-elle a la fois une idee et une preuve du texte ?"
      },
      {
        match: subject === "francais" && (chapter.includes("grammaire") || chapter.includes("orthographe") || chapter.includes("reecriture")),
        theory: [
          "La langue se travaille avec des reflexes : trouver le verbe, le sujet, les groupes de mots, puis les accords.",
          "La nature dit ce qu'est un mot ; la fonction dit son role dans la phrase. Cette difference tombe tres souvent.",
          "En reecriture, une modification en entraine d'autres : personne, temps, accords du verbe, adjectifs et participes passes."
        ],
        method: ["Reperer le verbe conjugue.", "Trouver son sujet et les complements importants.", "Faire la transformation demandee.", "Relire tous les accords touches par la transformation."],
        exampleDetail: "Si 'je suis parti' devient 'nous', il faut modifier le pronom, l'auxiliaire et l'accord : nous sommes partis.",
        check: "As-tu verifie les verbes et les adjectifs apres la transformation ?"
      },
      {
        match: subject === "francais" && chapter.includes("redaction"),
        theory: [
          "La redaction demande une reponse organisee, pas seulement une accumulation d'idees. Le lecteur doit suivre une progression.",
          "Pour un sujet de reflexion, chaque paragraphe defend une idee. Pour un sujet d'imagination, le texte doit respecter la situation, le point de vue et le temps du recit.",
          "La qualite de la langue compte : phrases ponctuees, vocabulaire varie, accords surveilles et connecteurs logiques."
        ],
        method: ["Analyser le sujet et reperer les contraintes.", "Faire un plan rapide en deux ou trois parties.", "Ecrire des paragraphes courts et relies.", "Garder quelques minutes pour relire les accords et la ponctuation."],
        exampleDetail: "Un paragraphe argumentatif solide suit souvent : idee, explication, exemple.",
        check: "Peut-on comprendre ton plan en lisant seulement le debut de chaque paragraphe ?"
      },
      {
        match: subject === "histoire" && (chapter.includes("document") || chapter.includes("developpement") || chapter.includes("reperes")),
        theory: [
          "En histoire-geographie, il faut combiner connaissances et documents. Le document donne des indices, mais il ne remplace pas le cours.",
          "Presenter un document aide a comprendre sa valeur : nature, auteur, date, sujet et contexte.",
          "Un developpement construit doit etre organise : quelques lignes d'introduction, deux ou trois idees classees, puis une conclusion courte."
        ],
        method: ["Presenter ou situer le sujet.", "Prelever les informations utiles.", "Ajouter une connaissance precise du cours.", "Rediger une reponse organisee avec des connecteurs."],
        exampleDetail: "Pour expliquer la Resistance, on peut citer les actions clandestines, le CNR et le role dans la Liberation.",
        check: "Ta reponse contient-elle au moins une connaissance personnelle en plus du document ?"
      },
      {
        match: subject === "histoire" && (chapter.includes("emc") || chapter.includes("citoy") || chapter.includes("valeurs") || chapter.includes("defense")),
        theory: [
          "En EMC, relie toujours les idees du cours a la vie democratique : droits, devoirs, loi, citoyennete, laicite, institutions.",
          "Une bonne reponse ne se contente pas de citer une valeur : elle explique son role concret dans la vie collective.",
          "Les exemples sont importants : vote, liberte d'expression, neutralite de l'Etat, respect de la loi, engagement citoyen."
        ],
        method: ["Definir l'idee avec des mots simples.", "Expliquer a quoi elle sert dans une democratie.", "Donner un exemple concret.", "Conclure en reliant droit individuel et interet commun."],
        exampleDetail: "La laicite garantit la liberte de conscience et la neutralite de l'Etat : elle protege le droit de croire ou de ne pas croire.",
        check: "As-tu donne un exemple concret, pas seulement une definition ?"
      },
      {
        match: subject === "histoire",
        theory: [
          "Cette partie demande de situer les faits dans le temps ou dans l'espace, puis d'expliquer leurs causes et leurs consequences.",
          "Les mots de vocabulaire sont essentiels : regime totalitaire, mondialisation, metropole, amenagement, guerre froide, resistance.",
          "Au brevet, on attend une reponse precise, datee si possible, et organisee."
        ],
        method: ["Situer le sujet : date, lieu, acteur ou echelle.", "Definir les mots importants.", "Expliquer avec deux idees classees.", "Conclure par une consequence ou un bilan."],
        exampleDetail: "Pour la guerre froide, il faut citer les deux blocs, les deux superpuissances et l'opposition ideologique.",
        check: "As-tu utilise au moins un repere ou un vocabulaire precis du chapitre ?"
      },
      {
        match: subject === "sciences" && chapter.includes("donnees"),
        theory: [
          "En sciences, beaucoup de questions commencent par la lecture de donnees : tableau, graphique, schema ou protocole.",
          "Il faut distinguer ce que l'on observe, ce que l'on mesure et ce que l'on conclut.",
          "Les unites, les axes et les conditions de l'experience sont indispensables pour ne pas tirer une conclusion trop rapide."
        ],
        method: ["Lire le titre, les axes et les unites.", "Reperer la grandeur qui varie.", "Comparer les valeurs importantes.", "Formuler une conclusion limitee aux donnees."],
        exampleDetail: "Si seule la surface des feuilles change et que la masse produite diminue, on relie ce facteur au resultat observe.",
        check: "Ta conclusion s'appuie-t-elle sur une donnee precise ?"
      },
      {
        match: subject === "sciences" && chapter.includes("svt"),
        theory: [
          "En SVT, on cherche a expliquer le vivant : organisation du corps, micro-organismes, heredite, environnement ou production de matiere.",
          "Une experience de SVT doit etre lue avec methode : on repere le facteur teste, ce qui est mesure et la conclusion possible.",
          "Il faut eviter les conclusions trop larges : une experience prouve seulement ce que ses donnees permettent d'affirmer."
        ],
        method: ["Identifier le phenomene etudie.", "Reperer le facteur teste : le seul element qui change.", "Lire le resultat mesure.", "Relier le facteur teste au resultat.", "Conclure avec du vocabulaire scientifique precis."],
        exampleDetail: "Si seule la quantite de lumiere change et que la croissance varie, on peut etudier l'effet de la lumiere sur la croissance.",
        check: "As-tu bien distingue le facteur teste du resultat observe ?"
      },
      {
        match: subject === "sciences" && chapter.includes("physique"),
        theory: [
          "En physique-chimie, les questions du brevet demandent souvent de lire une mesure, utiliser une formule ou interpreter un modele simple.",
          "Les unites sont essentielles : une vitesse en m/s, une masse volumique en g/cm3, un pH sans unite.",
          "Pour l'energie et les circuits, il faut decrire les transformations ou les conditions de fonctionnement avec un vocabulaire precis."
        ],
        method: ["Reperer les grandeurs donnees et leurs unites.", "Choisir la relation utile si un calcul est demande.", "Effectuer le calcul en gardant les unites.", "Pour une interpretation, nommer le phenomene observe.", "Conclure sans inventer d'information absente du document."],
        exampleDetail: "Pour une masse volumique, on calcule masse / volume. Si un objet a une masse de 50 g et un volume de 25 cm3, sa masse volumique est 2 g/cm3.",
        check: "As-tu ecrit l'unite correcte dans ta reponse ?"
      },
      {
        match: subject === "sciences" && chapter.includes("technologie"),
        theory: [
          "En technologie, on analyse un objet ou un systeme : son besoin, sa fonction d'usage, ses composants, sa chaine d'information ou son algorithme.",
          "Un capteur acquiert une information ; un actionneur realise une action physique. Cette difference est centrale dans les systemes automatiques.",
          "Un algorithme decrit les actions dans l'ordre, avec parfois des conditions et des boucles."
        ],
        method: ["Identifier l'objet ou le systeme etudie.", "Dire a quel besoin il repond.", "Distinguer capteur, information, traitement et actionneur.", "Lire ou ecrire l'algorithme dans l'ordre.", "Verifier que chaque element a un role precis."],
        exampleDetail: "Dans une porte automatique, le detecteur de presence est un capteur et le moteur de la porte est un actionneur.",
        check: "As-tu distingue ce qui detecte de ce qui agit ?"
      },
      {
        match: subject === "sciences" && (chapter.includes("svt") || chapter.includes("physique") || chapter.includes("technologie")),
        theory: [
          "Les sciences demandent d'expliquer un phenomene avec des donnees, un vocabulaire precis et parfois une relation de calcul.",
          "En SVT, on relie organisation et fonctionnement du vivant. En physique-chimie, on mesure et on modele. En technologie, on analyse un objet ou un systeme.",
          "La reponse doit separer observation, raisonnement et conclusion."
        ],
        method: ["Identifier le domaine : SVT, physique-chimie ou technologie.", "Relever les donnees utiles.", "Utiliser le vocabulaire ou la formule adaptee.", "Conclure en repondant exactement a la question."],
        exampleDetail: "Pour une chaine energetique, on indique l'energie recue, la conversion et les formes d'energie transferees.",
        check: "As-tu precise l'unite, le vocabulaire scientifique ou le role de chaque element ?"
      }
    ];

    return templates.find((template) => template.match) || fallback;
  }

  function renderLessonBody(lesson) {
    const details = getCourseDetails(lesson);
    const prerequisite = lesson.prerequisite || "Tu peux commencer directement : lis la methode, puis observe l'exemple.";
    return `
      <p class="course-intro">${lesson.summary}</p>
      <section class="course-section">
        <h4>Ce qu'il faut comprendre</h4>
        ${details.theory.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </section>
      <section class="course-section">
        <h4>Methode pas a pas</h4>
        <ol class="course-method">
          ${details.method.map((step) => `<li>${step}</li>`).join("")}
        </ol>
      </section>
      <div class="lesson-callout">
        <strong>Exemple guide</strong>
        <p>${lesson.example || details.exampleDetail}</p>
        <p>${details.exampleDetail}</p>
      </div>
      <div class="course-grid">
        <div class="course-note">
          <strong>Avant de commencer</strong>
          <p>${prerequisite}</p>
        </div>
        <div class="course-note">
          <strong>A retenir</strong>
          <p>${getLessonTakeaway(lesson)}</p>
        </div>
        <div class="course-note warning">
          <strong>Piege frequent</strong>
          <p>${getLessonMistake(lesson)}</p>
        </div>
        <div class="course-note">
          <strong>Je verifie</strong>
          <p>${details.check}</p>
        </div>
      </div>
    `;
  }

  function renderRoadmap() {
    const filters = document.getElementById("roadmapFilters");
    filters.innerHTML = [
      `<button class="ghost-action" data-roadmap-filter="all" type="button">Tout</button>`,
      ...content.subjects.map((subject) => `<button class="ghost-action" data-roadmap-filter="${subject.id}" type="button">${subject.label}</button>`)
    ].join("");

    const items = (selectedRoadmapSubject === "all"
      ? content.curriculum
      : content.curriculum.filter((item) => item.subject === selectedRoadmapSubject))
      .slice()
      .sort((a, b) => a.priority - b.priority || a.subject.localeCompare(b.subject));

    document.getElementById("roadmapList").innerHTML = items.map((item) => {
      const stats = getCurriculumStats(item);
      const isUnseen = stats.manualStatus === "unseen";
      return `
        <article class="roadmap-item ${isUnseen ? "is-unseen" : ""}">
          <div>
            <span class="tag">${subjectLabel(item.subject)}</span>
            <h3>${item.chapter}</h3>
          </div>
          <div>
            <p><strong>${item.title}</strong></p>
            <p class="muted">${stats.total} question${stats.total > 1 ? "s" : ""} traitee${stats.total > 1 ? "s" : ""} - ${stats.rate} % de reussite</p>
            <div class="roadmap-stages">
              <span class="step ${stats.stage === "Decouverte" ? "active" : ""}">J'apprends</span>
              <span class="step ${stats.stage === "Consolidation" ? "active" : ""}">Je m'entraine</span>
              <span class="step ${stats.stage === "Type brevet" ? "active" : ""}">Comme au brevet</span>
            </div>
          </div>
          <div class="roadmap-actions">
            <span class="status-pill">${stats.status}</span>
            <button class="${isUnseen ? "secondary-action" : "ghost-action"}" data-chapter-status="${item.id}" data-status-value="${isUnseen ? "active" : "unseen"}" type="button">${isUnseen ? "Je commence" : "Pas encore vu"}</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function pickQuestion(subjectId, options = {}) {
    const wantedStage = options.stage || document.getElementById("practiceStage")?.value || "auto";
    const wantedChapter = options.chapter || document.getElementById("practiceChapter")?.value || "all";
    let pool = content.exercises.filter((exercise) => exercise.subject === subjectId);
    if (wantedStage !== "auto") pool = pool.filter((exercise) => exercise.stage === wantedStage);
    if (wantedChapter !== "all") pool = pool.filter((exercise) => exercise.chapter === wantedChapter);
    if (wantedChapter !== "all") {
      pool = [...pool, ...generateQuestionsForChapter(subjectId, wantedChapter, 6, pool.length)];
    }
    if (!pool.length) pool = content.exercises.filter((exercise) => exercise.subject === subjectId);
    const answeredCounts = new Map();
    progress.answers.forEach((answer) => {
      answeredCounts.set(answer.exerciseId, (answeredCounts.get(answer.exerciseId) || 0) + 1);
    });
    return [...pool].sort((a, b) => (answeredCounts.get(a.id) || 0) - (answeredCounts.get(b.id) || 0))[0] || pool[0];
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function chapterMatches(focusChapter, exerciseChapter) {
    const focus = normalizeText(focusChapter);
    const exercise = normalizeText(exerciseChapter);
    if (!focus || !exercise) return false;
    if (focus === exercise || focus.includes(exercise) || exercise.includes(focus)) return true;
    const focusWords = focus.split(" ").filter((word) => word.length >= 5);
    const exerciseWords = exercise.split(" ").filter((word) => word.length >= 5);
    return focusWords.some((focusWord) =>
      exerciseWords.some((exerciseWord) => focusWord.includes(exerciseWord) || exerciseWord.includes(focusWord))
    );
  }

  function getChapterAnswerStats(subjectId, chapter) {
    const answers = progress.answers.filter((answer) => answer.subject === subjectId && chapterMatches(chapter, answer.chapter));
    const correct = answers.filter((answer) => answer.correct).length;
    const rate = answers.length ? Math.round((correct / answers.length) * 100) : 0;
    return { total: answers.length, correct, rate };
  }

  function textSimilarityScore(a, b) {
    const aWords = new Set(normalizeText(a).split(" ").filter((word) => word.length >= 4));
    const bWords = new Set(normalizeText(b).split(" ").filter((word) => word.length >= 4));
    if (!aWords.size || !bWords.size) return 0;
    let common = 0;
    aWords.forEach((word) => {
      if (bWords.has(word)) common += 1;
    });
    return common / Math.min(aWords.size, bWords.size);
  }

  function getTargetStage(subjectId) {
    const hasUnseen = content.curriculum.some((item) => item.subject === subjectId && progress.chapterStatus?.[item.id] === "unseen");
    if (hasUnseen) return "Decouverte";
    const stats = getSubjectStats(subjectId);
    if (stats.total < 4 || stats.rate < 50) return "Decouverte";
    if (stats.total < 10 || stats.rate < 80) return "Consolidation";
    return "Type brevet";
  }

  function pickSessionLesson(subjectId, targetStage) {
    const lessons = content.lessons.filter((lesson) => lesson.subject === subjectId);
    const stageOrder = ["Decouverte", "Consolidation", "Type brevet"];
    const targetIndex = stageOrder.indexOf(targetStage);
    return lessons
      .filter((lesson) => content.exercises.some((exercise) => exercise.subject === subjectId && chapterMatches(lesson.chapter, exercise.chapter)))
      .sort((a, b) => {
        const aStats = getChapterAnswerStats(subjectId, a.chapter);
        const bStats = getChapterAnswerStats(subjectId, b.chapter);
        const aStageGap = Math.abs(stageOrder.indexOf(a.stage || "Decouverte") - targetIndex);
        const bStageGap = Math.abs(stageOrder.indexOf(b.stage || "Decouverte") - targetIndex);
        const aScore = aStats.total === 0 ? -20 : aStats.rate + aStats.total * 2;
        const bScore = bStats.total === 0 ? -20 : bStats.rate + bStats.total * 2;
        return aStageGap - bStageGap || aScore - bScore || a.chapter.localeCompare(b.chapter);
      })[0]
      || lessons.find((lesson) => lesson.stage === targetStage)
      || lessons[0];
  }

  function pickSessionLessonForNotion(notion, targetStage) {
    const stageOrder = ["Decouverte", "Consolidation", "Type brevet"];
    const targetIndex = stageOrder.indexOf(targetStage);
    const lessons = content.lessons
      .filter((lesson) => lesson.subject === notion.subject)
      .filter((lesson) => lesson.notionId === notion.id || chapterMatches(notion.chapter, lesson.chapter));
    return lessons
      .sort((a, b) => {
        const aStageGap = Math.abs(stageOrder.indexOf(a.stage || "Decouverte") - targetIndex);
        const bStageGap = Math.abs(stageOrder.indexOf(b.stage || "Decouverte") - targetIndex);
        return aStageGap - bStageGap || a.title.localeCompare(b.title);
      })[0]
      || pickSessionLesson(notion.subject, targetStage);
  }

  function pickSessionQuestions(subjectId, count, focusChapter, lesson = null, notion = null) {
    const targetStage = getTargetStage(subjectId);
    const stageOrder = ["Decouverte", "Consolidation", "Type brevet"];
    const targetIndex = stageOrder.indexOf(targetStage);
    const answeredCounts = new Map();
    progress.answers.forEach((answer) => {
      answeredCounts.set(answer.exerciseId, (answeredCounts.get(answer.exerciseId) || 0) + 1);
    });

    let pool = content.exercises.filter((exercise) => exercise.subject === subjectId);

    if (notion) {
      const exactPool = pool.filter((exercise) => exercise.notionId === notion.id);
      pool = exactPool.length ? exactPool : pool.filter((exercise) => chapterMatches(notion.chapter, exercise.chapter));
    } else {
      pool = pool.filter((exercise) => !focusChapter || chapterMatches(focusChapter, exercise.chapter));
    }

    if (!pool.length) {
      pool = content.exercises.filter((exercise) => exercise.subject === subjectId);
    }

    if (notion) {
      const generatedCount = Math.max(4, count + 3 - pool.length);
      pool = [...pool, ...generateQuestionsForNotion(notion, generatedCount, pool.length)];
    } else if (focusChapter) {
      const generatedCount = Math.max(4, count + 3 - pool.length);
      pool = [...pool, ...generateQuestionsForChapter(subjectId, focusChapter, generatedCount, pool.length)];
    }

    const sortedPool = pool
      .sort((a, b) => {
        const aStageGap = Math.abs(stageOrder.indexOf(a.stage || "Decouverte") - targetIndex);
        const bStageGap = Math.abs(stageOrder.indexOf(b.stage || "Decouverte") - targetIndex);
        const aExampleGap = lesson ? textSimilarityScore(lesson.example, `${a.question || a.prompt} ${a.explanation}`) : 0;
        const bExampleGap = lesson ? textSimilarityScore(lesson.example, `${b.question || b.prompt} ${b.explanation}`) : 0;
        const aTooClose = aExampleGap > 0.45 ? 1 : 0;
        const bTooClose = bExampleGap > 0.45 ? 1 : 0;
        return aTooClose - bTooClose || aStageGap - bStageGap || (answeredCounts.get(a.id) || 0) - (answeredCounts.get(b.id) || 0);
      });

    const selected = sortedPool.slice(0, Math.min(count, sortedPool.length));
    const generatedCandidate = sortedPool.find((exercise) => exercise.mode === "generated" && !selected.some((item) => item.id === exercise.id));
    if (generatedCandidate && selected.length >= 3 && !selected.some((exercise) => exercise.mode === "generated")) {
      selected[selected.length - 1] = generatedCandidate;
    }
    return selected;
  }

  function pickMixedSessionQuestions(count) {
    const stageOrder = ["Decouverte", "Consolidation", "Type brevet"];
    const answeredCounts = new Map();
    progress.answers.forEach((answer) => {
      answeredCounts.set(answer.exerciseId, (answeredCounts.get(answer.exerciseId) || 0) + 1);
    });

    const picked = [];
    const used = new Set();
    while (picked.length < count && picked.length < content.exercises.length) {
      let addedThisRound = false;
      content.subjects.forEach((subject) => {
        if (picked.length >= count) return;
        const targetStage = getTargetStage(subject.id);
        const targetIndex = stageOrder.indexOf(targetStage);
        const question = content.exercises
          .filter((exercise) => exercise.subject === subject.id && !used.has(exercise.id))
          .sort((a, b) => {
            const aStageGap = Math.abs(stageOrder.indexOf(a.stage || "Decouverte") - targetIndex);
            const bStageGap = Math.abs(stageOrder.indexOf(b.stage || "Decouverte") - targetIndex);
            return aStageGap - bStageGap || (answeredCounts.get(a.id) || 0) - (answeredCounts.get(b.id) || 0);
          })[0];
        if (question) {
          picked.push(question);
          used.add(question.id);
          addedThisRound = true;
        }
      });
      if (!addedThisRound) break;
    }
    return picked;
  }

  function renderPracticeQuestion() {
    const container = document.getElementById("practiceQuestion");
    if (!currentPracticeQuestion) {
      currentPracticeQuestion = pickQuestion(document.getElementById("practiceSubject").value || activeSubject);
    }
    container.innerHTML = renderQuestion(currentPracticeQuestion, "practice");
  }

  function getGuidedCompletion(taskId) {
    return progress.guidedTasks.find((item) => item.taskId === taskId);
  }

  function renderGuidedTasks() {
    const filters = document.getElementById("guidedFilters");
    if (!filters) return;
    const tasks = content.guidedTasks || [];
    filters.innerHTML = [
      `<button class="ghost-action" data-guided-filter="all" type="button">Tout</button>`,
      ...content.subjects.map((subject) => `<button class="ghost-action" data-guided-filter="${subject.id}" type="button">${subject.label}</button>`)
    ].join("");

    const visibleTasks = (selectedGuidedSubject === "all"
      ? tasks
      : tasks.filter((task) => task.subject === selectedGuidedSubject));

    document.getElementById("guidedTaskList").innerHTML = visibleTasks.length
      ? visibleTasks.map((task) => {
        const completion = getGuidedCompletion(task.id);
        return `
          <article class="guided-card">
            <div class="panel-header">
              <div>
                <span class="tag">${subjectLabel(task.subject)} - ${task.chapter} - ${stageLabel(task.stage)}</span>
                <h3>${task.title}</h3>
              </div>
              <span class="status-pill">${task.duration} min</span>
            </div>
            <p class="course-intro">${task.context}</p>
            <section class="course-section">
              <h4>Consigne</h4>
              <p>${task.task}</p>
            </section>
            <section class="course-section">
              <h4>Methode</h4>
              <ol class="course-method">
                ${task.method.map((step) => `<li>${step}</li>`).join("")}
              </ol>
            </section>
            <div class="guided-columns">
              <section class="course-note">
                <strong>Ce qu'on attend dans ta reponse</strong>
                <ul>${task.expected.map((item) => `<li>${item}</li>`).join("")}</ul>
              </section>
              <section class="course-note">
                <strong>Je verifie mon travail</strong>
                <ul>${task.selfCheck.map((item) => `<li>${item}</li>`).join("")}</ul>
              </section>
            </div>
            <div class="guided-actions">
              <span class="muted">${completion ? `Derniere verification : ${completion.score}/4 le ${completion.date}` : "A faire sur cahier, puis a verifier."}</span>
              <div>
                <button class="ghost-action" data-guided-score="${task.id}" data-score="2" type="button">A retravailler</button>
                <button class="secondary-action" data-guided-score="${task.id}" data-score="3" type="button">Correct</button>
                <button class="primary-action" data-guided-score="${task.id}" data-score="4" type="button">Solide</button>
              </div>
            </div>
          </article>
        `;
      }).join("")
      : `<p class="muted">Aucun sujet guide pour ce filtre.</p>`;
  }

  function renderQuestion(question, context) {
    if (question.type === "order") return renderOrderQuestion(question, context);
    const choices = getShuffledChoices(question, context);
    return `
      <span class="tag">${subjectLabel(question.subject)} - ${question.chapter}</span>
      <span class="tag">${stageLabel(question.stage)}</span>
      ${question.type === "true_false" ? `<span class="tag">Vrai / Faux</span>` : ""}
      <h3 class="question-title">${question.question || question.prompt}</h3>
      <div class="choice-list">
        ${choices.map((choice) => `<button class="choice-button" data-answer-context="${context}" data-answer="${escapeHtml(choice)}" type="button">${escapeHtml(choice)}</button>`).join("")}
      </div>
      <div class="feedback" hidden></div>
    `;
  }

  function renderOrderQuestion(question, context) {
    const choices = getShuffledChoices(question, context);
    return `
      <span class="tag">${subjectLabel(question.subject)} - ${question.chapter}</span>
      <span class="tag">${stageLabel(question.stage)}</span>
      <span class="tag">Remise en ordre</span>
      <h3 class="question-title">${question.question || question.prompt}</h3>
      <div class="order-builder" data-order-context="${context}">
        <div class="order-choice-list">
          ${choices.map((choice) => `<button class="choice-button order-choice" data-order-choice="${escapeHtml(choice)}" type="button">${escapeHtml(choice)}</button>`).join("")}
        </div>
        <div class="order-answer" aria-live="polite">
          <span class="muted">Clique les elements dans le bon ordre.</span>
        </div>
        <button class="primary-action order-submit" data-order-submit data-answer-context="${context}" type="button" disabled>Valider l'ordre</button>
      </div>
      <div class="feedback" hidden></div>
    `;
  }

  function seededHash(value) {
    return String(value).split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
  }

  function getShuffledChoices(question, context) {
    return [...question.choices]
      .map((choice, index) => ({
        choice,
        order: seededHash(`${question.id}:${context}:${choice}:${index}`)
      }))
      .sort((a, b) => a.order - b.order)
      .map((item) => item.choice);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function answerQuestion(button) {
    const context = button.dataset.answerContext;
    const question = context === "session" ? currentSession.questions[currentSession.index] : currentPracticeQuestion;
    const selected = button.dataset.answer;
    const correct = String(selected) === String(question.answer);
    const panel = button.closest(".question-panel, .session-stage");

    panel.querySelectorAll(".choice-button, .order-submit").forEach((choiceButton) => {
      choiceButton.disabled = true;
      if (String(choiceButton.dataset.answer) === String(question.answer)) choiceButton.classList.add("correct");
      if (choiceButton === button && !correct) choiceButton.classList.add("wrong");
    });
    if (question.type === "order") {
      button.classList.add(correct ? "correct" : "wrong");
    }

    const feedback = panel.querySelector(".feedback");
    feedback.hidden = false;
    feedback.innerHTML = `<strong>${correct ? "Bonne reponse." : "Pas grave, on reprend ensemble."}</strong><br>${question.explanation}`;

    progress.answers.push({
      exerciseId: question.id,
      generatorId: question.generatorId || null,
      seed: question.seed || null,
      notionId: question.notionId || null,
      subject: question.subject,
      chapter: question.chapter,
      stage: question.stage || "Decouverte",
      correct,
      date: today(),
      retryOf: question.retryOf || null,
      reviewedBeforeRetry: Boolean(question.reviewedBeforeRetry)
    });

    if (!correct) {
      registerMistake(question);
    }

    if (correct) {
      addPoints(5);
      if (question.retryOf && question.reviewedBeforeRetry) {
        registerRepair(question);
        addPoints(10);
      }
    }
    awardBadges();
    saveProgress();

    if (context === "session") {
      currentSession.correct += correct ? 1 : 0;
      currentSession.answered += 1;
      const next = document.createElement("button");
      next.className = "primary-action";
      next.type = "button";
      next.textContent = currentSession.index + 1 >= currentSession.questions.length ? "Voir le bilan" : "Question suivante";
      next.addEventListener("click", nextSessionStep);
      feedback.appendChild(document.createElement("br"));
      feedback.appendChild(next);
    } else {
      const next = document.createElement("button");
      next.className = "secondary-action";
      next.type = "button";
      next.textContent = "Nouvelle question";
      next.addEventListener("click", () => {
        currentPracticeQuestion = pickQuestion(question.subject);
        render();
      });
      feedback.appendChild(document.createElement("br"));
      feedback.appendChild(next);
    }

    renderDashboard();
  }

  function startSession() {
    const subject = document.getElementById("sessionSubject").value || activeSubject;
    const notionId = document.getElementById("sessionNotion").value || "auto";
    const questionTarget = Number(document.getElementById("sessionDuration").value) || 5;
    const isMixed = subject === "mixed";
    const targetStage = isMixed ? "Type brevet" : getTargetStage(subject);
    const selectedNotion = !isMixed && notionId !== "auto"
      ? (content.notions || []).find((notion) => notion.id === notionId && notion.subject === subject)
      : null;
    const lesson = isMixed ? {
      subject: "mixed",
      chapter: "Methodologie",
      title: "Methode pour un melange type brevet",
      summary: "Dans un melange de questions, le but est de changer vite de reflexe : lire la consigne, identifier la matiere, puis choisir la methode adaptee.",
      takeaway: "Avant de repondre, repere le verbe de consigne : calculer, justifier, relever, expliquer, comparer.",
      example: "En maths on pose le calcul ; en francais on cite le texte ; en histoire-geo on utilise document + connaissance ; en sciences on relie donnees et conclusion."
    } : selectedNotion ? pickSessionLessonForNotion(selectedNotion, targetStage) : pickSessionLesson(subject, targetStage);
    const questions = isMixed ? pickMixedSessionQuestions(questionTarget) : pickSessionQuestions(subject, questionTarget, selectedNotion?.chapter || lesson.chapter, lesson, selectedNotion);
    currentSession = {
      subject,
      notionId: selectedNotion?.id || null,
      questionTarget,
      lesson,
      focusChapter: selectedNotion?.chapter || lesson.chapter,
      questions,
      index: -1,
      correct: 0,
      answered: 0,
      startedAt: Date.now()
    };
    saveProgress();
    renderSessionIntro();
  }

  function registerMistake(question) {
    const existing = progress.mistakes.find((mistake) => mistake.exerciseId === question.id && !mistake.repaired);
    if (existing) {
      existing.count += 1;
      existing.lastDate = today();
      return;
    }
    progress.mistakes.push({
      id: `mistake_${Date.now()}_${question.id}`,
      exerciseId: question.id,
      generatorId: question.generatorId || null,
      seed: question.seed || null,
      notionId: question.notionId || null,
      subject: question.subject,
      chapter: question.chapter,
      count: 1,
      firstDate: today(),
      lastDate: today(),
      reviewed: false,
      repaired: false,
      sessionHadError: Boolean(currentSession)
    });
  }

  function registerRepair(question) {
    const mistake = progress.mistakes.find((item) => item.id === question.retryOf);
    if (!mistake || mistake.repaired) return;
    mistake.repaired = true;
    mistake.repairedDate = today();
    progress.repairs.push({
      mistakeId: mistake.id,
      exerciseId: question.id,
      generatorId: question.generatorId || null,
      seed: question.seed || null,
      notionId: question.notionId || null,
      subject: question.subject,
      chapter: question.chapter,
      date: today(),
      afterSessionError: Boolean(mistake.sessionHadError)
    });
    showToast("Erreur reparee apres revision : +10 points.");
    awardBadges();
  }

  function startMistakeReview() {
    const mistake = progress.mistakes.find((item) => !item.repaired);
    if (!mistake) {
      showToast("Aucune erreur a revoir pour le moment.");
      return;
    }
    const question = findExerciseByReference(mistake);
    if (!question) {
      showToast("Impossible de retrouver cette question pour le moment.");
      return;
    }
    const lesson = content.lessons.find((item) => item.subject === mistake.subject && item.chapter === mistake.chapter)
      || content.lessons.find((item) => item.subject === mistake.subject);
    mistake.reviewed = true;
    saveProgress();
    setView("practice");
    const container = document.getElementById("practiceQuestion");
    container.innerHTML = `
      <span class="tag">Revision avant reprise</span>
      <h3>${lesson.title}</h3>
      ${renderLessonBody(lesson)}
      <button class="primary-action" id="retryMistakeNow" type="button">Refaire la question</button>
    `;
    document.getElementById("retryMistakeNow").addEventListener("click", () => {
      currentPracticeQuestion = { ...question, retryOf: mistake.id, reviewedBeforeRetry: true };
      renderPracticeQuestion();
    });
  }

  function renderSessionIntro() {
    const stage = document.getElementById("sessionStage");
    const lesson = currentSession.lesson;
    stage.innerHTML = `
      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Cours avant exercice</p>
            <h3>${lesson.title}</h3>
          </div>
          <span class="status-pill">${subjectLabel(lesson.subject)}</span>
        </div>
        <span class="tag">Objectif : ${currentSession.questions.length} exercices</span>
        <span class="tag">Chapitre travaille : ${lesson.chapter}</span>
        ${renderLessonBody(lesson)}
        <button class="primary-action" id="startSessionQuestions" type="button">Passer aux questions</button>
      </section>
    `;
    document.getElementById("startSessionQuestions").addEventListener("click", nextSessionStep);
  }

  function nextSessionStep() {
    currentSession.index += 1;
    if (currentSession.index >= currentSession.questions.length) {
      finishSession();
      return;
    }
    const question = currentSession.questions[currentSession.index];
    document.getElementById("sessionStage").innerHTML = `
      <section class="panel question-panel">
        <div class="panel-header">
          <span class="status-pill">Question ${currentSession.index + 1} / ${currentSession.questions.length}</span>
        </div>
        ${renderQuestion(question, "session")}
      </section>
    `;
  }

  function finishSession() {
    const elapsedMinutes = Math.max(1, Math.round((Date.now() - currentSession.startedAt) / 60000));
    const allCorrect = currentSession.correct === currentSession.questions.length;
    let points = currentSession.correct * 5;
    if (allCorrect) {
      points += 10;
      progress.perfectRuns += 1;
    }
    addPoints(points);
    updateStreakIfValid();
    progress.sessions.push({
      id: `session_${Date.now()}`,
      date: today(),
      durationMinutes: elapsedMinutes,
      plannedQuestions: currentSession.questionTarget,
      subject: currentSession.subject,
      questionsAnswered: currentSession.answered,
      correctAnswers: currentSession.correct,
      pointsEarned: points
    });
    awardBadges();
    saveProgress();
    document.getElementById("sessionStage").innerHTML = `
      <section class="panel">
        <p class="eyebrow">Bilan</p>
        <h3>${currentSession.correct} / ${currentSession.questions.length} bonnes reponses</h3>
        <p>${allCorrect ? "Seance sans erreur. Tres solide." : "Bon travail. Les questions ratees sont gardees pour les retravailler."}</p>
        <p><strong>Temps reel :</strong> ${elapsedMinutes} min</p>
        <p><strong>Points gagnes :</strong> ${points}</p>
        <button class="secondary-action" data-view-target="progress" type="button">Voir la progression</button>
      </section>
    `;
    currentSession = null;
    render();
  }

  function renderProgress() {
    document.getElementById("progressBySubject").innerHTML = content.subjects.map((subject) => {
      const stats = getSubjectStats(subject.id);
      const label = stats.total === 0 ? "A commencer" : stats.rate >= 80 ? "Solide" : stats.rate >= 50 ? "En progres" : "A reprendre";
      return `
        <div class="progress-row">
          <strong>${subject.label}</strong>
          <div class="progress-track"><div style="width:${stats.rate}%; background:${subject.color}"></div></div>
          <span>${label}</span>
        </div>
      `;
    }).join("");

      const history = progress.sessions.slice(-8).reverse();
    document.getElementById("sessionHistory").innerHTML = history.length
      ? `<div class="history-list">${history.map((session) => `
          <div class="history-item">
            <span>${session.date} - ${subjectLabel(session.subject)}</span>
            <strong>${session.correctAnswers}/${session.questionsAnswered}</strong>
          </div>
        `).join("")}</div>`
      : `<p class="muted">Aucune seance terminee pour le moment.</p>`;

    const mistakes = progress.mistakes.filter((mistake) => !mistake.repaired);
    document.getElementById("mistakeList").innerHTML = mistakes.length
      ? `<div class="mistake-list">${mistakes.slice(0, 6).map((mistake) => `
          <div class="mistake-item">
            <div>
              <strong>${subjectLabel(mistake.subject)} - ${mistake.chapter}</strong>
              <p class="muted">Ratee ${mistake.count} fois. Un cours sera propose avant de recommencer.</p>
            </div>
            <span class="status-pill">${mistake.reviewed ? "Cours relu" : "A retravailler"}</span>
          </div>
        `).join("")}</div>`
      : `<p class="muted">Aucune erreur en attente. Les prochaines erreurs deviendront des occasions de progresser.</p>`;

    const guidedItems = (progress.guidedTasks || []).slice(-8).reverse();
    const guidedContainer = document.getElementById("guidedProgressList");
    if (guidedContainer) {
      guidedContainer.innerHTML = guidedItems.length
        ? `<div class="history-list">${guidedItems.map((item) => {
          const task = (content.guidedTasks || []).find((guidedTask) => guidedTask.id === item.taskId);
          return `
            <div class="history-item">
              <span>${item.date} - ${task ? task.title : item.chapter}</span>
              <strong>${item.score}/4</strong>
            </div>
          `;
        }).join("")}</div>`
        : `<p class="muted">Aucun sujet guide termine pour le moment.</p>`;
    }
  }

  function renderBadges() {
    document.getElementById("badgeList").innerHTML = content.badges.map((badge) => {
      const unlocked = progress.badges.includes(badge.id);
      const tier = getBadgeTier(badge);
      const tierMeta = getBadgeTierMeta(tier);
      const requirement = formatBadgeRequirement(badge);
      return `
        <article class="badge-card ${unlocked ? `unlocked tier-${tier}` : "locked"}">
          <div class="badge-award" aria-hidden="true">
            <div class="badge-rays"></div>
            <div class="badge-shield"><span>${unlocked ? tierMeta.number : "?"}</span></div>
            <div class="badge-ribbon">${requirement}</div>
          </div>
          <div class="badge-icon" aria-hidden="true">${unlocked ? "✓" : "B"}</div>
          <div class="badge-content">
            <span class="badge-state">${unlocked ? tierMeta.label : "A gagner"}</span>
            <h3>${badge.title}</h3>
            <p>${badge.description}</p>
            <small>${unlocked ? tierMeta.level : `${tierMeta.label} a debloquer`}</small>
          </div>
        </article>
      `;
    }).join("");
  }

  function getBadgeTier(badge) {
    const tiers = {
      first_session: "bronze",
      ten_questions: "bronze",
      discovery_step: "bronze",
      first_repair: "bronze",
      three_days: "silver",
      fifty_questions: "silver",
      consolidation_step: "silver",
      all_subjects: "silver",
      perfect_run: "silver",
      bounce_back: "silver",
      seven_days: "gold",
      hundred_points: "gold",
      brevet_step: "gold",
      three_repairs: "gold"
    };
    return tiers[badge.id] || "bronze";
  }

  function getBadgeTierMeta(tier) {
    const meta = {
      bronze: { label: "Bronze", level: "Niveau 1", number: "1" },
      silver: { label: "Argent", level: "Niveau 2", number: "2" },
      gold: { label: "Or", level: "Niveau 3", number: "3" }
    };
    return meta[tier] || meta.bronze;
  }

  function formatBadgeRequirement(badge) {
    const parts = String(badge.test || "").split(":");
    const kind = parts[0];
    const value = parts[parts.length - 1];
    if (kind === "sessions") return `${value} seance`;
    if (kind === "streak") return `${value} jours`;
    if (kind === "points") return `${value} points`;
    if (kind === "questions") return `${value} questions`;
    if (kind === "perfect") return `${value} sans erreur`;
    if (kind === "subjects") return `${value} matieres`;
    if (kind === "stage") return `${value} reussites`;
    if (kind === "repairs") return `${value} erreurs`;
    if (kind === "bounce") return "1 rebond";
    return "Objectif";
  }

  function bindEvents() {
    document.querySelectorAll(".nav-item").forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.view));
    });

    document.body.addEventListener("click", (event) => {
      const viewButton = event.target.closest("[data-view-target]");
      if (viewButton) setView(viewButton.dataset.viewTarget);

      const courseFilter = event.target.closest("[data-course-filter]");
      if (courseFilter) {
        selectedCourseSubject = courseFilter.dataset.courseFilter;
        renderCourses();
      }

      const roadmapFilter = event.target.closest("[data-roadmap-filter]");
      if (roadmapFilter) {
        selectedRoadmapSubject = roadmapFilter.dataset.roadmapFilter;
        renderRoadmap();
      }

      const guidedFilter = event.target.closest("[data-guided-filter]");
      if (guidedFilter) {
        selectedGuidedSubject = guidedFilter.dataset.guidedFilter;
        renderGuidedTasks();
      }

      const chapterStatusButton = event.target.closest("[data-chapter-status]");
      if (chapterStatusButton) {
        progress.chapterStatus = progress.chapterStatus || {};
        const chapterId = chapterStatusButton.dataset.chapterStatus;
        const nextStatus = chapterStatusButton.dataset.statusValue;
        if (nextStatus === "active") {
          delete progress.chapterStatus[chapterId];
          showToast("Chapitre remis dans les revisions.");
        } else {
          progress.chapterStatus[chapterId] = nextStatus;
          showToast("Chapitre marque comme pas encore vu.");
        }
        saveProgress();
        render();
      }

      const train = event.target.closest("[data-train-subject]");
      if (train) {
        document.getElementById("practiceSubject").value = train.dataset.trainSubject;
        currentPracticeQuestion = pickQuestion(train.dataset.trainSubject);
        setView("practice");
      }

      const guidedScore = event.target.closest("[data-guided-score]");
      if (guidedScore) {
        registerGuidedScore(guidedScore.dataset.guidedScore, Number(guidedScore.dataset.score));
      }

      const answer = event.target.closest("[data-answer]");
      if (answer && !answer.disabled) answerQuestion(answer);

      const orderChoice = event.target.closest("[data-order-choice]");
      if (orderChoice && !orderChoice.disabled) addOrderChoice(orderChoice);

      const orderToken = event.target.closest("[data-order-remove]");
      if (orderToken && !orderToken.disabled) removeOrderChoice(orderToken);

      const orderSubmit = event.target.closest("[data-order-submit]");
      if (orderSubmit && !orderSubmit.disabled) submitOrderAnswer(orderSubmit);
    });

    document.querySelector("[data-start-recommended]").addEventListener("click", () => {
      document.getElementById("sessionSubject").value = activeSubject;
      renderSessionNotions();
      document.getElementById("sessionNotion").value = "auto";
      setView("session");
    });

    document.getElementById("startSessionButton").addEventListener("click", startSession);
    document.getElementById("sessionSubject").addEventListener("change", () => {
      renderSessionNotions();
    });
    document.getElementById("newQuestionButton").addEventListener("click", () => {
      currentPracticeQuestion = pickQuestion(document.getElementById("practiceSubject").value);
      render();
    });
    document.getElementById("reviewMistakeButton").addEventListener("click", startMistakeReview);
    document.getElementById("progressReviewMistakeButton").addEventListener("click", startMistakeReview);
    document.getElementById("practiceSubject").addEventListener("change", (event) => {
      renderPracticeChapters();
      currentPracticeQuestion = pickQuestion(event.target.value);
      render();
    });
    document.getElementById("practiceStage").addEventListener("change", () => {
      currentPracticeQuestion = pickQuestion(document.getElementById("practiceSubject").value);
      render();
    });
    document.getElementById("practiceChapter").addEventListener("change", () => {
      currentPracticeQuestion = pickQuestion(document.getElementById("practiceSubject").value);
      render();
    });
    document.getElementById("courseStageFilter").addEventListener("change", (event) => {
      selectedCourseStage = event.target.value;
      renderCourses();
    });
  }

  function addOrderChoice(button) {
    const builder = button.closest(".order-builder");
    const answer = builder.querySelector(".order-answer");
    const value = button.dataset.orderChoice;
    const empty = answer.querySelector(".muted");
    if (empty) empty.remove();
    button.disabled = true;
    answer.insertAdjacentHTML("beforeend", `<button class="order-token" data-order-remove="${escapeHtml(value)}" type="button">${escapeHtml(value)}</button>`);
    updateOrderSubmit(builder);
  }

  function removeOrderChoice(button) {
    const builder = button.closest(".order-builder");
    const value = button.dataset.orderRemove;
    const choice = [...builder.querySelectorAll("[data-order-choice]")].find((item) => item.dataset.orderChoice === value);
    if (choice) choice.disabled = false;
    button.remove();
    const answer = builder.querySelector(".order-answer");
    if (!answer.querySelector("[data-order-remove]")) {
      answer.innerHTML = `<span class="muted">Clique les elements dans le bon ordre.</span>`;
    }
    updateOrderSubmit(builder);
  }

  function updateOrderSubmit(builder) {
    const total = builder.querySelectorAll("[data-order-choice]").length;
    const selected = builder.querySelectorAll("[data-order-remove]").length;
    builder.querySelector("[data-order-submit]").disabled = selected !== total;
  }

  function submitOrderAnswer(button) {
    const builder = button.closest(".order-builder");
    const selected = [...builder.querySelectorAll("[data-order-remove]")].map((item) => item.dataset.orderRemove);
    button.dataset.answer = selected.join("|||");
    answerQuestion(button);
  }

  bindEvents();
  render();
}());
