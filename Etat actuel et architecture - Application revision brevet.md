# Etat actuel et architecture - Application revision brevet

Ce document complete le cahier des charges initial.

Le cahier des charges garde la vision produit et la roadmap. Ce fichier sert a decrire l'etat reel du projet apres les evolutions : architecture, donnees, contenus, generateurs, decisions prises et prochaines priorites.

## 1. Objectif actuel

Construire une application offline pour preparer le brevet des colleges serie generale en France, session visee : juin 2027.

L'application doit aider un eleve qui n'a pas encore vu tout le programme. Elle doit donc proposer :

- de vrais cours progressifs ;
- des exercices courts corriges ;
- des sujets longs guides ;
- une progression claire ;
- une gamification motivante ;
- une coherence forte entre le cours affiche et les exercices proposes.

L'epreuve orale est prevue tout a la fin, apres consolidation des epreuves ecrites.

## 2. Etat fonctionnel

L'application existe dans le dossier `app-brevet/`.

Elle fonctionne localement avec HTML, CSS et JavaScript.

Vues principales :

- Accueil ;
- Parcours ;
- Session guidee ;
- Cours ;
- Exercices ;
- Sujets guides ;
- Progression ;
- Badges.

Fonctionnalites deja presentes :

- choix de matiere ;
- choix manuel d'une notion precise en session guidee ;
- cours avant exercice ;
- exercices QCM avec correction immediate ;
- reponses melangees a l'affichage ;
- session coherente par notion ;
- mode serie mixte type brevet ;
- suivi des reponses ;
- suivi des erreurs ;
- revision avant de refaire une question ratee ;
- badges ;
- auto-evaluation des sujets guides ;
- statut "pas encore vu" par chapitre ;
- generateurs offline pour certaines notions calculatoires.

## 3. Etat des contenus

Validation actuelle :

```txt
Matieres : 4
Cours : 66
Exercices statiques : 250
Sujets guides longs : 12
Notions referencees : 33
Generateurs offline : 46
Erreurs de validation : 0
```

Les matieres de l'application sont :

- Mathematiques ;
- Francais ;
- Histoire-Geographie-EMC ;
- Sciences.

Les sciences regroupent :

- physique-chimie ;
- SVT ;
- technologie.

## 4. Architecture fichiers

Structure actuelle :

```txt
app-brevet/
├── index.html
├── styles.css
├── app.js
├── assets/
│   └── pattern.svg
├── data/
│   ├── content.js
│   ├── extra-content.js
│   ├── extra-content-2.js
│   ├── extra-content-3.js
│   ├── extra-content-4.js
│   ├── extra-content-5.js
│   ├── notions.js
│   ├── schema.md
│   └── source-map.md
├── generators/
│   ├── registry.js
│   ├── math-calcul.js
│   └── science-calcul.js
└── tools/
    └── validate-content.js
```

## 5. Banque statique et generateurs

Le projet utilise maintenant deux sources d'exercices.

### Banque statique

Les 250 exercices deja crees restent utiles.

Ils constituent une banque controlee et doivent etre conserves. Ils servent notamment pour :

- les notions non calculatoires ;
- les formulations type brevet ;
- les questions memorielle ;
- les questions de langue ;
- les questions d'histoire-geographie-EMC ;
- les sujets ou la generation automatique serait moins fiable.

### Generateurs offline

Les generateurs JS produisent des exercices a la volee, sans connexion internet.

Ils sont utiles surtout pour :

- probabilites ;
- equations ;
- vitesses ;
- pourcentages ;
- moyennes ;
- tableur ;
- masse volumique.

Principe important :

- l'exercice genere n'a pas besoin d'etre stocke entierement ;
- on stocke `generatorId` et `seed` ;
- la meme question peut etre reconstruite a l'identique.

## 6. Schema universel

Tous les exercices doivent respecter un format commun, qu'ils soient statiques ou generes.

Reference : `app-brevet/data/schema.md`.

Champs principaux :

```js
{
  id,
  mode,
  subject,
  chapter,
  notionId,
  stage,
  type,
  question,
  choices,
  answer,
  explanation,
  source,
  generatorId,
  seed
}
```

