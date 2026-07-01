# Traçabilité des contenus pédagogiques

Ce fichier sert à garder le lien entre les annales récupérées et les cours/exercices créés dans l'application.

## Mathématiques

Sources utilisées :
- `2025 - Brevet general - Epreuve - Mathematiques.pdf`
- `Documents supplementaires - Brevet general France/Annales officielles Eduscol - Metropole/2024/2024 - Brevet general - Epreuve - Mathematiques - Metropole - Juin.pdf`
- `Documents supplementaires - Brevet general France/Mathematiques - APMEP - Metropole`

Notions transformées en contenus :
- probabilités avec urne ou roue ;
- statistiques : moyenne, médiane ;
- programmes de calcul et expressions ;
- fonctions : image et antécédent ;
- géométrie : Pythagore, Thalès, trigonométrie ;
- QCM type brevet.

## Français

Sources utilisées :
- `2025 - Brevet general - Epreuve - Francais - Sujet complet.pdf`
- `Documents supplementaires - Brevet general France/Annales officielles Eduscol - Metropole`
- `Documents supplementaires - Brevet general France/Francais - Corrections et baremes academiques (Nancy-Metz)`

Notions transformées en contenus :
- compréhension et justification par citation ;
- grammaire : nature, fonction, compléments ;
- réécriture avec changement de personne ;
- accords de dictée ;
- méthode de réponse courte.

## Histoire-Géographie-EMC

Sources utilisées :
- `2025 - Brevet general - Epreuve - Histoire-Geographie-EMC.pdf`
- `Documents supplementaires - Brevet general France/Annales officielles Eduscol - Metropole`

Notions transformées en contenus :
- analyse de document ;
- espace productif industriel ;
- repères ;
- développement construit ;
- valeurs de la République.

## Sciences et technologie

Sources utilisées :
- `2025 - Brevet general - Epreuve - Sciences.pdf`
- `Documents supplementaires - Brevet general France/Annales officielles Eduscol - Metropole`
- `Documents supplementaires - Brevet general France/Sciences-Technologie - STI Eduscol - Metropole`

Notions transformées en contenus :
- lecture de graphiques et tableaux ;
- photosynthèse et production de matière organique ;
- expérience avec facteur testé ;
- pH ;
- masse volumique ;
- capteurs, conditions et algorithmes.

## Règle de création

Les contenus de l'app ne recopient pas les annales. Ils transforment les compétences récurrentes en exercices progressifs :

1. découverte ;
2. consolidation ;
3. type brevet.

## Diversification ajoutée

Le fichier `extra-content.js` ajoute des mini-cours et exercices courts pour éviter la répétition :

- calculs, pourcentages, proportionnalité, équations, aires, volumes, échelles ;
- homophones, accords, participe passé, figures de style, point de vue, rédaction ;
- guerres mondiales, guerre froide, décolonisation, aires urbaines, citoyenneté ;
- cellule, microorganismes, circuits électriques, vitesse, chaîne d'information.

Ces contenus restent alignés avec les compétences vues dans les annales, mais sont reformulés en entraînements courts.

## Diversification supplementaire 2027

Le fichier `extra-content-2.js` ajoute un second lot de cours et d'exercices pour un eleve qui passera le brevet en juin 2027 et qui n'a pas encore vu tout le programme.

Axes ajoutes :

- mathematiques : puissances, calcul litteral, equations, vitesse, Thales, tableur, probabilites, statistiques, volumes ;
- francais : COD/COI, phrase complexe, valeurs des temps, connecteurs, accords, narrateur, reecriture ;
- histoire-geographie-EMC : regimes totalitaires, Resistance, guerre froide, construction europeenne, espaces de faible densite, periurbanisation, mondialisation, amenagement, laicite, citoyennete, defense ;
- sciences et technologie : ADN, pH, energie, circuits, immunite, boucles, fonctions d'usage, capteurs.

Le but est de multiplier les questions courtes, avec correction immediate, pour eviter que l'eleve ait l'impression de refaire toujours les memes exercices.

