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

  function makeExercise(generatorId, seed, data) {
    const baseChoices = [...new Set([data.answer, ...data.distractors].map(String))].slice(0, 4);
    const choices = baseChoices.length >= 4 ? baseChoices : [...baseChoices, "Impossible", "0"].slice(0, 4);
    return {
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