Regle centrale :

L'application ne doit pas avoir a savoir si une question vient d'une banque statique ou d'un generateur. Elle recoit toujours le meme type d'objet.

## 7. Registre de notions

Le fichier `app-brevet/data/notions.js` introduit un registre de notions.

Chaque notion peut definir :

- un identifiant stable ;
- une matiere ;
- un chapitre ;
- un titre ;
- un type de contenu ;
- des prerequis ;
- un chemin de cours ;
- des generateurs associes.

Types de contenus retenus :

- `calculatoire` ;
- `memoriel` ;
- `regle-application` ;
- `interpretatif`.

Ce registre doit progressivement remplacer les correspondances floues par chapitre.

## 8. Coherence cours-exercices

Probleme corrige :

Avant, une session pouvait afficher un cours sur les probabilites puis proposer ensuite une question de mediane ou de triangle rectangle.

Regle actuelle :

Une session choisit une notion, affiche le cours correspondant, puis propose uniquement des exercices du meme chapitre ou de la meme notion.

Exemple attendu :

```txt
Cours : Probabilites
Exercices : Probabilites, Probabilites, Probabilites
```

Cette regle est prioritaire pour toutes les matieres.

## 9. Cours

Les cours ne doivent plus etre de simples rappels.

Structure actuelle affichee :

- introduction de la notion ;
- explication developpee ;
- methode pas a pas ;
- exemple guide ;
- prerequis ;
- point a retenir ;
- piege frequent ;
- question de verification.

Decision a venir :

Les cours pourraient ensuite etre separes dans des fichiers HTML sources, plus faciles a maintenir que du HTML dans JavaScript.

Attention technique :

Si l'application est ouverte en `file://`, charger des fichiers HTML avec `fetch()` peut etre bloque selon le navigateur. Il faudra donc choisir entre :

- utiliser un mini serveur local ;
- integrer les cours dans le HTML via des templates ;
- creer un petit script de build qui transforme les cours HTML en bundle JS.

## 10. Sujets guides longs

Les sujets guides sont des exercices longs a faire sur cahier.

Ils servent aux formats qui ne se corrigent pas bien automatiquement :

- redaction ;
- reecriture longue ;
- comprehension ;
- developpement construit ;
- analyse de document ;
- probleme de maths ;
- lecture de graphique ;
- technologie.

Chaque sujet guide contient :

- contexte ;
- consigne ;
- methode ;
- attendus ;
- grille d'auto-verification ;
- auto-evaluation dans l'application.

## 11. Progression et erreurs

L'application stocke la progression dans `localStorage`.

Donnees suivies :

- points ;
- streak ;
- sessions ;
- reponses ;
- erreurs ;
- reparations ;
- sujets guides termines ;
- badges ;
- chapitres marques comme pas encore vus.

Pour les exercices generes, il faut conserver :

- `generatorId` ;
- `seed` ;
- `notionId`.

Cela permet de reconstruire une question ratee.

## 12. Badges et gamification

Les badges existent et ont ete redesignes.

Etat visuel :

- badges a gagner : version plate, grisee, non 3D ;
- badges debloques : paliers bronze, argent et or avec medaille CSS.

Badges importants :

- progression ;
- streak ;
- nombre de questions ;
- reparations d'erreurs ;
- perseverance.

La gamification doit rester encourageante, jamais punitive.

## 13. Validation qualite

Le script `app-brevet/tools/validate-content.js` controle :

- champs obligatoires ;
- matieres inconnues ;
- bonne reponse presente dans les choix ;
- doublons d'identifiants ;
- generateurs declares mais absents ;
- echantillons d'exercices generes.

Commande :

```powershell
cd app-brevet
node tools\validate-content.js
```

Cette validation doit etre lancee apres chaque ajout massif de contenus ou de generateurs.

## 14. Decisions importantes

Decisions prises :

- conserver les exercices existants comme banque statique ;
- ajouter des generateurs offline pour les notions calculatoires ;
- utiliser un schema commun pour toutes les questions ;
- stocker les seeds des questions generees ;
- garantir la coherence cours -> exercices ;
- repousser l'epreuve orale a la toute fin ;
- structurer le projet autour des notions.