## Diversification ciblee - etape 1

Le fichier `extra-content-3.js` ajoute un lot d'exercices courts pour renforcer les chapitres encore peu couverts : algorithmique/tableur, calcul litteral, equations, grandeurs, lecture, redaction, analyse de document, developpement construit, geographie, EMC, donnees scientifiques et technologie.

Objectif de cette etape : augmenter la variete sans changer encore le moteur d'exercices, afin de consolider la base avant les formats longs et les parcours hebdomadaires.

## Cours structures - etape 2

Les rappels courts ont ete transformes en cours guides affiches dans les sessions, l'onglet Cours et la revision d'erreurs.

Structure ajoutee a chaque cours :

- introduction de la notion ;
- explication plus developpee ;
- methode pas a pas ;
- exemple guide ;
- prerequis ;
- point a retenir ;
- piege frequent ;
- question de verification.

Ces cours restent rediges pour l'application, sans copie de cours externes. Ils s'inspirent des attendus du DNB, des programmes de cycle 4 et de ressources de revision gratuites comme Eduscol et Lumni.

## Exercices longs guides - etape 3

Le fichier `extra-content-4.js` ajoute des sujets longs guides, a faire sur cahier avec une grille d'auto-evaluation dans l'application.

Contenus ajoutes :

- 3 sujets de francais : redaction, reecriture, lecture/interpretation ;
- 3 sujets de mathematiques : probleme de vitesse, geometrie, fonctions ;
- 3 sujets d'histoire-geographie-EMC : developpement construit, analyse de document, laicite ;
- 3 sujets de sciences/technologie : graphique, chaine energetique, systeme automatique.

Objectif : preparer les formats qui ne peuvent pas etre corriges automatiquement comme un QCM, tout en donnant une methode, des attendus et une auto-evaluation simple.

## Coherence cours-exercices - etape 4

Le moteur de session a ete corrige pour choisir une notion de cours, puis proposer uniquement des exercices du meme chapitre ou d'un chapitre correspondant.

Correction importante : une session de mathematiques sur les probabilites ne doit plus enchainer ensuite avec mediane ou triangle rectangle. Le meme principe s'applique a toutes les matieres.

Le fichier `extra-content-5.js` ajoute un lot d'exercices supplementaires pour densifier les notions trop courtes : probabilites, equations, grandeurs, tableur/algorithmique, lecture et langue, reecriture, redaction, citoyennete, mondialisation, valeurs de la Republique, donnees scientifiques, SVT et technologie.

## Correctifs UX - QCM et badges

Deux corrections importantes ont ete ajoutees :

- les choix des QCM sont maintenant melanges a l'affichage pour que la bonne reponse ne soit pas toujours en premiere position ;
- les badges ont un design plus lisible, avec un etat debloque plus valorisant et un etat a gagner plus distinct.

La correction des QCM reste fiable car chaque bouton garde la valeur reelle de la reponse, meme apres melange visuel.

## Architecture generateurs offline - etape 5

L'application conserve les exercices statiques deja crees comme banque validee, puis ajoute une architecture de generation offline.

Ajouts :

- `data/notions.js` : registre de notions avec prerequis, type de contenu, chemin de cours et generateurs associes ;
- `data/schema.md` : schema universel pour exercices statiques et generes ;
- `generators/registry.js` : registre de generateurs, seeds, melange et helpers ;
- `generators/math-calcul.js` : premiers generateurs mathematiques ;
- `generators/science-calcul.js` : premier generateur physique-chimie ;
- `tools/validate-content.js` : validation locale des contenus et generateurs.

Principe : les sessions peuvent maintenant melanger exercices existants et variantes generees, tout en gardant un seul format d'exercice. Les erreurs sur exercices generes stockent `generatorId` et `seed` pour pouvoir reconstruire la meme question.

## Registre de notions et liaison notionId - etape 6

