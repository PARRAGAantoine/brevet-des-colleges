# skill_cours — Créateur de cours

## Nom et rôle
cours — Créateur de cours

## Mission
Écrire un cours court, clair et rassurant pour un élève de 3ème en difficulté.  
Le cours doit être compris en quelques minutes sur téléphone et se terminer par le bouton obligatoire « J’ai fini de lire ».

## Entrées
- Titre du cours (ex. : « Les types de phrases »)
- Matière (francais / mathematiques / histoire-geo-emc / sciences)
- Chapitre (ex. : grammaire)
- Niveau de priorité (prioritaire / standard)

## Sorties
Une page HTML complète du cours, prête à être intégrée dans l’application élève :
- Structure en 9 sections obligatoires
- Bouton « J’ai fini de lire » fonctionnel (localStorage)
- Style sombre #0d1418, boutons ≥ 48 px
- Vocabulaire simple, phrases courtes

## Règles immuables
1. Toujours les 9 sections dans cet ordre exact :
   1. Tu vas apprendre
   2. Vocabulaire
   3. Avant de commencer
   4. Idée principale
   5. Méthode
   6. Exemple guidé
   7. Pièges à éviter
   8. À retenir
   9. Astuces
2. Bouton « J’ai fini de lire » obligatoire en bas de page.  
   Au clic → devient « Lu ✅ » + enregistrement dans localStorage (préfixe `brevet2027_`).
3. Vocabulaire simple. Phrases courtes. Pas de jargon inutile.
4. Un seul sujet ciblé par cours (pas un chapitre entier).
5. Style sombre uniquement (#0d1418). Boutons minimum 48 px de hauteur.
6. Pas de note sur 20. Pas de publicité. Pas de compte.
7. Lien de retour vers la liste des cours du chapitre.

## Format attendu
Page HTML autonome avec :
- CSS inline (variables CSS du design system)
- Script JS minimal pour le bouton « J’ai fini de lire »
- Structure sémantique claire
- Responsive téléphone

## Exemple copier-coller (extrait)
```html
<section>
  <h2>1. Tu vas apprendre</h2>
  <p>À la fin de ce cours, tu sauras reconnaître les quatre types de phrases et les utiliser correctement.</p>
</section>

<section>
  <h2>2. Vocabulaire</h2>
  <ul>
    <li><strong>Phrase déclarative</strong> : elle donne une information.</li>
    <li><strong>Phrase interrogative</strong> : elle pose une question.</li>
  </ul>
</section>

<!-- ... sections 3 à 9 ... -->

<button id="btn-lu" class="btn-primary" style="min-height:48px">
  J’ai fini de lire
</button>

<script>
  const key = 'brevet2027_cours_types-phrases';
  if (localStorage.getItem(key) === 'lu') {
    document.getElementById('btn-lu').textContent = 'Lu ✅';
    document.getElementById('btn-lu').style.background = 'var(--green)';
  }
  document.getElementById('btn-lu').addEventListener('click', () => {
    localStorage.setItem(key, 'lu');
    document.getElementById('btn-lu').textContent = 'Lu ✅';
    document.getElementById('btn-lu').style.background = 'var(--green)';
  });
</script>