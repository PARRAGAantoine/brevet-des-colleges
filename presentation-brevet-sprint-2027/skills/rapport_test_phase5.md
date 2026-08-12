# Rapport ELEVE_TEST — Phase 5 (Mode Aventure)
Date : 08/08/2026

## Ce qui a été produit
- `aventure.html` — carte des 4 royaumes (Français = Royaume des Lettres, Maths = Royaume des Nombres, Histoire-Géo-EMC = Royaume du Temps, Sciences = Royaume des Éléments), avec barre de progression par royaume, streak (torche 🔥, incrémentée un jour après l'autre via `brevet2027_streak_dernier_jour`/`brevet2027_streak_compte`), et PNJ (🦉) au message adapté à la progression.
- `aventure-donjon.html?royaume=<slug>` — vue donjon d'une matière : chapitres = salles, chaque cours affiche 🔑/🔒 (clé = cours lu) et 📦/🗝️ (coffre = exercice réussi), boss « Brevet Blanc » en bas de chaque donjon reliant vers les vraies annales PDF de la matière.
- `inventaire.html` — total clés/coffres + loot (bois 5, argent 15, légendaire 31 coffres, mêmes seuils que les badges classiques, juste reflavorés).
- Interrupteur : lien « 🗺️ Mode Aventure » ajouté sur `matieres.html`, `progression.html`, `badges.html`, `parametres.html` ; lien « ↩ Mode classique » sur les pages Aventure. **L'accueil (`index.html`) n'a pas été touché** pour préserver strictement la règle des 2 boutons.
- Aucune donnée séparée : tout repose sur les mêmes clés localStorage `brevet2027_cours_*` / `brevet2027_exo_*` que le mode calme → progression garantie partagée.

## Vérifications en direct
✓ Carte des royaumes : 4 royaumes, compteurs corrects, streak affiché (1 jour), 0 erreur console
✓ Donjon Français : 10 cours chapitre 1 + 3 cours chapitre 2 affichés, clé/coffre verrouillés par défaut
✓ Après avoir marqué un cours lu+réussi en localStorage : clé et coffre se débloquent visuellement dans le donjon, sans recharger de logique custom (même clé que le mode calme)
✓ Boss « Brevet Blanc » → ouvre bien `matieres/francais/annales/index.html`
✓ Inventaire : 1/31 clés et 1/31 coffres reflétés correctement, loot verrouillé (seuil 5 non atteint)
✓ **Mode calme vérifié intact** : `index.html` toujours à 2 boutons exactement, `matieres/francais/index.html` affiche bien « Lu ✅ » sur le cours marqué via le mode Aventure → progression bien partagée entre les deux modes
✓ 0 lien cassé sur 79 pages (vérification automatique, y compris les hrefs avec `?query`)
✓ Progression réinitialisée en fin de test

**Verdict : PASS.**

## Choix de conception
- Pure CSS/JS vanilla, pas de `phaser.min.js` (option laissée ouverte par la Phase 5 mais non nécessaire ici — évite une dépendance externe pour un jeu aussi simple).
- Une seule page `aventure-donjon.html` paramétrée par `?royaume=` plutôt que 4 pages dupliquées, pour limiter la duplication de code (cohérent avec le style déjà pratiqué : générateur interne en Phase 3/4).