Le fichier `data/notions.js` a ete etendu pour couvrir les 33 chapitres utilises par les contenus actuels.

Les contenus existants sont maintenant relies automatiquement a une notion stable :

- cours ;
- exercices statiques ;
- sujets guides.

Le validateur controle desormais qu'un `notionId` existe et correspond a une notion connue. Cette etape prepare le choix manuel de notion, les prerequis et les futurs generateurs par notion.

## Convention de sauvegarde

Une demande utilisateur de "sauvegarde" signifie que les fichiers `.md` doivent etre remis a jour, que les validateurs doivent etre executes, et que le code doit etre pousse sur GitHub si le depot distant existe.

Etat actuel : le dossier n'est pas encore un depot Git configure. Tant que GitHub n'est pas configure, la sauvegarde doit etre locale et documentee.

## Generateurs mathematiques - etape 7

Un nouveau lot de generateurs mathematiques offline a ete ajoute.

Generateurs ajoutes :

- simplification de fractions ;
- addition de fractions de meme denominateur ;
- puissances de 10 ;
- priorites operatoires ;
- proportionnalite ;
- fonctions : image ;
- fonctions : antecedent ;
- Pythagore : calcul de longueur ;
- reciproque de Pythagore ;
- Thales ;
- trigonometrie : cosinus.

Le nombre total de generateurs offline passe de 9 a 20.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 400 exercices generes : 0 reponse absente des choix.

Le serveur local n'etait pas actif au moment du controle HTTP, mais les validations Node sont passees.

## Generateurs sciences et technologie - etape 8

Un nouveau lot de generateurs offline a ete ajoute pour les sciences et la technologie.

Generateurs ajoutes :

- pH : acide, neutre, basique ;
- chaine energetique ;
- circuit electrique ouvert ou ferme ;
- mouvement et vitesse moyenne ;
- SVT : facteur teste dans une experience ;
- technologie : distinguer capteur et actionneur.

Le nombre total de generateurs offline passe de 20 a 26.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 650 exercices generes : 0 reponse absente des choix.

Le serveur local n'etait pas actif au moment du controle HTTP, mais les validations Node sont passees.

## Generateurs francais - etape 9

Un nouveau lot de generateurs offline a ete ajoute pour le francais.

Generateurs ajoutes :

- grammaire : trouver le sujet ;
- grammaire : distinguer COD et COI ;
- orthographe : homophones a/as/a accent ;
- orthographe : homophones et/est ;
- orthographe : accord dans le groupe nominal ;
- reecriture : changement de pronom ;
- reecriture : changement de temps ;
- lecture et langue : valeur des temps du recit.

Le nombre total de generateurs offline passe de 26 a 34.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 850 exercices generes : 0 reponse absente des choix.

## Generateurs complementaires et cours enrichis - etape 10

Un nouveau lot de generateurs offline a ete ajoute pour densifier les notions encore trop peu couvertes.

Generateurs ajoutes :

- mathematiques : developper une expression litterale ;
- mathematiques : factoriser une expression litterale ;
- mathematiques : evaluer une expression litterale ;
- mathematiques : calculer une mediane ;
- mathematiques : convertir une grandeur ;
- mathematiques : calculer le volume d'un pave droit ;
- sciences : lire un graphique ;
- sciences : lire un tableau de donnees ;
- SVT : identifier un critere de classification ;
- SVT : heredite et variation ;
- technologie : effet d'une boucle dans un algorithme ;
- technologie : distinguer fonction d'usage et solution technique.

Le nombre total de generateurs offline passe de 34 a 46.

Les cours affiches avant exercice ont ete enrichis par familles de notions : statistiques, calcul litteral, equations, geometrie, SVT, physique-chimie et technologie.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 1380 exercices generes : 0 reponse absente des choix.

## Refonte visuelle des badges - etape 11

La vue Badges a ete retravaillee pour mieux montrer la progression :

