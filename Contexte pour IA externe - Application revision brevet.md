# Contexte IA externe - Brevet Sprint

## Projet

Brevet Sprint est une application web offline pour aider un eleve a preparer le Diplome national du brevet, serie generale, en France.

Session visee : juin 2027. L'eleve n'a pas encore vu tout le programme, donc l'app doit apprendre progressivement, pas seulement faire reviser.

Exclusions : pas de brevet pro, pas CAP, pas bac, pas objectif principal "etranger".

## Contraintes fortes

- Application utilisable hors ligne.
- HTML, CSS, JavaScript, sans backend obligatoire.
- Progression stockee en `localStorage`.
- PWA installable, mais aucune verification automatique de mise a jour au demarrage.
- Les mises a jour doivent etre lancees volontairement depuis Parametres.
- Les exercices doivent rester coherents avec le cours affiche.
- Une erreur doit etre reprise avec cours puis questions proches, pas seulement en refaisant exactement la meme question.

## Etat actuel

Code principal : `app-brevet/`.

Etat valide :

```txt
Matieres : 4
Cours : 70
Exercices statiques : 342
Reponses a ecrire : 26
QCM audites : 289
Sujets guides longs : 12
Notions referencees : 33
Generateurs offline : 46
Erreurs de validation : 0
```

Matieres :

- Mathematiques ;
- Francais ;
- Histoire-Geographie-EMC ;
- Sciences, avec physique-chimie, SVT et technologie.

## Fonctionnalites presentes

- Accueil avec recommandation.
- Seances guidees par matiere, chapitre et nombre d'exercices.
- Cours avant questions.
- Differenciation de cours par niveau : `J'apprends`, `Je m'entraine`, `Comme au brevet`.
- QCM, vrai/faux, remise en ordre, reponses a ecrire.
- Reponses QCM melangees.
- Correction immediate.
- Reprise d'erreurs avec cours puis 3 questions proches a reussir.
- Annales : choix annee/matiere, documents references, saisie note sur 20. Les PDF officiels sont des liens distants : leur ouverture demande Internet. Le reste de l'app et les notes deja enregistrees restent utilisables hors ligne.
- Badges evolutifs : une carte par famille, verrouille puis bronze/argent/or.
- Parametres : PWA, mode clair/sombre, mise a jour volontaire, login futur.

## Architecture utile

```txt
app-brevet/
  index.html
  styles.css
  app.js
  manifest.webmanifest
  sw.js
  version.json
  data/
    content.js
    extra-content*.js
    notions.js
    annales.js
    schema.md
    source-map.md
  generators/
    registry.js
    math-calcul.js
    science-calcul.js
    french-language.js
  tools/
    validate-content.js
    audit-qcm.js
    audit-course-coverage.js
```

## Schema exercices

Tous les exercices, statiques ou generes, doivent ressembler au meme objet :

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
  explanation,
  generatorId,
  seed
}
```

Types actuels :

- `qcm`
- `true_false`
- `order`
- `short_answer`

Pour `short_answer`, l'eleve ecrit la reponse. La correction accepte deja des variantes simples : fractions equivalentes, virgule ou point decimal, unites courantes, formes comme `x = 5`.

## Sources et annales

Le corpus local contient environ 180 PDF d'annales serie generale France/metropole.

Les sujets sont couverts pour 2017-2026 et les quatre matieres, mais les corriges restent incomplets selon les annees, surtout hors mathematiques.

Les annales servent surtout a calibrer le niveau et inspirer des exercices progressifs. Il ne faut pas recopier massivement les sujets.

Les seances sont plafonnees selon les questions disponibles quand un chapitre n'a pas encore assez de contenu ou de generateur.

## Commandes de validation

Depuis `app-brevet/` :

```powershell
node --check app.js
node --check sw.js
node tools\validate-content.js
node tools\audit-qcm.js
```

Le test attendu aujourd'hui :

- `validate-content` : 0 erreur ;
- `audit-qcm` : 0 alerte.

## Priorites prochaines

1. Tester l'app avec un eleve et noter les blocages reels.
2. Approfondir les cours par niveau avec de vrais contenus differents, pas seulement un encadre.
3. Ajouter plus d'exercices issus des annales, surtout en maths et sciences.
4. Etendre prudemment les reponses a ecrire hors maths : sciences calculables, francais tres cadre, dates/reperes.
5. Nettoyer les fichiers `.md` historiques et creer une nouvelle roadmap courte pour la prochaine phase.

## Point d'attention

Le projet a beaucoup evolue. Pour toute proposition future, partir de l'etat actuel ci-dessus plutot que de l'historique ancien.
