# Etat actuel et architecture - Brevet Sprint

## Etat actuel

Application web offline de revision du brevet general.

Validation actuelle :

- matieres : 4 ;
- cours : 88 ;
- exercices statiques : 428 ;
- reponses ecrites : 92 ;
- sujets guides : 12 ;
- notions : 33 ;
- generateurs offline : 46 ;
- badges : 136 paliers ;
- erreurs de validation : 0.

## Architecture

La racine du depot est la version publique principale.

```txt
index.html
styles.css
app.js
sw.js
manifest.webmanifest
version.json
data/
generators/
assets/
annales/
```

`app-brevet/` est une copie legacy gardee synchronisee pour compatibilite.

## Donnees

- `data/content.js` : base initiale.
- `data/extra-content-*.js` : ajouts progressifs de cours/exercices.
- `data/notions.js` : notions, prerequis, generateurs.
- `data/annales.js` : index des anciens sujets.
- `annales/` : PDF caches par la PWA.

## Logique principale

- `render*` : affichage des vues.
- `startSession` / `finishSession` : seances guidees.
- `renderPracticeQuestion` : exercices libres et mini-series.
- `renderCourses` : consultation des cours et validation "lu et compris".
- `startMistakeReview` : reprise d'erreur.
- `renderBadges` : badges cliquables et repliables.
- `renderProgress` : progression detaillee.

## Points techniques importants

- Progression dans `localStorage`.
- Les cours lus sont suivis dans `progress.courseReads`.
- Service worker en network-first pour la navigation, cache-first pour assets.
- Cache versionne via `CACHE_NAME`.
- Les QCM sont melanges.
- Les reponses ecrites acceptent variantes simples, accents, espaces, unites et fractions numeriques.
- Les badges acquis restent acquis.

## Tests utiles

```powershell
node --check app.js
node --check app-brevet\app.js
node app-brevet\tools\validate-content.js
node app-brevet\tools\audit-qcm.js
```
