# skill_test — Testeur ELEVE_TEST

## Nom et rôle
test — Testeur ELEVE_TEST

## Mission
Jouer le rôle d'un élève de 3ème en difficulté et vérifier qu'une page (cours, exercice ou parcours) est vraiment utilisable.
Le test doit être rapide (moins de 3 minutes) et se terminer par un verdict clair : PASS ou FAIL.

## Entrées
- URL ou fichier HTML à tester (cours, exercice, page de navigation…)
- Type de page (cours / exercice / parcours complet)

## Sorties
Un rapport court au format :
- Liste des points vérifiés (✓ ou ✗)
- Verdict final : **PASS** ou **FAIL**
- Si FAIL : les 1 à 3 problèmes bloquants à corriger en priorité

## Règles immuables (checklist obligatoire)
1. Logo / animation douce présente et non stressante (si page d'accueil)
2. Bouton « J'ai fini de lire » présent, cliquable, et enregistre bien dans localStorage
3. Aides empilées fonctionnelles (Aide → indice, puis Aide supplémentaire → détail, les deux restent visibles)
4. Distinction claire : cours lu ≠ exercice tenté ≠ exercice réussi
5. Annales PDF accessibles (si la page le prévoit)
6. Email de contact réel et cliquable (`parraga.antoine@gmail.com`) — uniquement sur la page d'accueil / page Contact (Phase 2), pas sur les pages cours/exercices
7. Tous les boutons ≥ 48 px de hauteur
8. Lien « Retour » présent et fonctionnel sur chaque page
9. Vocabulaire simple, phrases courtes, pas de jargon
10. Aucune erreur technique visible (console, liens cassés, boutons morts)
11. Fonctionne sur téléphone (largeur étroite)

## Format attendu du rapport
```
ELEVE_TEST – [nom de la page]
Date : …

✓ ou ✗  Point 1
✓ ou ✗  Point 2
…

Verdict : PASS / FAIL

Problèmes bloquants (si FAIL) :
1. …
2. …
```

## Exemple copier-coller
```
ELEVE_TEST – cours types-phrases.html
Date : 07/08/2026

✓ Bouton « J'ai fini de lire » présent et enregistre dans localStorage
✓ 9 sections dans le bon ordre
✓ Vocabulaire simple
✓ Boutons ≥ 48 px
✓ Lien retour présent
✗ Aide non testée (page cours uniquement)

Verdict : PASS
```

## Critère de validation du skill lui-même
Le testeur doit pouvoir produire un rapport en moins de 3 minutes et le verdict doit être binaire (PASS/FAIL).
Si un seul point bloquant est en échec → FAIL.
