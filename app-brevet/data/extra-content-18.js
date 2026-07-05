(function () {
  const content = window.BREVET_CONTENT;
  if (!content || !Array.isArray(content.exercises)) return;

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function exerciseText(exercise) {
    return normalize([
      exercise.id,
      exercise.subject,
      exercise.chapter,
      exercise.notionId,
      exercise.question,
      exercise.prompt,
      exercise.explanation
    ].filter(Boolean).join(" "));
  }

  function hasAny(text, words) {
    return words.some((word) => text.includes(word));
  }

  function applyRule(exercise, rule) {
    if (exercise.subject !== rule.subject) return false;
    const text = exerciseText(exercise);
    if (!rule.match(text, exercise)) return false;
    if (!exercise.lessonId) exercise.lessonId = rule.lessonId;
    if (!exercise.helpText) exercise.helpText = rule.helpText;
    return true;
  }

  function addLessonOnce(lesson) {
    if (!Array.isArray(content.lessons)) content.lessons = [];
    if (!content.lessons.some((existing) => existing.id === lesson.id)) {
      content.lessons.push(lesson);
    }
  }

  addLessonOnce({
    id: "math_conversions",
    subject: "mathematiques",
    chapter: "Grandeurs et mesures",
    notionId: "math.grandeurs",
    stage: "Decouverte",
    prerequisite: "Savoir multiplier ou diviser par 10, 100 ou 1000.",
    title: "Convertir des unites simples",
    summary: "Convertir, c'est exprimer la meme grandeur avec une autre unite.",
    example: "2,5 km = 2500 m, car 1 km = 1000 m.",
    mistake: "Changer le nombre sans regarder si l'unite devient plus petite ou plus grande."
  });

  addLessonOnce({
    id: "fr_vocabulaire_prefixes",
    subject: "francais",
    chapter: "Vocabulaire",
    notionId: "fr.lecture-langue",
    stage: "Decouverte",
    prerequisite: "Savoir qu'un mot peut etre construit avec plusieurs morceaux.",
    title: "Comprendre un mot par sa construction",
    summary: "Un prefixe se place au debut d'un mot et peut changer son sens.",
    example: "Possible devient impossible avec le prefixe im-, qui marque souvent le contraire.",
    mistake: "Choisir un prefixe au hasard sans verifier si le mot existe vraiment."
  });

  addLessonOnce({
    id: "geo_amenagement",
    subject: "histoire",
    chapter: "France",
    notionId: "geo.france",
    stage: "Consolidation",
    prerequisite: "Savoir qu'un territoire peut etre transforme par les habitants et les pouvoirs publics.",
    title: "Comprendre l'amenagement du territoire",
    summary: "Amenager un territoire, c'est le transformer pour mieux y vivre, se deplacer ou travailler.",
    example: "Construire une ligne de tramway, renover un quartier ou proteger un littoral sont des amenagements.",
    mistake: "Croire qu'un amenagement concerne seulement les grandes villes."
  });

  addLessonOnce({
    id: "hist_vocabulaire",
    subject: "histoire",
    chapter: "Reperes",
    notionId: "hist.reperes",
    stage: "Decouverte",
    prerequisite: "Savoir lire une question et reperer les mots importants.",
    title: "Utiliser les mots importants en histoire-geographie",
    summary: "Une definition precise aide a comprendre une question et a eviter les reponses trop vagues.",
    example: "Dire qu'une metropole concentre des habitants, des activites et des pouvoirs est plus precis que dire seulement grande ville.",
    mistake: "Repondre avec un mot connu sans verifier son sens exact dans la question."
  });

  addLessonOnce({
    id: "sci_organes_fonctions",
    subject: "sciences",
    chapter: "SVT",
    notionId: "sci.svt",
    stage: "Decouverte",
    prerequisite: "Savoir qu'un etre vivant est organise en organes.",
    title: "Relier un organe a son role",
    summary: "Un organe a une fonction precise dans le corps ou dans un etre vivant.",
    example: "Les poumons permettent les echanges de dioxygene et de dioxyde de carbone avec l'air.",
    mistake: "Confondre le nom de l'organe avec ce qu'il permet de faire."
  });

  const rules = [
    {
      subject: "mathematiques",
      lessonId: "math_echelle",
      match: (text) => hasAny(text, ["echelle", "distance reelle"]),
      helpText: "Lis d'abord l'echelle. A l'echelle 1:1000, 1 cm sur le plan represente 1000 cm en realite. Multiplie, puis convertis les centimetres en metres si besoin."
    },
    {
      subject: "mathematiques",
      lessonId: "math_trigo",
      match: (text) => hasAny(text, ["cosinus", "sinus", "tangente", "trigonometrie"]),
      helpText: "Dans un triangle rectangle, choisis l'angle, puis nomme les cotes par rapport a cet angle. Cosinus = adjacent / hypotenuse, sinus = oppose / hypotenuse, tangente = oppose / adjacent."
    },
    {
      subject: "mathematiques",
      lessonId: "math_thales_base",
      match: (text) => text.includes("thales"),
      helpText: "Avant Thales, verifie deux choses : les points alignes et les droites paralleles. Ensuite seulement, ecris les rapports dans le meme ordre."
    },
    {
      subject: "mathematiques",
      lessonId: "math_pythagore",
      match: (text) => hasAny(text, ["pythagore", "hypotenuse", "triangle rectangle"]),
      helpText: "Pythagore s'utilise seulement dans un triangle rectangle. Repere l'hypotenuse, puis applique : hypotenuse^2 = cote^2 + cote^2."
    },
    {
      subject: "mathematiques",
      lessonId: "math_aires_volumes",
      match: (text) => hasAny(text, ["aire", "volume", "pave", "cube", "cylindre", "cm2", "cm3"]),
      helpText: "Commence par identifier ce que l'on cherche : longueur, aire ou volume. Puis choisis la formule adaptee et termine avec la bonne unite."
    },
    {
      subject: "mathematiques",
      lessonId: "math_proba_base",
      match: (text) => hasAny(text, ["probabilite", "urne", "boule", "jeton", "de equilibre", "issues"]),
      helpText: "Compte tous les cas possibles, puis seulement les cas favorables. La probabilite vaut cas favorables / cas possibles."
    },
    {
      subject: "mathematiques",
      lessonId: "math_statistiques",
      match: (text) => hasAny(text, ["moyenne", "mediane", "etendue", "serie"]),
      helpText: "Pour la moyenne, additionne toutes les valeurs puis divise par leur nombre. Pour la mediane, range la serie et cherche la valeur du milieu."
    },
    {
      subject: "mathematiques",
      lessonId: "math_fraction_simplifier",
      match: (text) => hasAny(text, ["fraction", "simplifie", "numerateur", "denominateur"]),
      helpText: "Pour simplifier une fraction, divise le numerateur et le denominateur par le meme nombre. Ne divise jamais seulement le haut ou seulement le bas."
    },
    {
      subject: "mathematiques",
      lessonId: "math_pourcentages",
      match: (text) => hasAny(text, ["pourcentage", "pourcent", " % "]) || /(?:^|[^0-9])\d+\s*%/.test(text),
      helpText: "Un pourcentage est une fraction sur 100. Pour calculer 20 % d'une quantite, fais 20/100 x cette quantite."
    },
    {
      subject: "mathematiques",
      lessonId: "math_proportionnalite_simple",
      match: (text) => hasAny(text, ["proportionnalite", "proportionnel", "prix unitaire", "produit en croix", "coutent", "meme prix"]),
      helpText: "Cherche si le meme coefficient permet de passer d'une grandeur a l'autre. Tu peux aussi revenir a l'unite avant de calculer la valeur demandee."
    },
    {
      subject: "mathematiques",
      lessonId: "math_conversions",
      match: (text) => hasAny(text, ["convertis", "conversion", "minutes", "secondes", "metres", "millilitres", " ml", " km", "litre"]),
      helpText: "Repere l'unite de depart et l'unite demandee. Si l'unite demandee est plus petite, le nombre devient plus grand ; si elle est plus grande, le nombre devient plus petit."
    },
    {
      subject: "mathematiques",
      lessonId: "math_puissances",
      match: (text) => hasAny(text, ["puissance", "exposant", "10^"]) || /\^\d/.test(text),
      helpText: "Une puissance indique une multiplication repetee. Par exemple 10^3 veut dire 10 x 10 x 10, donc 1000."
    },
    {
      subject: "mathematiques",
      lessonId: "math_developpements",
      match: (text) => hasAny(text, ["developpe", "developper", "developpement", "distributivite"]),
      helpText: "Developper, c'est distribuer la multiplication : le nombre devant la parenthese multiplie chaque terme de la parenthese."
    },
    {
      subject: "mathematiques",
      lessonId: "math_factorisation",
      match: (text) => hasAny(text, ["factorise", "factoriser", "factorisee", "facteur commun"]),
      helpText: "Factoriser, c'est chercher un facteur commun et le placer devant une parenthese. Verifie en redeveloppant."
    },
    {
      subject: "mathematiques",
      lessonId: "math-equations-consolidation",
      match: (text) => hasAny(text, ["equation", "solution de", "resous", "inconnue"]) || /\bx\s*[+=-]/.test(text),
      helpText: "Pour resoudre une equation, garde l'egalite equilibree : fais la meme operation des deux cotes, puis verifie en remplacant x."
    },
    {
      subject: "mathematiques",
      lessonId: "math_fonctions_affines",
      match: (text) => hasAny(text, ["fonction", "image", "antecedent", "f(x)", "affine"]),
      helpText: "Pour calculer une image, remplace x par la valeur donnee dans la formule. Pour un antecedent, cherche la valeur de depart qui donne le resultat."
    },
    {
      subject: "mathematiques",
      lessonId: "math_programme_calcul",
      match: (text) => hasAny(text, ["programme de calcul", "choisir un nombre", "nombre de depart"]),
      helpText: "Suis le programme dans l'ordre, une etape par ligne. Si le nombre de depart est x, garde x dans les calculs."
    },
    {
      subject: "mathematiques",
      lessonId: "math-tableur-decouverte",
      match: (text) => hasAny(text, ["tableur", "cellule", "formule =", "somme("]),
      helpText: "Dans un tableur, une formule commence par =. Remplace chaque cellule par sa valeur, puis calcule normalement."
    },
    {
      subject: "mathematiques",
      lessonId: "math_nombres_relatifs",
      match: (text) => hasAny(text, ["nombre relatif", "relatifs", "negatif", "positif"]) || /\(-\d/.test(text),
      helpText: "Repere d'abord le signe. Pour multiplier ou diviser, deux signes identiques donnent un resultat positif ; deux signes differents donnent un resultat negatif."
    },
    {
      subject: "mathematiques",
      lessonId: "math_fractions_priorites",
      match: (text) => hasAny(text, ["calcule :"]) && hasAny(text, [" x ", " + ", " - ", " / "]),
      helpText: "Avant de calculer, respecte l'ordre : parentheses, multiplications et divisions, puis additions et soustractions."
    },
    {
      subject: "mathematiques",
      lessonId: "math_transformations",
      match: (text) => hasAny(text, ["translation", "rotation", "symetrie", "homothetie", "transformation"]),
      helpText: "Observe le mouvement de la figure : elle peut glisser, tourner, se retourner, ou changer de taille."
    },
    {
      subject: "mathematiques",
      lessonId: "math-vitesse-consolidation",
      match: (text) => hasAny(text, ["vitesse", "km/h", "m/s"]),
      helpText: "Pour une vitesse, relie distance et duree. Utilise v = d / t, et verifie que les unites sont compatibles."
    },
    {
      subject: "francais",
      lessonId: "fr_reecriture",
      match: (text) => hasAny(text, ["reecris", "reecriture", "transforme", "transformer", "conjugue"]),
      helpText: "Avant de transformer la phrase, repere le sujet, le temps et les mots qui doivent changer. Modifie ensuite un element a la fois."
    },
    {
      subject: "francais",
      lessonId: "fr_homophones",
      match: (text) => hasAny(text, ["homophone", " a / a", " et / est", "complete correctement", "choisis la bonne phrase", "elle ... faim"]),
      helpText: "Pour un homophone, fais un test de remplacement. Par exemple, remplace a par avait : si la phrase garde du sens, c'est le verbe avoir."
    },
    {
      subject: "francais",
      lessonId: "fr_participe_passe",
      match: (text) => hasAny(text, ["participe", "accord", "accorde", "auxiliaire", "adjectif"]),
      helpText: "Cherche le mot avec lequel il faut accorder. Avec etre, le participe passe s'accorde souvent avec le sujet."
    },
    {
      subject: "francais",
      lessonId: "francais-cod-coi-decouverte",
      match: (text) => hasAny(text, ["cod", "coi", "fonction du groupe", "fonction de", "sujet du verbe", "quel est le sujet", "quel groupe est le sujet", "quel est le verbe", "complement", "precision sur", "demain"]),
      helpText: "Pour trouver une fonction, pose la bonne question autour du verbe : qui est-ce qui ? quoi ? a qui ? de quoi ?"
    },
    {
      subject: "francais",
      lessonId: "fr_citation",
      match: (text) => hasAny(text, ["citation", "justifier", "justifiee", "comprehension", "interpretation", "preuve tiree du texte", "reponse de lecture", "prouver"]),
      helpText: "Une bonne reponse de lecture contient une idee, une preuve courte prise dans le texte, puis une explication."
    },
    {
      subject: "francais",
      lessonId: "fr_point_vue",
      match: (text) => hasAny(text, ["narrateur", "point de vue", "omniscient", "interne", "externe"]),
      helpText: "Demande-toi qui raconte et ce que le narrateur sait. S'il connait les pensees d'un personnage, le point de vue est souvent interne."
    },
    {
      subject: "francais",
      lessonId: "fr_figures_style",
      match: (text) => hasAny(text, ["comparaison", "metaphore", "champ lexical", "figure de style", "procede", "peur", "silence", "ombre", "bruits inconnus"]),
      helpText: "Ne t'arrete pas au nom du procede : explique aussi l'effet produit dans le texte."
    },
    {
      subject: "francais",
      lessonId: "fr_vocabulaire_prefixes",
      match: (text) => hasAny(text, ["vocabulaire", "contraire", "prefixe", "impossible", "visible"]),
      helpText: "Observe la construction du mot. Un prefixe place au debut peut marquer le contraire, mais il faut choisir une forme qui existe."
    },
    {
      subject: "francais",
      lessonId: "fr_argument",
      match: (text) => hasAny(text, ["redaction", "argument", "paragraphe", "connecteur", "opposition"]),
      helpText: "Un paragraphe clair contient une idee, une explication et un exemple. Un connecteur aide le lecteur a suivre ton raisonnement."
    },
    {
      subject: "francais",
      lessonId: "francais-valeurs-temps-type-brevet",
      match: (text) => hasAny(text, ["imparfait", "passe simple", "futur simple", "valeur du temps", "recit"]),
      helpText: "Dans un recit, l'imparfait sert souvent a decrire ou a montrer une habitude ; le passe simple fait avancer l'action."
    },
    {
      subject: "histoire",
      lessonId: "geo_doc",
      match: (text) => hasAny(text, ["document", "source", "analyse de document", "presenter un document"]),
      helpText: "Commence par presenter le document : nature, auteur/source, date et sujet. Puis utilise une information precise du document."
    },
    {
      subject: "histoire",
      lessonId: "hist_dev",
      match: (text) => hasAny(text, ["developpement construit", "reponse longue", "paragraphe"]),
      helpText: "Organise ta reponse : une courte introduction, une idee par paragraphe, un exemple precis, puis une phrase de conclusion."
    },
    {
      subject: "histoire",
      lessonId: "hist_vocabulaire",
      match: (text) => hasAny(text, ["definition precise", "mot designe", "vocabulaire", "mot important"]),
      helpText: "Lis le mot demande et cherche sa definition exacte. En histoire-geographie, deux mots proches peuvent designer des idees differentes."
    },
    {
      subject: "histoire",
      lessonId: "extra8_hist_guerre_froide",
      match: (text) => text.includes("guerre froide"),
      helpText: "Pour la guerre froide, pense aux deux blocs : Etats-Unis et URSS, tensions fortes, mais pas de guerre directe totale entre eux."
    },
    {
      subject: "histoire",
      lessonId: "histoire-resistance-type-brevet",
      match: (text) => text.includes("resistance"),
      helpText: "La Resistance lutte contre l'Occupation et la collaboration. Elle agit aussi pour preparer la Liberation et le retour de la Republique."
    },
    {
      subject: "histoire",
      lessonId: "histoire-totalitarismes-decouverte",
      match: (text) => hasAny(text, ["totalitaire", "nazisme", "stalinisme"]),
      helpText: "Un regime totalitaire cherche a controler la population, la politique, l'information et souvent la violence d'Etat."
    },
    {
      subject: "histoire",
      lessonId: "hist_guerres",
      match: (text) => hasAny(text, ["1914", "1918", "1939", "1945", "guerre mondiale", "shoah", "genocide"]),
      helpText: "Repere d'abord la guerre concernee et ses dates. 1914-1918 : Premiere Guerre mondiale ; 1939-1945 : Seconde Guerre mondiale."
    },
    {
      subject: "histoire",
      lessonId: "hist_decolonisation",
      match: (text) => hasAny(text, ["decolonisation", "independance", "algerie"]),
      helpText: "La decolonisation est le passage d'une colonie a l'independance. Cherche les acteurs, la date et les consequences."
    },
    {
      subject: "histoire",
      lessonId: "extra8_hist_construction_europeenne",
      match: (text) => hasAny(text, ["construction europeenne", "cee", "traite de rome", "union europeenne"]),
      helpText: "La construction europeenne commence apres 1945 pour renforcer la paix et la cooperation entre pays europeens."
    },
    {
      subject: "histoire",
      lessonId: "hist_espace_productif",
      match: (text) => hasAny(text, ["espace productif", "industrie", "reconversion industrielle"]),
      helpText: "Pour un espace productif, dis ce qu'on produit, ou il se situe, quels acteurs interviennent et quels effets il a sur le territoire."
    },
    {
      subject: "histoire",
      lessonId: "geo_aires_urbaines",
      match: (text) => hasAny(text, ["aire urbaine", "periurbanisation", "ville-centre", "banlieue", "exode rural", "campagnes vers les villes"]),
      helpText: "Une aire urbaine regroupe ville-centre, banlieue et couronne periurbaine. Pense aux deplacements domicile-travail."
    },
    {
      subject: "histoire",
      lessonId: "geo-espaces-faible-densite-consolidation",
      match: (text) => hasAny(text, ["faible densite"]),
      helpText: "Un espace de faible densite compte peu d'habitants au kilometre carre. Cherche ce que cela change pour les services, les transports et les activites."
    },
    {
      subject: "histoire",
      lessonId: "geo_amenagement",
      match: (text) => hasAny(text, ["amenager", "amenagement", "travaux qui transforment", "transformer un espace"]),
      helpText: "Amenager un territoire, c'est le transformer pour repondre a un besoin : se deplacer, habiter, travailler, proteger ou developper."
    },
    {
      subject: "histoire",
      lessonId: "geo-mondialisation-decouverte",
      match: (text) => hasAny(text, ["mondialisation", "flux", "metropole mondiale", "metropole", "ville tres grande"]),
      helpText: "La mondialisation augmente les echanges entre territoires : marchandises, personnes, capitaux et informations."
    },
    {
      subject: "histoire",
      lessonId: "emc-laicite-decouverte",
      match: (text) => hasAny(text, ["laicite", "devise", "republique", "egalite", "liberte", "fraternite"]),
      helpText: "En EMC, relie toujours les valeurs a la vie commune : liberte, egalite, fraternite, laicite, droits et devoirs."
    },
    {
      subject: "histoire",
      lessonId: "emc_citoyen",
      match: (text) => hasAny(text, ["citoyen", "citoyennete", "vote", "droits", "devoirs", "democratie representative", "separation des pouvoirs"]),
      helpText: "Un citoyen a des droits, des devoirs et peut participer a la vie democratique, par exemple en votant."
    },
    {
      subject: "histoire",
      lessonId: "extra8_emc_defense",
      match: (text) => hasAny(text, ["defense", "securite", "jdc"]),
      helpText: "La defense nationale protege le pays, la population et les valeurs de la Republique. La JDC sensibilise les jeunes a ce role."
    },
    {
      subject: "sciences",
      lessonId: "sci_graphique",
      match: (text) => hasAny(text, ["graphique", "tableau", "donnees", "mesure", "unite"]),
      helpText: "Avant de conclure, lis le titre, les axes, les unites et les valeurs importantes. Une conclusion doit rester proche des donnees."
    },
    {
      subject: "sciences",
      lessonId: "sci_masse_vol",
      match: (text) => text.includes("masse volumique"),
      helpText: "La masse volumique se calcule avec masse / volume. Garde bien l'unite, par exemple g/cm3."
    },
    {
      subject: "sciences",
      lessonId: "sci_ph",
      match: (text) => hasAny(text, ["ph", "acide", "basique", "neutre"]),
      helpText: "Pour le pH : inferieur a 7 = acide, egal a 7 = neutre, superieur a 7 = basique."
    },
    {
      subject: "sciences",
      lessonId: "sci_electricite",
      match: (text) => hasAny(text, ["circuit", "interrupteur", "lampe", "courant", "pile"]),
      helpText: "Pour que le courant circule, le circuit doit etre ferme. Un interrupteur ouvert coupe la boucle."
    },
    {
      subject: "sciences",
      lessonId: "pc-energie-type-brevet",
      match: (text) => hasAny(text, ["energie", "chaine energetique"]),
      helpText: "Dans une chaine energetique, repere l'energie recue, l'energie utile et les pertes possibles."
    },
    {
      subject: "sciences",
      lessonId: "sci_mouvement",
      match: (text) => hasAny(text, ["mouvement", "vitesse", "distance", "duree"]),
      helpText: "Pour decrire un mouvement ou calculer une vitesse, repere la distance, la duree et les unites."
    },
    {
      subject: "sciences",
      lessonId: "sci_experience",
      match: (text) => hasAny(text, ["experience", "facteur teste", "hypothese", "protocole", "resultat observe"]),
      helpText: "Dans une experience, le facteur teste est ce que l'on change. La conclusion doit s'appuyer sur le resultat observe."
    },
    {
      subject: "sciences",
      lessonId: "sci_cellule",
      match: (text) => hasAny(text, ["cellule", "etre vivant", "classification"]),
      helpText: "En SVT, on classe ou on explique a partir de caracteres observes. La cellule est l'unite de base du vivant."
    },
    {
      subject: "sciences",
      lessonId: "sci_organes_fonctions",
      match: (text) => hasAny(text, ["organe", "poumons", "role principal", "ensemble des etres vivants", "etres vivants d'un milieu"]),
      helpText: "Relie chaque element a son role : un organe sert a une fonction, et un milieu regroupe des etres vivants qui interagissent."
    },
    {
      subject: "sciences",
      lessonId: "sci_microorganismes",
      match: (text) => hasAny(text, ["microorganisme", "micro-organisme", "contamination", "hygiene", "lavage des mains"]),
      helpText: "Les microorganismes peuvent se transmettre. L'hygiene limite leur passage d'une personne ou d'une surface a une autre."
    },
    {
      subject: "sciences",
      lessonId: "svt-adn-decouverte",
      match: (text) => hasAny(text, ["gene", "chromosome", "allele", "hereditaire"]),
      helpText: "Un chromosome porte des informations genetiques. Un gene est une portion de cette information."
    },
    {
      subject: "sciences",
      lessonId: "tech_chaine_info",
      match: (text) => hasAny(text, ["capteur", "actionneur", "chaine d'information", "acquerir", "traiter", "transmettre"]),
      helpText: "Dans un systeme automatique, le capteur acquiert une information, le programme la traite, puis un actionneur agit."
    },
    {
      subject: "sciences",
      lessonId: "techno-objet-fonction-consolidation",
      match: (text) => hasAny(text, ["fonction d'usage", "besoin", "solution technique", "materiau", "materiau pour un objet"]),
      helpText: "Distingue le besoin, la fonction et la solution. Le besoin explique pourquoi l'objet existe ; la fonction dit ce qu'il doit faire ; la solution explique comment."
    },
    {
      subject: "sciences",
      lessonId: "techno-algorithme-boucle-decouverte",
      match: (text) => hasAny(text, ["algorithme", "boucle", "repete"]),
      helpText: "Une boucle repete plusieurs fois la meme action. Multiplie l'effet d'une repetition par le nombre de repetitions."
    }
  ];

  content.exercises.forEach((exercise) => {
    rules.some((rule) => applyRule(exercise, rule));
  });
}());