- etat "A gagner" en rendu plat, gris et non 3D ;
- paliers debloques prepares en bronze, argent et or ;
- medaille CSS offline avec rayons, bouclier et ruban ;
- objectif affiche sur le ruban : sessions, jours, points, questions, reussites ou erreurs reparees ;
- grille responsive : 3 colonnes desktop, 2 colonnes tablette, 1 colonne mobile.

Validation effectuee :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- controle navigateur local sur `http://127.0.0.1:4174/` : 14 cartes badges, 14 medailles, aucune erreur console.

## Mise en ligne GitHub - etape 12

Le projet a ete publie sur GitHub :

```txt
https://github.com/PARRAGAantoine/brevet-des-colleges
```

GitHub Pages est configure en mode legacy avec la branche `gh-pages` comme source.

URL publique de l'application :

```txt
https://parragaantoine.github.io/brevet-des-colleges/
```

Les PDF d'annales, les documents supplementaires et les sauvegardes locales restent exclus du depot via `.gitignore`.

## Decision a etudier - progression multi-appareils

La progression actuelle est stockee dans `localStorage`, donc elle reste locale au navigateur.

Point a traiter plus tard :

- profils locaux pour plusieurs utilisateurs sur un meme appareil ;
- export/import ou QR code de sauvegarde pour transferer manuellement une progression ;
- eventuelle synchronisation en ligne avec compte eleve, a cadrer en V2 avec backend, securite et RGPD.

## Sessions par notion - etape 13

La session guidee permet maintenant de choisir une notion precise apres la matiere.

Comportement ajoute :

- option "Automatique - notion recommandee" par defaut ;
- liste des notions liees a la matiere choisie ;
- desactivation du choix de notion pour la serie mixte ;
- quand une notion est choisie, le cours et les questions sont filtres sur cette notion ;
- les generateurs offline peuvent produire directement des questions pour la notion choisie.

Validation effectuee :

- `node --check app.js` : OK ;
- `node --check data\notions.js` : OK ;
- `node tools\validate-content.js` : OK ;
- controle navigateur local : session Mathematiques > Probabilites, cours et question coherents, aucune erreur console.

## Robustesse technique - etape 14

Deux protections techniques ont ete ajoutees apres analyse du depot :

- workflow GitHub Actions `.github/workflows/validate.yml` pour executer les controles a chaque push et pull request ;
- GitHub Pages reste publie depuis la branche `gh-pages` ;
- le registre des generateurs attrape les erreurs d'un generateur et renvoie `null` au lieu de faire planter l'application ;
- le validateur echoue si une erreur de generateur est journalisee pendant les echantillons.

Validation locale effectuee :

- `node --check app.js` : OK ;
- `node --check data\notions.js` : OK ;
- `node --check generators\registry.js` : OK ;
- `node --check tools\validate-content.js` : OK ;
- `node tools\validate-content.js` : OK.

## Types d'exercices varies - etape 15

Le moteur d'exercices accepte maintenant plusieurs formats :

- `qcm` : choix multiple classique ;
- `true_false` : vrai/faux ;
- `order` : remise en ordre par clics successifs.

Un premier lot de 16 exercices statiques a ete ajoute dans `data/extra-content-6.js` :

- 8 vrai/faux ;
- 8 remises en ordre ;
- repartition sur mathematiques, francais, histoire-geographie-EMC et sciences.

Le nombre total d'exercices statiques passe de 194 a 210.

Validation effectuee :

- `node --check app.js` : OK ;
- `node --check data\extra-content-6.js` : OK ;
- `node --check tools\validate-content.js` : OK ;
- `node tools\validate-content.js` : OK ;
- controle script de cette etape : 194 QCM, 8 vrai/faux, 8 remises en ordre, 0 ordre incoherent.

## Formats de session par exercices - etape 16

Les sessions ne sont plus presentees comme des blocs de 15 ou 30 minutes. Le format principal est maintenant le nombre d'exercices :

- courte : 5 exercices ;
- standard : 10 exercices ;
- longue : 15 exercices.