Decisions encore ouvertes :

- format final des cours : HTML separe, templates HTML ou bundle JS ;
- interface auteur pour relire et valider rapidement des contenus ;
- exploitation complete du graphe de prerequis ;
- repetition espacee ;
- profils locaux separes sur un meme appareil ;
- import/export de progression ;
- transfert manuel de progression entre appareils ;
- synchronisation multi-appareils avec compte eleve.

Point de vigilance : la progression est aujourd'hui locale au navigateur. Un eleve qui passe du telephone au PC ne retrouve donc pas automatiquement ses badges. Une solution offline simple peut utiliser export/import ou QR code de sauvegarde ; une vraie synchronisation implique backend, comptes, securite et RGPD.

## 15. Prochaines priorites

Priorite 1 : stabiliser l'architecture notions/generateurs.

- Ajouter plus de notions dans `notions.js`.
- Relier chaque cours a une notion stable.
- Relier chaque exercice statique a une notion quand c'est possible.

Priorite 2 : etendre les generateurs.

- fractions ;
- proportionnalite ;
- puissances ;
- Pythagore ;
- Thales ;
- trigonometrie ;
- fonctions ;
- conversions ;
- pH ;
- energie ;
- circuits ;
- conjugaison et accords.

Priorite 3 : mieux choisir la notion en session.

- permettre a l'eleve de choisir une notion precise ;
- afficher les prerequis ;
- eviter une notion si ses prerequis sont trop fragiles.

Priorite 4 : enrichir les cours.

- sortir progressivement les cours dans une structure plus maintenable ;
- ajouter davantage d'exemples guides ;
- ajouter une mini-verification apres le cours.

Priorite 5 : augmenter les sujets guides.

- plus de redactions ;
- plus de developpements construits ;
- plus d'analyses de documents ;
- plus de problemes complets.

Priorite finale : epreuve orale.

L'oral sera traite quand les epreuves ecrites seront suffisamment solides.

## Priorite proche - GitHub

Le projet doit etre mis rapidement en ligne sur GitHub.

Objectifs :

- versionner le code et les contenus ;
- garder un historique propre des changements ;
- faciliter les analyses par d'autres IA ;
- permettre une revue externe ;
- suivre les prochaines taches sous forme d'issues.

Important : GitHub sert au developpement et au partage du projet. L'application doit rester offline pour l'utilisateur final.

## Convention de sauvegarde

Dans ce projet, une demande de "sauvegarde" doit etre comprise comme une operation complete :

- mise a jour du cahier des charges ;
- mise a jour du fichier d'etat actuel et d'architecture ;
- mise a jour du contexte pour IA externe ;
- mise a jour des fichiers techniques `.md` si le schema ou la tracabilite changent ;
- execution du validateur `node tools\validate-content.js` ;
- verification de la syntaxe des fichiers JS modifies ;
- creation d'un point de sauvegarde local ou Git ;
- push sur GitHub si le depot distant est configure.

Etat actuel : le dossier local est maintenant un depot Git, sur la branche `main`, avec le remote GitHub `https://PARRAGAantoine@github.com/PARRAGAantoine/brevet-des-colleges.git`.

Le push GitHub est effectue. La branche locale `main` suit `origin/main` sur le depot public `PARRAGAantoine/brevet-des-colleges`.

Note technique : pour ne pas interferer avec les autres projets GitHub du poste, ce depot utilise une surcharge locale du gestionnaire d'identifiants afin de pousser avec le compte `PARRAGAantoine`.

GitHub Pages est configure en mode legacy avec la branche `gh-pages` comme source.

URL publique :

```txt
https://parragaantoine.github.io/brevet-des-colleges/
```

Le depot contient aussi une validation GitHub Actions :

- `.github/workflows/validate.yml` controle la syntaxe JS et les contenus a chaque push ou pull request ;
- la publication GitHub Pages reste servie depuis la branche `gh-pages`.

## Mise a jour notions - etape 6

Le registre de notions couvre maintenant les 33 chapitres actuellement utilises par les exercices.

Tous les contenus existants sont relies a une notion stable :

