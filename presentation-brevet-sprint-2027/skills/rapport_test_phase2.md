# Rapport ELEVE_TEST — Phase 2 (Interface de navigation)
Date : 08/08/2026

## Parcours testé
Accueil → Matières → Français → Cours → Exercice → Progression → Badges → Paramètres (réinitialisation) → Contact

## Pages créées
- `index.html` (racine) — accueil, logo flottant 🦉📖, slogan, 2 boutons (Accès matières, Me contacter)
- `matieres.html` — 4 matières, Français actif, 3 autres « Bientôt disponible »
- `matieres/francais/index.html` (mise à jour) — liste des 5 cours avec badge « Lu ✅ » dynamique
- `progression.html` — compteurs + détail par cours (cours lu / exercice tenté / exercice réussi)
- `badges.html` — bronze (1 réussi) / argent (3) / or (5), calculés depuis localStorage
- `parametres.html` — à propos + réinitialisation de la progression (confirmation inline, pas de dialogue navigateur natif)
- `contact.html` — email cliquable `mailto:parraga.antoine@gmail.com`

## Checklist ELEVE_TEST
✓ Logo animé sur l'accueil (flottement 3s)
✓ Exactement 2 boutons sur l'accueil
✓ Navigation matières → français → cours → exercice sans lien cassé
✓ Page Progression : distinction claire lu / tenté / réussi (vérifié avec 5/5 puis 0/5 après reset)
✓ Page Badges : bronze/argent/or corrects selon le nombre de réussites (3 débloqués à 5/5, reverifié à 0 après reset)
✓ Page Paramètres : bouton réinitialiser → confirmation inline → efface bien toutes les clés `brevet2027_*` (vérifié : 0 clé restante)
✓ Page Contact : email cliquable et correct
✓ Retour présent sur chaque page
✓ Boutons ≥ 48 px partout
✓ 0 erreur console sur tout le parcours
✓ Responsive mobile (390px) : accueil, matieres.html, matieres/francais/index.html, progression.html, badges.html, parametres.html, contact.html — aucun débordement, tout lisible (revérifié le 08/08/2026)

**Verdict : PASS**

## Écarts notés vs architecture cible (13-architecture.html)
- L'architecture cible prévoyait des pages génériques `chapitres.html` / `cours.html` et un dossier `cours1-nom/` : le projet réel utilise `matieres/francais/index.html` (liste à plat par matière) et des dossiers `types-phrases/` etc. sans préfixe `coursN-`. Choix pragmatique conservé pour rester cohérent avec les 5 cours déjà écrits — à trancher si on veut aligner strictement l'architecture plus tard.
- Un outil de génération existe (`outils/generer.js` + `contenu/francais/*.js`) mais seuls 3 des 5 cours français ont un fichier `contenu/` correspondant (fonctions et relatives ont été écrits à la main directement en HTML, comme les 3 premiers l'avaient été). Ne pas lancer `node outils/generer.js` sans mettre à jour `contenu/francais/` au préalable, sous peine d'écraser `matieres/francais/index.html` et de perdre les 2 cours manquants de la liste générée.