Raison : une promesse de temps peut etre trompeuse si un eleve termine tres vite ou reste bloque sur une question. Le bilan affiche maintenant le temps reel passe, mais l'objectif de session reste le nombre d'exercices.

Changements associes :

- suppression des points donnes simplement au lancement d'une session ;
- points calcules sur les bonnes reponses ;
- bonus reduit pour session sans erreur ;
- feedback d'erreur reformule de facon plus encourageante.

## Decision badges pedagogiques - etape 17

Les paliers bronze, argent et or ne doivent pas seulement etre decoratifs. Ils deviennent aussi une lecture pedagogique de la progression par notion :

- bronze : niveau Decouverte valide ;
- argent : niveau Consolidation valide ;
- or : niveau Type brevet valide.

Les badges de comportement restent a part : regularite, perseverance, erreurs reparees, volume de questions, streak. Cette distinction sera importante lors de la refonte logique des badges.

## Correctifs vocabulaire eleve et distracteurs QCM - etape 18

Les textes visibles par l'eleve ont ete simplifies pour eviter les formulations trop abstraites ou demotivantes :

- `Session` devient `Seance` dans l'interface ;
- `Format` devient `Nombre d'exercices` ;
- `Recommandation` devient `Conseil du jour` ;
- `Decouverte`, `Consolidation`, `Type brevet` sont affiches comme `J'apprends`, `Je m'entraine`, `Comme au brevet` ;
- les etats `Fort`, `Moyen`, `Faible`, `Fragile` sont remplaces par `Solide`, `En progres`, `A reprendre` ;
- `Attendus` et `auto-evaluation` deviennent `Ce qu'on attend dans ta reponse` et `Je verifie mon travail`.

Premier audit QCM applique : remplacement de plusieurs distracteurs absurdes par des distracteurs faux mais plausibles, notamment en EMC, citoyennete, laicite, mondialisation, redaction et mouvement. Regle a conserver pour les prochains lots : une mauvaise reponse doit etre fausse, mais credible et dans le meme univers que la bonne reponse.

## Simplification accueil et menu - etape 19

Le menu principal a ete simplifie pour rester plus lisible pour un eleve :

- Accueil ;
- Seance ;
- Exercices ;
- Progression ;
- Badges.

Les pages secondaires `Parcours`, `Cours` et `Sujets guides` restent accessibles depuis un bloc `Acces rapide` sur l'accueil.

La page d'accueil ne commence plus automatiquement par les mathematiques lors du premier lancement. Si aucune question n'a encore ete faite, l'app affiche `Choisis une matiere pour commencer` et propose un `Melange decouverte`. Ensuite, la recommandation automatique tient compte des erreurs non reparees, du taux de reussite, du volume de questions et des matieres moins travaillees recemment.

## Audit QCM distracteurs - etape 20

Un audit cible des QCM statiques a ete lance pour supprimer les mauvaises reponses trop absurdes ou hors matiere.

Objectif pedagogique : un eleve ne doit pas pouvoir trouver la bonne reponse uniquement parce que les autres choix sont ridicules. Les distracteurs doivent rester faux, mais plausibles et proches du theme de la question.

Lots corriges :

- EMC, valeurs de la Republique, citoyennete et defense ;
- geographie : espaces productifs, metropoles, mondialisation, periurbanisation ;
- histoire : developpement construit, decolonisation, construction europeenne ;
- francais : lecture, interpretation, redaction ;
- sciences : graphiques, pH, masse, SVT, technologie, chaine d'information et chaine d'energie.

Controle applique : detecteur local de termes suspects dans les choix QCM. Resultat apres corrections : 0 distracteur grossier detecte dans les banques statiques principales.

Point important : cet audit ne remplace pas une relecture pedagogique humaine. Il corrige les anomalies evidentes ; il faudra ensuite relire les questions une par une par matiere pour verifier la precision disciplinaire et le niveau brevet.

## Refonte logique des badges - etape 21

