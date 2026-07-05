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
  stage,
  type,
  question,
  choices,
  answer,
  acceptedAnswers,
  explanation
}
```

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
- `badges` ;
- `annalExamRuns`.
