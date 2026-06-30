(function () {
  const registry = window.BREVET_GENERATORS;
  const { createRng, pick, makeExercise } = registry.utils;

  function uniqueDistractors(answer, values) {
    return values.map(String).filter((value, index, items) => value !== String(answer) && items.indexOf(value) === index);
  }

  registry.register("sci.physique.masse-volumique", (seed) => {
    const rng = createRng(seed);
    const volume = pick(rng, [10, 20, 25, 50, 100, 200]);
    const density = pick(rng, [0.8, 1, 1.2, 2, 2.5, 5]);
    const mass = volume * density;
    return makeExercise("sci.physique.masse-volumique", seed, {
      notionId: "sci.physique-chimie",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Consolidation",
      question: `Un objet a une masse de ${mass} g et un volume de ${volume} cm3. Quelle est sa masse volumique ?`,
      answer: `${String(density).replace(".", ",")} g/cm3`,
      distractors: [`${mass + volume} g/cm3`, `${volume / mass} g/cm3`, `${mass} g/cm3`],
      explanation: `La masse volumique vaut masse / volume = ${mass} / ${volume} = ${String(density).replace(".", ",")} g/cm3.`
    });
  });

  registry.register("sci.physique.ph", (seed) => {
    const rng = createRng(seed);
    const ph = pick(rng, [2, 3, 5, 7, 8, 10, 12]);
    const answer = ph < 7 ? "acide" : ph === 7 ? "neutre" : "basique";
    return makeExercise("sci.physique.ph", seed, {
      notionId: "sci.physique-chimie",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Decouverte",
      question: `Une solution a un pH egal a ${ph}. Cette solution est :`,
      answer,
      distractors: uniqueDistractors(answer, ["acide", "neutre", "basique", "toujours dangereuse"]),
      explanation: ph < 7
        ? "Un pH inferieur a 7 indique une solution acide."
        : ph === 7
          ? "Un pH egal a 7 indique une solution neutre."
          : "Un pH superieur a 7 indique une solution basique."
    });
  });

  registry.register("sci.physique.energie", (seed) => {
    const rng = createRng(seed);
    const systems = [
      {
        system: "une lampe",
        received: "energie electrique",
        useful: "energie lumineuse",
        extra: "energie thermique"
      },
      {
        system: "un moteur electrique",
        received: "energie electrique",
        useful: "energie mecanique",
        extra: "energie thermique"
      },
      {
        system: "un panneau solaire",
        received: "energie lumineuse",
        useful: "energie electrique",
        extra: "energie thermique"
      }
    ];
    const item = pick(rng, systems);
    const answer = `${item.useful} et ${item.extra}`;
    return makeExercise("sci.physique.energie", seed, {
      notionId: "sci.physique-chimie",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Consolidation",
      question: `${item.system} recoit de l'${item.received}. Quelles formes d'energie peut-elle transferer ?`,
      answer,
      distractors: uniqueDistractors(answer, ["energie chimique uniquement", "aucune energie", `${item.received} uniquement`, "energie nucleaire"]),
      explanation: `Le systeme convertit l'${item.received} en ${item.useful}. Une partie est aussi transferee sous forme d'${item.extra}.`
    });
  });

  registry.register("sci.physique.circuit", (seed) => {
    const rng = createRng(seed);
    const closed = rng() > 0.5;
    const answer = closed ? "la lampe brille" : "la lampe ne brille pas";
    return makeExercise("sci.physique.circuit", seed, {
      notionId: "sci.physique-chimie",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Decouverte",
      question: `Dans un circuit simple avec une pile, une lampe et un interrupteur, l'interrupteur est ${closed ? "ferme" : "ouvert"}. Que se passe-t-il ?`,
      answer,
      distractors: uniqueDistractors(answer, ["la lampe brille", "la lampe ne brille pas", "la pile disparait", "le courant circule sans circuit ferme"]),
      explanation: closed
        ? "Quand l'interrupteur est ferme, la boucle du circuit est complete et le courant peut circuler."
        : "Quand l'interrupteur est ouvert, la boucle est coupee et le courant ne circule pas."
    });
  });

  registry.register("sci.physique.mouvement-vitesse", (seed) => {
    const rng = createRng(seed);
    const speed = pick(rng, [2, 3, 4, 5, 6, 8]);
    const duration = pick(rng, [5, 10, 15, 20]);
    const distance = speed * duration;
    return makeExercise("sci.physique.mouvement-vitesse", seed, {
      notionId: "sci.physique-chimie",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Consolidation",
      question: `Un objet parcourt ${distance} m en ${duration} s. Quelle est sa vitesse moyenne ?`,
      answer: `${speed} m/s`,
      distractors: uniqueDistractors(`${speed} m/s`, [`${distance + duration} m/s`, `${distance} m/s`, `${duration / speed} m/s`]),
      explanation: `La vitesse moyenne vaut distance / duree = ${distance} / ${duration} = ${speed} m/s.`
    });
  });

  registry.register("sci.svt.facteur-teste", (seed) => {
    const rng = createRng(seed);
    const factors = [
      { factor: "la lumiere", result: "la croissance des plantes" },
      { factor: "la quantite d'eau", result: "la germination des graines" },
      { factor: "la temperature", result: "l'activite d'un micro-organisme" },
      { factor: "la surface des feuilles", result: "la production de matiere organique" }
    ];
    const item = pick(rng, factors);
    return makeExercise("sci.svt.facteur-teste", seed, {
      notionId: "sci.svt",
      subject: "sciences",
      chapter: "SVT",
      stage: "Consolidation",
      question: `Dans une experience, on garde toutes les conditions identiques sauf ${item.factor}. On observe ensuite ${item.result}. Quel est le facteur teste ?`,
      answer: item.factor,
      distractors: uniqueDistractors(item.factor, ["le resultat observe", "le nom du scientifique", "le tableau de mesures", "la conclusion"]),
      explanation: `Le facteur teste est le seul element que l'on fait varier : ici, ${item.factor}.`
    });
  });

  registry.register("sci.techno.capteur-actionneur", (seed) => {
    const rng = createRng(seed);
    const systems = [
      { system: "une porte automatique", sensor: "detecteur de presence", actuator: "moteur de la porte" },
      { system: "un robot aspirateur", sensor: "capteur d'obstacle", actuator: "moteur des roues" },
      { system: "un eclairage automatique", sensor: "detecteur de luminosite", actuator: "lampe" },
      { system: "un portail automatique", sensor: "telecommande ou recepteur", actuator: "moteur du portail" }
    ];
    const item = pick(rng, systems);
    const asksSensor = rng() > 0.5;
    const answer = asksSensor ? item.sensor : item.actuator;
    return makeExercise("sci.techno.capteur-actionneur", seed, {
      notionId: "sci.technologie",
      subject: "sciences",
      chapter: "Technologie",
      stage: "Consolidation",
      question: `Dans ${item.system}, quel element est ${asksSensor ? "le capteur" : "l'actionneur"} ?`,
      answer,
      distractors: uniqueDistractors(answer, [item.sensor, item.actuator, "l'utilisateur", "la notice"]),
      explanation: asksSensor
        ? `Le capteur acquiert une information : ici, ${item.sensor}.`
        : `L'actionneur realise une action physique : ici, ${item.actuator}.`
    });
  });

  registry.register("sci.donnees.graphique", (seed) => {
    const rng = createRng(seed);
    const start = pick(rng, [10, 15, 20, 25]);
    const increase = pick(rng, [15, 20, 30, 40, 60]);
    const end = start + increase;
    return makeExercise("sci.donnees.graphique", seed, {
      notionId: "sci.donnees",
      subject: "sciences",
      chapter: "Donnees",
      stage: "Decouverte",
      question: `Sur un graphique, une temperature passe de ${start} degres C a ${end} degres C. Quelle est l'augmentation de temperature ?`,
      answer: `${increase} degres C`,
      distractors: uniqueDistractors(`${increase} degres C`, [`${end} degres C`, `${start + end} degres C`, `${end - increase / 2} degres C`]),
      explanation: `On calcule la difference entre la valeur finale et la valeur initiale : ${end} - ${start} = ${increase} degres C.`
    });
  });

  registry.register("sci.donnees.tableau", (seed) => {
    const rng = createRng(seed);
    const values = [
      12 + Math.floor(rng() * 6),
      20 + Math.floor(rng() * 6),
      28 + Math.floor(rng() * 6),
      36 + Math.floor(rng() * 6)
    ];
    const max = Math.max(...values);
    const index = values.indexOf(max) + 1;
    return makeExercise("sci.donnees.tableau", seed, {
      notionId: "sci.donnees",
      subject: "sciences",
      chapter: "Donnees",
      stage: "Consolidation",
      question: `Dans un tableau, les valeurs mesurees aux essais 1 a 4 sont : ${values.join(" ; ")}. A quel essai la valeur est-elle la plus grande ?`,
      answer: `essai ${index}`,
      distractors: uniqueDistractors(`essai ${index}`, ["essai 1", "essai 2", "essai 3", "essai 4"]),
      explanation: `La plus grande valeur est ${max}. Elle se trouve a l'essai ${index}.`
    });
  });

  registry.register("sci.svt.classification", (seed) => {
    const rng = createRng(seed);
    const items = [
      { organism: "un chat", attribute: "des poils", group: "mammiferes" },
      { organism: "une truite", attribute: "des nageoires", group: "poissons" },
      { organism: "un chene", attribute: "des feuilles et des graines", group: "vegetaux" },
      { organism: "une levure", attribute: "un etre vivant microscopique", group: "micro-organismes" }
    ];
    const item = pick(rng, items);
    return makeExercise("sci.svt.classification", seed, {
      notionId: "sci.svt",
      subject: "sciences",
      chapter: "SVT",
      stage: "Decouverte",
      question: `${item.organism} possede ${item.attribute}. Dans quel groupe peut-on le classer ?`,
      answer: item.group,
      distractors: uniqueDistractors(item.group, ["mammiferes", "poissons", "vegetaux", "micro-organismes", "roches"]),
      explanation: `On classe un etre vivant a partir de caracteres observes. Ici, cela permet de le placer parmi les ${item.group}.`
    });
  });

  registry.register("sci.svt.heredite", (seed) => {
    const rng = createRng(seed);
    const items = [
      { term: "gene", answer: "une portion d'information genetique" },
      { term: "allele", answer: "une version d'un gene" },
      { term: "chromosome", answer: "un support de l'information genetique dans le noyau" },
      { term: "caractere hereditaire", answer: "un caractere qui peut se transmettre dans une famille" }
    ];
    const item = pick(rng, items);
    return makeExercise("sci.svt.heredite", seed, {
      notionId: "sci.svt",
      subject: "sciences",
      chapter: "SVT",
      stage: "Consolidation",
      question: `En SVT, que designe le terme "${item.term}" ?`,
      answer: item.answer,
      distractors: uniqueDistractors(item.answer, ["une unite de vitesse", "une solution acide", "un composant de circuit electrique", "une figure de style"]),
      explanation: `Le terme "${item.term}" designe ${item.answer}.`
    });
  });

  registry.register("sci.techno.algorithme-boucle", (seed) => {
    const rng = createRng(seed);
    const repetitions = 2 + Math.floor(rng() * 6);
    const distance = pick(rng, [5, 10, 15, 20]);
    const answer = repetitions * distance;
    return makeExercise("sci.techno.algorithme-boucle", seed, {
      notionId: "sci.technologie",
      subject: "sciences",
      chapter: "Technologie",
      stage: "Decouverte",
      question: `Un programme repete ${repetitions} fois : avancer de ${distance} cm. Quelle distance totale est parcourue ?`,
      answer: `${answer} cm`,
      distractors: uniqueDistractors(`${answer} cm`, [`${repetitions + distance} cm`, `${distance} cm`, `${repetitions * repetitions} cm`]),
      explanation: `Une boucle repete l'action. La distance totale vaut ${repetitions} x ${distance} = ${answer} cm.`
    });
  });

  registry.register("sci.techno-fonction-usage", (seed) => {
    const rng = createRng(seed);
    const items = [
      { object: "un velo", functionUse: "permettre a une personne de se deplacer", solution: "roues, cadre et guidon" },
      { object: "une lampe", functionUse: "eclairer une zone", solution: "ampoule ou LED" },
      { object: "un thermometre", functionUse: "mesurer une temperature", solution: "capteur de temperature" },
      { object: "un portail automatique", functionUse: "ouvrir et fermer un acces", solution: "moteur et bras articules" }
    ];
    const item = pick(rng, items);
    return makeExercise("sci.techno-fonction-usage", seed, {
      notionId: "sci.technologie",
      subject: "sciences",
      chapter: "Technologie",
      stage: "Consolidation",
      question: `Pour ${item.object}, quelle proposition correspond a la fonction d'usage ?`,
      answer: item.functionUse,
      distractors: uniqueDistractors(item.functionUse, [item.solution, "la couleur de l'objet", "le nom du fabricant", "le prix du magasin"]),
      explanation: `La fonction d'usage explique a quoi sert l'objet pour l'utilisateur : ${item.functionUse}.`
    });
  });
}());
