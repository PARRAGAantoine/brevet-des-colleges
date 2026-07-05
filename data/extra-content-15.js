(function () {
  const content = window.BREVET_CONTENT;

  function enrichLesson(id, patch) {
    const lesson = content.lessons.find((item) => item.id === id);
    if (lesson) Object.assign(lesson, patch);
  }

  enrichLesson("tech_chaine_info", {
    prerequisite: "Savoir qu'un objet technique recoit des informations, les traite, puis agit.",
    summary: "La chaine d'information sert a detecter une situation, transmettre l'information et decider quoi faire. Elle est souvent associee a une chaine d'energie qui realise l'action.",
    example: "Dans un portail automatique, le capteur detecte la voiture, la carte traite l'information, puis le moteur ouvre le portail.",
    mistake: "Confondre ce qui decide avec ce qui agit : le capteur informe, le moteur agit.",
    takeaway: "Pour analyser un objet, cherche dans l'ordre : capter, traiter, communiquer."
  });

  enrichLesson("fr_participe_passe", {
    prerequisite: "Savoir trouver le sujet et reconnaitre les auxiliaires etre et avoir.",
    summary: "Le participe passe ne s'accorde pas toujours de la meme facon. Avec etre, il s'accorde avec le sujet. Avec avoir, il s'accorde seulement si le COD est place avant le verbe.",
    example: "Elles sont parties : accord avec elles. Les fleurs que j'ai cueillies : le COD 'que' reprend fleurs, place avant.",
    mistake: "Accorder automatiquement tous les participes passes sans regarder l'auxiliaire.",
    takeaway: "Cherche d'abord l'auxiliaire, puis le sujet ou le COD."
  });

  enrichLesson("geo_aires_urbaines", {
    prerequisite: "Savoir qu'une aire urbaine regroupe une ville-centre, sa banlieue et une couronne periurbaine.",
    summary: "Une aire urbaine montre comment une grande ville organise l'espace autour d'elle. Beaucoup d'habitants vivent loin du centre mais y vont pour travailler, et cela cree des mobilites quotidiennes.",
    example: "Une famille peut habiter en couronne periurbaine, prendre la voiture ou le train, puis travailler dans la ville-centre.",
    mistake: "Reduire l'aire urbaine a la ville-centre seulement.",
    takeaway: "Decris toujours centre, banlieue, couronne periurbaine et deplacements."
  });

  enrichLesson("emc_citoyen", {
    prerequisite: "Connaitre quelques droits et devoirs simples : voter, respecter la loi, participer a la vie collective.",
    summary: "Etre citoyen, ce n'est pas seulement avoir une nationalite. C'est aussi participer a la vie democratique, respecter les lois et comprendre que les droits vont avec des devoirs.",
    example: "Voter, respecter la liberte des autres et s'informer sont des attitudes citoyennes.",
    mistake: "Penser qu'un citoyen a seulement des droits et aucun devoir.",
    takeaway: "Un citoyen participe, respecte la loi et connait les valeurs de la Republique."
  });

  content.exercises.push(
    {
      id: "extra15_fr_short_001",
      subject: "francais",
      chapter: "Grammaire",
      notionId: "fr.grammaire",
      stage: "Decouverte",
      type: "short_answer",
      question: "Dans 'La petite fille chante', quel est le verbe ?",
      answer: "chante",
      explanation: "Le verbe indique l'action : ici, c'est 'chante'."
    },
    {
      id: "extra15_fr_short_002",
      subject: "francais",
      chapter: "Grammaire",
      notionId: "fr.grammaire",
      stage: "Consolidation",
      type: "short_answer",
      question: "Dans 'Le chien de ma voisine aboie', quel est le sujet du verbe ?",
      answer: "le chien de ma voisine",
      acceptedAnswers: ["chien de ma voisine", "le chien"],
      explanation: "On demande : qui aboie ? Le chien de ma voisine."
    },
    {
      id: "extra15_fr_short_003",
      subject: "francais",
      chapter: "Orthographe",
      notionId: "fr.orthographe",
      stage: "Decouverte",
      type: "short_answer",
      question: "Complete : Les feuilles sont tombe__.",
      answer: "es",
      acceptedAnswers: ["tombees", "tombées"],
      explanation: "Avec l'auxiliaire etre, le participe passe s'accorde avec le sujet feminin pluriel : tombees."
    },
    {
      id: "extra15_fr_short_004",
      subject: "francais",
      chapter: "Orthographe",
      notionId: "fr.orthographe",
      stage: "Consolidation",
      type: "short_answer",
      question: "Choisis le bon homophone : Il ___ son cahier. (a / à)",
      answer: "a",
      explanation: "On peut remplacer par 'avait' : il avait son cahier. Il faut donc ecrire 'a'."
    },
    {
      id: "extra15_fr_short_005",
      subject: "francais",
      chapter: "Conjugaison",
      notionId: "fr.orthographe",
      stage: "Consolidation",
      type: "short_answer",
      question: "Conjugue 'avoir' avec 'ils' au present.",
      answer: "ont",
      acceptedAnswers: ["ils ont"],
      explanation: "Au present, avec ils, le verbe avoir devient 'ils ont'."
    },
    {
      id: "extra15_fr_short_006",
      subject: "francais",
      chapter: "Reecriture",
      notionId: "fr.reecriture",
      stage: "Type brevet",
      type: "short_answer",
      question: "Transforme au feminin pluriel : 'un acteur courageux'.",
      answer: "des actrices courageuses",
      acceptedAnswers: ["actrices courageuses"],
      explanation: "Acteur devient actrices, courageux devient courageuses."
    },
    {
      id: "extra15_fr_short_007",
      subject: "francais",
      chapter: "Vocabulaire",
      notionId: "fr.grammaire",
      stage: "Decouverte",
      type: "short_answer",
      question: "Quel prefixe ajoute-t-on a 'visible' pour former son contraire le plus courant ?",
      answer: "in",
      acceptedAnswers: ["invisible"],
      explanation: "Le contraire de visible est invisible : le prefixe est in-."
    },
    {
      id: "extra15_fr_short_008",
      subject: "francais",
      chapter: "Lecture",
      notionId: "fr.lecture",
      stage: "Decouverte",
      type: "short_answer",
      question: "Dans une reponse de lecture, quel signe encadre une citation exacte ?",
      answer: "guillemets",
      acceptedAnswers: ["les guillemets", "\"", "« »"],
      explanation: "Une citation exacte se place entre guillemets."
    },
    {
      id: "extra15_science_short_001",
      subject: "sciences",
      chapter: "Physique-chimie",
      notionId: "sci.physique-chimie",
      stage: "Decouverte",
      type: "short_answer",
      question: "Quelle est l'unite de la tension electrique ?",
      answer: "volt",
      acceptedAnswers: ["v", "V", "volts"],
      explanation: "La tension electrique se mesure en volt, de symbole V."
    },
    {
      id: "extra15_science_short_002",
      subject: "sciences",
      chapter: "Physique-chimie",
      notionId: "sci.physique-chimie",
      stage: "Consolidation",
      type: "short_answer",
      question: "Calcule la masse volumique si m = 30 g et V = 10 mL.",
      answer: "3",
      acceptedAnswers: ["3 g/ml", "3g/ml", "3 g/mL"],
      explanation: "Masse volumique = masse / volume = 30 / 10 = 3 g/mL."
    },
    {
      id: "extra15_science_short_003",
      subject: "sciences",
      chapter: "Physique-chimie",
      notionId: "sci.physique-chimie",
      stage: "Type brevet",
      type: "short_answer",
      question: "Un objet parcourt 100 m en 20 s. Quelle est sa vitesse en m/s ?",
      answer: "5",
      acceptedAnswers: ["5 m/s", "5m/s"],
      explanation: "Vitesse = distance / temps = 100 / 20 = 5 m/s."
    },
    {
      id: "extra15_science_short_004",
      subject: "sciences",
      chapter: "SVT",
      notionId: "sci.svt",
      stage: "Decouverte",
      type: "short_answer",
      question: "Quel organe permet les echanges de dioxygene avec le sang ?",
      answer: "poumon",
      acceptedAnswers: ["poumons", "les poumons"],
      explanation: "Les poumons permettent les echanges de gaz entre l'air et le sang."
    },
    {
      id: "extra15_science_short_005",
      subject: "sciences",
      chapter: "SVT",
      notionId: "sci.svt",
      stage: "Consolidation",
      type: "short_answer",
      question: "Quel mot designe l'ensemble des etres vivants d'un milieu ?",
      answer: "biodiversite",
      acceptedAnswers: ["biodiversité"],
      explanation: "La biodiversite designe la diversite des etres vivants."
    },
    {
      id: "extra15_science_short_006",
      subject: "sciences",
      chapter: "Technologie",
      notionId: "sci.technologie",
      stage: "Decouverte",
      type: "short_answer",
      question: "Dans un portail automatique, quel element detecte une voiture ?",
      answer: "capteur",
      acceptedAnswers: ["un capteur", "detecteur", "détecteur"],
      explanation: "Un capteur detecte une information de l'environnement."
    },
    {
      id: "extra15_science_short_007",
      subject: "sciences",
      chapter: "Technologie",
      notionId: "sci.technologie",
      stage: "Consolidation",
      type: "short_answer",
      question: "Dans une chaine d'energie, quel element transforme l'energie electrique en mouvement ?",
      answer: "moteur",
      acceptedAnswers: ["un moteur"],
      explanation: "Un moteur transforme l'energie electrique en mouvement."
    },
    {
      id: "extra15_science_short_008",
      subject: "sciences",
      chapter: "Donnees",
      notionId: "sci.donnees",
      stage: "Consolidation",
      type: "short_answer",
      question: "Sur un graphique, comment s'appelle la grandeur placee sur l'axe vertical ?",
      answer: "ordonnee",
      acceptedAnswers: ["ordonnees", "axe des ordonnees", "axe y", "y"],
      explanation: "L'axe vertical est l'axe des ordonnees."
    }
  );
}());
