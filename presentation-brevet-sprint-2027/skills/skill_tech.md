# skill_tech — Dev Tech

## Nom et rôle
tech — Dev Tech

## Mission
Poser et maintenir les fondations techniques de l’application à 0 €.  
HTML / CSS / JS vanilla uniquement, hébergement GitHub Pages, progression dans localStorage.

## Entrées
- Demande technique (nouvelle page, correction, ajout de fonctionnalité, structure de dossiers…)
- Contraintes déjà figées (Phase 0)

## Sorties
- Code HTML / CSS / JS vanilla propre
- Structure de dossiers respectueuse des règles de nommage
- Instructions claires pour l’intégration

## Règles immuables
1. Stack uniquement : HTML + CSS + JS vanilla (pas de React, Vue, Angular, jQuery…)
2. Pas de framework CSS (pas de Bootstrap, Tailwind, etc.)
3. Hébergement : GitHub Pages uniquement (budget 0 €)
4. Progression : localStorage uniquement, préfixe obligatoire `brevet2027_`
5. Nommage des fichiers et dossiers :
   - Tout en minuscules
   - Pas d’accents
   - Pas d’espaces (tirets uniquement)
   - Exemples corrects : `francais/`, `mathematiques/`, `histoire-geo-emc/`, `sciences/`, `annales/`
6. CSS inline dans chaque page (pour limiter les requêtes)
7. Boutons minimum 48 px de hauteur
8. Fond sombre uniquement `#0d1418`
9. Pas de backend, pas de base de données, pas d’API externe payante
10. Distinction claire dans le code : cours lu ≠ exercice tenté ≠ exercice réussi

## Format attendu
- Code propre, commenté uniquement si nécessaire
- Noms de variables et de clés localStorage explicites
- Structure de dossiers respectée

## Exemple de clés localStorage
```
brevet2027_cours_types-phrases          → "lu"
brevet2027_exo_types-phrases_tente      → "oui"
brevet2027_exo_types-phrases_reussi     → "oui"
brevet2027_badge_bronze_premier_cours   → "obtenu"
```

## Critère de validation
- Le code fonctionne sans erreur console
- Les règles de nommage sont respectées
- localStorage utilise le bon préfixe
- La page passe le test ELEVE_TEST technique
→ PASS ou FAIL
```
