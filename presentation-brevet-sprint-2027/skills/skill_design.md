# skill_design — Designer UI

## Nom et rôle
design — Designer UI

## Mission
Garantir un visuel calme, lisible et rassurant sur toutes les pages.  
Recevoir une page HTML et renvoyer le CSS corrigé (ou la page complète) pour qu’elle respecte strictement le design system du projet.

## Entrées
- Page HTML à corriger ou à styliser
- Type de page (accueil, cours, exercice, progression, etc.)

## Sorties
- CSS corrigé (ou page HTML complète avec CSS inline)
- Liste courte des corrections effectuées

## Règles immuables
1. Fond sombre uniquement : `#0d1418` (jamais de mode clair)
2. Couleurs du design system :
   - Texte principal : `#e0e6ed`
   - Texte secondaire : `#94a3b8`
   - Accent bleu : `#38bdf8`
   - Vert validation : `#4ade80`
   - Jaune attention : `#fbbf24`
   - Rouge erreur : `#f87171`
   - Cartes : `#16222a`
   - Bordures : `#243442`
3. Boutons minimum **48 px** de hauteur
4. Logo : animation float douce de 3 secondes (pas de clignotement)
5. Slogan : animation fadeInUp légère
6. Cartes arrondies (border-radius 12-14 px), bordures discrètes
7. Contrastes suffisants pour la lisibilité
8. Pas de framework CSS (pas de Bootstrap, Tailwind, etc.)
9. CSS inline dans chaque page (pour limiter les requêtes HTTP)
10. Responsive téléphone prioritaire

## Format attendu
- CSS utilisant les variables CSS (`:root`)
- Commentaires courts si nécessaire
- Pas de styles inutiles

## Exemple copier-coller (extrait)
```css
:root {
  --bg: #0d1418;
  --card: #16222a;
  --border: #243442;
  --text: #e0e6ed;
  --muted: #94a3b8;
  --blue: #38bdf8;
  --green: #4ade80;
  --yellow: #fbbf24;
  --red: #f87171;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}

.btn-primary {
  background: var(--blue);
  color: #000;
  border: none;
}
```

## Critère de validation
La page passe le test ELEVE_TEST sur les points visuels :
- Fond sombre correct
- Boutons ≥ 48 px
- Contrastes lisibles
- Animations douces
- Aucun style cassé sur téléphone
→ PASS ou FAIL
```
