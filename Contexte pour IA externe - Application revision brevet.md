# Contexte pour IA externe - Application revision brevet

Ce fichier est destine a etre donne a une autre IA pour obtenir un avis, une critique ou des propositions d'architecture/contenu.

## 1. Projet

Nous construisons une application offline pour aider un eleve de college a preparer le Diplome national du brevet, serie generale, en France.

Session visee : juin 2027.

L'eleve n'a pas encore vu tout le programme. L'application doit donc permettre d'apprendre progressivement, pas seulement de reviser des notions deja connues.

Important :

- uniquement brevet des colleges ;
- uniquement serie generale ;
- France metropolitaine / programme francais ;
- pas brevet professionnel ;
- pas CAP ;
- pas bac ;
- pas candidats a l'etranger comme objectif principal.

## 2. Objectif pedagogique

L'application doit proposer :

- des cours clairs et progressifs ;
- des exercices courts corriges ;
- des sujets longs guides ;
- un suivi de progression ;
- une correction immediate ;
- une revision des erreurs ;
- une gamification motivante ;
- des sessions coherentes : un cours doit etre suivi d'exercices sur la meme notion.

Le but n'est pas seulement de faire beaucoup de QCM. Le but est d'aider l'eleve a apprendre, comprendre, s'entrainer, corriger ses erreurs et gagner en autonomie.

## 3. Epreuves couvertes

Epreuves ecrites visees :

- Francais ;
- Mathematiques ;
- Histoire-Geographie-EMC ;
- Sciences.

La partie sciences doit couvrir :

- physique-chimie ;
- SVT ;
- technologie.

L'epreuve orale est prevue tout a la fin, quand les epreuves ecrites seront suffisamment solides.

## 4. Contraintes techniques

Application locale/offline :

- HTML ;
- CSS ;
- JavaScript ;
- pas de backend obligatoire ;
- pas de connexion internet pendant l'utilisation ;
- stockage local via `localStorage`.

L'application peut etre servie par un petit serveur local pendant le developpement, mais elle doit rester utilisable comme application offline.

Attention :

- si l'app est ouverte en `file://`, certains navigateurs peuvent bloquer `fetch()` vers des fichiers locaux ;
- toute solution qui depend d'une API distante ou d'un LLM en ligne pendant l'utilisation n'est pas adaptee.

## 5. Etat actuel

Le projet se trouve dans le dossier :

```txt
app-brevet/
```

Etat valide actuellement :

```txt
Matieres : 4
Cours : 66
Exercices statiques : 250
Sujets guides longs : 12
Notions referencees : 33
Generateurs offline : 46
Erreurs de validation : 0
```

Fonctionnalites existantes :

- tableau de bord ;
- parcours par chapitre ;
- statut "pas encore vu" ;
- sessions guidees ;
- choix manuel de notion en session guidee ;
- cours avant exercices ;
- exercices QCM ;
- reponses QCM melangees ;
- coherence cours -> exercices ;
- revision des erreurs ;
- badges ;
- sujets guides longs ;
- auto-evaluation ;
- generateurs JS offline pour certaines notions calculatoires.

## 6. Architecture actuelle

Structure principale :

