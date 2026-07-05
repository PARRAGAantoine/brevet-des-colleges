# Brevet Sprint

Application web offline pour reviser le brevet des colleges, serie generale, France.

URL publique : <https://parragaantoine.github.io/brevet-des-colleges/>

## Fonctionnalites

- Cours simples avant exercices.
- Acces direct aux cours sans lancer de seance.
- Validation des cours lus et compris.
- Cours restructures avec plan de lecture, exemple, methode et erreur a eviter.
- Seances guidees 10/20/30 exercices.
- Exercices libres.
- QCM, ordre, vrai/faux, reponses ecrites.
- Reprise d'erreurs avec questions proches.
- Progression locale.
- Badges cliquables.
- Anciens sujets PDF.
- Installation PWA hors ligne.
- Historique simple des mises a jour.

## Lancer en local

```powershell
python -m http.server 4184
```

Puis ouvrir :

```txt
http://127.0.0.1:4184/
```

## Verifier

```powershell
node --check app.js
node app-brevet\tools\validate-content.js
node app-brevet\tools\audit-qcm.js
```

## Note

La racine du depot est la version principale. `app-brevet/` est conserve en copie legacy.

Dernier controle : les 88 cours sont presents et l'audit de couverture ne signale plus de cours faible.
