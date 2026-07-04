# Brevet Sprint

Application locale/offline de revision pour le Diplome national du brevet, serie generale, France.

Objectif : aider un eleve qui passera le brevet en juin 2027 a apprendre progressivement les notions, s'entrainer avec des QCM corriges, suivre sa progression et reviser ses erreurs.

## Lancer l'application

Version en ligne :

```txt
https://parragaantoine.github.io/brevet-des-colleges/app-brevet/
```

Version locale :

Ouvrir directement :

```txt
app-brevet/index.html
```

Pendant le developpement, il est aussi possible de lancer un petit serveur local :

```powershell
cd app-brevet
python -m http.server 4174 --bind 127.0.0.1
```

Puis ouvrir :

```txt
http://127.0.0.1:4174/
```

## Contenu actuel

- 4 matieres : mathematiques, francais, histoire-geographie-EMC, sciences.
- 70 cours.
- 342 exercices statiques, dont 26 exercices avec reponse a ecrire.
- 12 sujets guides longs.
- 33 notions referencees.
- 46 generateurs offline.
- Catalogue d'annales integre dans l'app, avec 180 PDF publies sur GitHub Pages.
- Installation PWA hors ligne depuis la page Parametres.
- Badges avec medailles par famille, paliers verrouille, bronze, argent, or.
- Reprise d'erreurs avec cours puis 3 questions proches a reussir.

## Validation

```powershell
cd app-brevet
node tools\validate-content.js
```

## Notes

Les documents sources telecharges restent ignores hors de `app-brevet/annales/`. Les 180 PDF publies dans `app-brevet/annales/` sont versionnes pour etre accessibles depuis GitHub Pages et mis en cache lors de l'installation PWA.
