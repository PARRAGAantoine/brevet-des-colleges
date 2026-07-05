# Schema de donnees court

## Lesson

```js
{
  id,
  subject,
  chapter,
  notionId,
  stage,
  title,
  prerequisite,
  summary,
  example,
  mistake,
  takeaway
}
```

## Exercise

```js
{
  id,
  subject,
  chapter,
  notionId,
  lessonId,
  stage,
  type,
  question,
  choices,
  answer,
  acceptedAnswers,
  helpText,
  explanation
}
```

Champs optionnels :

- `lessonId` : identifiant exact du cours à afficher pour cet exercice ;
- `helpText` : aide courte affichée avec le bouton `Je ne comprends pas`.

Ces champs ne remplacent pas `notionId` : ils servent à éviter les erreurs quand un chapitre contient plusieurs méthodes différentes.

Types :

- `qcm` ou absent ;
- `true_false` ;
- `order` ;
- `short_answer`.

## Notion

```js
{
  id,
  subject,
  chapter,
  title,
  type,
  prerequisites,
  generators
}
```

## Progression locale

Stockage : `localStorage`, cle `brevetSprintProgress`.

Contient notamment :

- `answers` ;
- `sessions` ;
- `mistakes` ;
- `repairs` ;
- `courseReads` ;
- `badges` ;
- `annalExamRuns`.

`courseReads` stocke les cours validés par l'élève avec : `lessonId`, `subject`, `chapter`, `stage`, `date`.
