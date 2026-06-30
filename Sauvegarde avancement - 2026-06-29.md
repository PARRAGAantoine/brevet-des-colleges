# Sauvegarde avancement - 2026-06-29

## Etat general

Le projet est une application offline HTML/CSS/JS pour preparer le Diplome national du brevet, serie generale, en France, avec une cible d'examen en juin 2027.

L'application est dans le dossier :

```txt
app-brevet/
```

## Etat valide

Validation executee :

```powershell
cd app-brevet
node tools\validate-content.js
```

Resultat au moment de cette sauvegarde :

```txt
Matieres : 4
Cours : 66
Exercices statiques : 194
Sujets guides longs : 12
Notions referencees : 33
Generateurs offline : 46
Erreurs de validation : 0
```

## Avancement principal

Fonctionnalites presentes :

- app offline fonctionnelle ;
- tableau de bord ;
- parcours par chapitre ;
- statut "pas encore vu" ;
- sessions guidees ;
- cours avant exercices ;
- coherence cours -> exercices ;
- exercices QCM avec correction immediate ;
- reponses QCM melangees ;
- revision des erreurs ;
- progression locale ;
- badges redesignes ;
- sujets guides longs ;
- auto-evaluation ;
- registre de notions ;
- generateurs JS offline ;
- validation automatique des contenus.

## Architecture importante

Fichiers de pilotage :

- `Cahier des charges et roadmap - Application revision brevet.md` ;
- `Etat actuel et architecture - Application revision brevet.md` ;
- `Contexte pour IA externe - Application revision brevet.md` ;
- `app-brevet/data/schema.md` ;
- `app-brevet/data/source-map.md`.

Fichiers techniques importants :

- `app-brevet/app.js` ;
- `app-brevet/data/content.js` ;
- `app-brevet/data/extra-content.js` a `extra-content-5.js` ;
- `app-brevet/data/notions.js` ;
- `app-brevet/generators/registry.js` ;
- `app-brevet/generators/math-calcul.js` ;
- `app-brevet/generators/science-calcul.js` ;
- `app-brevet/tools/validate-content.js`.

## Travail recent termine

Dernieres avancees importantes :

- extension du registre de notions de 11 a 33 notions ;
- liaison automatique des cours, exercices et sujets guides a un `notionId` ;
- validation renforcee pour refuser les contenus sans notion connue ;
- documentation de la convention de sauvegarde ;
- creation du fichier de contexte pour IA externe ;
- clarification que GitHub doit etre mis en place rapidement.

## Convention de sauvegarde

Dans ce projet, quand l'utilisateur demande de "sauvegarder", cela signifie :

1. mettre a jour tous les fichiers `.md` de pilotage, contexte, schema et tracabilite ;
2. executer les validations disponibles ;
3. verifier la syntaxe des fichiers JS modifies ;
4. documenter l'avancement ;
5. creer un point de sauvegarde local ou Git ;
6. pousser sur GitHub si un depot distant est configure.

## Etat GitHub

Etat actuel :

```txt
Le dossier local est maintenant un depot Git.
Branche locale : main.
Remote GitHub : https://PARRAGAantoine@github.com/PARRAGAantoine/brevet-des-colleges.git
Push GitHub effectue vers origin/main.
```

Consequence :

- un commit local existe ;
- la branche locale `main` suit `origin/main` ;
- il faudra probablement eviter de pousser les annales PDF et fichiers volumineux/proteges, sauf decision explicite.

## Prochaine priorite conseillee

Priorite immediate :

1. initialiser/configurer Git ;
2. definir ce qui doit etre versionne ou ignore ;
3. creer le depot GitHub ;
4. faire le premier commit propre ;
5. pousser le projet.

Priorite fonctionnelle ensuite :

- ajouter le choix manuel de notion dans les sessions ;
- exploiter les prerequis ;
- ajouter de nouveaux generateurs par notion ;
- enrichir les cours.

## Mise a jour etape 10 - generateurs et cours

Avancement ajoute :

- 12 generateurs offline complementaires ;
- total actuel : 46 generateurs offline ;
- nouveaux generateurs en calcul litteral, statistiques, grandeurs, geometrie, donnees scientifiques, SVT et technologie ;
- cours courts enrichis pour statistiques, calcul litteral, equations, geometrie, SVT, physique-chimie et technologie.

Validation executee :

- `node --check app.js` : OK ;
- `node --check generators\math-calcul.js` : OK ;
- `node --check generators\science-calcul.js` : OK ;
- `node --check data\notions.js` : OK ;
- `node tools\validate-content.js` : OK ;
- echantillon de 1380 exercices generes : 0 anomalie detectee.
