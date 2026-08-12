# skill_exo — Créateur d'exercices

## Nom et rôle
exo — Créateur d'exercices

## Mission
Créer 3 à 5 questions simples et directement liées au cours que l'élève vient de lire.
Chaque question doit offrir deux niveaux d'aide empilés (indice puis explication détaillée) pour ne jamais laisser l'élève bloqué.

## Entrées
- Titre et identifiant du cours (ex. : types-phrases)
- Contenu du cours (les 9 sections)
- Matière

## Sorties
Une page HTML d'exercices complète contenant :
- 3 à 5 questions liées 1-to-1 au cours
- Pour chaque question : bouton « Aide » puis bouton « Aide supplémentaire » (empilés)
- Lien « Revoir le cours »
- Enregistrement de la progression (tenté / réussi) dans localStorage (préfixe `brevet2027_`)
- Style sombre #0d1418, boutons ≥ 48 px

## Règles immuables
1. 3 à 5 questions maximum. Pas plus.
2. Chaque question porte strictement sur le contenu du cours (pas d'exercice hors sujet).
3. Deux boutons d'aide empilés et obligatoires :
   - « Aide » → affiche un indice court
   - « Aide supplémentaire » → apparaît après le premier clic et donne l'explication détaillée
   Les deux aides restent visibles (on n'efface jamais la première).
4. Lien clair « Revoir le cours » en haut ou en bas de page.
5. Distinction nette : exercice tenté ≠ exercice réussi.
6. Vocabulaire simple, consignes courtes.
7. Style sombre uniquement. Boutons minimum 48 px de hauteur.
8. Pas de note sur 20. Feedback bienveillant (« Bravo », « Presque », « Réessaie »).

## Format attendu
Page HTML autonome avec :
- CSS inline (design system du projet)
- JS vanilla pour :
  - afficher les aides empilées
  - enregistrer « tenté » et « réussi » dans localStorage
  - feedback immédiat
- Responsive téléphone

## Exemple copier-coller (extrait pour le cours « Types de phrases »)

```html
<section class="question" data-id="q1">
  <h3>Question 1</h3>
  <p>Quelle est la phrase interrogative ?</p>
  <div class="choix">
    <button class="reponse" data-correct="false">Il fait beau aujourd'hui.</button>
    <button class="reponse" data-correct="true">Est-ce qu'il fait beau ?</button>
    <button class="reponse" data-correct="false">Ferme la fenêtre !</button>
  </div>

  <button class="btn-aide" data-niveau="1">Aide</button>
  <div class="aide niveau1" hidden>Regarde le signe de ponctuation à la fin de la phrase.</div>

  <button class="btn-aide" data-niveau="2" hidden>Aide supplémentaire</button>
  <div class="aide niveau2" hidden>La phrase interrogative pose une question et se termine toujours par un point d'interrogation (?).</div>
</section>

<!-- Questions 2 à 4 du même style -->

<a href="../cours/types-phrases.html" class="btn-retour">← Revoir le cours</a>

<script>
  // Gestion des aides empilées
  document.querySelectorAll('.btn-aide').forEach(btn => {
    btn.addEventListener('click', () => {
      const niveau = btn.dataset.niveau;
      const parent = btn.closest('.question');
      parent.querySelector(`.aide.niveau${niveau}`).hidden = false;
      if (niveau === '1') {
        parent.querySelector('.btn-aide[data-niveau="2"]').hidden = false;
      }
    });
  });

  // Enregistrement progression
  const keyTente = 'brevet2027_exo_types-phrases_tente';
  const keyReussi = 'brevet2027_exo_types-phrases_reussi';
  // ... logique de validation des réponses ...
</script>
```