Le systeme de badges n'est plus limite aux 14 badges statiques historiques. La vue Badges utilise maintenant une fabrique de badges generee au lancement de l'app :

- badges de chapitre : 3 niveaux par chapitre du curriculum ;
- badges de matiere : bronze, argent, or par matiere ;
- badges defi : regularite, volume de questions, seances terminees, erreurs reparees, seances sans erreur, sujets guides, niveau type brevet.

Objectif : eviter que l'eleve debloque tous les badges en quelques seances. Les premiers badges restent accessibles vite, mais les derniers demandent un vrai travail long :

- 300 puis 750 questions ;
- 30 puis 100 jours de suite ;
- 30 erreurs reparees apres cours ;
- 120 questions reussies en mode Comme au brevet ;
- 15 sujets guides termines ;
- or dans les quatre matieres.

Les badges de chapitre suivent la logique pedagogique de l'app :

- bronze : bases du chapitre validees ;
- argent : entrainement regulier ;
- or : niveau Comme au brevet avec plusieurs questions type brevet reussies.

Le rendu visuel existant est conserve : badge verrouille plat, badge debloque en medaille bronze, argent ou or.

## Audit QCM et lot exercices 7 - etape 22

Un outil d'audit QCM a ete ajoute dans `tools/audit-qcm.js`.

Il controle notamment :

- choix dupliques ;
- bonne reponse absente ;
- distracteurs grossiers ou hors sujet ;
- bonne reponse anormalement longue par rapport aux distracteurs ;
- repartition des QCM par matiere et par niveau.

Resultat apres corrections : 226 QCM audites, 0 alerte.

Le fichier `data/extra-content-7.js` ajoute 40 nouveaux exercices :

- mathematiques : fractions, priorites, probabilites, statistiques, Pythagore, fonctions, tableur, grandeurs ;
- francais : grammaire, orthographe, lecture, interpretation, reecriture, redaction, valeurs des temps ;
- histoire-geo EMC : reperes, document, developpement construit, guerre, Europe, geographie, citoyennete, institutions ;
- sciences : donnees, SVT, physique-chimie, technologie.

Le total passe a 250 exercices statiques, 12 sujets guides, 46 generateurs offline.

## Clarification des cours pour debutants - etape 23

L'affichage des cours a ete retravaille pour un eleve qui n'a pas encore vu le chapitre en classe.

Chaque cours presente maintenant une structure plus guidee :

- une introduction simple sur ce qui va etre travaille ;
- un bloc `Ce que tu dois savoir au depart` ;
- une partie `L'idee simple` ;
- une liste de `Mots a connaitre` adaptee a la matiere et au chapitre ;
- une `Methode pas a pas` ;
- un `Exemple explique` ;
- un rappel `Avant les questions` pour aider l'eleve a se lancer.

Objectif : eviter les fiches qui ressemblent seulement a des rappels rapides. Les contenus existants restent a relire et simplifier progressivement, mais l'interface force deja une presentation plus claire, plus progressive et moins technique.

Validation effectuee :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- `node tools\audit-qcm.js` : 226 QCM audites, 0 alerte ;
- controle navigateur local : cours affiche avec les blocs attendus, aucune erreur console.

## Relecture pedagogique des cours - mathematiques - etape 24

Premiere passe de reecriture precise des contenus de cours, matiere par matiere.

La matiere commencee est `mathematiques`. Des profils de cours plus explicatifs ont ete ajoutes pour :

- pourcentages ;
- proportionnalite ;
- priorites de calcul ;
- puissances de 10 ;
- moyenne et mediane ;
- probabilites ;
- equations ;
- factorisation ;
- programmes de calcul ;
- tableur ;
- Pythagore ;
- Thales ;
- trigonometrie ;
- aires et volumes ;
- echelles ;
- vitesse, distance et duree.

Objectif : chaque chapitre doit avoir une explication simple, une methode en etapes et un exemple explique. Le vocabulaire reste volontairement simple pour un eleve de 4e/3e qui n'a pas encore vu tout le programme.

