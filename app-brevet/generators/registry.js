(function () {
  const root = window.BREVET_GENERATORS = window.BREVET_GENERATORS || {};

  function createRng(seed) {
    let state = seed >>> 0;
    return function next() {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state / 4294967296;
    };
  }

  function pick(rng, items) {
    return items[Math.floor(rng() * items.length)];
  }

  function shuffle(seed, items) {
    const rng = createRng(seed);
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(rng() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function gcd(a, b) {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      [x, y] = [y, x % y];
    }
    return x || 1;
  }

  function fraction(numerator, denominator) {
    const divisor = gcd(numerator, denominator);
    return `${numerator / divisor}/${denominator / divisor}`;
  }

  const generatedHelpRules = [
    {
      match: (generatorId) => generatorId.startsWith("math.proba."),
      lessonId: "math_proba_base",
      helpText: "Compte tous les cas possibles, puis les cas favorables. La probabilite vaut cas favorables / cas possibles."
    },
    {
      match: (generatorId) => generatorId === "math.nombres.fraction-simplifier",
      lessonId: "math_fraction_simplifier",
      helpText: "Cherche un diviseur commun, puis divise le numerateur et le denominateur par ce meme nombre."
    },
    {
      match: (generatorId) => generatorId === "math.nombres.fraction-addition",
      lessonId: "math_fraction_simplifier",
      helpText: "Quand les deux fractions ont le meme denominateur, additionne seulement les numerateurs et garde le denominateur."
    },
    {
      match: (generatorId) => generatorId === "math.nombres.puissance-dix",
      lessonId: "math_puissances",
      helpText: "Multiplier par une puissance de 10 revient a deplacer la virgule. L'exposant indique le nombre de rangs."
    },
    {
      match: (generatorId) => generatorId === "math.nombres.priorites",
      lessonId: "math_fractions_priorites",
      helpText: "Respecte l'ordre des calculs : parentheses, puissances, multiplications et divisions, puis additions et soustractions."
    },
    {
      match: (generatorId) => generatorId === "math.grandeurs.pourcentage",
      lessonId: "math_pourcentages",
      helpText: "Un pourcentage est une fraction sur 100. Multiplie la quantite par ce pourcentage divise par 100."
    },
    {
      match: (generatorId) => generatorId === "math.grandeurs.proportionnalite",
      lessonId: "math_proportionnalite_simple",
      helpText: "Reviens au prix ou a la valeur pour une unite, puis multiplie par la quantite demandee."
    },
    {
      match: (generatorId) => generatorId === "math.grandeurs.vitesse",
      lessonId: "math-vitesse-consolidation",
      helpText: "Pour une vitesse moyenne, utilise vitesse = distance / duree et verifie les unites."
    },
    {
      match: (generatorId) => generatorId === "math.grandeurs.conversion",
      lessonId: "math_aires_volumes",
      helpText: "Repere l'unite de depart et l'unite demandee, puis applique le bon facteur de conversion."
    },
    {
      match: (generatorId) => generatorId.startsWith("math.stats."),
      lessonId: "math_statistiques",
      helpText: "Pour la moyenne, additionne puis divise. Pour la mediane, range les valeurs et cherche le milieu."
    },
    {
      match: (generatorId) => generatorId.startsWith("math.tableur."),
      lessonId: "math-tableur-decouverte",
      helpText: "Remplace chaque cellule de la formule par sa valeur, puis effectue le calcul."
    },
    {
      match: (generatorId) => generatorId.startsWith("math.fonctions."),
      lessonId: "math_fonctions_affines",
      helpText: "Pour calculer une image, remplace x par la valeur donnee. Pour un antecedent, cherche le nombre de depart."
    },
    {
      match: (generatorId) => generatorId === "math.equation.ax-plus-b",
      lessonId: "math-equations-consolidation",
      helpText: "Isole x en faisant la meme operation des deux cotes de l'egalite, puis verifie la solution."
    },
    {
      match: (generatorId) => generatorId === "math.geometrie.pythagore-longueur" || generatorId === "math.geometrie.pythagore-reciproque",
      lessonId: "math_pythagore",
      helpText: "Pythagore s'utilise seulement dans un triangle rectangle. Identifie l'hypotenuse avant de calculer."
    },
    {
      match: (generatorId) => generatorId === "math.geometrie.thales",
      lessonId: "math_thales_base",
      helpText: "Verifie les points alignes et les droites paralleles, puis ecris les rapports dans le meme ordre."
    },
    {
      match: (generatorId) => generatorId === "math.geometrie.trigonometrie",
      lessonId: "math_trigo",
      helpText: "Nomme les cotes par rapport a l'angle : adjacent, oppose, hypotenuse. Choisis ensuite le bon rapport."
    },
    {
      match: (generatorId) => generatorId === "math.geometrie.volume-pave",
      lessonId: "math_aires_volumes",
      helpText: "Pour le volume d'un pave droit, multiplie longueur, largeur et hauteur, puis donne une unite en cm3 ou m3."
    },
    {
      match: (generatorId) => generatorId === "math.litteral.developper",
      lessonId: "math_developpements",
      helpText: "Distribue le facteur devant la parenthese sur chaque terme a l'interieur."
    },
    {
      match: (generatorId) => generatorId === "math.litteral.factoriser",
      lessonId: "math_factorisation",
      helpText: "Cherche le facteur commun a tous les termes, puis place-le devant une parenthese."
    },
    {
      match: (generatorId) => generatorId === "math.litteral.evaluer",
      lessonId: "math_developpements",
      helpText: "Pour evaluer une expression, remplace la lettre par la valeur donnee, puis respecte les priorites de calcul."
    },
    {
      match: (generatorId) => generatorId.startsWith("fr.grammaire."),
      lessonId: "fr_fonctions",
      helpText: "Repere le verbe, puis pose la bonne question pour trouver le sujet ou le complement."
    },
    {
      match: (generatorId) => generatorId.startsWith("fr.orthographe.homophones"),
      lessonId: "fr_homophones",
      helpText: "Utilise un test de remplacement pour choisir le bon homophone."
    },
    {
      match: (generatorId) => generatorId === "fr.orthographe.accord-gn",
      lessonId: "fr_participe_passe",
      helpText: "Cherche le nom avec lequel l'adjectif s'accorde, puis verifie le genre et le nombre."
    },
    {
      match: (generatorId) => generatorId.startsWith("fr.reecriture."),
      lessonId: "fr_reecriture",
      helpText: "Repere le pronom ou le temps demande, puis modifie le verbe et les accords."
    },
    {
      match: (generatorId) => generatorId.startsWith("fr.lecture-langue."),
      lessonId: "francais-valeurs-temps-type-brevet",
      helpText: "Relie le temps verbal a son role dans le recit : description, habitude ou action principale."
    },
    {
      match: (generatorId) => generatorId === "sci.physique.masse-volumique",
      lessonId: "sci_masse_vol",
      helpText: "La masse volumique se calcule avec masse / volume. Garde la bonne unite."
    },
    {
      match: (generatorId) => generatorId === "sci.physique.ph",
      lessonId: "sci_ph",
      helpText: "pH inferieur a 7 : acide ; pH egal a 7 : neutre ; pH superieur a 7 : basique."
    },
    {
      match: (generatorId) => generatorId === "sci.physique.energie",
      lessonId: "pc-energie-type-brevet",
      helpText: "Repere l'energie recue par le systeme, l'energie utile et les pertes possibles."
    },
    {
      match: (generatorId) => generatorId === "sci.physique.circuit",
      lessonId: "sci_electricite",
      helpText: "Un circuit doit etre ferme pour que le courant circule."
    },
    {
      match: (generatorId) => generatorId === "sci.physique.mouvement-vitesse",
      lessonId: "sci_mouvement",
      helpText: "La vitesse moyenne vaut distance / duree. Verifie toujours les unites."
    },
    {
      match: (generatorId) => generatorId === "sci.svt.heredite",
      lessonId: "svt-adn-decouverte",
      helpText: "Relie chromosome, gene et caractere hereditaire. Le gene porte une information qui peut se transmettre."
    },
    {
      match: (generatorId) => generatorId === "sci.svt.classification",
      lessonId: "sci_cellule",
      helpText: "Pour classer des etres vivants, compare les caracteres observes et cherche ceux qu'ils partagent."
    },
    {
      match: (generatorId) => generatorId === "sci.svt.facteur-teste",
      lessonId: "sci_experience",
      helpText: "Le facteur teste est ce que l'on change dans l'experience. Tout le reste doit rester comparable."
    },
    {
      match: (generatorId) => generatorId.startsWith("sci.svt."),
      lessonId: "sci_experience",
      helpText: "Appuie-toi sur les caracteres observes ou le facteur teste pour conclure."
    },
    {
      match: (generatorId) => generatorId === "sci.techno-fonction-usage",
      lessonId: "techno-objet-fonction-consolidation",
      helpText: "La fonction d'usage dit a quoi sert l'objet pour l'utilisateur. Ce n'est pas le nom d'une piece."
    },
    {
      match: (generatorId) => generatorId.startsWith("sci.techno."),
      lessonId: "tech_chaine_info",
      helpText: "Dans un systeme automatique, distingue capteur, traitement de l'information et actionneur."
    },
    {
      match: (generatorId) => generatorId.startsWith("sci.donnees."),
      lessonId: "sci_graphique",
      helpText: "Lis le titre, les valeurs et les unites avant de conclure."
    }
  ];

  function getGeneratedHelp(generatorId) {
    return generatedHelpRules.find((rule) => rule.match(generatorId)) || {};
  }

  function makeExercise(generatorId, seed, data) {
    const answer = String(data.answer);
    const distractors = shuffle(seed + 31, [...new Set((data.distractors || []).map(String).filter((value) => value !== answer))]).slice(0, 3);
    const baseChoices = [answer, ...distractors].slice(0, 4);
    const choices = baseChoices.length >= 4 ? baseChoices : [...baseChoices, "Impossible", "0"].slice(0, 4);
    const generatedHelp = getGeneratedHelp(generatorId);
    const exercise = {
      id: `${generatorId}:${seed}`,
      mode: "generated",
      generatorId,
      seed,
      notionId: data.notionId,
      subject: data.subject,
      chapter: data.chapter,
      stage: data.stage || "Consolidation",
      type: "qcm",
      question: data.question,
      choices: shuffle(seed + 17, choices),
      answer: String(data.answer),
      explanation: data.explanation,
      source: "generated"
    };
    const lessonId = data.lessonId || generatedHelp.lessonId;
    const helpText = data.helpText || generatedHelp.helpText;
    if (lessonId) exercise.lessonId = lessonId;
    if (helpText) exercise.helpText = helpText;
    return exercise;
  }

  root.utils = { createRng, pick, shuffle, gcd, fraction, makeExercise };
  root.items = root.items || {};
  root.register = function register(generatorId, generator) {
    root.items[generatorId] = generator;
  };
  root.generate = function generate(generatorId, seed, options = {}) {
    const generator = root.items[generatorId];
    if (!generator) return null;
    try {
      return generator(seed, options);
    } catch (error) {
      root.errors = root.errors || [];
      root.errors.push({
        generatorId,
        seed,
        message: error && error.message ? error.message : String(error)
      });
      if (typeof console !== "undefined" && console.warn) {
        console.warn(`Generator ${generatorId} failed for seed ${seed}`, error);
      }
      return null;
    }
  };
  root.generateForNotion = function generateForNotion(notion, count, seedBase) {
    const generators = notion.generators || [];
    const exercises = [];
    for (let index = 0; exercises.length < count && generators.length; index += 1) {
      const generatorId = generators[index % generators.length];
      const seed = seedBase + index * 101;
      const exercise = root.generate(generatorId, seed, { notion });
      if (exercise) exercises.push(exercise);
      if (index > count * 8) break;
    }
    return exercises;
  };
}());
