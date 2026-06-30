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
Exercices statiques : 194
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

Les 194 exercices deja crees restent utiles.

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

- badges debloques : plus visibles, verts, avec icone de validation ;
- badges a gagner : plus neutres et grises.

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
- import/export de progression.

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

Etat au moment de cette note : le dossier local n'est pas encore un depot Git. Le push GitHub necessite donc une initialisation Git et la configuration d'un remote.

## Mise a jour notions - etape 6

Le registre de notions couvre maintenant les 33 chapitres actuellement utilises par les exercices.

Tous les contenus existants sont relies a une notion stable :

- 66 cours avec `notionId` ;
- 194 exercices statiques avec `notionId` ;
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
