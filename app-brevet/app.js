(function () {
  const content = window.BREVET_CONTENT;
  const storageKey = "brevetSprintProgress";
  const settingsKey = "brevetSprintSettings";
  const appVersion = "1.0.0";
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
    annalExamRuns: [],
    perfectRuns: 0
  };

  let progress = loadProgress();
  let settings = loadSettings();
  let activeSubject = getRecommendation().subject;
  let currentPracticeQuestion = null;
  let currentSession = null;
  let selectedCourseSubject = "all";
  let selectedCourseStage = "all";
  let selectedRoadmapSubject = "all";
  let selectedGuidedSubject = "all";
  applyTheme(settings.theme);

  const annalYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

  const textPolishRules = [
    ["Seance", "S\u00e9ance"],
    ["seance", "s\u00e9ance"],
    ["guidee", "guid\u00e9e"],
    ["guide", "guid\u00e9"],
    ["Mathematiques", "Math\u00e9matiques"],
    ["Francais", "Fran\u00e7ais"],
    ["Geographie", "G\u00e9ographie"],
    ["geographie", "g\u00e9ographie"],
    ["Histoire-Geo", "Histoire-G\u00e9o"],
    ["Reussite", "R\u00e9ussite"],
    ["Reussir", "R\u00e9ussir"],
    ["reussir", "r\u00e9ussir"],
    ["reussite", "r\u00e9ussite"],
    ["reponse", "r\u00e9ponse"],
    ["reponses", "r\u00e9ponses"],
    ["repondu", "r\u00e9pondu"],
    ["repondue", "r\u00e9pondue"],
    ["repondues", "r\u00e9pondues"],
    ["repondre", "r\u00e9pondre"],
    ["reviser", "r\u00e9viser"],
    ["Reviser", "R\u00e9viser"],
    ["revision", "r\u00e9vision"],
    ["Revision", "R\u00e9vision"],
    ["regulier", "r\u00e9gulier"],
    ["reguliere", "r\u00e9guli\u00e8re"],
    ["reparer", "r\u00e9parer"],
    ["reparee", "r\u00e9par\u00e9e"],
    ["ratee", "rat\u00e9e"],
    ["ratees", "rat\u00e9es"],
    ["gagne", "gagn\u00e9"],
    ["gagnes", "gagn\u00e9s"],
    ["debloque", "d\u00e9bloqu\u00e9"],
    ["debloques", "d\u00e9bloqu\u00e9s"],
    ["a debloquer", "\u00e0 d\u00e9bloquer"],
    ["a gagner", "\u00e0 gagner"],
    ["A gagner", "\u00c0 gagner"],
    ["a retravailler", "\u00e0 retravailler"],
    ["A retravailler", "\u00c0 retravailler"],
    ["a voir", "\u00e0 voir"],
    ["A voir", "\u00c0 voir"],
    ["a travailler", "\u00e0 travailler"],
    ["A travailler", "\u00c0 travailler"],
    ["a reprendre", "\u00e0 reprendre"],
    ["A reprendre", "\u00c0 reprendre"],
    ["a valider", "\u00e0 valider"],
    ["A valider", "\u00c0 valider"],
    ["a essayer", "\u00e0 essayer"],
    ["A essayer", "\u00c0 essayer"],
    ["ou tu en es", "o\u00f9 tu en es"],
    ["Ou tu en es", "O\u00f9 tu en es"],
    ["ete", "\u00e9t\u00e9"],
    ["travaille", "travaill\u00e9"],
    ["journee", "journ\u00e9e"],
    ["matiere", "mati\u00e8re"],
    ["matieres", "mati\u00e8res"],
    ["Matiere", "Mati\u00e8re"],
    ["Matieres", "Mati\u00e8res"],
    ["Parametres", "Param\u00e8tres"],
    ["parametres", "param\u00e8tres"],
    ["installee", "install\u00e9e"],
    ["Installee", "Install\u00e9e"],
    ["Melange", "M\u00e9lange"],
    ["melange", "m\u00e9lange"],
    ["decouvrir", "d\u00e9couvrir"],
    ["Decouvrir", "D\u00e9couvrir"],
    ["precise", "pr\u00e9cise"],
    ["Precise", "Pr\u00e9cise"],
    ["pedagogique", "p\u00e9dagogique"],
    ["Pedagogique", "P\u00e9dagogique"],
    ["commence", "commenc\u00e9"],
    ["Commence", "Commenc\u00e9"],
    ["Acces", "Acc\u00e8s"],
    ["acces", "acc\u00e8s"],
    ["eleve", "\u00e9l\u00e8ve"],
    ["ecole", "\u00e9cole"],
    ["egalite", "\u00e9galit\u00e9"],
    ["liberte", "libert\u00e9"],
    ["laicite", "la\u00efcit\u00e9"],
    ["citoyennete", "citoyennet\u00e9"],
    ["Republique", "R\u00e9publique"],
    ["Europeenne", "Europ\u00e9enne"],
    ["donnees", "donn\u00e9es"],
    ["Developpement", "D\u00e9veloppement"],
    ["developpement", "d\u00e9veloppement"],
    ["Decouverte", "D\u00e9couverte"],
    ["decouverte", "d\u00e9couverte"],
    ["entrainement", "entra\u00eenement"],
    ["entrainer", "entra\u00eener"],
    ["entraine", "entra\u00eene"],
    ["maitrise", "ma\u00eetrise"],
    ["Maitrise", "Ma\u00eetrise"],
    ["hypothenuse", "hypot\u00e9nuse"],
    ["hypotenuse", "hypot\u00e9nuse"],
    ["theoreme", "th\u00e9or\u00e8me"],
    ["Theoreme", "Th\u00e9or\u00e8me"],
    ["probleme", "probl\u00e8me"],
    ["echelle", "\u00e9chelle"],
    ["Echelle", "\u00c9chelle"],
    ["energie", "\u00e9nergie"],
    ["eprouvette", "\u00e9prouvette"],
    ["ecriture", "\u00e9criture"],
    ["Ecriture", "\u00c9criture"],
    ["etat", "\u00e9tat"],
    ["Etat", "\u00c9tat"]
  ];

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

  function loadSettings() {
    try {
      return { theme: "light", ...JSON.parse(localStorage.getItem(settingsKey)) };
    } catch (error) {
      return { theme: "light" };
    }
  }

  function saveSettings() {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  }

  function applyTheme(theme) {
    const safeTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = safeTheme;
    document.documentElement.style.colorScheme = safeTheme;
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function polishText(value) {
    return textPolishRules.reduce((text, [from, to]) => {
      const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(from)}(?=$|[^\\p{L}\\p{N}])`, "gu");
      return text.replace(pattern, `$1${to}`);
    }, String(value || ""));
  }

  function applyTextPolish(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      node.nodeValue = polishText(node.nodeValue);
    });
  }

  function clearSessionStage() {
    const stage = document.getElementById("sessionStage");
    if (stage) stage.innerHTML = "";
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
    const unlockedNow = [];
    getAllBadges().forEach((badge) => {
      if (progress.badges.includes(badge.id)) return;
      if (isBadgeUnlocked(badge)) {
        progress.badges.push(badge.id);
        unlockedNow.push(badge);
      }
    });
    if (unlockedNow.length) showBadgeUnlock(unlockedNow);
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

  function registerAnnalScore() {
    const year = Number(document.getElementById("annalYear")?.value);
    const subject = document.getElementById("annalSubject")?.value;
    const score = Number(document.getElementById("annalScore")?.value);
    const status = document.getElementById("annalStatus");
    if (!year || !subject || Number.isNaN(score) || score < 0 || score > 20) {
      if (status) status.textContent = "Entre une note valide entre 0 et 20.";
      return;
    }
    progress.annalExamRuns = progress.annalExamRuns || [];
    progress.annalExamRuns.push({
      id: `annale_${Date.now()}`,
      date: today(),
      year,
      subject,
      score
    });
    addPoints(Math.max(5, Math.round(score * 2)));
    updateStreakIfValid();
    awardBadges();
    saveProgress();
    showToast(`Annale enregistree : ${score}/20.`);
    document.getElementById("annalScore").value = "";
    render();
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.classList.remove("badge-unlock-toast");
    toast.textContent = message;
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 2400);
  }

  function showBadgeUnlock(badges) {
    const firstBadge = badges[0];
    const tierMeta = getBadgeTierMeta(firstBadge.tier);
    const message = badges.length === 1
      ? `Badge dÃ©bloquÃ© : ${firstBadge.title}`
      : `${badges.length} badges dÃ©bloquÃ©s`;
    const toast = document.getElementById("toast");
    toast.innerHTML = `
      <div class="badge-toast">
        <div class="badge-toast-medal tier-${firstBadge.tier || "bronze"}">${tierMeta.number}</div>
        <div>
          <strong>${message}</strong>
          <span>${tierMeta.label} - ${firstBadge.requirement || "Objectif atteint"}</span>
        </div>
      </div>
    `;
    toast.classList.add("visible", "badge-unlock-toast");
    window.setTimeout(() => toast.classList.remove("visible", "badge-unlock-toast"), 4200);
  }

  function setView(viewName) {
    if (viewName === "session" && !currentSession) clearSessionStage();
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
    renderAnnales();
    renderProgress();
    renderBadges();
    renderSettings();
    applyTextPolish();
  }

  function renderDashboard() {
    const recommendation = getRecommendation();
    activeSubject = recommendation.subject;
    const todayAnswers = getTodayAnswers();
    const perfectToday = progress.sessions.some((session) => session.date === today() && session.correctAnswers === session.questionsAnswered && session.questionsAnswered > 0);
    const pendingMistakes = progress.mistakes.filter((mistake) => !mistake.repaired).length;
    const dailyPercent = perfectToday && pendingMistakes === 0 ? 100 : Math.min(90, Math.round((todayAnswers.length / 20) * 100));

    document.getElementById("pointsValue").textContent = progress.points;
    document.getElementById("streakValue").textContent = `${progress.currentStreak} j`;
    document.getElementById("bestStreakValue").textContent = `${progress.bestStreak} j`;
    document.getElementById("successValue").textContent = `${getOverallSuccess()} %`;
    document.getElementById("recommendationTitle").textContent = recommendation.title;
    document.getElementById("recommendationStatus").textContent = recommendation.status;
    document.getElementById("recommendationText").textContent = recommendation.text;
    document.getElementById("dailyProgressBar").style.width = `${dailyPercent}%`;
    document.getElementById("dailyProgressText").textContent = perfectToday && pendingMistakes === 0
      ? "Objectif valide : seance sans faute."
      : `${todayAnswers.length} questions faites. Objectif : reussir une seance sans faute.`;
    document.getElementById("sidebarGoal").textContent = perfectToday && pendingMistakes === 0
      ? "Objectif valide"
      : `${pendingMistakes} erreur${pendingMistakes > 1 ? "s" : ""} a reprendre`;
    document.getElementById("dailyHint").textContent = recommendation.mode === "first-run"
      ? "Choisis une matiere, fais une seance guidee ou lance un melange decouverte."
      : `${recommendation.text} Tu peux commencer par le conseil du jour ou choisir une autre entree.`;

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
        match: subject === "mathematiques" && title.includes("pourcentage"),
        theory: [
          "Un pourcentage sert a prendre une partie d'une quantite. Le symbole % veut dire sur 100.",
          "Calculer 25 % d'un nombre, c'est prendre 25 parts sur 100. On peut donc ecrire 25/100 x la quantite.",
          "Un pourcentage ne s'ajoute pas automatiquement au nombre de depart. Il faut d'abord comprendre si la question demande une partie, une augmentation ou une reduction."
        ],
        method: ["Repere la quantite de depart.", "Transforme le pourcentage en fraction sur 100.", "Multiplie la quantite par cette fraction.", "Donne une phrase de reponse avec l'unite."],
        exampleDetail: "Pour calculer 25 % de 80, on fait 25/100 x 80. Cela donne 20. Donc 25 % de 80 vaut 20.",
        check: "As-tu bien calcule une partie de la quantite, sans ajouter le pourcentage au hasard ?"
      },
      {
        match: subject === "mathematiques" && title.includes("proportionnalite"),
        theory: [
          "Deux grandeurs sont proportionnelles quand on passe toujours de l'une a l'autre avec le meme multiplicateur.",
          "Exemple simple : si 1 cahier coute 2 euros, alors 3 cahiers coutent 6 euros et 5 cahiers coutent 10 euros. Le prix est toujours le nombre de cahiers multiplie par 2.",
          "Attention : si deux valeurs augmentent en meme temps, ce n'est pas forcement proportionnel. Il faut verifier que le meme coefficient fonctionne partout."
        ],
        method: ["Compare deux colonnes ou deux grandeurs.", "Cherche le nombre qui permet de passer de l'une a l'autre.", "Verifie ce nombre sur plusieurs lignes.", "Utilise ce coefficient pour calculer la valeur manquante."],
        exampleDetail: "Si 4 stylos coutent 6 euros, 1 stylo coute 6 / 4 = 1,50 euro. Alors 10 stylos coutent 10 x 1,50 = 15 euros.",
        check: "Le meme coefficient fonctionne-t-il pour toutes les lignes du tableau ?"
      },
      {
        match: subject === "mathematiques" && title.includes("priorites"),
        theory: [
          "Dans un calcul avec plusieurs operations, on ne calcule pas toujours de gauche a droite.",
          "On fait d'abord ce qui est dans les parentheses. Ensuite on calcule les multiplications et les divisions. A la fin, on fait les additions et les soustractions.",
          "Ecrire une seule etape par ligne aide beaucoup : cela evite de changer deux choses en meme temps et de perdre le fil."
        ],
        method: ["Recopie le calcul sans le modifier.", "Calcule d'abord les parentheses.", "Calcule ensuite les multiplications et divisions.", "Termine par les additions et soustractions.", "Relis le resultat pour voir s'il est raisonnable."],
        exampleDetail: "Pour 3 + 4 x 2, on commence par 4 x 2 = 8. Le calcul devient 3 + 8, donc le resultat est 11.",
        check: "As-tu fait les multiplications avant les additions quand il n'y avait pas de parentheses ?"
      },
      {
        match: subject === "mathematiques" && title.includes("puissances"),
        theory: [
          "Une puissance sert a ecrire une multiplication repetee. Par exemple, 10^3 veut dire 10 x 10 x 10.",
          "Avec les puissances de 10, l'exposant indique combien de fois on multiplie par 10. Ce n'est pas 10 x 3.",
          "Dans l'ecriture scientifique, on garde un nombre entre 1 et 10, puis on multiplie par une puissance de 10."
        ],
        method: ["Lis l'exposant.", "Traduis la puissance si besoin en multiplication repetee.", "Pour une puissance de 10 positive, deplace la virgule vers la droite.", "Verifie l'ordre de grandeur du nombre obtenu."],
        exampleDetail: "4,7 x 10^3 signifie 4,7 x 1000. On deplace la virgule de 3 rangs vers la droite : 4700.",
        check: "As-tu evite de confondre 10^3 avec 10 x 3 ?"
      },
      {
        match: subject === "mathematiques" && title.includes("moyenne") && title.includes("mediane"),
        theory: [
          "La moyenne et la mediane servent a resumer une liste de nombres, mais elles ne disent pas la meme chose.",
          "La moyenne donne une valeur de partage equitable : on additionne tout, puis on divise par le nombre de valeurs.",
          "La mediane est la valeur du milieu quand la serie est rangee. Elle coupe la serie en deux parties de meme taille ou presque."
        ],
        method: ["Pour la moyenne, additionne toutes les valeurs.", "Divise par le nombre de valeurs.", "Pour la mediane, range d'abord les valeurs dans l'ordre.", "Compte les valeurs et repere le milieu.", "Ecris une phrase qui dit ce que le resultat signifie."],
        exampleDetail: "Pour 6 ; 8 ; 12 ; 15 ; 19, il y a 5 valeurs rangees. La 3e valeur est au milieu : la mediane est 12.",
        check: "As-tu range la serie avant de chercher la mediane ?"
      },
      {
        match: subject === "mathematiques" && title.includes("probabilite"),
        theory: [
          "Une probabilite mesure la chance qu'un evenement arrive. Elle est toujours entre 0 et 1.",
          "Dans un exercice simple, on compte d'abord tous les cas possibles. Ensuite on compte seulement les cas qui repondent a la question.",
          "La formule est : probabilite = cas favorables / cas possibles. Les mots de la consigne sont tres importants : pair, impair, au moins, exactement, superieur a."
        ],
        method: ["Liste ou compte tous les cas possibles.", "Souligne la condition demandee dans la question.", "Compte les cas favorables.", "Ecris la fraction cas favorables / cas possibles.", "Simplifie la fraction si tu peux."],
        exampleDetail: "Dans une urne avec 6 boules dont 4 portent un nombre pair, il y a 6 cas possibles et 4 cas favorables. La probabilite est 4/6, donc 2/3.",
        check: "Ton denominateur correspond-il bien au nombre total de cas possibles ?"
      },
      {
        match: subject === "mathematiques" && title.includes("equation"),
        theory: [
          "Une equation est une egalite avec un nombre inconnu, souvent note x.",
          "Resoudre l'equation, c'est trouver la valeur de x qui rend l'egalite vraie.",
          "L'idee principale est de garder l'equilibre : si tu fais une operation a gauche du signe egal, tu fais la meme a droite."
        ],
        method: ["Repere l'inconnue.", "Enleve d'abord ce qui est ajoute ou retire autour de l'inconnue.", "Enleve ensuite ce qui multiplie ou divise l'inconnue.", "Ecris la solution.", "Verifie en remplacant x par la valeur trouvee."],
        exampleDetail: "Pour 4x - 3 = 17, on ajoute 3 des deux cotes : 4x = 20. Puis on divise par 4 : x = 5.",
        check: "Quand tu remplaces x par ta solution, l'egalite de depart est-elle vraie ?"
      },
      {
        match: subject === "mathematiques" && title.includes("factoriser"),
        theory: [
          "Factoriser, c'est transformer une somme en produit. On fait l'inverse du developpement.",
          "Pour commencer, on cherche un facteur commun : un nombre ou une lettre que l'on retrouve dans plusieurs termes.",
          "Apres avoir factorise, on peut verifier en redeveloppant. Si on retrouve l'expression de depart, la factorisation est correcte."
        ],
        method: ["Observe chaque terme de l'expression.", "Cherche le facteur commun le plus simple.", "Ecris ce facteur devant une parenthese.", "Complete la parenthese avec ce qui reste.", "Redeveloppe mentalement pour verifier."],
        exampleDetail: "Dans 6x + 9, le facteur commun est 3. On ecrit 6x + 9 = 3(2x + 3), car 3 x 2x = 6x et 3 x 3 = 9.",
        check: "Si tu redeveloppes ta reponse, retrouves-tu exactement l'expression de depart ?"
      },
      {
        match: subject === "mathematiques" && title.includes("programme de calcul"),
        theory: [
          "Un programme de calcul est une suite d'actions appliquees a un nombre de depart.",
          "On peut le faire avec un nombre precis, ou avec une lettre comme x pour obtenir une expression.",
          "L'ordre des etapes compte beaucoup. Si on inverse deux actions, on n'obtient pas toujours le meme resultat."
        ],
        method: ["Ecris le nombre de depart ou la lettre x.", "Applique la premiere consigne.", "Ecris le resultat intermediaire.", "Continue une etape par ligne.", "Simplifie seulement a la fin."],
        exampleDetail: "Choisir x, multiplier par 4, puis ajouter 3 donne d'abord 4x, puis 4x + 3.",
        check: "As-tu garde le meme ordre que le programme de calcul ?"
      },
      {
        match: subject === "mathematiques" && title.includes("tableur"),
        theory: [
          "Un tableur est un tableau compose de cellules. Chaque cellule a un nom, comme B2 ou C5.",
          "Une formule de tableur commence par le signe =. Elle peut utiliser des nombres, des operations et des noms de cellules.",
          "Quand une formule contient B2, il faut utiliser la valeur qui se trouve dans la cellule B2, pas les lettres B et 2."
        ],
        method: ["Repere la cellule ou se trouve la formule.", "Lis les cellules utilisees dans la formule.", "Remplace chaque nom de cellule par sa valeur.", "Effectue le calcul dans le bon ordre.", "Verifie que le resultat correspond a la ligne ou la colonne demandee."],
        exampleDetail: "Si B2 contient 7 et C2 contient 3, la formule =B2*C2 calcule 7 x 3. Le resultat est 21.",
        check: "As-tu remplace les references de cellules par les bonnes valeurs ?"
      },
      {
        match: subject === "mathematiques" && title.includes("pythagore"),
        theory: [
          "Le theoreme de Pythagore sert dans un triangle rectangle. Il permet de calculer une longueur.",
          "Dans un triangle rectangle, l'hypotenuse est le cote en face de l'angle droit. C'est aussi le plus long cote.",
          "La formule dit : hypotenuse^2 = cote1^2 + cote2^2. Il faut donc bien identifier l'hypotenuse avant de calculer."
        ],
        method: ["Verifie que le triangle est rectangle.", "Identifie l'hypotenuse.", "Ecris la formule de Pythagore avec les noms des cotes.", "Remplace par les longueurs connues.", "Calcule puis conclus avec l'unite."],
        exampleDetail: "Si un triangle est rectangle et que les deux cotes de l'angle droit mesurent 3 cm et 4 cm, alors l'hypotenuse verifie h^2 = 3^2 + 4^2 = 25. Donc h = 5 cm.",
        check: "As-tu bien mis l'hypotenuse seule dans la formule ?"
      },
      {
        match: subject === "mathematiques" && title.includes("thales"),
        theory: [
          "Le theoreme de Thales sert dans une figure avec deux droites secantes et deux droites paralleles.",
          "Il permet d'ecrire des egalites de rapports. Ces rapports servent ensuite a calculer une longueur manquante.",
          "Avant d'utiliser Thales, il faut verifier ou dire que les droites sont paralleles. Sans parallelisme, le theoreme ne s'applique pas."
        ],
        method: ["Repere les deux triangles de la figure.", "Verifie les points alignes.", "Verifie les droites paralleles.", "Associe les cotes qui se correspondent.", "Ecris les rapports puis calcule la longueur cherchee."],
        exampleDetail: "Si A, D, B sont alignes, A, E, C sont alignes et (DE) est parallele a (BC), alors on peut ecrire AD/AB = AE/AC = DE/BC.",
        check: "As-tu associe les cotes dans le meme ordre dans chaque rapport ?"
      },
      {
        match: subject === "mathematiques" && title.includes("sinus"),
        theory: [
          "La trigonometrie sert dans un triangle rectangle quand on relie un angle et des longueurs.",
          "Il faut d'abord choisir un angle aigu. Par rapport a cet angle, on nomme les cotes : oppose, adjacent et hypotenuse.",
          "Les trois rapports sont sinus, cosinus et tangente. On choisit celui qui utilise les deux longueurs de l'exercice."
        ],
        method: ["Verifie que le triangle est rectangle.", "Choisis l'angle donne ou cherche.", "Nomme hypotenuse, cote oppose et cote adjacent.", "Choisis sinus, cosinus ou tangente.", "Remplace dans la formule et calcule."],
        exampleDetail: "Si on connait le cote adjacent a un angle et l'hypotenuse, on utilise le cosinus : cos(angle) = adjacent / hypotenuse.",
        check: "As-tu nomme les cotes par rapport au bon angle ?"
      },
      {
        match: subject === "mathematiques" && title.includes("aires") && title.includes("volumes"),
        theory: [
          "Une longueur mesure une distance. Une aire mesure une surface. Un volume mesure la place prise par un solide.",
          "Les unites changent selon ce que l'on mesure : cm pour une longueur, cm2 pour une aire, cm3 pour un volume.",
          "Avant de choisir une formule, il faut reconnaitre la figure ou le solide : rectangle, triangle, disque, pave droit, cylindre."
        ],
        method: ["Dis si on cherche une longueur, une aire ou un volume.", "Reconnais la figure ou le solide.", "Choisis la formule adaptee.", "Remplace par les mesures donnees.", "Ecris la bonne unite a la fin."],
        exampleDetail: "Un rectangle de longueur 5 cm et de largeur 3 cm a pour aire 5 x 3 = 15 cm2.",
        check: "Ton unite correspond-elle bien a une longueur, une aire ou un volume ?"
      },
      {
        match: subject === "mathematiques" && title.includes("echelle"),
        theory: [
          "Une echelle relie une distance sur un plan a une distance reelle.",
          "A l'echelle 1:1000, 1 cm sur le plan represente 1000 cm dans la realite.",
          "Le piege principal vient des unites : on calcule souvent en centimetres, puis on convertit en metres ou en kilometres."
        ],
        method: ["Lis l'echelle.", "Traduis ce que represente 1 cm sur le plan.", "Multiplie ou divise selon le sens demande.", "Convertis l'unite si necessaire.", "Ecris une phrase de reponse."],
        exampleDetail: "A l'echelle 1:1000, 4 cm sur le plan representent 4000 cm en realite, donc 40 m.",
        check: "As-tu converti les centimetres en metres ou kilometres quand la consigne le demande ?"
      },
      {
        match: subject === "mathematiques" && title.includes("vitesse"),
        theory: [
          "La vitesse relie une distance et une duree. Elle indique la distance parcourue en une unite de temps.",
          "Les formules utiles sont : distance = vitesse x temps, vitesse = distance / temps, temps = distance / vitesse.",
          "Avant de calculer, il faut mettre les unites ensemble : par exemple km avec h, ou m avec s."
        ],
        method: ["Repere ce que tu cherches : distance, vitesse ou duree.", "Note les deux grandeurs connues.", "Convertis les unites si besoin.", "Choisis la formule.", "Calcule et indique l'unite."],
        exampleDetail: "A 80 km/h pendant 1,5 h, la distance parcourue est 80 x 1,5 = 120 km.",
        check: "As-tu transforme 30 min en 0,5 h si la vitesse est en km/h ?"
      },
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
        match: subject === "francais" && title.includes("nature et fonction"),
        theory: [
          "La nature d'un mot dit ce qu'il est : nom, verbe, adjectif, pronom, determinant.",
          "La fonction dit a quoi il sert dans la phrase : sujet, COD, COI, complement de phrase, attribut.",
          "Le meme mot peut garder la meme nature mais changer de fonction selon la phrase. Il faut donc poser deux questions differentes."
        ],
        method: ["Trouve d'abord le verbe conjugue.", "Demande-toi ce qu'est le mot ou le groupe : c'est sa nature.", "Demande-toi son role par rapport au verbe ou au nom : c'est sa fonction.", "Verifie avec une question simple : qui ? quoi ? a qui ? ou ? quand ?"],
        exampleDetail: "Dans 'Le vent souffle', 'le vent' est un groupe nominal. Sa fonction est sujet, car c'est lui qui fait l'action de souffler.",
        check: "As-tu bien donne une nature et une fonction, sans les melanger ?"
      },
      {
        match: subject === "francais" && title.includes("cod") && title.includes("coi"),
        theory: [
          "Un complement d'objet complete le verbe. Il explique sur quoi porte l'action.",
          "Le COD est relie directement au verbe : il n'y a pas de preposition comme a ou de. Le COI est relie avec une preposition.",
          "Pour les trouver, on part toujours du verbe, pas d'un mot au hasard dans la phrase."
        ],
        method: ["Repere le verbe conjugue.", "Pose la question verbe + qui ? ou verbe + quoi ? pour chercher un COD.", "Pose la question verbe + a qui ? a quoi ? de qui ? de quoi ? pour chercher un COI.", "Verifie que le groupe complete bien le verbe."],
        exampleDetail: "Dans 'Elle lit un roman', elle lit quoi ? un roman : c'est un COD. Dans 'Elle parle a son frere', elle parle a qui ? a son frere : c'est un COI.",
        check: "As-tu pose la question a partir du verbe ?"
      },
      {
        match: subject === "francais" && (title.includes("proposition") || title.includes("phrase complexe")),
        theory: [
          "Une proposition est un morceau de phrase organise autour d'un verbe conjugue.",
          "Une phrase simple contient souvent un seul verbe conjugue. Une phrase complexe contient plusieurs verbes conjugues, donc plusieurs propositions.",
          "Les mots comme qui, que, quand, parce que ou lorsque peuvent introduire une proposition subordonnee."
        ],
        method: ["Souligne tous les verbes conjugues.", "Compte les verbes : cela donne souvent le nombre de propositions.", "Separe les propositions avec des crochets.", "Cherche le mot qui relie les propositions si la phrase est complexe."],
        exampleDetail: "Dans 'Je regarde la ville qui s'eveille', il y a deux verbes conjugues : regarde et s'eveille. Il y a donc deux propositions.",
        check: "As-tu compte les verbes conjugues plutot que les virgules ?"
      },
      {
        match: subject === "francais" && title.includes("homophones"),
        theory: [
          "Des homophones se prononcent de la meme facon, mais ils ne s'ecrivent pas pareil.",
          "Pour choisir la bonne ecriture, il ne faut pas se fier au son. Il faut faire un test de remplacement.",
          "Par exemple, 'a' peut souvent etre remplace par 'avait'. 'est' peut souvent etre remplace par 'etait'."
        ],
        method: ["Lis la phrase entiere.", "Choisis l'homophone a tester.", "Remplace-le par le mot de test.", "Si la phrase garde du sens, l'ecriture est probablement la bonne.", "Relis la phrase corrigee."],
        exampleDetail: "Dans 'Il a faim', on peut dire 'Il avait faim' : on ecrit a. Dans 'Il va a Paris', on ne peut pas dire 'Il va avait Paris' : on ecrit a avec accent.",
        check: "As-tu fait un test de remplacement avant de choisir ?"
      },
      {
        match: subject === "francais" && (title.includes("participe") || title.includes("accords dans le groupe nominal") || title.includes("dictee") || title.includes("accord")),
        theory: [
          "Un accord sert a faire correspondre les mots entre eux : singulier ou pluriel, masculin ou feminin.",
          "Dans le groupe nominal, le determinant, le nom et souvent l'adjectif s'accordent ensemble.",
          "Avec l'auxiliaire etre, le participe passe s'accorde generalement avec le sujet. Avec avoir, il faut etre plus prudent."
        ],
        method: ["Cherche le nom ou le sujet qui commande l'accord.", "Demande-toi s'il est masculin ou feminin.", "Demande-toi s'il est singulier ou pluriel.", "Ajoute les marques necessaires : e, s, es.", "Relis seulement les accords a la fin."],
        exampleDetail: "Dans 'les petites maisons blanches', 'maisons' est feminin pluriel. 'petites' et 'blanches' prennent donc -es.",
        check: "As-tu accorde avec le bon mot, pas seulement avec le mot le plus proche ?"
      },
      {
        match: subject === "francais" && title.includes("reecriture"),
        theory: [
          "Une reecriture demande de transformer un passage en respectant une consigne precise.",
          "Changer une personne, un temps ou un genre entraine souvent plusieurs changements dans la phrase.",
          "Il ne faut pas seulement modifier le premier mot visible. Il faut verifier les verbes, les pronoms, les adjectifs et les participes passes."
        ],
        method: ["Souligne la consigne exacte.", "Repere les mots qui vont changer.", "Transforme une phrase a la fois.", "Verifie les verbes.", "Relis les accords et les pronoms."],
        exampleDetail: "Si 'je suis parti' devient 'nous', il faut changer le pronom, l'auxiliaire et l'accord : 'nous sommes partis'.",
        check: "As-tu relu tous les mots touches par la transformation ?"
      },
      {
        match: subject === "francais" && (title.includes("citation") || title.includes("comparaison") || title.includes("point de vue") || chapter.includes("interpretation")),
        theory: [
          "Interpreter un texte, c'est expliquer une idee en s'appuyant sur des indices du texte.",
          "Une citation ne suffit pas seule. Il faut dire ce qu'elle montre.",
          "Les indices peuvent etre un mot, une expression, une image, un point de vue, un temps verbal ou une figure de style."
        ],
        method: ["Lis la question avant de relire le texte.", "Cherche un indice precis.", "Ecris ton idee avec tes mots.", "Ajoute une citation courte.", "Explique le lien entre la citation et ton idee."],
        exampleDetail: "Si le texte dit 'la mer brille comme un miroir', on peut dire qu'il y a une comparaison qui donne une image lumineuse et calme de la mer.",
        check: "Ta reponse contient-elle une idee, une citation et une explication ?"
      },
      {
        match: subject === "francais" && title.includes("temps du recit"),
        theory: [
          "Les temps du recit ne servent pas seulement a situer une action dans le passe. Ils donnent aussi un rythme au texte.",
          "L'imparfait sert souvent a decrire, a presenter une habitude ou a installer une ambiance.",
          "Le passe simple sert souvent a raconter une action importante, precise et terminee."
        ],
        method: ["Repere les verbes conjugues.", "Identifie leur temps.", "Demande-toi si le passage decrit ou raconte une action.", "Explique l'effet produit par le temps utilise."],
        exampleDetail: "Dans 'Il marchait quand une voiture surgit', l'imparfait installe la situation et le passe simple marque l'action qui arrive soudain.",
        check: "As-tu explique l'effet du temps, pas seulement donne son nom ?"
      },
      {
        match: subject === "francais" && (title.includes("redaction") || title.includes("paragraphe argument")),
        theory: [
          "Une redaction reussie se prepare avant d'ecrire. Le plan evite de partir dans tous les sens.",
          "Dans un sujet de reflexion, chaque paragraphe defend une idee. Cette idee doit etre expliquee puis illustree par un exemple.",
          "Dans un sujet d'imagination, il faut respecter la situation donnee, le point de vue, le temps du recit et le ton attendu."
        ],
        method: ["Lis le sujet et souligne les contraintes.", "Choisis deux ou trois idees principales.", "Prepare un plan tres court.", "Ecris un paragraphe par idee.", "Relis la ponctuation, les accords et les repetitions."],
        exampleDetail: "Un paragraphe argumentatif simple suit : idee, explication, exemple. Par exemple : 'La lecture aide a comprendre les autres, car elle fait entrer dans des points de vue differents.'",
        check: "Ton texte suit-il un plan visible et respecte-t-il la consigne ?"
      },
      {
        match: subject === "histoire" && title.includes("document"),
        theory: [
          "Analyser un document, ce n'est pas le recopier. Il faut montrer ce qu'il nous apprend.",
          "On commence par presenter le document : sa nature, son auteur si on le connait, sa date, son sujet.",
          "Ensuite, on releve une information precise et on l'explique avec une connaissance du cours."
        ],
        method: ["Presente le document en une phrase.", "Lis la question pour savoir quoi chercher.", "Preleve une information precise.", "Explique cette information avec le cours.", "Redige une reponse courte et claire."],
        exampleDetail: "Une carte des espaces productifs peut montrer des usines, des ports ou des axes de transport. On peut alors expliquer comment un territoire produit et echange.",
        check: "As-tu explique le document au lieu de seulement le recopier ?"
      },
      {
        match: subject === "histoire" && title.includes("developpement"),
        theory: [
          "Un developpement construit est une reponse longue et organisee.",
          "Il ne faut pas faire une liste d'idees. Il faut classer les informations en deux ou trois parties simples.",
          "Chaque paragraphe doit contenir une idee principale, une explication et au moins un exemple precis."
        ],
        method: ["Lis le sujet et repere le verbe de consigne.", "Note deux ou trois idees au brouillon.", "Classe les idees dans un ordre logique.", "Redige un paragraphe par idee.", "Termine par une courte phrase de bilan."],
        exampleDetail: "Pour expliquer la decolonisation, on peut organiser la reponse ainsi : contexte apres 1945, acteurs des independances, consequences politiques.",
        check: "Chaque paragraphe contient-il une idee claire et un exemple ?"
      },
      {
        match: subject === "histoire" && (title.includes("reperes") || title.includes("carte") || title.includes("frise") || title.includes("vocabulaire")),
        theory: [
          "Les reperes sont les dates, lieux et mots essentiels qui permettent de situer un sujet.",
          "Un repere n'est utile que s'il est precis : une date, une periode, un lieu, une definition courte.",
          "Sur une carte ou une frise, la legende et la consigne guident toujours ce qu'il faut placer."
        ],
        method: ["Lis la consigne.", "Repere s'il faut une date, un lieu ou un mot de vocabulaire.", "Utilise la legende ou les bornes de la frise.", "Place seulement ce qui est demande.", "Verifie l'orthographe des noms importants."],
        exampleDetail: "1914-1918 correspond a la Premiere Guerre mondiale. 1939-1945 correspond a la Seconde Guerre mondiale.",
        check: "Ton repere est-il assez precis pour etre reconnu au brevet ?"
      },
      {
        match: subject === "histoire" && (title.includes("guerre froide") || title.includes("mondiales") || title.includes("totalitaire") || title.includes("resistance") || title.includes("decolonisation")),
        theory: [
          "En histoire, il faut toujours situer le sujet dans le temps et identifier les acteurs principaux.",
          "Un evenement historique s'explique avec des causes, des faits et des consequences.",
          "Les mots precis du cours sont importants : regime totalitaire, Resistance, Liberation, blocs, decolonisation."
        ],
        method: ["Situe le sujet avec une date ou une periode.", "Identifie les acteurs.", "Explique deux idees importantes.", "Ajoute un exemple precis.", "Termine par une consequence ou un bilan."],
        exampleDetail: "Pour la guerre froide, il faut citer les Etats-Unis, l'URSS, les deux blocs et l'opposition entre deux modeles politiques.",
        check: "As-tu donne au moins une date, un acteur et un mot precis du cours ?"
      },
      {
        match: subject === "histoire" && (title.includes("aires urbaines") || title.includes("espace productif") || title.includes("faible densite") || title.includes("mondialisation")),
        theory: [
          "En geographie, on decrit un espace puis on explique son organisation.",
          "Il faut parler des acteurs, des activites, des amenagements et des liens avec d'autres territoires.",
          "Les exemples concrets sont essentiels : ville, region, axe de transport, usine, service, tourisme, commerce mondial."
        ],
        method: ["Localise l'espace et donne son echelle.", "Decris ce que l'on observe.", "Explique les activites et les acteurs.", "Ajoute un exemple concret.", "Conclus sur les effets pour le territoire."],
        exampleDetail: "Un espace productif industriel peut etre decrit avec ses usines, ses emplois, ses transports et ses liens avec d'autres regions ou pays.",
        check: "As-tu localise le territoire avant de l'expliquer ?"
      },
      {
        match: subject === "histoire" && title.includes("institution"),
        theory: [
          "Les institutions sont les organisations qui font fonctionner la Republique.",
          "Elles ont des roles differents : voter la loi, gouverner, juger, representer les citoyens ou faire appliquer les decisions.",
          "Il faut distinguer une valeur et une institution. La liberte est une valeur. Le Parlement est une institution."
        ],
        method: ["Repere le nom de l'institution.", "Demande-toi quel est son role.", "Relie ce role a la democratie.", "Donne un exemple concret d'action ou de decision."],
        exampleDetail: "Le Parlement vote la loi. Le gouvernement dirige la politique du pays et met les lois en application. La justice juge en appliquant le droit.",
        check: "As-tu explique le role de l'institution, pas seulement cite son nom ?"
      },
      {
        match: subject === "histoire" && (title.includes("institution") || title.includes("citoyen") || title.includes("laicite") || title.includes("droits") || chapter.includes("emc") || chapter.includes("valeurs")),
        theory: [
          "En EMC, on explique comment les personnes vivent ensemble dans une democratie.",
          "Une valeur est un principe important, comme la liberte ou l'egalite. Une institution est une organisation publique, comme le Parlement ou le gouvernement.",
          "Un droit donne une liberte ou une protection. Un devoir rappelle ce que chacun doit respecter pour vivre avec les autres."
        ],
        method: ["Definis le mot important avec une phrase simple.", "Explique son role dans la vie collective.", "Donne un exemple concret.", "Relie l'exemple a la loi, a la citoyennete ou a la Republique."],
        exampleDetail: "La laicite protege la liberte de conscience : chacun peut croire ou ne pas croire, et l'Etat reste neutre.",
        check: "As-tu donne un exemple concret, pas seulement une definition ?"
      },
      {
        match: subject === "sciences" && title.includes("graphique"),
        theory: [
          "Un graphique sert a montrer comment une grandeur change.",
          "Avant de conclure, il faut lire le titre, les axes et les unites. Sinon on risque de parler de la mauvaise grandeur.",
          "Une conclusion scientifique doit rester proche des donnees. On ne doit pas inventer une information absente du graphique."
        ],
        method: ["Lis le titre du graphique.", "Lis l'axe horizontal et l'axe vertical.", "Repere les unites.", "Compare les valeurs importantes.", "Ecris une conclusion courte appuyee sur un chiffre."],
        exampleDetail: "Si la masse diminue quand la surface des feuilles diminue, on peut dire que les donnees montrent un lien entre surface des feuilles et production de matiere.",
        check: "Ta conclusion cite-t-elle une donnee ou une tendance visible ?"
      },
      {
        match: subject === "sciences" && (title.includes("cellule") || title.includes("adn") || title.includes("microorganismes") || title.includes("experience")),
        theory: [
          "En SVT, on explique le vivant avec des observations, des experiences et du vocabulaire precis.",
          "La cellule est une unite de base du vivant. Les chromosomes, les genes et l'ADN portent des informations hereditaires.",
          "Pour une experience, il faut distinguer le facteur teste, le resultat observe et la conclusion possible."
        ],
        method: ["Identifie le phenomene etudie.", "Repere ce qui est observe ou mesure.", "Cherche le facteur qui change si c'est une experience.", "Relie le resultat au vocabulaire du cours.", "Conclus sans aller plus loin que les donnees."],
        exampleDetail: "Si seule la quantite de lumiere change et que la croissance change aussi, on peut etudier l'effet de la lumiere sur la croissance.",
        check: "As-tu separe observation, resultat et conclusion ?"
      },
      {
        match: subject === "sciences" && (title.includes("masse volumique") || title.includes("mouvement") || title.includes("conservation") || title.includes("ph") || title.includes("circuit") || title.includes("energie")),
        theory: [
          "En physique-chimie, on utilise souvent une mesure, une unite, une formule ou un modele.",
          "Une formule ne sert que si les grandeurs et les unites sont bien identifiees.",
          "Pour interpreter un resultat, il faut nommer le phenomene : acidite, mouvement, masse volumique, circuit ferme, reaction chimique ou conversion d'energie."
        ],
        method: ["Repere les grandeurs donnees.", "Note les unites.", "Choisis la formule ou le vocabulaire utile.", "Fais le calcul ou l'interpretation.", "Ecris une phrase avec l'unite ou le phenomene observe."],
        exampleDetail: "Pour une masse volumique, on calcule masse / volume. Si m = 50 g et V = 25 cm3, alors la masse volumique vaut 2 g/cm3.",
        check: "As-tu garde la bonne unite dans ta reponse ?"
      },
      {
        match: subject === "sciences" && (title.includes("boucle") || title.includes("chaine d'information") || title.includes("fonction d'usage") || chapter.includes("technologie")),
        theory: [
          "En technologie, on etudie un objet technique ou un systeme automatique.",
          "Le besoin explique pourquoi l'objet existe. La fonction d'usage explique ce que l'objet permet de faire.",
          "Dans un systeme automatique, un capteur detecte une information, un programme la traite, puis un actionneur realise une action."
        ],
        method: ["Identifie l'objet ou le systeme.", "Dis a quel besoin il repond.", "Separe capteur, traitement et actionneur.", "Lis l'algorithme dans l'ordre.", "Repere les conditions et les boucles."],
        exampleDetail: "Dans une porte automatique, le detecteur de presence est un capteur. Le programme traite l'information. Le moteur est un actionneur.",
        check: "As-tu distingue ce qui detecte, ce qui decide et ce qui agit ?"
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

  function getStudentCourseIntro(lesson) {
    return `Tu vas travailler ${lesson.chapter}. Le but est de comprendre l'idee principale, puis de t'entrainer avec des questions progressives.`;
  }

  function getCourseVocabulary(lesson) {
    const subject = lesson.subject;
    const text = `${lesson.chapter || ""} ${lesson.title || ""}`.toLowerCase();
    const entries = [
      [subject === "mathematiques" && text.includes("probabil"), ["issue", "evenement", "cas favorables", "cas possibles"]],
      [subject === "mathematiques" && text.includes("statistique"), ["moyenne", "mediane", "serie", "valeur"]],
      [subject === "mathematiques" && text.includes("geometrie"), ["triangle rectangle", "theoreme", "longueur", "unite"]],
      [subject === "mathematiques" && text.includes("fonction"), ["fonction", "image", "antecedent", "valeur de depart"]],
      [subject === "mathematiques" && text.includes("litteral"), ["expression", "developper", "factoriser", "remplacer x"]],
      [subject === "mathematiques" && text.includes("equation"), ["equation", "inconnue", "solution", "verifier"]],
      [subject === "francais" && text.includes("grammaire"), ["verbe", "sujet", "COD", "fonction"]],
      [subject === "francais" && text.includes("orthographe"), ["accord", "sujet", "pluriel", "participe passe"]],
      [subject === "francais" && text.includes("lecture"), ["indice", "citation", "idee", "justifier"]],
      [subject === "francais" && text.includes("redaction"), ["sujet", "plan", "paragraphe", "exemple"]],
      [subject === "histoire" && (text.includes("emc") || text.includes("citoy")), ["droit", "devoir", "loi", "citoyen"]],
      [subject === "histoire" && text.includes("valeurs"), ["liberte", "egalite", "fraternite", "laicite"]],
      [subject === "histoire" && text.includes("document"), ["nature", "auteur", "date", "sujet"]],
      [subject === "histoire", ["repere", "acteur", "cause", "consequence"]],
      [subject === "sciences" && text.includes("donnees"), ["donnee", "unite", "graphique", "conclusion"]],
      [subject === "sciences" && text.includes("svt"), ["experience", "facteur teste", "resultat", "vivant"]],
      [subject === "sciences" && text.includes("physique"), ["mesure", "unite", "formule", "pH"]],
      [subject === "sciences" && text.includes("technologie"), ["capteur", "actionneur", "information", "algorithme"]]
    ];
    return entries.find(([match]) => match)?.[1] || ["consigne", "methode", "exemple", "verification"];
  }

  function getCourseWarmup(lesson) {
    const chapter = String(lesson.chapter || "").toLowerCase();
    if (lesson.subject === "mathematiques") return "Avant de calculer, demande-toi : qu'est-ce que je cherche ? quelles donnees sont utiles ?";
    if (lesson.subject === "francais") return "Avant de repondre, cherche les mots importants de la consigne et un indice precis dans le texte.";
    if (lesson.subject === "histoire") return "Avant de repondre, situe le sujet : quand ? ou ? qui ? quel mot du cours faut-il utiliser ?";
    if (chapter.includes("technologie")) return "Avant de repondre, separe ce qui detecte, ce qui traite l'information et ce qui agit.";
    return "Avant de repondre, repere ce qui est donne, ce qui change et ce que tu dois conclure.";
  }

  function renderLessonBody(lesson) {
    const details = getCourseDetails(lesson);
    const vocabulary = getCourseVocabulary(lesson);
    const prerequisite = lesson.prerequisite || "Tu peux commencer directement : lis la methode, puis observe l'exemple.";
    return `
      <p class="course-intro">${getStudentCourseIntro(lesson)}</p>
      <div class="course-note course-note-wide">
        <strong>Ce que tu dois savoir au depart</strong>
        <p>${prerequisite}</p>
      </div>
      <section class="course-section">
        <h4>L'idee simple</h4>
        <p>${lesson.summary}</p>
        ${details.theory.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </section>
      <section class="course-section">
        <h4>Mots a connaitre</h4>
        <div class="keyword-list">
          ${vocabulary.map((word) => `<span>${word}</span>`).join("")}
        </div>
      </section>
      <section class="course-section">
        <h4>Methode pas a pas</h4>
        <ol class="course-method">
          ${details.method.map((step) => `<li>${step}</li>`).join("")}
        </ol>
      </section>
      <div class="lesson-callout">
        <strong>Exemple explique</strong>
        <p><strong>Situation :</strong> ${lesson.example || details.exampleDetail}</p>
        <p><strong>Comment raisonner :</strong> ${details.exampleDetail}</p>
        <p><strong>A faire toi-meme :</strong> cache la correction, refais l'exemple, puis compare les etapes.</p>
      </div>
      <div class="lesson-callout soft">
        <strong>Avant les questions</strong>
        <p>${getCourseWarmup(lesson)}</p>
        <p>${details.check}</p>
      </div>
      <div class="course-grid">
        <div class="course-note">
          <strong>Phrase a retenir</strong>
          <p>${getLessonTakeaway(lesson)}</p>
        </div>
        <div class="course-note warning">
          <strong>Erreur a eviter</strong>
          <p>${getLessonMistake(lesson)}</p>
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
            <button class="secondary-action" data-start-curriculum="${item.id}" type="button">Travailler</button>
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
    const exactLessons = content.lessons
      .filter((lesson) => lesson.subject === notion.subject)
      .filter((lesson) => lesson.notionId === notion.id);
    const nearbyLessons = content.lessons
      .filter((lesson) => lesson.subject === notion.subject)
      .filter((lesson) => chapterMatches(notion.chapter, lesson.chapter));
    const lessons = exactLessons.length ? exactLessons : nearbyLessons;
    return lessons
      .sort((a, b) => {
        const aStageGap = Math.abs(stageOrder.indexOf(a.stage || "Decouverte") - targetIndex);
        const bStageGap = Math.abs(stageOrder.indexOf(b.stage || "Decouverte") - targetIndex);
        return aStageGap - bStageGap || a.title.localeCompare(b.title);
      })[0]
      || {
        id: `fallback-${notion.id}`,
        subject: notion.subject,
        chapter: notion.chapter,
        stage: targetStage,
        title: notion.title,
        summary: `Ce chapitre sert a travailler ${notion.title}. Commence par comprendre les mots importants, puis applique la methode sur les questions.`,
        prerequisite: "Lis lentement la consigne et repere les mots importants du chapitre.",
        example: "Pour reussir, commence par identifier le chapitre, puis choisis la methode adaptee.",
        mistake: "Partir sur un autre chapitre parce qu'un mot semble familier.",
        takeaway: "Reste toujours sur le chapitre choisi et justifie ta reponse avec la methode du cours."
      };
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

    if (notion) {
      const generatedCount = Math.max(4, count + 3 - pool.length);
      pool = [...pool, ...generateQuestionsForNotion(notion, generatedCount, pool.length)];
    } else if (focusChapter) {
      const generatedCount = Math.max(4, count + 3 - pool.length);
      pool = [...pool, ...generateQuestionsForChapter(subjectId, focusChapter, generatedCount, pool.length)];
    }

    if (!pool.length && !notion && !focusChapter) {
      pool = content.exercises.filter((exercise) => exercise.subject === subjectId);
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

    const selected = [];
    const usedQuestions = new Set();
    sortedPool.forEach((exercise) => {
      const questionKey = normalizeText(exercise.question || exercise.prompt || exercise.id);
      if (selected.length >= count || usedQuestions.has(questionKey)) return;
      selected.push(exercise);
      usedQuestions.add(questionKey);
    });
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

  function renderAnnales() {
    const yearSelect = document.getElementById("annalYear");
    const subjectSelect = document.getElementById("annalSubject");
    if (!yearSelect || !subjectSelect) return;

    const previousYear = yearSelect.value || String(annalYears[0]);
    const defaultSubject = content.subjects.some((subject) => subject.id === activeSubject) ? activeSubject : content.subjects[0]?.id;
    const previousSubject = subjectSelect.value || defaultSubject;
    yearSelect.innerHTML = annalYears.map((year) => `<option value="${year}">${year}</option>`).join("");
    subjectSelect.innerHTML = content.subjects.map((subject) => `<option value="${subject.id}">${subject.label}</option>`).join("");
    yearSelect.value = annalYears.map(String).includes(previousYear) ? previousYear : String(annalYears[0]);
    subjectSelect.value = content.subjects.some((subject) => subject.id === previousSubject) ? previousSubject : defaultSubject;

    const runs = (progress.annalExamRuns || []).slice().sort((left, right) => `${right.date}${right.id}`.localeCompare(`${left.date}${left.id}`));
    const best = runs.length ? Math.max(...runs.map((run) => Number(run.score) || 0)) : 0;
    const status = document.getElementById("annalStatus");
    if (status) {
      status.textContent = runs.length
        ? `Derniere note : ${runs[0].score}/20 en ${runs[0].year} - ${subjectLabel(runs[0].subject)}.`
        : "Aucune note enregistree pour le moment.";
    }
    const bestContainer = document.getElementById("annalBestScore");
    if (bestContainer) {
      const nextTarget = best >= 17
        ? "Badge Annales or atteint."
        : best >= 14
          ? "Prochain palier : 17/20 pour l'or."
          : best >= 10
            ? "Prochain palier : 14/20 pour l'argent."
            : "Premier palier : 10/20 pour le bronze.";
      bestContainer.innerHTML = `
        <div class="lesson-callout soft">
          <strong>Meilleure note : ${best ? `${best}/20` : "aucune"}</strong>
          <p>${nextTarget}</p>
        </div>
      `;
    }

    const history = document.getElementById("annalHistory");
    if (history) {
      history.innerHTML = runs.length
        ? `<div class="history-list">${runs.slice(0, 10).map((run) => `
            <div class="history-item">
              <span>${run.date} - ${run.year} - ${subjectLabel(run.subject)}</span>
              <strong>${run.score}/20</strong>
            </div>
          `).join("")}</div>`
        : `<p class="muted">Aucune annale complete enregistree pour le moment.</p>`;
    }
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
    let repairOutcome = null;

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
        repairOutcome = registerRepair(question);
        if (repairOutcome.repaired) addPoints(10);
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
      const retryMistake = repairOutcome && !repairOutcome.repaired
        ? progress.mistakes.find((mistake) => mistake.id === question.retryOf)
        : null;
      const next = document.createElement("button");
      next.className = "secondary-action";
      next.type = "button";
      next.textContent = retryMistake ? "Question proche suivante" : "Nouvelle question";
      next.addEventListener("click", () => {
        currentPracticeQuestion = retryMistake
          ? (getRetryQuestionForMistake(retryMistake) || pickQuestion(question.subject))
          : pickQuestion(question.subject);
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
      existing.repairProgress = 0;
      existing.repairQuestionIds = [];
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
      repairProgress: 0,
      repairTarget: 2,
      repairQuestionIds: [],
      sessionHadError: Boolean(currentSession)
    });
  }

  function registerRepair(question) {
    const mistake = progress.mistakes.find((item) => item.id === question.retryOf);
    if (!mistake || mistake.repaired) return { repaired: false, remaining: 0 };
    mistake.repairTarget = mistake.repairTarget || 2;
    mistake.repairProgress = (mistake.repairProgress || 0) + 1;
    mistake.repairQuestionIds = [...new Set([...(mistake.repairQuestionIds || []), question.id])];
    if (mistake.repairProgress < mistake.repairTarget) {
      const remaining = mistake.repairTarget - mistake.repairProgress;
      showToast(`${remaining} question${remaining > 1 ? "s" : ""} proche${remaining > 1 ? "s" : ""} encore a reussir.`);
      return { repaired: false, remaining };
    }
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
    showToast("Erreur reparee apres plusieurs questions : +10 points.");
    awardBadges();
    return { repaired: true, remaining: 0 };
  }

  function getRetryQuestionForMistake(mistake) {
    const original = findExerciseByReference(mistake);
    const usedIds = new Set([mistake.exerciseId, ...(mistake.repairQuestionIds || [])]);
    let pool = content.exercises
      .filter((exercise) => exercise.subject === mistake.subject)
      .filter((exercise) => exercise.notionId && mistake.notionId ? exercise.notionId === mistake.notionId : chapterMatches(mistake.chapter, exercise.chapter))
      .filter((exercise) => !usedIds.has(exercise.id));

    const notion = mistake.notionId
      ? (content.notions || []).find((item) => item.id === mistake.notionId)
      : getNotionForChapter(mistake.subject, mistake.chapter);
    if (notion) {
      pool = [...pool, ...generateQuestionsForNotion(notion, 8, pool.length).filter((exercise) => !usedIds.has(exercise.id))];
    }

    if (original) {
      const originalText = `${original.question || original.prompt} ${original.explanation || ""}`;
      pool = pool
        .filter((exercise) => normalizeText(exercise.question || exercise.prompt) !== normalizeText(original.question || original.prompt))
        .sort((a, b) => {
          const aScore = textSimilarityScore(originalText, `${a.question || a.prompt} ${a.explanation || ""}`);
          const bScore = textSimilarityScore(originalText, `${b.question || b.prompt} ${b.explanation || ""}`);
          return bScore - aScore;
        });
    }

    const retry = pool[0] || original;
    return retry ? { ...retry, retryOf: mistake.id, reviewedBeforeRetry: true, retryVariant: retry.id !== mistake.exerciseId } : null;
  }

  function startMistakeReview() {
    const mistake = progress.mistakes.find((item) => !item.repaired);
    if (!mistake) {
      showToast("Aucune erreur a revoir pour le moment.");
      return;
    }
    const lesson = content.lessons.find((item) => item.subject === mistake.subject && item.chapter === mistake.chapter)
      || content.lessons.find((item) => item.subject === mistake.subject)
      || {
        subject: mistake.subject,
        chapter: mistake.chapter,
        title: `Revoir ${mistake.chapter}`,
        summary: "Relis la consigne, repere ce qui est demande, puis applique la methode pas a pas.",
        prerequisite: "Aucun prerequis particulier : commence par reprendre la correction de ton erreur.",
        example: "Observe la correction, puis refais une question proche sans regarder la reponse.",
        mistake: "Repondre trop vite sans changer de methode.",
        takeaway: "Une erreur est reparee quand tu sais reussir une question proche, pas seulement la meme question."
      };
    mistake.reviewed = true;
    mistake.repairTarget = mistake.repairTarget || 2;
    mistake.repairProgress = mistake.repairProgress || 0;
    saveProgress();
    setView("practice");
    const container = document.getElementById("practiceQuestion");
    container.innerHTML = `
      <span class="tag">Revision avant reprise</span>
      <h3>${lesson.title}</h3>
      ${renderLessonBody(lesson)}
      <div class="course-note">
        <strong>Objectif de reprise</strong>
        <p>Reussis ${mistake.repairTarget} questions proches pour montrer que la methode est comprise.</p>
      </div>
      <button class="primary-action" id="retryMistakeNow" type="button">S'entrainer sur une question proche</button>
    `;
    document.getElementById("retryMistakeNow").addEventListener("click", () => {
      currentPracticeQuestion = getRetryQuestionForMistake(mistake) || pickQuestion(mistake.subject);
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
    const allBadges = getAllBadges();
    const badges = getDisplayBadges(allBadges);
    const unlockedCount = allBadges.filter((badge) => progress.badges.includes(badge.id) || isBadgeUnlocked(badge)).length;
    const groups = [
      { id: "ultimate", title: "Badge ultime", description: "Le grand objectif de fin de pr\u00e9paration.", badges: badges.filter((badge) => badge.tier === "ultimate") },
      { id: "subjects", title: "Mati\u00e8res", description: "Un badge qui monte de bronze \u00e0 or dans chaque mati\u00e8re.", badges: badges.filter((badge) => badge.category === "Matiere") },
      { id: "challenges", title: "D\u00e9fis", description: "R\u00e9gularit\u00e9, pr\u00e9cision, erreurs r\u00e9par\u00e9es, annales et sujets longs.", badges: badges.filter((badge) => badge.category === "Defi" && badge.tier !== "ultimate") },
      { id: "chapters", title: "Chapitres", description: "La progression d\u00e9taill\u00e9e du programme.", badges: badges.filter((badge) => badge.category === "Chapitre") }
    ].filter((group) => group.badges.length);
    document.getElementById("badgeList").innerHTML = `
      <article class="badge-summary panel">
        <strong>${unlockedCount} / ${allBadges.length} paliers d\u00e9bloqu\u00e9s</strong>
        <span>${content.subjects.filter((subject) => isSubjectTierUnlocked(subject.id, "gold")).length} / ${content.subjects.length} mati\u00e8res au niveau or</span>
      </article>
      ${groups.map((group) => `
        <section class="badge-section badge-section-${group.id}">
          <div class="badge-section-heading">
            <h3>${group.title}</h3>
            <p>${group.description}</p>
          </div>
          <div class="badge-grid">
            ${group.badges.map(renderBadgeCard).join("")}
          </div>
        </section>
      `).join("")}
    `;
  }

  function getDisplayBadges(badges) {
    const tierRank = { locked: 0, bronze: 1, silver: 2, gold: 3, ultimate: 4 };
    const grouped = badges.reduce((map, badge) => {
      const key = badge.family || badge.id;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(badge);
      return map;
    }, new Map());
    return [...grouped.values()].map((familyBadges) => {
      const sorted = familyBadges.slice().sort((left, right) => (tierRank[left.tier] || 0) - (tierRank[right.tier] || 0));
      const unlocked = sorted.filter(isBadgeUnlocked).sort((left, right) => (tierRank[right.tier] || 0) - (tierRank[left.tier] || 0));
      const current = unlocked[0] || sorted[0];
      const next = sorted.find((badge) => !isBadgeUnlocked(badge));
      return {
        ...current,
        displayTier: current.tier,
        nextRequirement: next && next.id !== current.id ? next.requirement : null,
        lockedTitle: sorted[0].lockedTitle || getLockedBadgeTitle(sorted[0]),
        lockedDescription: sorted[0].lockedDescription || sorted[0].description
      };
    }).sort((left, right) => {
      const order = { ultimate: 0, Matiere: 1, Defi: 2, Chapitre: 3 };
      return (order[left.tier] ?? order[left.category] ?? 9) - (order[right.tier] ?? order[right.category] ?? 9);
    });
  }

  function getLockedBadgeTitle(badge) {
    if (badge.category === "Matiere") return badgeSubjectLabel(badge.subject);
    if (badge.category === "Chapitre") return badge.title.replace(/\s+-\s+J'apprends$/, "");
    if (badge.id?.includes("annales-exam")) return "Annales";
    return badge.title.replace(/\s+bronze$/i, "");
  }

  function renderBadgeCard(badge) {
    const unlocked = isBadgeUnlocked(badge);
    const tier = badge.tier || "bronze";
    const tierMeta = getBadgeTierMeta(tier);
    const requirement = badge.requirement || "Objectif";
    const icon = badge.icon || getBadgeIcon(badge);
    const image = unlocked ? (badge.image || getDefaultBadgeImage(badge)) : (badge.lockedImage || getDefaultBadgeImage({ ...badge, tier: "locked" }));
    return `
      <article class="badge-card ${unlocked ? `unlocked tier-${tier}` : `locked tier-${tier}`} ${tier === "ultimate" ? "badge-ultimate" : ""}">
        <div class="badge-award" aria-hidden="true">
          ${image ? `<img class="badge-medal-image" src="${image}" alt="">` : `
            <div class="badge-halo"></div>
            <div class="badge-medal">
              <div class="badge-inner-ring"></div>
              <div class="badge-mark">${unlocked ? icon : "?"}</div>
            </div>
          `}
          <div class="badge-ribbon">${requirement}</div>
        </div>
        <div class="badge-content">
          <span class="badge-state">${unlocked ? tierMeta.label : "Verrouill\u00e9"}</span>
          <h3>${unlocked ? badge.title : (badge.lockedTitle || badge.title)}</h3>
          <p>${unlocked ? badge.description : (badge.lockedDescription || badge.description)}</p>
          <small>${unlocked ? `${tierMeta.level} - ${badge.category}` : `${tierMeta.label} \u00e0 d\u00e9bloquer`}${badge.nextRequirement ? ` - prochain palier : ${badge.nextRequirement}` : ""}</small>
        </div>
      </article>
    `;
  }

  function getBadgeTierMeta(tier) {
    const meta = {
      bronze: { label: "Bronze", level: "Niveau 1", number: "1" },
      silver: { label: "Argent", level: "Niveau 2", number: "2" },
      gold: { label: "Or", level: "Niveau 3", number: "3" },
      ultimate: { label: "Ultime", level: "Complet", number: "\u2605" }
    };
    return meta[tier] || meta.bronze;
  }

  function getDefaultBadgeImage(badge) {
    const tier = badge.tier || "bronze";
    const family = getBadgeImageFamily(badge);
    return `assets/badges/badge-${family}-${tier}.webp`;
  }

  function getBadgeImageFamily(badge) {
    if (badge.tier === "ultimate" || badge.id?.includes("all-subject-gold")) return "ultimate";
    if (badge.category === "Chapitre") return "chapter";
    if (badge.subject === "mathematiques") return "subject-math";
    if (badge.subject === "francais") return "subject-french";
    if (badge.subject === "histoire") return "subject-history";
    if (badge.subject === "sciences") return "subject-science";
    if (badge.id?.includes("sessions")) return "sessions";
    if (badge.id?.includes("questions")) return "questions";
    if (badge.id?.includes("streak")) return "streak";
    if (badge.id?.includes("repairs")) return "repairs";
    if (badge.id?.includes("perfect")) return "perfect";
    if (badge.id?.includes("stage:Decouverte")) return "stage-discovery";
    if (badge.id?.includes("stage:Consolidation")) return "stage-training";
    if (badge.id?.includes("stage:Type brevet")) return "stage-exam";
    if (badge.id?.includes("guided")) return "guided";
    if (badge.id?.includes("annales-exam")) return "annales";
    return "chapter";
  }

  function getSubjectBadgeIcon(subjectId) {
    const icons = {
      mathematiques: "\u03c0",
      francais: "A",
      histoire: "§",
      sciences: "\u269b",
      mixed: "\u2605"
    };
    return icons[subjectId] || "B";
  }

  function badgeSubjectLabel(subjectId) {
    const labels = {
      mathematiques: "Math\u00e9matiques",
      francais: "Fran\u00e7ais",
      histoire: "Histoire-G\u00e9o EMC",
      sciences: "Sciences"
    };
    return labels[subjectId] || subjectLabel(subjectId);
  }

  function getBadgeIcon(badge) {
    if (badge.subject) return getSubjectBadgeIcon(badge.subject);
    if (badge.category === "Chapitre") {
      const item = content.curriculum.find((curriculumItem) => badge.id.startsWith(`chapter:${curriculumItem.id}:`));
      return getSubjectBadgeIcon(item?.subject);
    }
    if (badge.id.includes("streak")) return "\u25f7";
    if (badge.id.includes("questions")) return "\u00d7";
    if (badge.id.includes("repairs")) return "!";
    if (badge.id.includes("perfect")) return "\u2713";
    if (badge.id.includes("guided")) return "\u25a3";
    if (badge.id.includes("stage")) return "\u25c6";
    return "B";
  }

  function getAllBadges() {
    return [
      ...getChapterBadges(),
      ...getSubjectBadges(),
      ...getSpecialBadges()
    ];
  }

  function getChapterBadges() {
    return content.curriculum.flatMap((item) => {
      const base = `${subjectLabel(item.subject)} - ${item.chapter}`;
      return [
        {
          id: `chapter:${item.id}:bronze`,
          family: `chapter:${item.id}`,
          category: "Chapitre",
          subject: item.subject,
          tier: "bronze",
          title: `${item.chapter} - J'apprends`,
          description: `Valider les bases du chapitre ${base}.`,
          requirement: "4 bonnes / 5 questions",
          evaluate: () => {
            const stats = getCurriculumBadgeStats(item);
            return stats.total >= 5 && stats.correct >= 4 && stats.rate >= 60;
          }
        },
        {
          id: `chapter:${item.id}:silver`,
          family: `chapter:${item.id}`,
          category: "Chapitre",
          subject: item.subject,
          tier: "silver",
          title: `${item.chapter} - Je m'entraine`,
          description: `Montrer une maitrise reguliere du chapitre ${base}.`,
          requirement: "9 bonnes / 12 questions",
          evaluate: () => {
            const stats = getCurriculumBadgeStats(item);
            return stats.total >= 12 && stats.correct >= 9 && stats.rate >= 70 && stats.stageCorrect.Consolidation >= 3;
          }
        },
        {
          id: `chapter:${item.id}:gold`,
          family: `chapter:${item.id}`,
          category: "Chapitre",
          subject: item.subject,
          tier: "gold",
          title: `${item.chapter} - Comme au brevet`,
          description: `Reussir le chapitre ${base} dans des questions exigeantes.`,
          requirement: "16 bonnes / 20, dont 3 brevet",
          evaluate: () => {
            const stats = getCurriculumBadgeStats(item);
            return stats.total >= 20 && stats.correct >= 16 && stats.rate >= 80 && stats.stageCorrect["Type brevet"] >= 3;
          }
        }
      ];
    });
  }

  function getSubjectBadges() {
    return content.subjects.flatMap((subject) => {
      const label = badgeSubjectLabel(subject.id);
      return [
        {
          id: `subject:${subject.id}:bronze`,
          family: `subject:${subject.id}`,
          category: "Matiere",
          subject: subject.id,
          icon: getSubjectBadgeIcon(subject.id),
          tier: "bronze",
          title: `${label} bronze`,
          description: `Installer les bases en ${label}.`,
          requirement: "18 bonnes / 25 questions",
          evaluate: () => {
            const stats = getSubjectBadgeStats(subject.id);
            return stats.total >= 25 && stats.correct >= 18 && stats.rate >= 60;
          }
        },
        {
          id: `subject:${subject.id}:silver`,
          family: `subject:${subject.id}`,
          category: "Matiere",
          subject: subject.id,
          icon: getSubjectBadgeIcon(subject.id),
          tier: "silver",
          title: `${label} argent`,
          description: `Etre regulier dans plusieurs chapitres de ${label}.`,
          requirement: "60 questions, 70 %, 2 chapitres argent",
          evaluate: () => {
            const stats = getSubjectBadgeStats(subject.id);
            return stats.total >= 60 && stats.rate >= 70 && countUnlockedChapterBadges(subject.id, "silver") >= 2;
          }
        },
        {
          id: `subject:${subject.id}:gold`,
          family: `subject:${subject.id}`,
          category: "Matiere",
          subject: subject.id,
          icon: getSubjectBadgeIcon(subject.id),
          tier: "gold",
          title: `${label} or`,
          description: `Atteindre un niveau solide et durable en ${label}.`,
          requirement: "120 questions, 80 %, 3 chapitres or",
          evaluate: () => {
            const stats = getSubjectBadgeStats(subject.id);
            return stats.total >= 120 && stats.rate >= 80 && countUnlockedChapterBadges(subject.id, "gold") >= 3;
          }
        }
      ];
    });
  }

  function getSpecialBadges() {
    const subjectsDone = () => new Set(progress.answers.map((answer) => answer.subject)).size;
    const stageCorrect = (stage) => progress.answers.filter((answer) => answer.correct && answer.stage === stage).length;
    const guidedDone = () => (progress.guidedTasks || []).length;
    const guidedSolid = () => (progress.guidedTasks || []).filter((task) => task.score >= 4).length;
    const bestAnnalExamScore = () => Math.max(0, ...(progress.annalExamRuns || []).map((run) => Number(run.score) || 0));
    const annalExamCount = () => (progress.annalExamRuns || []).length;
    const specials = [
      ["sessions:1", "bronze", "Premiere seance", "Terminer une premiere seance.", "1 seance", "◆", () => progress.sessions.length >= 1],
      ["sessions:10", "silver", "Routine installee", "Terminer 10 seances.", "10 seances", "◆", () => progress.sessions.length >= 10],
      ["sessions:30", "gold", "Vrai rythme", "Terminer 30 seances.", "30 seances", "◆", () => progress.sessions.length >= 30],
      ["sessions:75", "gold", "Marathon revision", "Terminer 75 seances.", "75 seances", "◆", () => progress.sessions.length >= 75],
      ["questions:50", "bronze", "Volume d'exercices", "Repondre a 50 questions.", "50 questions", "×", () => progress.answers.length >= 50],
      ["questions:150", "silver", "Cap des 150", "Repondre a 150 questions.", "150 questions", "×", () => progress.answers.length >= 150],
      ["questions:500", "gold", "Gros entrainement", "Repondre a 500 questions.", "500 questions", "×", () => progress.answers.length >= 500],
      ["questions:1000", "gold", "Mille questions", "Repondre a 1000 questions.", "1000 questions", "×", () => progress.answers.length >= 1000],
      ["streak:3", "bronze", "Regularite", "Travailler 3 jours de suite.", "3 jours", "◷", () => progress.currentStreak >= 3],
      ["streak:7", "silver", "Semaine solide", "Travailler 7 jours de suite.", "7 jours", "◷", () => progress.currentStreak >= 7],
      ["streak:30", "gold", "Mois complet", "Travailler 30 jours de suite.", "30 jours", "◷", () => progress.currentStreak >= 30],
      ["streak:100", "gold", "Cent jours", "Travailler 100 jours de suite.", "100 jours", "◷", () => progress.currentStreak >= 100],
      ["repairs:1", "bronze", "Erreurs", "Relire le cours puis reussir une question proche.", "1 erreur", "!", () => progress.repairs.length >= 1],
      ["repairs:10", "silver", "Erreurs reparees", "Reparer 10 erreurs apres revision.", "10 erreurs", "!", () => progress.repairs.length >= 10],
      ["repairs:30", "gold", "Anti-pieges", "Reparer 30 erreurs apres revision.", "30 erreurs", "!", () => progress.repairs.length >= 30],
      ["repairs:75", "gold", "Expert des reprises", "Reparer 75 erreurs avec methode.", "75 erreurs", "!", () => progress.repairs.length >= 75],
      ["perfect:1", "bronze", "Precision", "Reussir une seance sans erreur.", "1 sans faute", "✓", () => progress.perfectRuns >= 1],
      ["perfect:5", "silver", "Precision argent", "Reussir 5 seances sans erreur.", "5 sans faute", "✓", () => progress.perfectRuns >= 5],
      ["perfect:20", "gold", "Precision or", "Reussir 20 seances sans erreur.", "20 sans faute", "✓", () => progress.perfectRuns >= 20],
      ["perfect:50", "gold", "Maitrise complete", "Reussir 50 seances sans erreur.", "50 sans faute", "✓", () => progress.perfectRuns >= 50],
      ["subjects:4", "silver", "Tour d'horizon", "Travailler les quatre matieres.", "4 matieres", "★", () => subjectsDone() >= 4],
      ["stage:Decouverte:60", "bronze", "J'apprends", "Reussir 60 questions en mode J'apprends.", "60 reussites", "1", () => stageCorrect("Decouverte") >= 60],
      ["stage:Consolidation:120", "silver", "Je m'entraine", "Reussir 120 questions en mode Je m'entraine.", "120 reussites", "2", () => stageCorrect("Consolidation") >= 120],
      ["stage:Type brevet:200", "gold", "Comme au brevet", "Reussir 200 questions Comme au brevet.", "200 reussites", "3", () => stageCorrect("Type brevet") >= 200],
      ["guided:1", "bronze", "Premier sujet long", "Terminer un sujet guide.", "1 sujet", "▣", () => guidedDone() >= 1],
      ["guided:5", "silver", "Sujets longs", "Terminer 5 sujets guides.", "5 sujets", "▣", () => guidedDone() >= 5],
      ["guided:15", "gold", "Pret pour les sujets longs", "Terminer 15 sujets guides.", "15 sujets", "▣", () => guidedDone() >= 15],
      ["guided-solid:8", "gold", "Copies solides", "Obtenir 8 sujets guides solides.", "8 solides", "▣", () => guidedSolid() >= 8],
      ["annales-exam:bronze", "bronze", "Annales bronze", "Refaire un examen complet d'annale avec une note correcte.", "1 examen, 10/20", "▤", () => annalExamCount() >= 1 && bestAnnalExamScore() >= 10],
      ["annales-exam:silver", "silver", "Annales argent", "Refaire un examen complet d'annale avec une bonne note.", "1 examen, 14/20", "▤", () => annalExamCount() >= 1 && bestAnnalExamScore() >= 14],
      ["annales-exam:gold", "gold", "Annales or", "Refaire un examen complet d'annale avec un niveau tres solide.", "1 examen, 17/20", "▤", () => annalExamCount() >= 1 && bestAnnalExamScore() >= 17],
      ["all-subject-gold", "ultimate", "Badge ultime", "Obtenir l'or dans les quatre matieres et garder un vrai rythme.", "Complet", "★", () => content.subjects.every((subject) => isSubjectTierUnlocked(subject.id, "gold")) && progress.perfectRuns >= 20 && progress.repairs.length >= 30]
    ];
    return specials.map(([id, tier, title, description, requirement, icon, imageOrEvaluate, maybeEvaluate]) => ({
      id: `special:${id}`,
      family: `special:${id.split(":")[0]}`,
      category: "Defi",
      tier,
      title,
      description,
      requirement,
      icon,
      image: typeof imageOrEvaluate === "string" ? imageOrEvaluate : null,
      lockedImage: null,
      evaluate: typeof imageOrEvaluate === "function" ? imageOrEvaluate : maybeEvaluate
    }));
  }

  function isBadgeUnlocked(badge) {
    if (progress.badges.includes(badge.id)) return true;
    return Boolean(badge.evaluate?.());
  }

  function getCurriculumBadgeStats(item) {
    const answers = progress.answers.filter((answer) => answer.subject === item.subject && chapterMatches(item.chapter, answer.chapter));
    const correct = answers.filter((answer) => answer.correct).length;
    const stageCorrect = {
      Decouverte: answers.filter((answer) => answer.correct && answer.stage === "Decouverte").length,
      Consolidation: answers.filter((answer) => answer.correct && answer.stage === "Consolidation").length,
      "Type brevet": answers.filter((answer) => answer.correct && answer.stage === "Type brevet").length
    };
    return {
      total: answers.length,
      correct,
      rate: answers.length ? Math.round((correct / answers.length) * 100) : 0,
      stageCorrect
    };
  }

  function getSubjectBadgeStats(subjectId) {
    const answers = progress.answers.filter((answer) => answer.subject === subjectId);
    const correct = answers.filter((answer) => answer.correct).length;
    return {
      total: answers.length,
      correct,
      rate: answers.length ? Math.round((correct / answers.length) * 100) : 0
    };
  }

  function countUnlockedChapterBadges(subjectId, tier) {
    return getChapterBadges()
      .filter((badge) => badge.tier === tier)
      .filter((badge) => content.curriculum.find((item) => badge.id === `chapter:${item.id}:${tier}` && item.subject === subjectId))
      .filter(isBadgeUnlocked).length;
  }

  function isSubjectTierUnlocked(subjectId, tier) {
    const badge = getSubjectBadges().find((item) => item.id === `subject:${subjectId}:${tier}`);
    return Boolean(badge && isBadgeUnlocked(badge));
  }

  function renderSettings() {
    const version = document.getElementById("settingsVersion");
    const themeSelect = document.getElementById("themeSelect");
    if (version) version.textContent = appVersion;
    if (themeSelect && themeSelect.value !== settings.theme) themeSelect.value = settings.theme;
  }

  function compareVersions(a, b) {
    const left = String(a || "0").split(".").map((part) => Number(part) || 0);
    const right = String(b || "0").split(".").map((part) => Number(part) || 0);
    const length = Math.max(left.length, right.length);
    for (let index = 0; index < length; index += 1) {
      const diff = (left[index] || 0) - (right[index] || 0);
      if (diff !== 0) return diff;
    }
    return 0;
  }

  async function checkForUpdates() {
    const status = document.getElementById("updateStatus");
    const button = document.getElementById("checkUpdateButton");
    if (!status || !button) return;
    button.disabled = true;
    status.textContent = "Verification en cours...";
    try {
      const response = await fetch(`version.json?check=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("version unavailable");
      const remote = await response.json();
      const remoteVersion = remote.version || "0.0.0";
      if (compareVersions(remoteVersion, appVersion) > 0) {
        status.textContent = `Mise a jour disponible : version ${remoteVersion}. Le telechargement sera active avec l'installation PWA.`;
      } else {
        status.textContent = `Tu as deja la derniere version disponible (${appVersion}).`;
      }
    } catch (error) {
      status.textContent = "Connexion necessaire pour verifier les mises a jour.";
    } finally {
      button.disabled = false;
      applyTextPolish(status);
    }
  }

  function bindEvents() {
    document.querySelectorAll(".nav-item").forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.view));
    });

    document.body.addEventListener("click", (event) => {
      const updateButton = event.target.closest("#checkUpdateButton");
      if (updateButton) {
        checkForUpdates();
      }

      const installButton = event.target.closest("#installAppButton");
      if (installButton) {
        setView("settings");
        showToast("Installation bientot disponible. La prochaine etape est la PWA hors ligne.");
      }

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

      const startCurriculum = event.target.closest("[data-start-curriculum]");
      if (startCurriculum) {
        const item = content.curriculum.find((curriculumItem) => curriculumItem.id === startCurriculum.dataset.startCurriculum);
        if (item) {
          const notion = getNotionForChapter(item.subject, item.chapter);
          document.getElementById("sessionSubject").value = item.subject;
          renderSessionNotions();
          document.getElementById("sessionNotion").value = notion?.id || "auto";
          clearSessionStage();
          setView("session");
        }
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

      if (event.target.closest("#saveAnnalScoreButton")) {
        registerAnnalScore();
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

    document.body.addEventListener("change", (event) => {
      if (event.target.id === "themeSelect") {
        settings.theme = event.target.value === "dark" ? "dark" : "light";
        saveSettings();
        applyTheme(settings.theme);
      }
    });

    const recommendedButton = document.querySelector("[data-start-recommended]");
    if (recommendedButton) {
      recommendedButton.addEventListener("click", () => {
        document.getElementById("sessionSubject").value = activeSubject;
        renderSessionNotions();
        document.getElementById("sessionNotion").value = "auto";
        clearSessionStage();
        setView("session");
      });
    }

    document.getElementById("startSessionButton").addEventListener("click", startSession);
    document.getElementById("sessionSubject").addEventListener("change", () => {
      clearSessionStage();
      renderSessionNotions();
    });
    document.getElementById("sessionNotion").addEventListener("change", clearSessionStage);
    document.getElementById("sessionDuration").addEventListener("change", clearSessionStage);
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

  let appInitialized = false;

  function initApp() {
    if (appInitialized) return;
    appInitialized = true;
    bindEvents();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, { once: true });
  } else {
    initApp();
  }

  window.addEventListener("pageshow", () => {
    if (appInitialized) render();
  });
}());
