(function () {
  const registry = window.BREVET_GENERATORS;
  const { createRng, pick, fraction, makeExercise } = registry.utils;

  function uniqueDistractors(answer, values) {
    return values.map(String).filter((value, index, items) => value !== String(answer) && items.indexOf(value) === index);
  }

  function square(value) {
    return value * value;
  }

  function decimalComma(value) {
    return String(value).replace(".", ",");
  }

  registry.register("math.proba.urne", (seed) => {
    const rng = createRng(seed);
    const red = 2 + Math.floor(rng() * 8);
    const blue = 2 + Math.floor(rng() * 8);
    const total = red + blue;
    const answer = fraction(red, total);
    return makeExercise("math.proba.urne", seed, {
      notionId: "math.probabilites",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Decouverte",
      question: `Une urne contient ${red} boules rouges et ${blue} boules bleues. Quelle est la probabilite de tirer une boule rouge ?`,
      answer,
      distractors: [fraction(blue, total), `${red}/${blue}`, `${total}/${red}`],
      explanation: `Il y a ${red} boules rouges sur ${total} boules au total, donc la probabilite est ${red}/${total}${answer !== `${red}/${total}` ? ` = ${answer}` : ""}.`
    });
  });

  registry.register("math.proba.de", (seed) => {
    const rng = createRng(seed);
    const kind = pick(rng, ["pair", "impair", "superieur a 4", "multiple de 3"]);
    const favorable = {
      pair: [2, 4, 6],
      impair: [1, 3, 5],
      "superieur a 4": [5, 6],
      "multiple de 3": [3, 6]
    }[kind];
    const answer = fraction(favorable.length, 6);
    return makeExercise("math.proba.de", seed, {
      notionId: "math.probabilites",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Consolidation",
      question: `On lance un de equilibre a 6 faces. Quelle est la probabilite d'obtenir un nombre ${kind} ?`,
      answer,
      distractors: [fraction(1, 6), fraction(4, 6), `${favorable.length}`],
      explanation: `Les issues favorables sont ${favorable.join(", ")} : il y en a ${favorable.length} sur 6, donc ${answer}.`
    });
  });

  registry.register("math.proba.roue", (seed) => {
    const rng = createRng(seed);
    const total = pick(rng, [8, 10, 12]);
    const green = 2 + Math.floor(rng() * Math.floor(total / 2));
    const answer = fraction(green, total);
    return makeExercise("math.proba.roue", seed, {
      notionId: "math.probabilites",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Type brevet",
      question: `Une roue est partagee en ${total} secteurs egaux, dont ${green} secteurs verts. Quelle est la probabilite de tomber sur vert ?`,
      answer,
      distractors: [fraction(total - green, total), `${green}/${total - green}`, fraction(1, total)],
      explanation: `Tous les secteurs ont la meme chance. Il y a ${green} secteurs verts sur ${total}, donc ${answer}.`
    });
  });

  registry.register("math.equation.ax-plus-b", (seed) => {
    const rng = createRng(seed);
    const a = 2 + Math.floor(rng() * 8);
    const x = 2 + Math.floor(rng() * 10);
    const b = 1 + Math.floor(rng() * 12);
    const result = a * x + b;
    return makeExercise("math.equation.ax-plus-b", seed, {
      notionId: "math.equations",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Consolidation",
      question: `Quelle est la solution de ${a}x + ${b} = ${result} ?`,
      answer: x,
      distractors: [x + 1, x - 1, result - b],
      explanation: `On retire ${b} des deux cotes : ${a}x = ${result - b}. Puis on divise par ${a} : x = ${x}.`
    });
  });

  registry.register("math.grandeurs.vitesse", (seed) => {
    const rng = createRng(seed);
    const speed = pick(rng, [40, 50, 60, 70, 80, 90]);
    const duration = pick(rng, [0.5, 1, 1.5, 2, 2.5]);
    const distance = speed * duration;
    return makeExercise("math.grandeurs.vitesse", seed, {
      notionId: "math.grandeurs",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Consolidation",
      question: `Un trajet de ${distance} km dure ${String(duration).replace(".", ",")} h. Quelle est la vitesse moyenne ?`,
      answer: `${speed} km/h`,
      distractors: [`${distance + speed} km/h`, `${Math.round(distance / (duration + 0.5))} km/h`, `${distance} km/h`],
      explanation: `La vitesse moyenne vaut distance / duree = ${distance} / ${duration} = ${speed} km/h.`
    });
  });

  registry.register("math.grandeurs.pourcentage", (seed) => {
    const rng = createRng(seed);
    const base = pick(rng, [40, 50, 60, 80, 100, 120, 150, 200]);
    const percent = pick(rng, [5, 10, 15, 20, 25, 30]);
    const value = base * percent / 100;
    return makeExercise("math.grandeurs.pourcentage", seed, {
      notionId: "math.grandeurs",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Decouverte",
      question: `Combien vaut ${percent} % de ${base} ?`,
      answer: value,
      distractors: [base + percent, base - value, percent * 10],
      explanation: `${percent} % de ${base}, c'est ${base} x ${percent} / 100 = ${value}.`
    });
  });

  registry.register("math.stats.moyenne", (seed) => {
    const rng = createRng(seed);
    const average = 8 + Math.floor(rng() * 8);
    const values = [average - 3, average - 1, average + 1, average + 3];
    return makeExercise("math.stats.moyenne", seed, {
      notionId: "math.statistiques",
      subject: "mathematiques",
      chapter: "Statistiques",
      stage: "Consolidation",
      question: `Quelle est la moyenne de la serie ${values.join(" ; ")} ?`,
      answer: average,
      distractors: [average - 1, average + 1, values.reduce((sum, value) => sum + value, 0)],
      explanation: `La somme vaut ${values.reduce((sum, value) => sum + value, 0)}. On divise par 4 : la moyenne est ${average}.`
    });
  });

  registry.register("math.tableur.formule", (seed) => {
    const rng = createRng(seed);
    const a = 2 + Math.floor(rng() * 8);
    const b = 2 + Math.floor(rng() * 8);
    const op = pick(rng, [
      { symbol: "+", label: "additionne", result: a + b },
      { symbol: "*", label: "multiplie", result: a * b },
      { symbol: "-", label: "soustrait", result: a - b }
    ]);
    return makeExercise("math.tableur.formule", seed, {
      notionId: "math.tableur",
      subject: "mathematiques",
      chapter: "Algorithmique et tableur",
      stage: "Decouverte",
      question: `Dans un tableur, A1 vaut ${a} et B1 vaut ${b}. Que donne la formule =A1${op.symbol}B1 ?`,
      answer: op.result,
      distractors: [a + b, a * b, Math.abs(a - b)].filter((value) => value !== op.result),
      explanation: `Le symbole ${op.symbol} ${op.label} les valeurs des cellules : le resultat est ${op.result}.`
    });
  });

  registry.register("math.nombres.fraction-simplifier", (seed) => {
    const rng = createRng(seed);
    const baseNumerator = 2 + Math.floor(rng() * 8);
    const baseDenominator = baseNumerator + 1 + Math.floor(rng() * 8);
    const multiplier = 2 + Math.floor(rng() * 6);
    const numerator = baseNumerator * multiplier;
    const denominator = baseDenominator * multiplier;
    const answer = fraction(numerator, denominator);
    return makeExercise("math.nombres.fraction-simplifier", seed, {
      notionId: "math.nombres-calculs",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Decouverte",
      question: `Quelle est la forme simplifiee de la fraction ${numerator}/${denominator} ?`,
      answer,
      distractors: uniqueDistractors(answer, [`${numerator}/${baseDenominator}`, `${baseNumerator}/${denominator}`, `${denominator}/${numerator}`, `${numerator - multiplier}/${denominator - multiplier}`]),
      explanation: `On divise ${numerator} et ${denominator} par ${multiplier}. On obtient ${answer}.`
    });
  });

  registry.register("math.nombres.fraction-addition", (seed) => {
    const rng = createRng(seed);
    const denominator = pick(rng, [4, 5, 6, 8, 10, 12]);
    const a = 1 + Math.floor(rng() * (denominator - 2));
    const b = 1 + Math.floor(rng() * (denominator - a - 1));
    const answer = fraction(a + b, denominator);
    return makeExercise("math.nombres.fraction-addition", seed, {
      notionId: "math.nombres-calculs",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Consolidation",
      question: `Calcule ${a}/${denominator} + ${b}/${denominator}.`,
      answer,
      distractors: uniqueDistractors(answer, [`${a + b}/${denominator * 2}`, `${a * b}/${denominator}`, `${a + b + 1}/${denominator}`]),
      explanation: `Les deux fractions ont le meme denominateur, on additionne les numerateurs : ${a} + ${b} = ${a + b}, donc ${answer}.`
    });
  });

  registry.register("math.nombres.puissance-dix", (seed) => {
    const rng = createRng(seed);
    const coefficient = pick(rng, [1.2, 2.5, 3.4, 4.8, 6.7, 7.5, 9.1]);
    const exponent = pick(rng, [2, 3, 4, 5]);
    const answer = coefficient * (10 ** exponent);
    return makeExercise("math.nombres.puissance-dix", seed, {
      notionId: "math.nombres-calculs",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Consolidation",
      question: `Quelle est l'ecriture decimale de ${decimalComma(coefficient)} x 10^${exponent} ?`,
      answer: decimalComma(answer),
      distractors: uniqueDistractors(decimalComma(answer), [decimalComma(coefficient * exponent), decimalComma(coefficient / (10 ** exponent)), decimalComma(coefficient * (10 ** (exponent - 1)))]),
      explanation: `Multiplier par 10^${exponent} revient a deplacer la virgule de ${exponent} rangs vers la droite : ${decimalComma(answer)}.`
    });
  });

  registry.register("math.nombres.priorites", (seed) => {
    const rng = createRng(seed);
    const a = 2 + Math.floor(rng() * 8);
    const b = 2 + Math.floor(rng() * 7);
    const c = 2 + Math.floor(rng() * 6);
    const answer = a + b * c;
    return makeExercise("math.nombres.priorites", seed, {
      notionId: "math.nombres-calculs",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Decouverte",
      question: `Calcule ${a} + ${b} x ${c}.`,
      answer,
      distractors: uniqueDistractors(answer, [(a + b) * c, a * b + c, a + b + c]),
      explanation: `La multiplication est prioritaire : ${b} x ${c} = ${b * c}, puis ${a} + ${b * c} = ${answer}.`
    });
  });

  registry.register("math.grandeurs.proportionnalite", (seed) => {
    const rng = createRng(seed);
    const unitPrice = 2 + Math.floor(rng() * 9);
    const quantity = 2 + Math.floor(rng() * 6);
    const asked = quantity + 2 + Math.floor(rng() * 5);
    const price = unitPrice * quantity;
    const answer = unitPrice * asked;
    return makeExercise("math.grandeurs.proportionnalite", seed, {
      notionId: "math.grandeurs",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Consolidation",
      question: `${quantity} cahiers coutent ${price} euros. Combien coutent ${asked} cahiers au meme prix unitaire ?`,
      answer: `${answer} euros`,
      distractors: uniqueDistractors(`${answer} euros`, [`${price + asked} euros`, `${price * asked} euros`, `${unitPrice + asked} euros`]),
      explanation: `Un cahier coute ${price} / ${quantity} = ${unitPrice} euros. Donc ${asked} cahiers coutent ${asked} x ${unitPrice} = ${answer} euros.`
    });
  });

  registry.register("math.fonctions.image", (seed) => {
    const rng = createRng(seed);
    const a = 2 + Math.floor(rng() * 5);
    const b = 1 + Math.floor(rng() * 8);
    const x = 1 + Math.floor(rng() * 8);
    const answer = a * x + b;
    return makeExercise("math.fonctions.image", seed, {
      notionId: "math.fonctions",
      subject: "mathematiques",
      chapter: "Fonctions",
      stage: "Decouverte",
      question: `On considere la fonction f definie par f(x) = ${a}x + ${b}. Quelle est l'image de ${x} ?`,
      answer,
      distractors: uniqueDistractors(answer, [a + x + b, a * (x + b), x * b + a]),
      explanation: `On remplace x par ${x} : f(${x}) = ${a} x ${x} + ${b} = ${answer}.`
    });
  });

  registry.register("math.fonctions.antecedent", (seed) => {
    const rng = createRng(seed);
    const a = 2 + Math.floor(rng() * 6);
    const x = 2 + Math.floor(rng() * 8);
    const b = 1 + Math.floor(rng() * 9);
    const image = a * x + b;
    return makeExercise("math.fonctions.antecedent", seed, {
      notionId: "math.fonctions",
      subject: "mathematiques",
      chapter: "Fonctions",
      stage: "Consolidation",
      question: `Pour f(x) = ${a}x + ${b}, quel est un antecedent de ${image} ?`,
      answer: x,
      distractors: uniqueDistractors(x, [image, x + 1, x - 1, a + b]),
      explanation: `On resout ${a}x + ${b} = ${image}. Donc ${a}x = ${image - b}, puis x = ${x}.`
    });
  });

  registry.register("math.geometrie.pythagore-longueur", (seed) => {
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
      [7, 24, 25]
    ];
    const rng = createRng(seed);
    const [a, b, c] = pick(rng, triples);
    return makeExercise("math.geometrie.pythagore-longueur", seed, {
      notionId: "math.geometrie",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Consolidation",
      question: `Un triangle est rectangle. Ses deux cotes de l'angle droit mesurent ${a} cm et ${b} cm. Quelle est la longueur de l'hypotenuse ?`,
      answer: `${c} cm`,
      distractors: uniqueDistractors(`${c} cm`, [`${a + b} cm`, `${Math.abs(b - a)} cm`, `${square(a) + square(b)} cm`]),
      explanation: `D'apres Pythagore, l'hypotenuse verifie c^2 = ${a}^2 + ${b}^2 = ${square(c)}, donc c = ${c} cm.`
    });
  });

  registry.register("math.geometrie.pythagore-reciproque", (seed) => {
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
      [7, 24, 25]
    ];
    const rng = createRng(seed);
    const [a, b, c] = pick(rng, triples);
    const isRight = rng() > 0.35;
    const longest = isRight ? c : c + 1;
    const answer = isRight ? "Oui, il est rectangle" : "Non, il n'est pas rectangle";
    return makeExercise("math.geometrie.pythagore-reciproque", seed, {
      notionId: "math.geometrie",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Type brevet",
      question: `Un triangle a pour cotes ${a} cm, ${b} cm et ${longest} cm. Est-il rectangle ?`,
      answer,
      distractors: uniqueDistractors(answer, ["Oui, car les trois longueurs sont differentes", "Non, car il n'a pas deux cotes egaux", "Impossible a savoir"]),
      explanation: isRight
        ? `${a}^2 + ${b}^2 = ${square(a) + square(b)} et ${c}^2 = ${square(c)}. Les deux valeurs sont egales, donc le triangle est rectangle.`
        : `${a}^2 + ${b}^2 = ${square(a) + square(b)}, mais ${longest}^2 = ${square(longest)}. Les valeurs sont differentes, donc le triangle n'est pas rectangle.`
    });
  });

  registry.register("math.geometrie.thales", (seed) => {
    const rng = createRng(seed);
    const ab = pick(rng, [6, 8, 10, 12, 15]);
    const ad = pick(rng, [2, 3, 4, 5]);
    const ac = pick(rng, [9, 12, 15, 18]);
    const ae = ad * ac / ab;
    const clean = Number.isInteger(ae);
    const finalAe = clean ? ae : Math.round(ae * 10) / 10;
    return makeExercise("math.geometrie.thales", seed, {
      notionId: "math.geometrie",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Type brevet",
      question: `Dans une configuration de Thales, (DE) est parallele a (BC), AD = ${ad}, AB = ${ab} et AC = ${ac}. Quelle est la longueur AE ?`,
      answer: `${decimalComma(finalAe)}`,
      distractors: uniqueDistractors(decimalComma(finalAe), [decimalComma(ad * ab / ac), decimalComma(ac - ad), decimalComma(ab - ad)]),
      explanation: `Avec Thales, AD/AB = AE/AC. Donc AE = AC x AD / AB = ${ac} x ${ad} / ${ab} = ${decimalComma(finalAe)}.`
    });
  });

  registry.register("math.geometrie.trigonometrie", (seed) => {
    const rng = createRng(seed);
    const adjacent = pick(rng, [3, 4, 5, 6, 8, 10]);
    const hypotenuse = adjacent + pick(rng, [2, 4, 5, 7]);
    const value = Math.round((adjacent / hypotenuse) * 100) / 100;
    return makeExercise("math.geometrie.trigonometrie", seed, {
      notionId: "math.geometrie",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Type brevet",
      question: `Dans un triangle rectangle, par rapport a un angle aigu, le cote adjacent mesure ${adjacent} cm et l'hypotenuse ${hypotenuse} cm. Quelle est la valeur de cosinus de cet angle ?`,
      answer: decimalComma(value),
      distractors: uniqueDistractors(decimalComma(value), [decimalComma(hypotenuse / adjacent), decimalComma((hypotenuse - adjacent) / hypotenuse), decimalComma(adjacent + hypotenuse)]),
      explanation: `Le cosinus vaut adjacent / hypotenuse = ${adjacent} / ${hypotenuse} = ${decimalComma(value)}.`
    });
  });

  registry.register("math.litteral.developper", (seed) => {
    const rng = createRng(seed);
    const a = 2 + Math.floor(rng() * 7);
    const b = 1 + Math.floor(rng() * 9);
    const answer = `${a}x + ${a * b}`;
    return makeExercise("math.litteral.developper", seed, {
      notionId: "math.calcul-litteral",
      subject: "mathematiques",
      chapter: "Calcul litteral",
      stage: "Decouverte",
      question: `Developpe l'expression ${a}(x + ${b}).`,
      answer,
      distractors: uniqueDistractors(answer, [`${a}x + ${b}`, `x + ${a * b}`, `${a + b}x`, `${a}x${b}`]),
      explanation: `On distribue ${a} : ${a} x x = ${a}x et ${a} x ${b} = ${a * b}.`
    });
  });

  registry.register("math.litteral.factoriser", (seed) => {
    const rng = createRng(seed);
    const factor = 2 + Math.floor(rng() * 7);
    const a = 2 + Math.floor(rng() * 6);
    const b = 1 + Math.floor(rng() * 8);
    const left = factor * a;
    const right = factor * b;
    const answer = `${factor}(${a}x + ${b})`;
    return makeExercise("math.litteral.factoriser", seed, {
      notionId: "math.calcul-litteral",
      subject: "mathematiques",
      chapter: "Calcul litteral",
      stage: "Consolidation",
      question: `Factorise l'expression ${left}x + ${right}.`,
      answer,
      distractors: uniqueDistractors(answer, [`${factor}(${left}x + ${right})`, `${a}(${factor}x + ${b})`, `${factor}(${a}x + ${right})`, `${left}(x + ${b})`]),
      explanation: `${factor} est un facteur commun : ${left}x = ${factor} x ${a}x et ${right} = ${factor} x ${b}, donc ${answer}.`
    });
  });

  registry.register("math.litteral.evaluer", (seed) => {
    const rng = createRng(seed);
    const a = 2 + Math.floor(rng() * 6);
    const b = 1 + Math.floor(rng() * 9);
    const x = 2 + Math.floor(rng() * 8);
    const answer = a * x + b;
    return makeExercise("math.litteral.evaluer", seed, {
      notionId: "math.calcul-litteral",
      subject: "mathematiques",
      chapter: "Calcul litteral",
      stage: "Consolidation",
      question: `Calcule la valeur de ${a}x + ${b} pour x = ${x}.`,
      answer,
      distractors: uniqueDistractors(answer, [a + x + b, a * (x + b), x + b, a * x - b]),
      explanation: `On remplace x par ${x} : ${a} x ${x} + ${b} = ${answer}.`
    });
  });

  registry.register("math.stats.mediane", (seed) => {
    const rng = createRng(seed);
    const middle = 8 + Math.floor(rng() * 8);
    const values = [middle - 5, middle - 2, middle, middle + 3, middle + 6];
    return makeExercise("math.stats.mediane", seed, {
      notionId: "math.statistiques",
      subject: "mathematiques",
      chapter: "Statistiques",
      stage: "Consolidation",
      question: `Quelle est la mediane de la serie ${values.join(" ; ")} ?`,
      answer: middle,
      distractors: uniqueDistractors(middle, [middle - 2, middle + 3, values.reduce((sum, value) => sum + value, 0) / values.length]),
      explanation: `La serie est deja rangee et contient 5 valeurs. La valeur du milieu, la 3e, est ${middle}.`
    });
  });

  registry.register("math.grandeurs.conversion", (seed) => {
    const rng = createRng(seed);
    const cases = [
      { value: pick(rng, [2, 3, 4, 5, 6, 8]), from: "m", to: "cm", factor: 100 },
      { value: pick(rng, [120, 250, 480, 750]), from: "cm", to: "m", factor: 0.01 },
      { value: pick(rng, [1.5, 2.4, 3.2, 4.8]), from: "km", to: "m", factor: 1000 },
      { value: pick(rng, [30, 45, 90, 150]), from: "min", to: "h", factor: 1 / 60 }
    ];
    const item = pick(rng, cases);
    const raw = item.value * item.factor;
    const answerValue = Number.isInteger(raw) ? raw : Math.round(raw * 100) / 100;
    const answer = `${decimalComma(answerValue)} ${item.to}`;
    return makeExercise("math.grandeurs.conversion", seed, {
      notionId: "math.grandeurs",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Decouverte",
      question: `Convertis ${decimalComma(item.value)} ${item.from} en ${item.to}.`,
      answer,
      distractors: uniqueDistractors(answer, [`${decimalComma(item.value / item.factor)} ${item.to}`, `${decimalComma(item.value * 10)} ${item.to}`, `${decimalComma(item.value)} ${item.to}`]),
      explanation: `On applique le facteur de conversion adapte : ${decimalComma(item.value)} ${item.from} = ${answer}.`
    });
  });

  registry.register("math.geometrie.volume-pave", (seed) => {
    const rng = createRng(seed);
    const length = 2 + Math.floor(rng() * 8);
    const width = 2 + Math.floor(rng() * 6);
    const height = 2 + Math.floor(rng() * 5);
    const answer = length * width * height;
    return makeExercise("math.geometrie.volume-pave", seed, {
      notionId: "math.geometrie",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Consolidation",
      question: `Un pave droit mesure ${length} cm de long, ${width} cm de large et ${height} cm de haut. Quel est son volume ?`,
      answer: `${answer} cm3`,
      distractors: uniqueDistractors(`${answer} cm3`, [`${length + width + height} cm3`, `${2 * (length + width + height)} cm3`, `${length * width} cm3`]),
      explanation: `Le volume d'un pave droit vaut longueur x largeur x hauteur = ${length} x ${width} x ${height} = ${answer} cm3.`
    });
  });
}());