- 66 cours avec `notionId` ;
- 250 exercices statiques avec `notionId` ;
- 12 sujets guides avec `notionId`.

Le validateur controle maintenant que chaque cours, exercice et sujet guide possede un `notionId` connu.

Prochaine evolution : decouper certaines notions larges en sous-notions plus fines lorsque l'interface permettra de choisir une notion precise.

## Mise a jour generateurs mathematiques

Cette etape a ajoute un lot de generateurs mathematiques couvrant notamment fractions, puissances, priorites operatoires, proportionnalite, fonctions, Pythagore, Thales et trigonometrie.

Ces generateurs completent la banque statique existante et permettent d'augmenter la variete des sessions sans stocker des centaines de variantes pre-generees.

## Mise a jour generateurs sciences et technologie

Cette etape a ajoute un lot de generateurs sciences et technologie couvrant pH, energie, circuits, mouvement/vitesse, facteur teste en SVT et capteur/actionneur.

Ces generateurs completent les exercices statiques existants et augmentent la variete des sessions en sciences.

## Mise a jour generateurs francais

Le projet contient maintenant 34 generateurs offline. Le nouveau lot couvre grammaire, orthographe, reecriture et valeurs des temps du recit.

Ces generateurs sont utiles pour produire beaucoup de variations courtes sur les regles de langue, sans ecrire chaque QCM a la main.

## Mise a jour generateurs complementaires et cours

Le projet contient maintenant 46 generateurs offline. Le nouveau lot ajoute des variations en calcul litteral, statistiques, grandeurs, geometrie, donnees scientifiques, SVT et technologie.

Les cours affiches avant exercice ont ete enrichis par familles de notions : statistiques, calcul litteral, equations, geometrie, SVT, physique-chimie et technologie. L'objectif est de proposer un vrai cours court et structure, pas seulement un rappel, avant les QCM coherents avec la notion choisie.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 1380 exercices generes : 0 reponse absente des choix.

## Mise a jour badges

La vue Badges utilise maintenant une progression visuelle par paliers : "A gagner" en version plate grisee, puis bronze, argent et or pour les badges debloques. Le design s'inspire d'une medaille avec rayons, bouclier et ruban, realise en CSS pour rester offline.

Validation effectuee :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- controle navigateur local : 14 cartes badges, aucune erreur console.

## Mise a jour sessions par notion

La session guidee propose maintenant un choix de notion apres la matiere. L'option automatique reste disponible, mais l'utilisateur peut forcer une notion comme probabilites, statistiques, calcul litteral, grammaire ou SVT.

Quand une notion est choisie, le cours et les questions sont selectionnes dans cette meme notion. Cela reduit fortement les sessions incoherentes ou un cours est suivi d'exercices d'un autre chapitre.

Validation effectuee :

- `node --check app.js` : OK ;
- `node --check data\notions.js` : OK ;
- `node tools\validate-content.js` : OK ;
- controle navigateur local : Mathematiques > Probabilites affiche un cours et une question de probabilites, sans erreur console.

## Mise a jour types d'exercices

Le moteur d'exercices accepte maintenant trois formats :

- `qcm` ;
- `true_false` ;
- `order`.

La banque statique contient maintenant 250 exercices : 226 QCM, 12 vrai/faux et 12 remises en ordre. Les prochains lots devront continuer a augmenter ces nouveaux formats et ajouter ensuite association et reponse courte.

Un outil d'audit QCM existe maintenant dans `app-brevet/tools/audit-qcm.js`. Dernier controle : 226 QCM audites, 0 alerte.

## Mise a jour formats de session

Les sessions guidees sont maintenant choisies par nombre d'exercices, pas par duree annoncee :

- courte : 5 exercices ;
- standard : 10 exercices ;
- longue : 15 exercices.

Le temps reel est mesure et affiche au bilan. Cette decision evite de promettre une session de 15 minutes qui peut etre terminee en deux minutes par un eleve rapide.

## Mise a jour badges pedagogiques

Decision prise : les paliers bronze, argent et or doivent aussi devenir des repères pedagogiques par notion.

- bronze = Decouverte validee ;
- argent = Consolidation validee ;
- or = Type brevet valide.