Controle effectue :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- `node tools\audit-qcm.js` : 226 QCM audites, 0 alerte ;
- controle navigateur local : seance Mathematiques > Probabilites affiche un cours detaille sans erreur console.

## Relecture pedagogique des cours - autres matieres - etape 25

La meme passe de reecriture precise a ete appliquee aux trois autres matieres.

Francais :

- nature et fonction ;
- COD / COI ;
- propositions et phrase complexe ;
- homophones ;
- accords, dictee, participe passe ;
- reecriture ;
- interpretation, citation, comparaison, point de vue ;
- valeurs des temps ;
- redaction et paragraphe argumente.

Histoire-geo EMC :

- analyse de document ;
- developpement construit ;
- reperes, carte, frise et vocabulaire ;
- guerres mondiales, guerre froide, totalitarismes, Resistance, decolonisation ;
- geographie : espaces productifs, aires urbaines, espaces de faible densite, mondialisation ;
- EMC : institutions, citoyennete, laicite, droits et devoirs.

Sciences :

- lecture de graphique ;
- SVT : cellule, ADN, micro-organismes, experience ;
- physique-chimie : pH, masse volumique, mouvement, conservation de la masse, circuit, energie ;
- technologie : chaine d'information, algorithme, besoin, fonction d'usage, solution technique.

Controle effectue :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- `node tools\audit-qcm.js` : 226 QCM audites, 0 alerte ;
- controle navigateur local : echantillons francais, histoire-geo EMC et sciences affiches sans erreur console.

## Alignement cours-exercices et lot exercices 8 - etape 26

La selection des seances a ete renforcee : quand un chapitre est choisi explicitement, l'application privilegie maintenant le cours et les exercices rattaches a cette notion. Si aucun cours exact n'est trouve, elle cree un cours de secours a partir de la notion choisie au lieu de prendre un cours d'un autre chapitre.

Un nouvel audit `tools/audit-course-coverage.js` a ete ajoute. Il mesure pour chaque notion :

- le nombre de cours rattaches ;
- le nombre d'exercices statiques ;
- le nombre de generateurs ;
- les niveaux couverts ;
- les reserves trop courtes pour une seance de 10 questions.

Le fichier `data/extra-content-8.js` ajoute 4 cours et 42 exercices supplementaires.

Cours ajoutes :

- lecture en francais ;
- guerre froide ;
- construction europeenne ;
- defense et securite.

Exercices ajoutes :

- mathematiques : probabilites, statistiques, priorites, equations, calcul litteral, geometrie, grandeurs, tableur ;
- francais : grammaire, COD, orthographe, reecriture, lecture, interpretation, redaction ;
- histoire-geo EMC : reperes, document, developpement construit, Seconde Guerre mondiale, guerre froide, construction europeenne, geographie, EMC, citoyennete, defense ;
- sciences : donnees, SVT, physique-chimie, technologie.

Total apres ajout : 70 cours, 292 exercices statiques, 12 sujets guides, 46 generateurs.

Controle effectue :

- `node --check app.js` : OK ;
- `node --check data\extra-content-8.js` : OK ;
- `node tools\validate-content.js` : OK ;
- `node tools\audit-qcm.js` : 265 QCM audites, 0 alerte ;
- `node tools\audit-course-coverage.js` : 13 notions signalees comme encore trop courtes, surtout en histoire-geo EMC.

## Corrections UX seance, objectif quotidien et annales - etape 27

Corrections appliquees :

