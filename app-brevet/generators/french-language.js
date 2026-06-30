(function () {
  const registry = window.BREVET_GENERATORS;
  const { createRng, pick, makeExercise } = registry.utils;

  function uniqueDistractors(answer, values) {
    return values.map(String).filter((value, index, items) => value !== String(answer) && items.indexOf(value) === index);
  }

  registry.register("fr.grammaire.sujet", (seed) => {
    const rng = createRng(seed);
    const items = [
      { sentence: "Les enfants jouent dans la cour.", verb: "jouent", subject: "Les enfants" },
      { sentence: "Ma soeur prepare son sac.", verb: "prepare", subject: "Ma soeur" },
      { sentence: "Dans le ciel passent des nuages gris.", verb: "passent", subject: "des nuages gris" },
      { sentence: "Le vieux chene resiste au vent.", verb: "resiste", subject: "Le vieux chene" },
      { sentence: "Chaque matin, Paul et Lina prennent le bus.", verb: "prennent", subject: "Paul et Lina" }
    ];
    const item = pick(rng, items);
    return makeExercise("fr.grammaire.sujet", seed, {
      notionId: "fr.grammaire",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Decouverte",
      question: `Dans la phrase "${item.sentence}", quel est le sujet du verbe "${item.verb}" ?`,
      answer: item.subject,
      distractors: uniqueDistractors(item.subject, [item.verb, "dans la cour", "son sac", "Chaque matin", "au vent"]),
      explanation: `Pour trouver le sujet, on demande : qui est-ce qui ${item.verb} ? La reponse est "${item.subject}".`
    });
  });

  registry.register("fr.grammaire.cod-coi", (seed) => {
    const rng = createRng(seed);
    const items = [
      { sentence: "Nora lit un roman.", group: "un roman", answer: "COD", test: "Nora lit quoi ?" },
      { sentence: "Le professeur parle aux eleves.", group: "aux eleves", answer: "COI", test: "Le professeur parle a qui ?" },
      { sentence: "Jules regarde la mer.", group: "la mer", answer: "COD", test: "Jules regarde quoi ?" },
      { sentence: "Elle se souvient de son voyage.", group: "de son voyage", answer: "COI", test: "Elle se souvient de quoi ?" },
      { sentence: "Nous ecoutons cette chanson.", group: "cette chanson", answer: "COD", test: "Nous ecoutons quoi ?" }
    ];
    const item = pick(rng, items);
    return makeExercise("fr.grammaire.cod-coi", seed, {
      notionId: "fr.grammaire",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Consolidation",
      question: `Dans "${item.sentence}", quelle est la fonction du groupe "${item.group}" ?`,
      answer: item.answer,
      distractors: uniqueDistractors(item.answer, ["COD", "COI", "Sujet", "Attribut du sujet"]),
      explanation: `${item.test} Le groupe "${item.group}" est donc ${item.answer}.`
    });
  });

  registry.register("fr.orthographe.homophones-a", (seed) => {
    const rng = createRng(seed);
    const items = [
      { sentence: "Elle ___ termine son exercice.", answer: "a", reason: "on peut remplacer par avait" },
      { sentence: "Il va ___ la bibliotheque.", answer: "a", reason: "il s'agit de la preposition a" },
      { sentence: "Nous avons parle ___ voix basse.", answer: "a", reason: "il s'agit de la preposition a" },
      { sentence: "Le chat ___ saute sur la table.", answer: "a", reason: "on peut remplacer par avait" }
    ];
    const item = pick(rng, items);
    return makeExercise("fr.orthographe.homophones-a", seed, {
      notionId: "fr.orthographe",
      subject: "francais",
      chapter: "Orthographe",
      stage: "Decouverte",
      question: `Complete correctement : ${item.sentence}`,
      answer: item.answer,
      distractors: uniqueDistractors(item.answer, ["a", "as", "avait", "à"]),
      explanation: `On choisit "${item.answer}" : ${item.reason}.`
    });
  });

  registry.register("fr.orthographe.homophones-et", (seed) => {
    const rng = createRng(seed);
    const items = [
      { sentence: "Le ciel est gris ___ froid.", answer: "et", reason: "on peut remplacer par et puis" },
      { sentence: "Il ___ deja parti.", answer: "est", reason: "c'est le verbe etre" },
      { sentence: "La route ___ longue.", answer: "est", reason: "c'est le verbe etre" },
      { sentence: "Louise prend son sac ___ son manteau.", answer: "et", reason: "on relie deux groupes nominaux" }
    ];
    const item = pick(rng, items);
    return makeExercise("fr.orthographe.homophones-et", seed, {
      notionId: "fr.orthographe",
      subject: "francais",
      chapter: "Orthographe",
      stage: "Decouverte",
      question: `Complete correctement : ${item.sentence}`,
      answer: item.answer,
      distractors: uniqueDistractors(item.answer, ["et", "est", "es", "ai"]),
      explanation: `On choisit "${item.answer}" : ${item.reason}.`
    });
  });

  registry.register("fr.orthographe.accord-gn", (seed) => {
    const rng = createRng(seed);
    const items = [
      { start: "des fleurs", adjective: "rouge", answer: "rouges", gender: "feminin pluriel" },
      { start: "une maison", adjective: "ancien", answer: "ancienne", gender: "feminin singulier" },
      { start: "des chemins", adjective: "sombre", answer: "sombres", gender: "masculin pluriel" },
      { start: "un animal", adjective: "blesse", answer: "blesse", gender: "masculin singulier" },
      { start: "des histoires", adjective: "etrange", answer: "etranges", gender: "feminin pluriel" }
    ];
    const item = pick(rng, items);
    return makeExercise("fr.orthographe.accord-gn", seed, {
      notionId: "fr.orthographe",
      subject: "francais",
      chapter: "Orthographe",
      stage: "Consolidation",
      question: `Accorde l'adjectif entre parentheses : ${item.start} (${item.adjective})`,
      answer: item.answer,
      distractors: uniqueDistractors(item.answer, [item.adjective, `${item.adjective}s`, `${item.adjective}e`, `${item.adjective}es`]),
      explanation: `L'adjectif s'accorde avec le nom : ${item.start} est ${item.gender}, donc on ecrit "${item.answer}".`
    });
  });

  registry.register("fr.reecriture.pronom", (seed) => {
    const rng = createRng(seed);
    const items = [
      { original: "Je regarde la mer.", target: "nous", answer: "Nous regardons la mer.", explanation: "Le verbe regarder avec nous donne regardons." },
      { original: "Il finit son travail.", target: "ils", answer: "Ils finissent leur travail.", explanation: "Le verbe finir avec ils donne finissent et son devient leur." },
      { original: "Elle marche vite.", target: "elles", answer: "Elles marchent vite.", explanation: "Le verbe marcher avec elles prend -ent." },
      { original: "Je suis arrive en avance.", target: "nous", answer: "Nous sommes arrives en avance.", explanation: "Avec nous, l'auxiliaire et le participe passe changent." }
    ];
    const item = pick(rng, items);
    return makeExercise("fr.reecriture.pronom", seed, {
      notionId: "fr.reecriture",
      subject: "francais",
      chapter: "Reecriture",
      stage: "Consolidation",
      question: `Transforme "${item.original}" avec le pronom "${item.target}".`,
      answer: item.answer,
      distractors: uniqueDistractors(item.answer, [
        item.answer.replace("ons", "ez"),
        item.original,
        item.answer.replace("ent", "e"),
        item.answer.replace("Nous", "On")
      ]),
      explanation: item.explanation
    });
  });

  registry.register("fr.reecriture.temps", (seed) => {
    const rng = createRng(seed);
    const items = [
      { original: "Il marche dans la rue.", tense: "imparfait", answer: "Il marchait dans la rue.", explanation: "A l'imparfait, marcher donne il marchait." },
      { original: "Nous finissons le travail.", tense: "futur", answer: "Nous finirons le travail.", explanation: "Au futur, finir donne nous finirons." },
      { original: "Elle regarde le ciel.", tense: "passe compose", answer: "Elle a regarde le ciel.", explanation: "Au passe compose, on utilise l'auxiliaire avoir et le participe passe regarde." },
      { original: "Ils prennent le train.", tense: "imparfait", answer: "Ils prenaient le train.", explanation: "A l'imparfait, prendre donne ils prenaient." }
    ];
    const item = pick(rng, items);
    return makeExercise("fr.reecriture.temps", seed, {
      notionId: "fr.reecriture",
      subject: "francais",
      chapter: "Reecriture",
      stage: "Type brevet",
      question: `Transforme "${item.original}" au ${item.tense}.`,
      answer: item.answer,
      distractors: uniqueDistractors(item.answer, [item.original, item.answer.replace("ait", "er"), item.answer.replace("ont", "ent"), item.answer.replace("a ", "avait ")]),
      explanation: item.explanation
    });
  });

  registry.register("fr.lecture-langue.valeur-temps", (seed) => {
    const rng = createRng(seed);
    const items = [
      { sentence: "La pluie tombait depuis des heures.", tense: "imparfait", answer: "description ou action qui dure" },
      { sentence: "Soudain, la porte claqua.", tense: "passe simple", answer: "action soudaine qui fait avancer le recit" },
      { sentence: "Chaque soir, il lisait pres de la fenetre.", tense: "imparfait", answer: "habitude" },
      { sentence: "Le heros entra dans la salle.", tense: "passe simple", answer: "action principale du recit" }
    ];
    const item = pick(rng, items);
    return makeExercise("fr.lecture-langue.valeur-temps", seed, {
      notionId: "fr.lecture-langue",
      subject: "francais",
      chapter: "Lecture et langue",
      stage: "Type brevet",
      question: `Dans "${item.sentence}", quelle est la valeur du ${item.tense} ?`,
      answer: item.answer,
      distractors: uniqueDistractors(item.answer, ["ordre donne au lecteur", "action impossible", "question indirecte", "description ou action qui dure", "habitude", "action principale du recit"]),
      explanation: `Ici, le ${item.tense} sert a exprimer : ${item.answer}.`
    });
  });
}());