```txt
app-brevet/
├── index.html
├── styles.css
├── app.js
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

Documents importants :

- `Cahier des charges et roadmap - Application revision brevet.md` ;
- `Etat actuel et architecture - Application revision brevet.md` ;
- `app-brevet/data/schema.md` ;
- `app-brevet/data/source-map.md`.

## 7. Choix d'architecture deja pris

### Banque statique + generateurs

Les exercices existants ne sont pas abandonnes. Ils constituent une banque statique validee.

Les generateurs offline viennent completer cette banque pour les notions calculatoires.

### Schema universel

L'application doit manipuler le meme format d'exercice, que la question vienne :

- d'une banque statique ;
- d'un generateur JS ;
- d'un lot genere puis valide.

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

### Seeds

Pour les exercices generes, on stocke :

- `generatorId` ;
- `seed` ;
- `notionId`.

Cela permet de reconstruire exactement une question ratee.

### Registre de notions

Le fichier `data/notions.js` introduit des notions avec :

- id ;
- matiere ;
- chapitre ;
- type de contenu ;
- prerequis ;
- chemin de cours ;
- generateurs associes.

Types de contenus :

- calculatoire ;
- memoriel ;
- regle-application ;
- interpretatif.

## 8. Problemes deja identifies et corriges

### Incoherence cours-exercices

Ancien probleme :

Une session pouvait afficher un cours sur les probabilites puis proposer une question de mediane ou de triangle rectangle.

Correction :

Une session choisit une notion, affiche le cours correspondant, puis propose uniquement des exercices du meme chapitre ou de la meme notion.

### Bonne reponse toujours en premiere position

Ancien probleme :

Les bonnes reponses etaient souvent en premier choix.

Correction :

Les choix QCM sont melanges a l'affichage, sans casser la correction.

### Badges peu visibles

Ancien probleme :

Les badges debloques et a gagner se distinguaient mal.

Correction :

Design des badges revu avec couleurs et etats visuels plus clairs.

## 9. Sources et inspiration

Documents deja recuperes :

- annales officielles DNB ;
- sujets et corriges ;
- ressources Eduscol ;
- ressources de revision type Lumni ;
- ressources libres ou inspirees de formats d'entrainement.

Les contenus de l'application ne doivent pas recopier des exercices proteges. Ils peuvent s'inspirer des formats et attendus, mais doivent etre reformules et adaptes.

## 10. Points ouverts

Nous cherchons encore des solutions sur :

1. Comment produire beaucoup plus d'exercices sans perdre en qualite ?
2. Comment organiser les cours de facon maintenable ?
3. Faut-il garder les cours dans JS, les passer en HTML separe, ou utiliser un systeme de templates ?
4. Comment exploiter les prerequis sans rendre l'app trop complexe ?
5. Comment choisir automatiquement la bonne notion a travailler ?
6. Comment valider rapidement des centaines d'exercices generes ?
7. Comment creer une interface auteur simple pour relire/modifier les contenus ?
8. Comment ajouter des exercices non-QCM sans correction automatique fragile ?
9. Comment faire une progression jusqu'a juin 2027 sans surcharger l'eleve ?
10. Comment preparer plus tard l'epreuve orale sans perturber le travail actuel ?

## 11. Ce que nous attendons d'une autre IA

Nous voulons surtout :

- une critique de l'architecture actuelle ;
- des propositions pour mieux structurer les notions ;
- des idees de generateurs offline ;
- des methodes pour produire des exercices en masse ;
- des strategies de validation qualite ;
- des propositions UX pour un collegien ;
- des idees pour rendre les cours plus efficaces ;
- des risques que nous n'avons pas vus ;
- une roadmap technique plus robuste.

Les reponses les plus utiles seront concretes :

- schemas de donnees ;
- architecture fichiers ;
- algorithmes de selection ;
- exemples de generateurs ;
- methodes de validation ;
- priorites ordonnees.

## 12. Ce qu'il faut eviter

Eviter les propositions qui :

- dependent d'une API externe pendant l'utilisation ;
- supposent une connexion internet ;
- visent le bac, le CAP ou le brevet professionnel ;
- remplacent les cours par seulement des QCM ;
- ajoutent une complexite lourde sans benefice immediat ;
- ignorent le besoin d'un eleve qui n'a pas encore vu tout le programme ;
- copient directement des contenus proteges.

## 13. Question a poser a l'IA externe

Question recommandee :

```txt
Voici le contexte d'une application offline de revision du brevet general pour un eleve passant l'examen en juin 2027.

Peux-tu analyser l'architecture actuelle, identifier ses forces/faiblesses, proposer une architecture cible plus robuste, et suggerer une strategie concrete pour produire beaucoup d'exercices et de cours de qualite sans perdre la coherence pedagogique ?