- le menu principal est simplifie : Accueil, Seance, Exercices, Progression, Badges ;
- au premier lancement, l'accueil propose un melange decouverte au lieu de demarrer automatiquement par les mathematiques ;
- la page Seance efface l'ancien bilan lorsqu'on change de matiere, de chapitre, de format ou lorsqu'on arrive depuis l'accueil ;
- les formats de seance passent a 10, 20 et 30 exercices ;
- l'objectif quotidien devient une seance sans faute ;
- si une erreur existe, elle reste a reprendre avant validation ;
- la reprise d'erreur ne redonne plus seulement la meme question : l'application cherche des questions proches du meme chapitre ou en genere via le generateur de la notion ;
- une erreur est reparee apres plusieurs questions proches reussies ;
- les questions d'une seance sont dedoublonnees par enonce pour eviter deux fois la meme question ;
- le deverrouillage d'un badge est affiche par un toast plus visible ;
- la phrase explicative inutile de la page Badges a ete retiree ;
- une couche de correction d'accents est appliquee aux textes rendus dans l'interface.

Inventaire local des annales :

- 172 PDF trouves localement ;
- couverture complete sujet + corrige/bareme pour 2025 dans les quatre matieres ;
- lacunes locales encore visibles sur plusieurs annees : surtout corriges d'histoire-geo EMC, sciences et certaines annees de francais ;
- 2026 contient surtout les sujets officiels disponibles et les sujets zero mathematiques, mais pas encore un jeu complet toutes matieres avec corriges.

Controle effectue :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- `node tools\audit-qcm.js` : 265 QCM audites, 0 alerte ;
- `node tools\audit-course-coverage.js` : 13 notions encore trop courtes pour tenir confortablement les formats longs ;
- controle navigateur local : menu simplifie, format 10/20/30, page Seance vide sans ancien bilan.

## Refonte visuelle et organisation des badges - etape 28

La page Badges a ete refondue dans un style medaille sombre inspire de la reference fournie par l'utilisateur.

Organisation :

- badge ultime en tete ;
- badges de matiere ;
- badges de defi : regularite, volume, precision, erreurs reparees, niveaux, sujets longs ;
- badges de chapitre.

Evolution des seuils :

- volume : 50, 150, 500, 1000 questions ;
- regularite : 3, 7, 30, 100 jours ;
- erreurs reparees : 1, 10, 30, 75 ;
- seances sans faute : 1, 5, 20, 50 ;
- niveaux : 60 reussites Decouverte, 120 Consolidation, 200 Type brevet ;
- sujets longs : 1, 5, 15 et 8 sujets solides ;
- badge ultime : or dans les quatre matieres, 20 seances sans faute et 30 erreurs reparees.

Controle effectue :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- `node tools\audit-qcm.js` : OK ;
- controle navigateur local : 89 badges, sections correctes, accents visibles, aucune erreur console.

## Accueil, parametres et preparation PWA - etape 29

L'accueil a ete transforme en vraie page d'entree :

- hero de bienvenue ;
- bouton `Installer l'app` prepare pour la future PWA ;
- bouton `Continuer en ligne` vers GitHub Pages ;
- choix rapides : seance guidee, exercices libres, progression, badges ;
- le constructeur de seance n'est plus l'element principal de l'accueil.

Une page Parametres a ete ajoutee :

- version installee ;
- bouton manuel `Verifier les mises a jour` ;
- zone future `Se connecter` ;
- choix du theme clair/sombre.

Regle produit confirmee : l'app ne verifie aucune mise a jour automatiquement. La verification se fait uniquement apres un clic utilisateur, car l'app doit rester offline par defaut.

Fichier ajoute :

- `version.json` : version disponible pour verification manuelle.

Controle effectue :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- `node tools\audit-qcm.js` : OK ;
- controle navigateur local : accueil, bouton en ligne, parametres, verification manuelle de version et mode sombre OK.

## Correction initialisation accueil - etape 30

Un decalage pouvait apparaitre entre l'ouverture initiale de `index.html` et un clic sur Accueil : l'ecran pouvait afficher les valeurs HTML par defaut avant que le rendu JavaScript ne remette la progression reelle.

Correction appliquee :

- initialisation protegee par `DOMContentLoaded` si necessaire ;
- prevention du double branchement des evenements ;
- nouveau rendu sur `pageshow`, utile quand le navigateur restaure un onglet ou une page locale.

Controle effectue :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- `node tools\audit-qcm.js` : OK.
