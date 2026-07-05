(function () {
  const content = window.BREVET_CONTENT;
  content.guidedTasks = content.guidedTasks || [];

  content.guidedTasks.push(
    {
      id: "guided-fr-redaction-reflexion-1",
      subject: "francais",
      chapter: "Redaction",
      title: "Sujet de reflexion : faut-il toujours dire la verite ?",
      duration: 35,
      stage: "Type brevet",
      context: "Tu dois construire une reponse argumentee, organisee en paragraphes, avec des exemples precis.",
      task: "Redige une introduction courte, deux paragraphes argumentes et une conclusion. Tu peux defendre une opinion nuancee.",
      method: ["Reformule la question avec tes mots.", "Choisis deux idees principales.", "Pour chaque idee, ajoute une explication et un exemple.", "Conclue en repondant clairement au sujet."],
      expected: ["Une introduction qui presente le theme.", "Deux arguments distincts.", "Des exemples concrets.", "Des connecteurs logiques.", "Une conclusion qui ne repete pas seulement l'introduction."],
      selfCheck: ["J'ai repondu a la question posee.", "Chaque paragraphe contient une idee claire.", "J'ai donne au moins deux exemples.", "J'ai relu les accords et la ponctuation."]
    },
    {
      id: "guided-fr-reecriture-1",
      subject: "francais",
      chapter: "Reecriture",
      title: "Reecriture : passer du singulier au pluriel",
      duration: 15,
      stage: "Consolidation",
      context: "La reecriture demande de modifier toutes les formes touchees par le changement impose.",
      task: "Transforme le passage suivant en remplacant 'je' par 'nous' : 'Je suis entre dans la maison silencieuse. J'etais inquiet, mais je voulais comprendre ce qui se passait.'",
      method: ["Souligne les verbes conjugues.", "Repere les adjectifs et participes passes qui peuvent changer.", "Transforme une phrase a la fois.", "Relis en cherchant les accords oublies."],
      expected: ["Nous sommes entres...", "Nous etions inquiets...", "Nous voulions comprendre...", "Accord du participe passe avec nous si le groupe est masculin ou mixte."],
      selfCheck: ["J'ai change tous les pronoms.", "J'ai accorde les verbes avec nous.", "J'ai verifie les adjectifs.", "Je n'ai pas change le sens du texte."]
    },
    {
      id: "guided-fr-lecture-1",
      subject: "francais",
      chapter: "Lecture",
      title: "Lecture : justifier une interpretation",
      duration: 20,
      stage: "Consolidation",
      context: "Au brevet, une interpretation doit s'appuyer sur des indices precis du texte.",
      task: "Imagine un extrait ou un personnage avance seul dans une rue sombre. Explique comment le texte peut creer une atmosphere inquietante en utilisant trois indices possibles.",
      method: ["Identifie l'effet a expliquer : peur, tension, mystere.", "Cherche trois types d'indices : vocabulaire, sensations, rythme des phrases.", "Associe chaque indice a un effet.", "Redige une reponse avec citations courtes inventees ou exemples de mots."],
      expected: ["Un champ lexical de la peur ou de l'obscurite.", "Des sensations comme le froid, le silence ou les bruits.", "Des phrases courtes pour creer la tension.", "Une explication de l'effet produit."],
      selfCheck: ["Je n'ai pas seulement resume l'histoire.", "J'ai explique l'effet sur le lecteur.", "J'ai donne au moins trois indices.", "Ma reponse est organisee."]
    },
    {
      id: "guided-math-probleme-1",
      subject: "mathematiques",
      chapter: "Grandeurs et mesures",
      title: "Probleme : vitesse moyenne et pause",
      duration: 25,
      stage: "Type brevet",
      context: "Un trajet de 150 km est effectue en voiture. Le conducteur roule 1 h 30, fait une pause de 15 min, puis roule encore 45 min.",
      task: "Calcule la duree totale du trajet, puis la vitesse moyenne sur l'ensemble du trajet, pause comprise.",
      method: ["Convertis toutes les durees en heures.", "Additionne les temps, pause comprise.", "Utilise la formule vitesse = distance / duree.", "Ecris une phrase avec l'unite km/h."],
      expected: ["1 h 30 = 1,5 h.", "45 min = 0,75 h et 15 min = 0,25 h.", "Duree totale = 2,5 h.", "Vitesse moyenne = 150 / 2,5 = 60 km/h."],
      selfCheck: ["J'ai bien inclus la pause.", "Mes durees sont dans la meme unite.", "J'ai utilise la bonne formule.", "Ma reponse contient km/h."]
    },
    {
      id: "guided-math-geo-1",
      subject: "mathematiques",
      chapter: "Geometrie",
      title: "Probleme : choisir entre Pythagore et Thales",
      duration: 25,
      stage: "Type brevet",
      context: "Dans un exercice de geometrie, on te donne un triangle avec un angle droit, puis une figure avec deux droites paralleles.",
      task: "Explique comment reconnaitre si tu dois utiliser Pythagore ou Thales, puis invente une phrase de justification pour chaque cas.",
      method: ["Cherche d'abord un triangle rectangle.", "Cherche ensuite des droites paralleles et des triangles emboites.", "Associe Pythagore aux longueurs d'un triangle rectangle.", "Associe Thales aux rapports de longueurs avec parallelisme."],
      expected: ["Pythagore : triangle rectangle et hypotenuse.", "Thales : deux droites secantes coupees par des paralleles.", "Une justification avant le calcul.", "Des rapports ou une egalite correctement presentes."],
      selfCheck: ["J'ai cite les conditions du theoreme.", "Je n'ai pas applique une formule sans justification.", "Je sais identifier l'hypotenuse.", "Je sais ecrire un rapport de Thales."]
    },
    {
      id: "guided-math-fonctions-1",
      subject: "mathematiques",
      chapter: "Fonctions",
      title: "Fonctions : lire et calculer",
      duration: 20,
      stage: "Consolidation",
      context: "On considere la fonction f definie par f(x) = 3x - 4.",
      task: "Calcule f(2), trouve un antecedent de 8, puis explique la difference entre image et antecedent.",
      method: ["Pour calculer une image, remplace x par la valeur donnee.", "Pour chercher un antecedent, resous une equation.", "Redige une phrase pour chaque resultat.", "Verifie en remplacant x dans la formule."],
      expected: ["f(2) = 3 x 2 - 4 = 2.", "3x - 4 = 8 donc x = 4.", "2 est l'image de 2.", "4 est un antecedent de 8."],
      selfCheck: ["Je n'ai pas confondu image et antecedent.", "J'ai montre le calcul.", "J'ai resolu l'equation proprement.", "J'ai verifie le resultat."]
    },
    {
      id: "guided-hist-dev-1",
      subject: "histoire",
      chapter: "Developpement construit",
      title: "Developpement construit : la Resistance",
      duration: 30,
      stage: "Type brevet",
      context: "Sujet : explique le role de la Resistance pendant la Seconde Guerre mondiale et a la Liberation.",
      task: "Redige un developpement construit de deux paragraphes avec une courte introduction et une conclusion.",
      method: ["Definis rapidement la Resistance.", "Classe les idees : lutter pendant la guerre, preparer l'apres-guerre.", "Ajoute des exemples : presse clandestine, sabotages, renseignement, CNR.", "Conclue sur la Liberation et le retour de la Republique."],
      expected: ["Une definition simple de la Resistance.", "Des actions concretes pendant l'occupation.", "Le Conseil national de la Resistance.", "Un lien avec la Liberation et les reformes."],
      selfCheck: ["Mon texte est organise en paragraphes.", "J'ai utilise des connaissances precises.", "J'ai evite la simple liste.", "J'ai repondu au sujet entier."]
    },
    {
      id: "guided-geo-doc-1",
      subject: "histoire",
      chapter: "Analyse de document",
      title: "Analyse de document : espace productif",
      duration: 25,
      stage: "Consolidation",
      context: "Imagine un document montrant une zone industrielle pres d'une grande ville, avec autoroute, entrepots et emplois.",
      task: "Presente le document, releve deux informations, puis explique pourquoi cet espace est productif.",
      method: ["Presente la nature et le sujet du document.", "Releve deux elements visibles ou chiffres.", "Relie ces informations a une activite economique.", "Ajoute une connaissance de cours sur les espaces productifs."],
      expected: ["Nature et sujet du document.", "Deux informations precises.", "Une explication du mot productif.", "Un lien avec transports, emplois ou entreprises."],
      selfCheck: ["J'ai presente le document.", "J'ai utilise le document et le cours.", "J'ai explique, pas seulement recopie.", "Ma reponse est claire."]
    },
    {
      id: "guided-emc-1",
      subject: "histoire",
      chapter: "EMC",
      title: "EMC : expliquer la laicite",
      duration: 20,
      stage: "Consolidation",
      context: "Sujet : montre que la laicite est une valeur qui protege la liberte de chacun.",
      task: "Redige une reponse organisee avec une definition, une explication et un exemple concret.",
      method: ["Definis la laicite.", "Explique le lien avec la liberte de conscience.", "Ajoute la neutralite de l'Etat.", "Donne un exemple dans l'ecole ou les services publics."],
      expected: ["Liberte de croire ou de ne pas croire.", "Neutralite de l'Etat.", "Respect de la loi commune.", "Exemple concret et non caricatural."],
      selfCheck: ["J'ai evite de dire que la laicite interdit les religions.", "J'ai donne une definition correcte.", "J'ai utilise un exemple.", "J'ai relie liberte individuelle et cadre commun."]
    },
    {
      id: "guided-sci-graph-1",
      subject: "sciences",
      chapter: "Donnees",
      title: "Sciences : lire un graphique",
      duration: 20,
      stage: "Consolidation",
      context: "Un graphique montre que la temperature d'un liquide augmente de 20 degres C a 80 degres C en 6 minutes.",
      task: "Decris l'evolution, calcule l'augmentation de temperature, puis propose une conclusion simple.",
      method: ["Lis le titre, les axes et les unites.", "Compare la valeur initiale et la valeur finale.", "Calcule la difference.", "Formule une conclusion limitee aux donnees."],
      expected: ["La temperature augmente.", "Temperature initiale : 20 degres C.", "Temperature finale : 80 degres C.", "Augmentation : 60 degres C en 6 minutes."],
      selfCheck: ["J'ai cite les unites.", "J'ai compare debut et fin.", "J'ai calcule une difference.", "Je n'ai pas invente une cause non donnee."]
    },
    {
      id: "guided-sci-energie-1",
      subject: "sciences",
      chapter: "Physique-chimie",
      title: "Chaine energetique : lampe",
      duration: 20,
      stage: "Type brevet",
      context: "Une lampe de bureau est branchee sur le secteur et eclaire une table. Elle chauffe legerement.",
      task: "Construis la chaine energetique sous forme de phrases : energie recue, conversion, energies transferees.",
      method: ["Identifie le systeme etudie.", "Indique l'energie recue.", "Indique les formes d'energie utiles et perdues.", "Redige une phrase de bilan."],
      expected: ["Systeme : la lampe.", "Energie recue : electrique.", "Energie utile : lumineuse.", "Energie aussi transferee : thermique."],
      selfCheck: ["J'ai nomme le systeme.", "J'ai distingue energie recue et transferee.", "Je n'ai pas dit que l'energie disparait.", "J'ai utilise le vocabulaire scientifique."]
    },
    {
      id: "guided-tech-algo-1",
      subject: "sciences",
      chapter: "Technologie",
      title: "Technologie : decrire un systeme automatique",
      duration: 25,
      stage: "Consolidation",
      context: "Une porte automatique s'ouvre quand un capteur detecte une personne, puis se referme apres quelques secondes.",
      task: "Identifie le capteur, l'actionneur, l'information traitee et propose un algorithme simple.",
      method: ["Cherche ce qui detecte l'utilisateur.", "Cherche ce qui agit physiquement.", "Decris l'information transmise.", "Ecris trois ou quatre instructions dans l'ordre."],
      expected: ["Capteur : detecteur de presence.", "Actionneur : moteur de la porte.", "Information : personne detectee ou non.", "Algorithme : si presence, ouvrir ; attendre ; fermer."],
      selfCheck: ["J'ai distingue capteur et actionneur.", "Mon algorithme est dans l'ordre.", "J'ai utilise une condition si/alors.", "Ma reponse explique le fonctionnement."]
    }
  );
}());
