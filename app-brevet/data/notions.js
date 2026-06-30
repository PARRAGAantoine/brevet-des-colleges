(function () {
  const content = window.BREVET_CONTENT;

  content.notions = [
    {
      id: "math.nombres-calculs",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      title: "Nombres, fractions, puissances et priorites",
      type: "calculatoire",
      prerequisites: ["math.operations"],
      coursePath: "cours/maths-nombres-calculs.html",
      generators: ["math.nombres.fraction-simplifier", "math.nombres.fraction-addition", "math.nombres.puissance-dix", "math.nombres.priorites"]
    },
    {
      id: "math.probabilites",
      subject: "mathematiques",
      chapter: "Probabilites",
      title: "Probabilites simples",
      type: "calculatoire",
      prerequisites: ["math.fractions"],
      coursePath: "cours/maths-probabilites.html",
      generators: ["math.proba.urne", "math.proba.de", "math.proba.roue"]
    },
    {
      id: "math.statistiques",
      subject: "mathematiques",
      chapter: "Statistiques",
      title: "Moyenne, mediane et series statistiques",
      type: "calculatoire",
      prerequisites: ["math.operations"],
      coursePath: "cours/maths-statistiques.html",
      generators: ["math.stats.moyenne", "math.stats.mediane"]
    },
    {
      id: "math.geometrie",
      subject: "mathematiques",
      chapter: "Geometrie",
      title: "Pythagore, Thales, trigonometrie et volumes",
      type: "calculatoire",
      prerequisites: ["math.proportionnalite", "math.nombres-calculs"],
      coursePath: "cours/maths-geometrie.html",
      generators: ["math.geometrie.pythagore-longueur", "math.geometrie.pythagore-reciproque", "math.geometrie.thales", "math.geometrie.trigonometrie", "math.geometrie.volume-pave"]
    },
    {
      id: "math.fonctions",
      subject: "mathematiques",
      chapter: "Fonctions",
      title: "Fonctions, images et antecedents",
      type: "calculatoire",
      prerequisites: ["math.calcul-litteral", "math.equations"],
      coursePath: "cours/maths-fonctions.html",
      generators: ["math.fonctions.image", "math.fonctions.antecedent"]
    },
    {
      id: "math.calcul-litteral",
      subject: "mathematiques",
      chapter: "Calcul litteral",
      title: "Developper, factoriser et calculer avec des lettres",
      type: "calculatoire",
      prerequisites: ["math.operations"],
      coursePath: "cours/maths-calcul-litteral.html",
      generators: ["math.litteral.developper", "math.litteral.factoriser", "math.litteral.evaluer"]
    },
    {
      id: "math.equations",
      subject: "mathematiques",
      chapter: "Equations",
      title: "Equations du premier degre",
      type: "calculatoire",
      prerequisites: ["math.calcul-litteral", "math.nombres-calculs"],
      coursePath: "cours/maths-equations.html",
      generators: ["math.equation.ax-plus-b"]
    },
    {
      id: "math.grandeurs",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      title: "Grandeurs, vitesses, pourcentages et conversions",
      type: "calculatoire",
      prerequisites: ["math.operations", "math.proportionnalite"],
      coursePath: "cours/maths-grandeurs.html",
      generators: ["math.grandeurs.vitesse", "math.grandeurs.pourcentage", "math.grandeurs.proportionnalite", "math.grandeurs.conversion"]
    },
    {
      id: "math.tableur",
      subject: "mathematiques",
      chapter: "Algorithmique et tableur",
      title: "Algorithmique, tableur et programmes de calcul",
      type: "regle-application",
      prerequisites: ["math.operations"],
      coursePath: "cours/maths-tableur.html",
      generators: ["math.tableur.formule"]
    },
    {
      id: "fr.grammaire",
      subject: "francais",
      chapter: "Grammaire",
      title: "Nature, fonction et analyse de phrase",
      type: "regle-application",
      prerequisites: ["fr.verbe-sujet"],
      coursePath: "cours/francais-grammaire.html",
      generators: ["fr.grammaire.sujet", "fr.grammaire.cod-coi"]
    },
    {
      id: "fr.lecture",
      subject: "francais",
      chapter: "Lecture",
      title: "Comprendre et justifier une reponse de lecture",
      type: "interpretatif",
      prerequisites: [],
      coursePath: "cours/francais-lecture.html",
      generators: ["sci.donnees.graphique", "sci.donnees.tableau"]
    },
    {
      id: "fr.interpretation",
      subject: "francais",
      chapter: "Interpretation",
      title: "Interpreter un texte et expliquer un effet",
      type: "interpretatif",
      prerequisites: ["fr.lecture"],
      coursePath: "cours/francais-interpretation.html",
      generators: []
    },
    {
      id: "fr.lecture-langue",
      subject: "francais",
      chapter: "Lecture et langue",
      title: "Temps du recit et outils de langue",
      type: "regle-application",
      prerequisites: ["fr.lecture", "fr.grammaire"],
      coursePath: "cours/francais-lecture-langue.html",
      generators: ["fr.lecture-langue.valeur-temps"]
    },
    {
      id: "fr.orthographe",
      subject: "francais",
      chapter: "Orthographe",
      title: "Accords, homophones et vigilance de dictee",
      type: "regle-application",
      prerequisites: ["fr.grammaire"],
      coursePath: "cours/francais-orthographe.html",
      generators: ["fr.orthographe.homophones-a", "fr.orthographe.homophones-et", "fr.orthographe.accord-gn"]
    },
    {
      id: "fr.reecriture",
      subject: "francais",
      chapter: "Reecriture",
      title: "Reecriture, transformations et accords",
      type: "regle-application",
      prerequisites: ["fr.grammaire", "fr.orthographe"],
      coursePath: "cours/francais-reecriture.html",
      generators: ["fr.reecriture.pronom", "fr.reecriture.temps"]
    },
    {
      id: "fr.redaction",
      subject: "francais",
      chapter: "Redaction",
      title: "Redaction, imagination et reflexion",
      type: "interpretatif",
      prerequisites: ["fr.lecture", "fr.grammaire"],
      coursePath: "cours/francais-redaction.html",
      generators: []
    },
    {
      id: "hist.reperes",
      subject: "histoire",
      chapter: "Reperes",
      title: "Reperes historiques, geographiques et vocabulaire",
      type: "memoriel",
      prerequisites: [],
      coursePath: "cours/histoire-reperes.html",
      generators: []
    },
    {
      id: "hist.documents",
      subject: "histoire",
      chapter: "Analyse de document",
      title: "Presenter, prelever et expliquer un document",
      type: "interpretatif",
      prerequisites: ["hist.reperes"],
      coursePath: "cours/histoire-analyse-document.html",
      generators: []
    },
    {
      id: "hist.developpement",
      subject: "histoire",
      chapter: "Developpement construit",
      title: "Organiser un developpement construit",
      type: "interpretatif",
      prerequisites: ["hist.reperes"],
      coursePath: "cours/histoire-developpement-construit.html",
      generators: []
    },
    {
      id: "hist.seconde-guerre",
      subject: "histoire",
      chapter: "Seconde Guerre mondiale",
      title: "Seconde Guerre mondiale, totalitarismes et Resistance",
      type: "memoriel",
      prerequisites: ["hist.reperes"],
      coursePath: "cours/histoire-seconde-guerre.html",
      generators: []
    },
    {
      id: "hist.guerre-froide",
      subject: "histoire",
      chapter: "Guerre froide",
      title: "Guerre froide et monde bipolaire",
      type: "memoriel",
      prerequisites: ["hist.reperes"],
      coursePath: "cours/histoire-guerre-froide.html",
      generators: []
    },
    {
      id: "hist.construction-europeenne",
      subject: "histoire",
      chapter: "Construction europeenne",
      title: "Construction europeenne",
      type: "memoriel",
      prerequisites: ["hist.reperes"],
      coursePath: "cours/histoire-construction-europeenne.html",
      generators: []
    },
    {
      id: "geo.france",
      subject: "histoire",
      chapter: "France",
      title: "Territoires francais et dynamiques spatiales",
      type: "memoriel",
      prerequisites: ["hist.reperes"],
      coursePath: "cours/geo-france.html",
      generators: []
    },
    {
      id: "geo.geographie",
      subject: "histoire",
      chapter: "Geographie",
      title: "Aires urbaines, espaces productifs et amenagements",
      type: "memoriel",
      prerequisites: ["hist.reperes"],
      coursePath: "cours/geo-geographie.html",
      generators: []
    },
    {
      id: "geo.monde",
      subject: "histoire",
      chapter: "Monde",
      title: "Mondialisation, flux et metropoles",
      type: "memoriel",
      prerequisites: ["hist.reperes"],
      coursePath: "cours/geo-monde.html",
      generators: []
    },
    {
      id: "emc.general",
      subject: "histoire",
      chapter: "EMC",
      title: "Institutions, droits et citoyennete",
      type: "memoriel",
      prerequisites: [],
      coursePath: "cours/emc-general.html",
      generators: []
    },
    {
      id: "emc.citoyennete",
      subject: "histoire",
      chapter: "Citoyennete",
      title: "Citoyennete, droits et devoirs",
      type: "memoriel",
      prerequisites: [],
      coursePath: "cours/emc-citoyennete.html",
      generators: []
    },
    {
      id: "emc.valeurs-republique",
      subject: "histoire",
      chapter: "Valeurs de la Republique",
      title: "Valeurs de la Republique et laicite",
      type: "memoriel",
      prerequisites: [],
      coursePath: "cours/emc-valeurs-republique.html",
      generators: []
    },
    {
      id: "emc.defense",
      subject: "histoire",
      chapter: "Defense et securite",
      title: "Defense, securite et parcours citoyen",
      type: "memoriel",
      prerequisites: ["emc.citoyennete"],
      coursePath: "cours/emc-defense.html",
      generators: []
    },
    {
      id: "sci.donnees",
      subject: "sciences",
      chapter: "Donnees",
      title: "Lire des donnees scientifiques",
      type: "interpretatif",
      prerequisites: ["math.grandeurs"],
      coursePath: "cours/sciences-donnees.html",
      generators: []
    },
    {
      id: "sci.svt",
      subject: "sciences",
      chapter: "SVT",
      title: "SVT : vivant, corps humain et environnement",
      type: "memoriel",
      prerequisites: ["sci.donnees"],
      coursePath: "cours/sciences-svt.html",
      generators: ["sci.svt.facteur-teste", "sci.svt.classification", "sci.svt.heredite"]
    },
    {
      id: "sci.physique-chimie",
      subject: "sciences",
      chapter: "Physique-chimie",
      title: "Physique-chimie : mesures, matiere et energie",
      type: "calculatoire",
      prerequisites: ["math.grandeurs", "sci.donnees"],
      coursePath: "cours/sciences-physique-chimie.html",
      generators: ["sci.physique.masse-volumique", "sci.physique.ph", "sci.physique.energie", "sci.physique.circuit", "sci.physique.mouvement-vitesse"]
    },
    {
      id: "sci.technologie",
      subject: "sciences",
      chapter: "Technologie",
      title: "Technologie : objets, algorithmes et systemes",
      type: "regle-application",
      prerequisites: ["sci.donnees"],
      coursePath: "cours/sciences-technologie.html",
      generators: ["sci.techno.capteur-actionneur", "sci.techno.algorithme-boucle", "sci.techno-fonction-usage"]
    }
  ];

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function notionMatches(notion, item) {
    const notionChapter = normalize(notion.chapter);
    const itemChapter = normalize(item.chapter);
    return notion.subject === item.subject && notionChapter === itemChapter;
  }

  function assignNotionId(item) {
    if (item.notionId) return;
    const notion = content.notions.find((candidate) => notionMatches(candidate, item));
    if (notion) item.notionId = notion.id;
  }

  (content.lessons || []).forEach(assignNotionId);
  (content.exercises || []).forEach(assignNotionId);
  (content.guidedTasks || []).forEach(assignNotionId);
}());