Les badges de comportement restent separes : regularite, perseverance, erreurs reparees, volume de questions, streak. Cette separation evite de melanger "j'ai travaille beaucoup" et "je maitrise cette notion au niveau attendu".

## Mise a jour refonte badges

Le systeme de badges est passe d'une petite liste statique a une generation automatique.

Familles de badges :

- badges de chapitre : bronze, argent, or pour chaque chapitre du curriculum ;
- badges de matiere : bronze, argent, or pour mathematiques, francais, histoire-geo EMC et sciences ;
- badges defi : seances, questions, jours de suite, erreurs reparees, seances sans erreur, sujets guides, mode Comme au brevet.

Les derniers badges sont volontairement difficiles : 750 questions, 100 jours de suite, 30 erreurs reparees, 120 reussites Comme au brevet, 15 sujets guides, or dans les quatre matieres.

Objectif : garder une motivation rapide au debut, mais empecher que tous les badges soient obtenus en quelques seances.

## Mise a jour affichage des cours

Les cours affiches avant les exercices ont ete restructures pour etre plus comprehensibles par un eleve qui n'a pas encore vu le chapitre.

Nouvelle structure commune :

- introduction courte ;
- ce qu'il faut savoir au depart ;
- idee simple ;
- mots a connaitre ;
- methode pas a pas ;
- exemple explique ;
- conseil avant de passer aux questions.

Cette evolution ameliore immediatement toutes les fiches sans changer la banque d'exercices. Prochaine etape pedagogique : relire et simplifier progressivement les textes de cours eux-memes, matiere par matiere, avec des phrases courtes et un vocabulaire de 4e/3e.

## Mise a jour contenus de cours - mathematiques

La reecriture progressive des cours precis a commence par les mathematiques.

Des contenus plus detailles existent maintenant pour les chapitres suivants : pourcentages, proportionnalite, priorites de calcul, puissances, statistiques, probabilites, equations, factorisation, programmes de calcul, tableur, Pythagore, Thales, trigonometrie, aires et volumes, echelles, vitesse.

Chaque profil vise :

- des phrases courtes ;
- une idee principale claire ;
- une methode applicable en plusieurs etapes ;
- un exemple explique ;
- un point de verification avant exercice.

Cette premiere passe a ensuite ete etendue aux autres matieres.

## Mise a jour contenus de cours - francais, histoire-geo EMC, sciences

La meme logique de cours guides a ete appliquee aux autres matieres.

Francais : grammaire, COD/COI, phrase complexe, orthographe, reecriture, interpretation, valeurs des temps, redaction.

Histoire-geo EMC : document, developpement construit, reperes, grands chapitres historiques, geographie des territoires, institutions, citoyennete, laicite, droits et devoirs.

Sciences : lecture de donnees, SVT, physique-chimie et technologie.

Le projet dispose maintenant d'une premiere passe globale de cours plus explicites sur les quatre matieres. Les prochains travaux pedagogiques devront porter sur la profondeur : ajouter davantage d'exemples par chapitre, creer des variantes de cours selon le niveau, et relire les formulations avec un vrai regard d'eleve.

## Mise a jour alignement cours-exercices

La selection des seances est plus stricte lorsqu'un chapitre est choisi. L'application privilegie le cours et les questions de la notion selectionnee. Si aucun cours exact n'existe, elle genere un cours de secours lie a la notion au lieu de prendre un cours d'un autre chapitre.

Un nouvel audit existe : `app-brevet/tools/audit-course-coverage.js`.

Il repere les notions qui manquent encore de volume. Etat actuel :

- 70 cours ;
- 292 exercices statiques ;
- 12 sujets guides ;
- 46 generateurs ;
- 265 QCM audites sans alerte ;
- 13 notions encore signalees comme trop courtes pour tenir confortablement une seance de 10 questions.

Les prochaines densifications doivent cibler en priorite l'histoire-geo EMC : reperes, developpement construit, Seconde Guerre mondiale, guerre froide, construction europeenne, geographie, citoyennete, valeurs de la Republique, defense.

## Mise a jour UX - seances, objectif quotidien et erreurs

L'interface de navigation est maintenant plus simple : Accueil, Seance, Exercices, Progression, Badges.

