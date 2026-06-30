# Brevet Sprint

Application locale/offline de revision pour le Diplome national du brevet, serie generale, France.

Objectif : aider un eleve qui passera le brevet en juin 2027 a apprendre progressivement les notions, s'entrainer avec des QCM corriges, suivre sa progression et reviser ses erreurs.

## Lancer l'application

Version en ligne :

```txt
https://parragaantoine.github.io/brevet-des-colleges/
```

Version locale :

Ouvrir `index.html` a la racine du projet, ou directement :

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
- 66 cours.
- 210 exercices statiques.
- 12 sujets guides longs.
- 33 notions referencees.
- 46 generateurs offline.
- Badges avec paliers visuels : a gagner, bronze, argent, or.

## Validation

```powershell
cd app-brevet
node tools\validate-content.js
```

## Notes

Les annales PDF et documents sources telecharges ne sont pas versionnes dans ce depot. Ils servent de base documentaire locale pour construire les cours, exercices et corrections, mais l'application publiee reste legere et offline.
