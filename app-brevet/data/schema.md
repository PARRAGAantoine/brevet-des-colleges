# Schema universel des exercices

L'application doit manipuler le meme objet exercice, que la question vienne d'une banque statique, d'un generateur JS offline ou d'un lot cree puis valide.

## Exercice

```js
{
  id: "math.proba.urne:12345",
  mode: "static" | "generated",
  subject: "mathematiques",
  chapter: "Probabilites",
  notionId: "math.probabilites",
  stage: "Decouverte" | "Consolidation" | "Type brevet",
  type: "qcm" | "true_false" | "order",
  question: "Une urne contient...",
  choices: ["1/2", "1/3", "2/5", "5/2"],
  answer: "1/2",
  explanation: "Il y a ...",
  source: "manual" | "annale-inspired" | "generated",
  generatorId: "math.proba.urne",
  seed: 12345
}
```

## Regles

- `choices` doit contenir exactement la bonne reponse.
- `answer` est compare sous forme de texte pour accepter les reponses numeriques ou textuelles.
- Pour `true_false`, `choices` contient `Vrai` et `Faux`.
- Pour `order`, `choices` contient les elements a classer et `answer` contient le bon ordre separe par `|||`.
- Un exercice genere doit stocker `generatorId` et `seed` pour etre reconstruit a l'identique.
- Les exercices statiques deja presents restent une banque validee et peuvent cohabiter avec les exercices generes.
- Les sessions doivent rester coherentes : un cours donne doit etre suivi d'exercices du meme chapitre ou de la meme notion.

## Notion

```js
{
  id: "math.probabilites",
  subject: "mathematiques",
  chapter: "Probabilites",
  title: "Probabilites simples",
  type: "calculatoire" | "memoriel" | "regle-application" | "interpretatif",
  prerequisites: ["math.fractions"],
  coursePath: "cours/maths-probabilites.html",
  generators: ["math.proba.urne", "math.proba.de"]
}
```

## Validation

Le script `tools/validate-content.js` controle :

- champs obligatoires ;
- matieres inconnues ;
- bonne reponse presente dans les choix ;
- doublons d'identifiants ;
- generateurs declares mais absents ;
- echantillons d'exercices generes.

## Sauvegarde

Quand le projet est sauvegarde, ce fichier doit etre verifie si le format des cours, exercices, notions, generateurs ou traces de progression a change.

Une sauvegarde complete implique aussi l'execution du validateur et, lorsque GitHub sera configure, un push du code et des documents.
