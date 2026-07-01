(function () {
  const content = window.BREVET_CONTENT;

  content.lessons.push(
    {
      id: "extra8_fr_lecture_base",
      subject: "francais",
      chapter: "Lecture",
      stage: "Decouverte",
      prerequisite: "Savoir relire un passage court et reperer une phrase importante.",
      title: "Comprendre une question de lecture",
      summary: "Une question de lecture demande de comprendre le texte, puis de prouver la reponse avec un indice precis.",
      example: "Si un texte dit que le personnage 'tremble' et 'n'ose plus avancer', on peut expliquer qu'il a peur.",
      mistake: "Repondre seulement avec son impression, sans indice du texte.",
      takeaway: "Idee + indice du texte + explication : c'est la base d'une reponse de lecture."
    },
    {
      id: "extra8_hist_guerre_froide",
      subject: "histoire",
      chapter: "Guerre froide",
      stage: "Consolidation",
      prerequisite: "Connaitre la Seconde Guerre mondiale et savoir situer 1945.",
      title: "Comprendre la guerre froide",
      summary: "La guerre froide oppose deux blocs apres 1945 : le bloc de l'Ouest autour des Etats-Unis et le bloc de l'Est autour de l'URSS.",
      example: "Berlin est un lieu important de la guerre froide car la ville montre la division entre les deux blocs.",
      mistake: "Croire que la guerre froide est une guerre directe permanente entre les Etats-Unis et l'URSS.",
      takeaway: "Deux blocs, deux superpuissances, deux modeles politiques."
    },
    {
      id: "extra8_hist_construction_europeenne",
      subject: "histoire",
      chapter: "Construction europeenne",
      stage: "Consolidation",
      prerequisite: "Savoir que l'Europe sort affaiblie de la Seconde Guerre mondiale.",
      title: "Comprendre la construction europeenne",
      summary: "La construction europeenne est un rapprochement progressif entre des Etats europeens pour garantir la paix et cooperer.",
      example: "La CEE est creee en 1957 par le traite de Rome pour renforcer la cooperation economique.",
      mistake: "Confondre l'Europe comme continent et l'Union europeenne comme organisation politique.",
      takeaway: "Paix, cooperation, traites et elargissements sont les mots essentiels."
    },
    {
      id: "extra8_emc_defense",
      subject: "histoire",
      chapter: "Defense et securite",
      stage: "Type brevet",
      prerequisite: "Connaitre les mots citoyen, droit, devoir et engagement.",
      title: "Comprendre la defense et la securite",
      summary: "La defense nationale protege le territoire, la population et les interets du pays. Elle concerne l'Etat, l'armee et les citoyens.",
      example: "Le parcours citoyen et la JDC permettent aux jeunes de comprendre les enjeux de defense et de citoyennete.",
      mistake: "Limiter la defense a l'armee sans parler de la population, de la securite et de l'engagement citoyen.",
      takeaway: "La defense est une mission de l'Etat, mais elle concerne aussi les citoyens."
    }
  );

  content.exercises.push(
    {
      id: "extra8_math_001",
      subject: "mathematiques",
      chapter: "Probabilites",
      stage: "Decouverte",
      type: "qcm",
      question: "Dans un sac, il y a 3 jetons rouges et 2 jetons bleus. Quelle est la probabilite de tirer un jeton bleu ?",
      choices: ["2/5", "3/5", "2/3", "5/2"],
      answer: "2/5",
      explanation: "Il y a 5 jetons en tout et 2 jetons bleus. La probabilite est donc 2/5."
    },
    {
      id: "extra8_math_002",
      subject: "mathematiques",
      chapter: "Statistiques",
      stage: "Decouverte",
      type: "qcm",
      question: "Quelle est la moyenne de 8, 10 et 12 ?",
      choices: ["10", "9", "12", "30"],
      answer: "10",
      explanation: "On additionne les valeurs : 8 + 10 + 12 = 30. On divise par 3 : 30 / 3 = 10."
    },
    {
      id: "extra8_math_003",
      subject: "mathematiques",
      chapter: "Nombres et calculs",
      stage: "Consolidation",
      type: "qcm",
      question: "Calcule 7 + 3 x 4.",
      choices: ["19", "40", "28", "21"],
      answer: "19",
      explanation: "La multiplication est prioritaire : 3 x 4 = 12, puis 7 + 12 = 19."
    },
    {
      id: "extra8_math_004",
      subject: "mathematiques",
      chapter: "Equations",
      stage: "Consolidation",
      type: "qcm",
      question: "Quelle est la solution de 2x + 5 = 17 ?",
      choices: ["6", "11", "8,5", "24"],
      answer: "6",
      explanation: "On retire 5 des deux cotes : 2x = 12. On divise par 2 : x = 6."
    },
    {
      id: "extra8_math_005",
      subject: "mathematiques",
      chapter: "Calcul litteral",
      stage: "Decouverte",
      type: "qcm",
      question: "Quelle expression est egale a 3(x + 4) ?",
      choices: ["3x + 12", "3x + 4", "x + 12", "7x"],
      answer: "3x + 12",
      explanation: "On distribue 3 a chaque terme : 3 x x + 3 x 4 = 3x + 12."
    },
    {
      id: "extra8_math_006",
      subject: "mathematiques",
      chapter: "Geometrie",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans un triangle rectangle, comment appelle-t-on le cote oppose a l'angle droit ?",
      choices: ["L'hypotenuse", "La mediane", "Le rayon", "La hauteur"],
      answer: "L'hypotenuse",
      explanation: "Dans un triangle rectangle, l'hypotenuse est le cote en face de l'angle droit."
    },
    {
      id: "extra8_math_007",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      stage: "Consolidation",
      type: "qcm",
      question: "Un cycliste roule a 12 km/h pendant 2 h. Quelle distance parcourt-il ?",
      choices: ["24 km", "14 km", "10 km", "6 km"],
      answer: "24 km",
      explanation: "Distance = vitesse x temps, donc 12 x 2 = 24 km."
    },
    {
      id: "extra8_math_008",
      subject: "mathematiques",
      chapter: "Algorithmique et tableur",
      stage: "Decouverte",
      type: "qcm",
      question: "Dans un tableur, que calcule la formule =B2+C2 ?",
      choices: ["La somme des valeurs de B2 et C2", "Le produit des valeurs de B2 et C2", "Le texte B2C2", "La difference entre B2 et C2"],
      answer: "La somme des valeurs de B2 et C2",
      explanation: "Le signe + additionne les valeurs contenues dans les cellules B2 et C2."
    },
    {
      id: "extra8_fr_001",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Decouverte",
      type: "qcm",
      question: "Dans la phrase 'Les enfants jouent', quelle est la fonction de 'Les enfants' ?",
      choices: ["Sujet", "COD", "COI", "Complement de temps"],
      answer: "Sujet",
      explanation: "'Les enfants' indique qui fait l'action de jouer : c'est le sujet."
    },
    {
      id: "extra8_fr_002",
      subject: "francais",
      chapter: "Grammaire",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans 'Je mange une pomme', quelle est la fonction de 'une pomme' ?",
      choices: ["COD", "Sujet", "COI", "Attribut du sujet"],
      answer: "COD",
      explanation: "On pose la question : je mange quoi ? une pomme. C'est un COD."
    },
    {
      id: "extra8_fr_003",
      subject: "francais",
      chapter: "Orthographe",
      stage: "Decouverte",
      type: "qcm",
      question: "Complete : Elle ... faim.",
      choices: ["a", "as", "a ete", "et"],
      answer: "a",
      explanation: "On peut dire 'Elle avait faim'. Il faut donc ecrire 'a' sans accent."
    },
    {
      id: "extra8_fr_004",
      subject: "francais",
      chapter: "Orthographe",
      stage: "Consolidation",
      type: "qcm",
      question: "Quel groupe nominal est correctement accorde ?",
      choices: ["des maisons blanches", "des maison blanche", "des maisons blanche", "des maison blanches"],
      answer: "des maisons blanches",
      explanation: "'Maisons' est feminin pluriel, donc l'adjectif 'blanches' prend -es."
    },
    {
      id: "extra8_fr_005",
      subject: "francais",
      chapter: "Reecriture",
      stage: "Consolidation",
      type: "qcm",
      question: "Transforme 'je suis arrive' avec 'elles'.",
      choices: ["elles sont arrivees", "elles est arrive", "elles sont arrive", "elles ont arrivees"],
      answer: "elles sont arrivees",
      explanation: "Avec l'auxiliaire etre, le participe passe s'accorde avec le sujet : elles sont arrivees."
    },
    {
      id: "extra8_fr_006",
      subject: "francais",
      chapter: "Interpretation",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans une reponse de lecture, que faut-il faire apres une citation ?",
      choices: ["Expliquer ce qu'elle montre", "La recopier une deuxieme fois", "Changer de sujet", "Ajouter une date historique"],
      answer: "Expliquer ce qu'elle montre",
      explanation: "Une citation doit etre accompagnee d'une explication pour prouver l'idee."
    },
    {
      id: "extra8_fr_007",
      subject: "francais",
      chapter: "Lecture et langue",
      stage: "Type brevet",
      type: "qcm",
      question: "Dans un recit, l'imparfait sert souvent a...",
      choices: ["decrire une situation ou une habitude", "raconter seulement une action soudaine", "donner un ordre", "poser une question"],
      answer: "decrire une situation ou une habitude",
      explanation: "L'imparfait sert souvent a decrire, presenter une habitude ou installer une ambiance."
    },
    {
      id: "extra8_fr_008",
      subject: "francais",
      chapter: "Redaction",
      stage: "Consolidation",
      type: "order",
      question: "Remets dans l'ordre une methode pour construire un paragraphe argumente.",
      choices: ["Annoncer l'idee", "Expliquer l'idee", "Donner un exemple", "Faire une phrase de bilan"],
      answer: "Annoncer l'idee|||Expliquer l'idee|||Donner un exemple|||Faire une phrase de bilan",
      explanation: "Un paragraphe argumente clair suit souvent : idee, explication, exemple, bilan."
    },
    {
      id: "extra8_hist_001",
      subject: "histoire",
      chapter: "Reperes",
      stage: "Decouverte",
      type: "qcm",
      question: "Quelle periode correspond a la Premiere Guerre mondiale ?",
      choices: ["1914-1918", "1939-1945", "1789-1799", "1957-1992"],
      answer: "1914-1918",
      explanation: "La Premiere Guerre mondiale a lieu de 1914 a 1918."
    },
    {
      id: "extra8_hist_002",
      subject: "histoire",
      chapter: "Analyse de document",
      stage: "Decouverte",
      type: "qcm",
      question: "Que faut-il faire au debut de l'analyse d'un document ?",
      choices: ["Presenter sa nature, sa date et son sujet", "Relever une information sans presenter le document", "Donner son avis personnel", "Commencer par la conclusion"],
      answer: "Presenter sa nature, sa date et son sujet",
      explanation: "Presenter le document aide a comprendre ce qu'il peut montrer."
    },
    {
      id: "extra8_hist_003",
      subject: "histoire",
      chapter: "Developpement construit",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans un developpement construit, que doit contenir un paragraphe ?",
      choices: ["Une idee, une explication et un exemple", "Une liste de mots sans phrases", "Seulement une date", "Uniquement une conclusion"],
      answer: "Une idee, une explication et un exemple",
      explanation: "Chaque paragraphe doit developper une idee avec une explication et un exemple precis."
    },
    {
      id: "extra8_hist_004",
      subject: "histoire",
      chapter: "Seconde Guerre mondiale",
      stage: "Consolidation",
      type: "qcm",
      question: "Quel mot designe une organisation clandestine qui lutte contre l'occupant ?",
      choices: ["La Resistance", "La mondialisation", "La periurbanisation", "La laicite"],
      answer: "La Resistance",
      explanation: "La Resistance regroupe des actions clandestines contre l'occupation et le regime de Vichy."
    },
    {
      id: "extra8_hist_005",
      subject: "histoire",
      chapter: "Geographie",
      stage: "Consolidation",
      type: "qcm",
      question: "Pour caracteriser un espace productif, il faut surtout parler...",
      choices: ["des activites, des acteurs et des amenagements", "des climats, des saisons et des paysages seulement", "des dates des guerres mondiales", "des institutions politiques uniquement"],
      answer: "des activites, des acteurs et des amenagements",
      explanation: "Un espace productif se decrit avec ce qui est produit, les acteurs, les lieux et les amenagements."
    },
    {
      id: "extra8_hist_006",
      subject: "histoire",
      chapter: "Monde",
      stage: "Decouverte",
      type: "qcm",
      question: "La mondialisation correspond surtout a...",
      choices: ["la multiplication des echanges entre les territoires", "la fermeture complete des frontieres", "la disparition des flux commerciaux", "la baisse de tous les transports internationaux"],
      answer: "la multiplication des echanges entre les territoires",
      explanation: "La mondialisation relie les territoires par des flux de marchandises, d'informations, de capitaux et de personnes."
    },
    {
      id: "extra8_hist_007",
      subject: "histoire",
      chapter: "EMC",
      stage: "Decouverte",
      type: "qcm",
      question: "Quelle institution vote la loi en France ?",
      choices: ["Le Parlement", "Le gouvernement", "Le Conseil constitutionnel", "La commune"],
      answer: "Le Parlement",
      explanation: "Le Parlement, compose de l'Assemblee nationale et du Senat, vote la loi."
    },
    {
      id: "extra8_hist_008",
      subject: "histoire",
      chapter: "Citoyennete",
      stage: "Consolidation",
      type: "qcm",
      question: "Pourquoi un citoyen doit-il respecter la loi ?",
      choices: ["Pour permettre la vie commune et proteger les droits de chacun", "Pour donner les memes opinions a tous les citoyens", "Pour supprimer tous les droits individuels", "Pour empecher toute participation citoyenne"],
      answer: "Pour permettre la vie commune et proteger les droits de chacun",
      explanation: "La loi fixe des regles communes qui protegent les droits et organisent la vie collective."
    },
    {
      id: "extra8_sci_001",
      subject: "sciences",
      chapter: "Donnees",
      stage: "Decouverte",
      type: "qcm",
      question: "Avant de conclure a partir d'un graphique, il faut d'abord lire...",
      choices: ["le titre, les axes et les unites", "seulement la valeur la plus grande", "uniquement la legende des couleurs", "seulement la premiere graduation"],
      answer: "le titre, les axes et les unites",
      explanation: "Le titre, les axes et les unites indiquent ce que le graphique mesure."
    },
    {
      id: "extra8_sci_002",
      subject: "sciences",
      chapter: "SVT",
      stage: "Decouverte",
      type: "qcm",
      question: "Quelle est une unite de base du vivant ?",
      choices: ["La cellule", "L'organe", "Le tissu", "Le chromosome"],
      answer: "La cellule",
      explanation: "La cellule est une unite de base des etres vivants."
    },
    {
      id: "extra8_sci_003",
      subject: "sciences",
      chapter: "SVT",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans une experience, le facteur teste est...",
      choices: ["l'element que l'on change volontairement", "le resultat mesure", "la conclusion finale", "la valeur lue sur le graphique"],
      answer: "l'element que l'on change volontairement",
      explanation: "Le facteur teste est ce que l'on modifie pour observer son effet."
    },
    {
      id: "extra8_sci_004",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Decouverte",
      type: "qcm",
      question: "Une solution de pH 3 est...",
      choices: ["acide", "neutre", "basique", "solide"],
      answer: "acide",
      explanation: "Un pH inferieur a 7 indique une solution acide."
    },
    {
      id: "extra8_sci_005",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Consolidation",
      type: "qcm",
      question: "Quelle formule permet de calculer une masse volumique ?",
      choices: ["masse / volume", "volume / temps", "distance x duree", "pH + masse"],
      answer: "masse / volume",
      explanation: "La masse volumique se calcule en divisant la masse par le volume."
    },
    {
      id: "extra8_sci_006",
      subject: "sciences",
      chapter: "Physique-chimie",
      stage: "Type brevet",
      type: "true_false",
      question: "Dans un systeme ferme, la masse totale se conserve lors d'une reaction chimique.",
      choices: ["Vrai", "Faux"],
      answer: "Vrai",
      explanation: "Dans un systeme ferme, les atomes se rearrangent mais la masse totale se conserve."
    },
    {
      id: "extra8_sci_007",
      subject: "sciences",
      chapter: "Technologie",
      stage: "Consolidation",
      type: "qcm",
      question: "Dans une porte automatique, le detecteur de presence est...",
      choices: ["un capteur", "un actionneur", "un algorithme", "une source d'energie"],
      answer: "un capteur",
      explanation: "Un capteur detecte une information, ici la presence d'une personne."
    },
    {
      id: "extra8_sci_008",
      subject: "sciences",
      chapter: "Technologie",
      stage: "Decouverte",
      type: "order",
      question: "Remets dans l'ordre une chaine d'information simple.",
      choices: ["Acquerir l'information", "Traiter l'information", "Communiquer l'ordre"],
      answer: "Acquerir l'information|||Traiter l'information|||Communiquer l'ordre",
      explanation: "Une chaine d'information acquiert, traite puis communique une information."
    },
    {
      id: "extra8_fr_009",
      subject: "francais",
      chapter: "Lecture",
      stage: "Decouverte",
      type: "qcm",
      question: "Pour justifier une reponse de lecture, quel element est le plus utile ?",
      choices: ["Un mot ou une expression du texte", "Une opinion sans preuve", "Le titre d'un autre livre", "Une idee sans citation"],
      answer: "Un mot ou une expression du texte",
      explanation: "Une reponse de lecture doit s'appuyer sur un indice precis du texte."
    },
    {
      id: "extra8_fr_010",
      subject: "francais",
      chapter: "Lecture",
      stage: "Consolidation",
      type: "qcm",
      question: "Une citation courte sert surtout a...",
      choices: ["prouver une idee sur le texte", "remplacer toute l'explication", "allonger la copie", "eviter de repondre precisement"],
      answer: "prouver une idee sur le texte",
      explanation: "La citation prouve l'idee, mais il faut ensuite expliquer ce qu'elle montre."
    },
    {
      id: "extra8_hist_009",
      subject: "histoire",
      chapter: "Guerre froide",
      stage: "Decouverte",
      type: "qcm",
      question: "Pendant la guerre froide, quelles sont les deux superpuissances principales ?",
      choices: ["Les Etats-Unis et l'URSS", "La France et l'Espagne", "La Chine et le Japon", "L'Allemagne et l'Italie"],
      answer: "Les Etats-Unis et l'URSS",
      explanation: "La guerre froide oppose surtout les Etats-Unis et l'URSS, chacun a la tete d'un bloc."
    },
    {
      id: "extra8_hist_010",
      subject: "histoire",
      chapter: "Guerre froide",
      stage: "Consolidation",
      type: "qcm",
      question: "Pourquoi Berlin est-elle un symbole de la guerre froide ?",
      choices: ["Parce que la ville est divisee entre les deux blocs", "Parce qu'elle devient la capitale de l'URSS", "Parce qu'elle supprime toutes les frontieres", "Parce qu'elle fonde la CEE"],
      answer: "Parce que la ville est divisee entre les deux blocs",
      explanation: "Berlin montre la division entre l'Est et l'Ouest, notamment avec le mur construit en 1961."
    },
    {
      id: "extra8_hist_011",
      subject: "histoire",
      chapter: "Construction europeenne",
      stage: "Decouverte",
      type: "qcm",
      question: "Quel traite cree la CEE en 1957 ?",
      choices: ["Le traite de Rome", "Le traite de Versailles", "Le traite de Maastricht", "L'armistice de 1918"],
      answer: "Le traite de Rome",
      explanation: "Le traite de Rome, signe en 1957, cree la Communaute economique europeenne."
    },
    {
      id: "extra8_hist_012",
      subject: "histoire",
      chapter: "Construction europeenne",
      stage: "Consolidation",
      type: "qcm",
      question: "Un objectif majeur de la construction europeenne apres 1945 est...",
      choices: ["maintenir la paix et renforcer la cooperation", "preparer une nouvelle guerre en Europe", "supprimer tous les Etats", "isoler les pays europeens"],
      answer: "maintenir la paix et renforcer la cooperation",
      explanation: "Apres les guerres mondiales, la construction europeenne vise notamment la paix et la cooperation."
    },
    {
      id: "extra8_hist_013",
      subject: "histoire",
      chapter: "Defense et securite",
      stage: "Consolidation",
      type: "qcm",
      question: "La defense nationale sert principalement a...",
      choices: ["proteger le territoire, la population et les interets du pays", "organiser les elections municipales", "ecrire les programmes scolaires", "voter directement les lois"],
      answer: "proteger le territoire, la population et les interets du pays",
      explanation: "La defense nationale protege le pays contre les menaces et participe a la securite."
    },
    {
      id: "extra8_hist_014",
      subject: "histoire",
      chapter: "Defense et securite",
      stage: "Type brevet",
      type: "qcm",
      question: "Que signifie JDC dans le parcours citoyen ?",
      choices: ["Journee defense et citoyennete", "Justice des communes", "Journal des citoyens", "Jeunesse des colleges"],
      answer: "Journee defense et citoyennete",
      explanation: "La JDC est une etape du parcours citoyen liee a la defense et a la citoyennete."
    },
    {
      id: "extra8_geo_001",
      subject: "histoire",
      chapter: "France",
      stage: "Consolidation",
      type: "qcm",
      question: "Un espace de faible densite est un espace...",
      choices: ["qui compte peu d'habitants au km2", "qui concentre toutes les metropoles", "qui n'a aucune activite", "qui est toujours industriel"],
      answer: "qui compte peu d'habitants au km2",
      explanation: "La faible densite signifie qu'il y a peu d'habitants par kilometre carre."
    },
    {
      id: "extra8_geo_002",
      subject: "histoire",
      chapter: "Geographie",
      stage: "Decouverte",
      type: "qcm",
      question: "Une aire urbaine comprend generalement...",
      choices: ["une ville-centre, une banlieue et une couronne periurbaine", "uniquement des campagnes isolees", "seulement des ports", "un espace sans migrations quotidiennes"],
      answer: "une ville-centre, une banlieue et une couronne periurbaine",
      explanation: "Une aire urbaine regroupe la ville-centre, sa banlieue et des communes liees par les deplacements quotidiens."
    }
  );
}());