Merci de repondre avec :
1. points forts ;
2. risques ;
3. architecture recommandee ;
4. schema de donnees ;
5. strategie de generation d'exercices ;
6. strategie pour les cours ;
7. roadmap priorisee.
```

## Information importante pour l'IA externe : GitHub

Le projet doit etre publie rapidement sur GitHub afin de faciliter le versionnement, les retours externes et les analyses par d'autres IA.

Cette publication ne doit pas transformer l'application en service en ligne : l'objectif utilisateur reste une app offline.

## Convention interne : "sauvegarder"

Lorsque l'utilisateur demande a l'assistant de "sauvegarder", cela veut dire :

- mettre a jour les fichiers de contexte et de roadmap ;
- verifier l'etat du code et des donnees ;
- lancer les validations disponibles ;
- documenter l'avancement ;
- pousser le code sur GitHub si un depot distant est configure.

Si GitHub n'est pas encore configure, l'assistant doit le dire clairement et produire une sauvegarde locale documentee.

## Mise a jour pour l'IA externe : notions

Le registre de notions est passe a 33 notions, couvrant tous les chapitres actuellement presents dans les exercices.

Les 66 cours, 250 exercices statiques et 12 sujets guides ont maintenant un `notionId` valide.

Il reste a proposer une strategie pour decouper les notions larges en sous-notions pedagogiques plus fines.

## Mise a jour pour l'IA externe : generateurs

Le nombre de generateurs offline est passe a 20. Le nouveau lot porte surtout sur les mathematiques : fractions, puissances, priorites, proportionnalite, fonctions, Pythagore, Thales et trigonometrie.

Les generateurs restent complementaires de la banque statique de 250 exercices.

## Mise a jour pour l'IA externe : generateurs sciences

Le nombre de generateurs offline est passe a 26. Le nouveau lot couvre les sciences et la technologie : pH, energie, circuits, mouvement/vitesse, experience SVT et capteur/actionneur.

## Mise a jour pour l'IA externe : generateurs francais

Le nombre de generateurs offline est passe a 34. Le nouveau lot porte sur le francais : sujet du verbe, COD/COI, homophones, accords du groupe nominal, reecriture et valeurs des temps.

## Mise a jour pour l'IA externe : generateurs complementaires et cours

Le nombre de generateurs offline est passe a 46. Le nouveau lot couvre calcul litteral, statistiques, conversions de grandeurs, volume de pave droit, lecture de donnees scientifiques, classification/heredite en SVT et algorithmique/fonctions d'usage en technologie.

Les cours courts generes par l'application ont ete renforces par familles de notions. Priorite pedagogique confirmee : une session doit montrer un cours clair sur une notion precise, puis proposer plusieurs exercices portant sur cette meme notion, avec des questions variees mais coherentes.

Validation recente :

- `node tools\validate-content.js` : OK ;
- 1380 exercices generes en echantillon : 0 anomalie detectee.

## Mise a jour pour l'IA externe : badges

La gamification visuelle des badges a ete renforcee. Les badges non debloques sont maintenant affiches en version plate grisee "A gagner". Les badges debloques sont prepares en paliers bronze, argent et or, avec un rendu de medaille CSS offline.

Point important pour la suite : les paliers visuels existent, mais le systeme de badges peut encore etre enrichi pedagogiquement avec davantage de badges par matiere, par notion, par perseverance et par progression dans les erreurs reparees.

## Mise a jour pour l'IA externe : progression multi-appareils

La progression est actuellement stockee en `localStorage`, donc elle est liee au navigateur et a l'appareil. Cela convient a une V1 offline, mais pose un probleme si un eleve utilise son telephone, son PC et sa tablette : badges, erreurs et historique ne suivent pas automatiquement.

Pistes a etudier :

- profils locaux pour separer plusieurs utilisateurs sur un meme appareil ;
- export/import de progression ;
- code ou QR code de sauvegarde pour transferer manuellement la progression ;
- synchronisation multi-appareils avec compte eleve, backend et base de donnees.

Point de vigilance : la synchronisation en ligne sort du modele offline pur et implique securite, gestion des donnees personnelles et RGPD. Elle doit etre cadree comme V2, pas comme une petite option UI.

## Mise a jour pour l'IA externe : sessions par notion

La session guidee permet maintenant de choisir une notion precise apres la matiere. L'option automatique reste disponible.

Quand une notion est choisie, le cours et les exercices sont filtres sur cette meme notion. Les generateurs offline peuvent aussi produire directement des questions pour la notion choisie.

Point a ameliorer ensuite : certaines notions restent larges, par exemple geometrie ou sciences. Il faudra probablement les decouper en sous-notions pedagogiques plus fines pour obtenir des sessions encore plus coherentes.

## Mise a jour pour l'IA externe : types d'exercices

Le moteur d'exercices ne se limite plus au QCM. Deux nouveaux formats sont pris en charge :

- `true_false` : vrai/faux ;
- `order` : remise en ordre par clics successifs.

Les lots successifs portent maintenant la banque statique a 250 exercices : 226 QCM, 12 vrai/faux et 12 remises en ordre.

Un outil d'audit QCM existe dans `app-brevet/tools/audit-qcm.js`. Dernier controle : 226 QCM audites, 0 alerte.

Priorite suivante : produire davantage d'exercices dans ces nouveaux formats, puis ajouter association et reponse courte.

## Mise a jour pour l'IA externe : formats de session

Les sessions ne sont plus presentees comme des durees fixes de 15 ou 30 minutes. L'utilisateur choisit maintenant un nombre d'exercices :

- courte : 5 exercices ;
- standard : 10 exercices ;
- longue : 15 exercices.

Le temps reel passe est affiche au bilan. Cette decision evite l'effet de fausse promesse quand un eleve termine tres vite ou reste longtemps bloque sur une question.

## Mise a jour pour l'IA externe : badges pedagogiques

Decision prise : les paliers bronze, argent et or doivent devenir lisibles comme des niveaux pedagogiques par notion :

- bronze = Decouverte ;
- argent = Consolidation ;
- or = Type brevet.

Ces badges de progression par notion doivent coexister avec des badges de comportement separes : regularite, perseverance, erreurs reparees, volume de questions, streak. Une solution a proposer doit donc distinguer clairement la maitrise d'une notion et l'engagement de l'eleve.

## Mise a jour pour l'IA externe : refonte badges

Le systeme de badges a ete refondu. Il ne repose plus principalement sur une petite liste de badges statiques. L'application genere maintenant :

- des badges par chapitre, avec bronze = bases, argent = entrainement, or = niveau Comme au brevet ;
- des badges par matiere ;
- des badges defi de long terme : volume de questions, regularite, erreurs reparees, sujets guides, seances parfaites.

Les derniers badges sont volontairement longs a obtenir pour eviter que l'eleve ait tout debloque en quelques seances. Toute proposition future doit conserver cet equilibre : gratification rapide au debut, objectifs rares et difficiles a la fin.

## Mise a jour pour l'IA externe : GitHub

Le depot Git local a ete initialise sur la branche `main`.

Remote configure :

```txt
https://PARRAGAantoine@github.com/PARRAGAantoine/brevet-des-colleges.git
```

Les PDF d'annales, le dossier de documents supplementaires et les sauvegardes locales sont exclus via `.gitignore`.

Etat du push : effectue. La branche locale `main` suit `origin/main` sur le depot public `PARRAGAantoine/brevet-des-colleges`.

Note technique : une surcharge locale du helper d'identifiants Git a ete ajoutee pour ce depot afin d'utiliser Git Credential Manager, car la configuration globale GitHub CLI du poste est associee a un autre compte.

GitHub Pages est configure en mode legacy avec la branche `gh-pages` comme source.

URL publique :

```txt
https://parragaantoine.github.io/brevet-des-colleges/
```

## Mise a jour pour l'IA externe : cours plus accessibles

Les cours avant exercices ont maintenant une structure commune pensee pour un eleve qui decouvre le chapitre :

- introduction simple ;
- connaissances de depart ;
- idee simple ;
- mots a connaitre ;
- methode pas a pas ;
- exemple explique ;
- conseil avant les questions.

Le but est de passer d'un simple rappel a un vrai mini-cours. Cette couche est globale et immediatement appliquee a toutes les fiches.

Point important pour les prochaines propositions : il reste a reecrire progressivement le fond de chaque cours pour simplifier les phrases, limiter le vocabulaire technique non explique et ajouter davantage d'exemples concrets. Les futures contributions doivent viser un niveau eleve de 4e/3e qui n'a pas encore vu tout le programme, car l'objectif est juin 2027.

## Mise a jour pour l'IA externe : relecture matiere par matiere

La reecriture precise des cours a commence par les mathematiques.

Les profils suivants ont ete enrichis : pourcentages, proportionnalite, priorites, puissances, statistiques, probabilites, equations, factorisation, programmes de calcul, tableur, Pythagore, Thales, trigonometrie, aires et volumes, echelles, vitesse.

Pour les prochaines contributions, la priorite n'est pas seulement d'ajouter du volume. Il faut aussi verifier que chaque cours :

- peut etre compris par un eleve qui decouvre le chapitre ;
- explique les mots techniques avant de les utiliser ;
- donne une methode concrete ;
- propose un exemple different des exercices qui suivent ;
- evite les phrases trop longues.

Cette passe a ensuite ete etendue au francais, a l'histoire-geo EMC et aux sciences.

## Mise a jour pour l'IA externe : premiere passe terminee

La premiere passe de relecture pedagogique couvre maintenant les quatre matieres.

Francais : grammaire, COD/COI, phrase complexe, orthographe, reecriture, interpretation, valeurs des temps, redaction.

Histoire-geo EMC : documents, developpement construit, reperes, grands chapitres historiques, geographie, institutions, citoyennete, laicite, droits et devoirs.

Sciences : donnees, SVT, physique-chimie, technologie.

Les propositions futures doivent maintenant chercher a augmenter la qualite et la progressivite :

- plusieurs exemples par chapitre ;
- cours differencies selon Decouverte, Consolidation et Type brevet ;
- definitions encore plus simples ;
- exercices directement relies au cours affiche ;
- relecture des formulations avec un niveau eleve de 4e/3e.

## Mise a jour pour l'IA externe : alignement cours-exercices

La logique de seance a ete renforcee. Quand l'eleve choisit un chapitre, le cours et les exercices doivent rester dans cette notion. Si l'app ne trouve pas de cours exact, elle cree un cours de secours a partir de la notion choisie au lieu de prendre un cours voisin.

Un audit de couverture existe :

```txt
app-brevet/tools/audit-course-coverage.js
```

Il indique les notions qui manquent encore de volume. Apres le lot `extra-content-8.js`, le projet contient 70 cours et 292 exercices statiques. L'audit signale encore 13 notions courtes, surtout en histoire-geo EMC.

Priorite pour une IA externe : proposer des lots d'exercices par notion, en visant au moins 10 questions automatiques par chapitre sans melanger les sujets.

## Mise a jour pour l'IA externe : objectif quotidien et reprise d'erreur

L'objectif quotidien a change. Il ne faut plus raisonner comme un compteur simple de questions faites. L'objectif produit est maintenant : reussir une seance sans faute.

Si l'eleve se trompe, l'erreur doit rester visible comme travail a reprendre. La reprise ne doit pas seulement redonner exactement la meme question, car l'eleve pourrait memoriser la reponse. La bonne logique est :

- afficher une correction et/ou un rappel de cours ;
- proposer une question proche du meme type de resolution ;
- faire reussir plusieurs questions proches ;
- considerer l'erreur reparee seulement quand la methode semble comprise.

Cette contrainte doit guider les futurs generateurs : chaque generateur utile devrait pouvoir produire des variantes proches d'une question ratee, avec la meme competence visee mais des donnees ou formulations differentes.

## Mise a jour pour l'IA externe : annales locales

Un inventaire local a ete refait apres telechargements complementaires. Le dossier contient maintenant 180 PDF classes comme annales ou sujets/corriges. Les sujets sont couverts pour chaque annee 2017-2026 et pour les quatre matieres de la serie generale France/metropole. La couverture 2025 est complete sur les quatre matieres. Les annees 2017 a 2024 restent inegales pour les corriges : ils sont surtout disponibles en mathematiques, avec des manques frequents en histoire-geo EMC, sciences et parfois francais. L'annee 2026 contient les sujets officiels metropole des quatre matieres, mais les corriges fiables restent surtout disponibles en mathematiques.

Pour une IA externe, il ne faut donc pas supposer que toutes les annees disposent de toutes les corrections. Les annales servent surtout de source d'inspiration et de calibration du niveau brevet, pas de banque exhaustive parfaite.

## Mise a jour pour l'IA externe : PWA offline et mises a jour

Le projet doit rester offline par defaut. Une page Parametres existe pour regrouper :

- version installee ;
- verification manuelle des mises a jour ;
- futur login ;
- mode clair / sombre.

Point non negociable : l'app ne doit pas contacter GitHub automatiquement au demarrage. La verification de mise a jour se fait uniquement apres un clic utilisateur, car certains eleves n'ont pas une connexion permanente.

La future PWA devra respecter cette logique : installer une fois, reviser sans Internet, verifier les mises a jour seulement quand l'utilisateur le decide.

## Mise a jour pour l'IA externe : badges evolutifs

La page Badges n'affiche plus les paliers bronze, argent et or comme trois cartes separees. Chaque famille de badge a une seule carte qui evolue : verrouillee au depart, puis bronze, argent et or selon le meilleur palier atteint.

Le compteur garde le nombre total de paliers debloques, mais l'interface est plus lisible.

Une famille `Annales` est preparee pour le futur mode examen complet :

- bronze : au moins 10/20 sur une annale complete ;
- argent : au moins 14/20 ;
- or : au moins 17/20.

Le mode Annales existe dans une premiere version : l'eleve choisit une annee et une matiere, fait le PDF d'annale a part, puis enregistre sa note sur 20 dans l'app. Le stockage se fait dans `progress.annalExamRuns`.

Les assets actuels sont des medailles WebP inspirees de la reference utilisateur. Pour obtenir un rendu encore plus premium et homogene, il faudra probablement generer les medailles famille par famille avec un generateur d'image plutot que decouper une planche existante.
