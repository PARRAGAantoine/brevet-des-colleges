(function () {
  const lessonUpdates = {
    math_pythagore: {
      example: "Si AB = 3 et AC = 4 dans un triangle rectangle en A, alors BC = 5.",
      takeaway: "Pythagore sert a trouver une longueur dans un triangle rectangle."
    },
    hist_espace_productif: {
      summary: "Un espace productif est un lieu ou l'on produit des richesses : agriculture, industrie ou services.",
      example: "Une zone avec des usines et des emplois industriels est un espace productif industriel.",
      takeaway: "Dis ce qu'on produit, qui travaille, ou cela se trouve et quels effets cela a."
    },
    hist_institutions: {
      summary: "Les institutions sont les grands groupes officiels qui font fonctionner la Republique.",
      example: "Le Parlement vote la loi. Le gouvernement applique la politique du pays.",
      takeaway: "Valeur = idee importante. Institution = groupe officiel qui agit."
    },
    math_proportionnalite: {
      summary: "Deux grandeurs sont proportionnelles quand on multiplie toujours par le meme nombre.",
      example: "Si 1 cahier coute 2 euros, 3 cahiers coutent 6 euros. On multiplie toujours par 2.",
      takeaway: "Cherche le nombre qui permet de passer d'une colonne a l'autre."
    },
    fr_redaction_methode: {
      example: "Pour un sujet de reflexion, fais deux parties simples : une idee pour, puis une limite ou une autre idee.",
      takeaway: "Un paragraphe clair contient une idee, une explication et un exemple."
    },
    "math-puissances-decouverte": {
      takeaway: "Une puissance de 10 indique combien de fois on multiplie par 10."
    },
    "math-factoriser-decouverte": {
      takeaway: "Factoriser, c'est transformer une somme en produit quand un facteur se repete."
    },
    "math-equations-consolidation": {
      takeaway: "Pour garder l'egalite vraie, fais la meme operation des deux cotes."
    },
    "math-vitesse-consolidation": {
      takeaway: "Pour une vitesse constante : distance = vitesse x duree."
    },
    "math-thales-type-brevet": {
      takeaway: "Thales sert a calculer une longueur avec des droites paralleles."
    },
    "math-tableur-decouverte": {
      takeaway: "Dans un tableur, une formule commence souvent par = et calcule avec les cellules."
    },
    "francais-cod-coi-decouverte": {
      takeaway: "Le COD repond souvent a qui ou quoi ; le COI commence souvent par a ou de."
    },
    "francais-phrase-complexe-consolidation": {
      takeaway: "Une phrase complexe contient plusieurs verbes conjugues."
    },
    "francais-valeurs-temps-type-brevet": {
      takeaway: "Le temps d'un verbe aide a comprendre si l'action avance, dure ou decrit."
    },
    "francais-sujet-reflexion-consolidation": {
      takeaway: "Un argument explique une idee ; un exemple la rend plus concrete."
    },
    "francais-dictee-accords-decouverte": {
      takeaway: "Pour accorder, cherche le nom chef du groupe nominal."
    },
    "histoire-totalitarismes-decouverte": {
      summary: "Un regime totalitaire veut tout controler : la politique, les medias, l'ecole et la vie des habitants.",
      example: "Un parti unique, un chef tout-puissant, des affiches officielles et la peur sont des indices.",
      takeaway: "Totalitaire veut dire : l'Etat cherche a tout controler."
    },
    "histoire-resistance-type-brevet": {
      takeaway: "La Resistance lutte contre l'occupation allemande et la collaboration."
    },
    "geo-espaces-faible-densite-consolidation": {
      takeaway: "Un espace de faible densite compte peu d'habitants, mais il peut avoir des activites."
    },
    "geo-mondialisation-decouverte": {
      summary: "La mondialisation, c'est quand les pays sont de plus en plus relies par les echanges.",
      example: "Un telephone peut etre pense aux Etats-Unis, fabrique en Asie et vendu en Europe.",
      takeaway: "Mondialisation = echanges nombreux entre pays."
    },
    "emc-laicite-decouverte": {
      takeaway: "La laicite permet de croire ou de ne pas croire, dans le respect de la loi."
    },
    "emc-droits-devoirs-consolidation": {
      summary: "Un citoyen a des droits, mais aussi des devoirs envers les autres et la loi.",
      takeaway: "Droits et devoirs vont ensemble dans la vie citoyenne."
    },
    "svt-adn-decouverte": {
      takeaway: "Les genes portent des informations qui peuvent influencer les caracteres."
    },
    "pc-ions-ph-consolidation": {
      takeaway: "Le pH indique si une solution est acide, neutre ou basique."
    },
    "pc-energie-type-brevet": {
      takeaway: "Une chaine energetique montre d'ou vient l'energie et en quoi elle se transforme."
    },
    "techno-algorithme-boucle-decouverte": {
      takeaway: "Une boucle repete plusieurs fois les memes instructions."
    },
    "techno-objet-fonction-consolidation": {
      takeaway: "Le besoin dit pourquoi l'objet existe ; la solution technique dit comment il fonctionne."
    },
    extra8_emc_defense: {
      summary: "La defense nationale protege le pays, ses habitants et ses valeurs.",
      example: "La JDC aide les jeunes a comprendre le role de la defense.",
      takeaway: "La defense concerne l'Etat, l'armee et les citoyens."
    },
    extra11_hist_ww2_methode: {
      summary: "La Seconde Guerre mondiale est une guerre totale : elle touche les soldats, les civils et l'economie.",
      example: "Les civils subissent les bombardements, les penuries, les deportations et les massacres.",
      takeaway: "Retenir : guerre mondiale, guerre totale, genocide, Resistance, Liberation."
    },
    extra11_emc_defense_methode: {
      summary: "La defense protege le pays, les habitants et les valeurs de la Republique.",
      example: "Le parcours citoyen aide les jeunes a comprendre leurs droits et leurs devoirs.",
      takeaway: "Defense nationale = proteger le pays et les citoyens."
    }
  };

  (window.BREVET_CONTENT.lessons || []).forEach((lesson) => {
    const update = lessonUpdates[lesson.id];
    if (update) Object.assign(lesson, update);
  });
}());
