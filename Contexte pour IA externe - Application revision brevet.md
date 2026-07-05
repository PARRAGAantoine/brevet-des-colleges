# Contexte court pour IA externe - Brevet Sprint

## But

Brevet Sprint est une application web offline pour preparer le Diplome national du brevet, serie generale, en France.

Public vise : eleve qui passe le brevet plus tard et n'a pas encore vu tout le programme. L'app doit donc apprendre progressivement, pas seulement faire reviser.

Exclusions : brevet pro, CAP, bac, centres etrangers.

## Contraintes

- App HTML/CSS/JS, sans backend obligatoire.
- Utilisable hors ligne apres installation PWA.
- Progression locale dans `localStorage`.
- Pas de verification automatique des mises a jour : l'eleve choisit de verifier depuis Parametres.
- Les cours doivent etre simples, clairs et utiles avant l'exercice.
- Les exercices d'une seance doivent rester coherents avec le cours choisi.
- Une erreur se reprend avec cours + questions proches, pas seulement la meme question.

## URL et architecture

URL publique : `https://parragaantoine.github.io/brevet-des-colleges/`

La racine du depot sert l'app principale. `app-brevet/` reste une copie legacy a garder synchronisee.

Fichiers principaux :

- `index.html` : vues de l'app.
- `styles.css` : design clair/sombre, badges, responsive.
- `app.js` : logique, progression, seances, badges, annales.
- `sw.js` : cache offline PWA.
- `data/content.js` + `data/extra-content-*.js` : cours et exercices.
- `data/notions.js` : notions et rattachements.
- `data/annales.js` + `annales/` : anciens sujets PDF.
- `generators/` : generateurs offline.

## Etat fonctionnel

- Matieres : mathematiques, francais, histoire-geo EMC, sciences.
- Cours : 76.
- Exercices statiques : 428.
- Reponses ecrites : 92.
- Generateurs offline : 46.
- Sujets guides : 12.
- Notions : 33.
- Badges : 132 paliers, regroupes en 50 familles.

Fonctions presentes :

- page d'accueil minimale ;
- seance guidee avec cours puis 10/20/30 exercices ;
- exercices libres ;
- QCM, vrai/faux, remise en ordre, reponses ecrites ;
- correction immediate ;
- aide "Voir le cours" et "Je ne comprends pas" ;
- mini-series ciblees depuis les badges ;
- reprise d'erreurs avec 3 questions proches a reussir ;
- progression par matiere, historique, erreurs, bilan detaille ;
- anciens sujets avec PDF et saisie note /20 ;
- badges cliquables et sections repliables ;
- PWA installable et mode sombre.

## Priorites restantes V1

1. Continuer a equilibrer les reponses ecrites en francais et sciences.
2. Enrichir les cours les plus courts.
3. Verifier l'UX mobile PWA Android/iOS.
4. Tester l'app avec un vrai eleve faible et noter les incomprehensions.
5. Garder tous les fichiers `.md` courts.

## Regle de sauvegarde

Quand l'utilisateur demande une sauvegarde :

1. mettre a jour les fichiers `.md` utiles ;
2. verifier le code ;
3. commit ;
4. push `main` et `gh-pages`.