Le premier lancement ne pousse plus automatiquement les mathematiques. Si aucune donnee de progression n'existe, l'accueil propose de choisir une matiere ou de lancer un melange decouverte.

Les seances sont maintenant calibrees en nombre d'exercices :

- courte : 10 exercices ;
- standard : 20 exercices ;
- longue : 30 exercices.

L'objectif quotidien n'est plus un simple compteur de 10 questions. Il devient : reussir une seance sans faute. Si l'eleve fait une erreur, l'objectif n'est pas vraiment valide tant que l'erreur n'a pas ete reprise.

La reprise d'erreur suit maintenant un cycle plus pedagogique :

- rappel de cours avant de recommencer ;
- question proche du meme type, pas seulement la meme question ;
- plusieurs questions proches a reussir pour montrer que la methode est comprise ;
- reparation enregistree seulement apres cette reussite.

Corrections techniques liees :

- l'ancien bilan de seance ne reste plus visible lorsqu'on arrive sur une nouvelle seance ;
- les questions d'une seance sont dedoublonnees par enonce ;
- les badges debloques sont signales par un affichage plus visible ;
- la phrase inutile de la page Badges a ete retiree ;
- une couche de correction d'accents est appliquee aux textes de l'interface.

Inventaire local des annales : 180 PDF sont presents. Les sujets sont maintenant couverts pour chaque annee 2017-2026 et pour les quatre matieres de la serie generale France/metropole. La couverture 2025 reste la plus complete avec sujets et corriges. Les annees anterieures restent inegales, surtout pour les corriges d'histoire-geo EMC, de sciences et de certaines epreuves de francais. L'annee 2026 contient les sujets officiels metropole des quatre matieres, mais les corriges fiables restent surtout disponibles en mathematiques.

## Mise a jour badges - style medaille et objectifs longs

La page Badges a ete reorganisee pour mieux correspondre a l'app actuelle.

Nouvelle structure :

- Badge ultime ;
- Matieres ;
- Defis ;
- Chapitres.

Le design utilise maintenant des cartes sombres et des medailles rondes en bronze, argent, or et ultime. Les badges verrouilles sont gris et moins lumineux.

Le nombre total actuel est de 89 badges. Les derniers sont volontairement longs a obtenir : 1000 questions, 100 jours de suite, 75 erreurs reparees, 50 seances sans faute, 200 reussites type brevet et un badge ultime conditionne par l'or dans les quatre matieres.

Les badges sont maintenant affiches comme des familles evolutives : une seule carte apparait, puis elle passe de verrouille a bronze, argent et or selon le meilleur palier atteint. Le compteur conserve le total des paliers. Des medailles WebP sont utilisees pour ameliorer le rendu graphique sans alourdir l'app.

Une famille de badges `Annales` est disponible : bronze a 10/20, argent a 14/20, or a 17/20. La page Annales permet de choisir une annee et une matiere, puis d'enregistrer la note obtenue apres avoir fait le PDF dans les conditions du brevet.

Les medailles ont ete regenerees par familles pour eviter les erreurs visuelles : les badges de defi n'utilisent plus de badge mathematiques decoupe par erreur. Chaque famille dispose maintenant de variantes verrouille, bronze, argent et or.

## Mise a jour accueil et parametres

L'accueil n'est plus centre directement sur une seance. Il sert maintenant de vraie porte d'entree :

- bouton Installer l'app, prepare pour la future PWA ;
- bouton Continuer en ligne vers GitHub Pages ;
- acces rapides vers seance guidee, exercices libres, progression et badges ;
- rappel que l'app est utilisable hors ligne.

Une page Parametres existe maintenant dans le menu principal.

Elle contient :

- la version installee, actuellement `1.0.0` ;
- un bouton manuel de verification des mises a jour ;
- une zone Compte / Se connecter marquee comme future ;
- un choix de theme clair ou sombre.

Important : la verification de mise a jour n'est jamais automatique. L'eleve ou le parent doit cliquer volontairement sur le bouton. C'est conforme a la contrainte centrale : l'app doit rester offline par defaut et ne jamais donner l'impression qu'Internet est necessaire pour reviser.
