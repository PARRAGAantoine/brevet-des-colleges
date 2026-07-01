# Cahier des charges et roadmap - Application de revision du brevet

## 1. Vision du projet

Créer une application offline de préparation au Diplôme national du brevet, série générale, France / Métropole.

L'application doit aider un eleve de 3e a reviser regulierement, avec des sessions courtes calibrees par nombre d'exercices, avec :

- des cours courts mais reels, structures et progressifs ;
- des exercices interactifs ;
- un suivi des points forts et faibles ;
- une progression lisible ;
- un système de motivation léger : points, streaks, badges, missions.

La priorité n'est pas de faire une application spectaculaire, mais une application réellement utile au quotidien.

Contexte important : l'élève passera le brevet en juin 2027. Il n'a donc pas encore vu tout le programme. L'application doit construire les notions progressivement, sans supposer que tous les cours sont déjà maîtrisés. Les cours affiches avant les exercices doivent donc etre suffisamment explicites pour apprendre une notion, pas seulement la rappeler.

## 2. Public cible

- Élève de 3e préparant le brevet général en France.
- Utilisation autonome à la maison.
- Niveau hétérogène : l'élève peut avoir des lacunes dans certaines matières.
- Sessions courtes, régulières, faciles à lancer.

## 3. Périmètre de la V1

La V1 doit être une application web offline en HTML, CSS et JavaScript, utilisable sur ordinateur, tablette et mobile.

Elle doit fonctionner sans serveur et sans compte utilisateur.

Les données de progression sont stockées localement dans le navigateur.

### Inclus dans la V1

- Tableau de bord quotidien.
- Fiches de révision courtes par matière.
- Quiz interactifs simples.
- Parcours progressif : découverte, consolidation, type brevet.
- Sessions courtes par nombre d'exercices, avec temps reel affiche au bilan.
- Système de points.
- Streak quotidien.
- Badges progressifs par chapitre, matiere et defi long terme.
- Suivi par matière et chapitre.
- Historique des sessions.
- Recommandation automatique d'une matière à travailler.

### Exclu de la V1

- Connexion utilisateur.
- Synchronisation cloud.
- Correction automatique de rédactions longues.
- IA embarquée.
- Notifications système natives.
- Application mobile installée via store.
- Génération automatique de nouveaux exercices par IA.
- Catalogue visible des annales en V1.

## 4. Matières couvertes

La V1 doit couvrir les matières principales du brevet général :

- Français ;
- Mathématiques ;
- Histoire-Géographie-EMC ;
- Sciences ;
- Technologie, quand les documents sont disponibles dans les annales de sciences.

## 5. Sources documentaires locales

L'application doit utiliser les documents déjà présents dans le dossier :

- annales officielles Éduscol ;
- sujets officiels Éducation nationale ;
- corrigés APMEP ;
- corrigés détaillés de mathématiques ;
- corrections et barèmes de français ;
- sujets / corrigés STI Éduscol.

Les PDF servent surtout de base documentaire pour créer les cours, exercices, corrections expliquées et entraînements type brevet. Ils ne sont pas destinés à être lus directement par l'élève dans la V1.

Le catalogue visible des annales est repoussé en V2, comme outil avancé ou mode "voir le sujet original".

## 6. Écrans principaux

### 6.1 Tableau de bord

Objectif : lancer rapidement une session de révision.

Contenu :

- streak actuel ;
- meilleur streak ;
- points totaux ;
- mission du jour ;
- matière recommandée ;
- objectif du jour en nombre de questions ;
- bouton "Commencer une session" ;
- accès rapide aux annales ;
- progression par matière.

### 6.2 Session quotidienne

Objectif : guider l'eleve sur une serie courte d'exercices coherents.

Déroulé recommandé :

1. Choix du format : courte, standard ou longue selon le nombre d'exercices.
2. Choix de la matière ou recommandation automatique.
3. Une fiche courte ou un rappel.
4. Une série de questions.
5. Bilan de fin de session.

### 6.3 Cours

Objectif : réviser une notion rapidement.

Chaque fiche doit contenir :

- titre ;
- matière ;
- chapitre ;
- notion ;
- explication courte ;
- exemple ;
- erreur fréquente ;
- mini-résumé ;
- prérequis ;
- niveau : découverte, consolidation ou type brevet ;
- bouton "S'entraîner".

### 6.4 Exercices

Types d'exercices V1 :

- QCM ;
- vrai / faux ;
- réponse courte contrôlée ;
- calcul numérique simple ;
- association ;
- remise en ordre.

Chaque exercice doit avoir :

- question ;
- matière ;
- chapitre ;
- niveau ;
- bonne réponse ;
- explication ;
- tags de compétences.

### 6.5 Parcours progressif

Objectif : accompagner l'élève jusqu'au brevet 2027 sans brûler les étapes.

Niveaux :

- Découverte : comprendre la notion avec des exemples simples.
- Consolidation : appliquer la notion dans des exercices guidés.
- Type brevet : utiliser la notion dans une question proche des annales.

Les exercices issus des annales doivent être reformulés si nécessaire pour être plus progressifs et pédagogiques.

### 6.6 Progression

Objectif : voir ce qui est maîtrisé ou fragile.

Indicateurs :

- taux de réussite global ;
- taux par matière ;
- taux par chapitre ;
- temps passé ;
- nombre de sessions ;
- jours actifs sur 7 jours ;
- jours actifs sur 30 jours ;
- erreurs fréquentes.
- erreurs à transformer : questions ratées qui peuvent être reprises uniquement après une fiche de révision liée.

Classification :

- fort : réussite supérieure ou égale à 80 % ;
- moyen : réussite entre 50 % et 79 % ;
- faible : réussite inférieure à 50 %.

### 6.7 Badges et motivation

Objectif : encourager sans infantiliser.

Badges V1 :

- Premier pas : première session terminée.
- Régulier : 3 jours actifs.
- Série solide : 7 jours actifs.
- Marathon brevet : 30 jours actifs.
- Mathématiques en forme : 20 questions de maths réussies.
- Français appliqué : 5 sessions de français.
- Sans faute : série d'exercices réussie sans erreur.
- Erreur réparée : revoir le cours lié à une erreur, puis réussir la question.
- Je corrige mes traces : réparer trois erreurs après révision.
- Rebond : terminer une session avec au moins une erreur, puis corriger une question ratée après révision.

Principe important : les badges de persévérance ne doivent pas récompenser un nouvel essai au hasard. Ils sont débloqués seulement si l'élève suit le cycle complet : erreur, correction expliquée, fiche de révision liée, nouvelle tentative, réussite.

Evolution appliquee : le systeme doit maintenant proposer beaucoup plus de badges, avec une difficulte progressive. Il ne faut pas que tous les badges puissent etre obtenus en quelques seances.

Familles attendues :

- badges de chapitre : bronze, argent, or ;
- badges de matiere : bronze, argent, or ;
- badges de regularite ;
- badges d'erreurs reparees ;
- badges de volume de questions ;
- badges de sujets guides ;
- badges rares de fin de parcours.

Évolution décidée pour les badges de progression :

- bronze = niveau Découverte validé sur une notion ;
- argent = niveau Consolidation validé sur une notion ;
- or = niveau Type brevet validé sur une notion.

Ces badges de progression par notion doivent rester séparés des badges de comportement : régularité, persévérance, erreurs réparées, volume de questions, streak.

## 7. Règles de points

Le système doit être motivant mais non punitif.

Points gagnés :

- pas de points simplement pour lancer une session ;
- points calcules sur les bonnes reponses et le travail termine ;
- +5 points par bonne réponse ;
- +10 points pour une série sans erreur ;
- +25 points pour une annale terminée ;
- +50 points pour 7 jours consécutifs ;
- +100 points pour 30 jours consécutifs.

Points perdus :

- pas de perte de points en V1 pour éviter l'effet démotivant ;
- un jour manqué casse seulement le streak ;
- un joker hebdomadaire peut protéger le streak une fois par semaine.

Option V2 :

- petite pénalité symbolique de -5 ou -10 points si l'élève rate plusieurs jours, mais jamais de score négatif.

## 8. Règles de streak

Une journée est validée si l'élève :

- termine une session courte, standard ou longue ;
- ou répond à au moins 10 questions ;
- ou termine une annale en mode entraînement.

Règles :

- une seule validation par jour ;
- si plusieurs sessions ont lieu le même jour, la meilleure compte ;
- un jour manqué casse le streak ;
- un joker peut éviter la casse une fois par semaine ;
- le meilleur streak est conservé.

## 9. Recommandation automatique

L'application recommande une matière ou un chapitre selon :

1. les chapitres faibles ;
2. les matières peu travaillées récemment ;
3. les erreurs fréquentes ;
4. les échéances de régularité ;
5. les notions encore au niveau découverte.

Règle simple V1 :

- si un chapitre est sous 50 %, il devient prioritaire ;
- sinon, choisir la matière la moins travaillée sur les 7 derniers jours ;
- sinon, proposer une question de consolidation ou un mini-sujet type brevet.

## 10. Modèle de données V1

### UserProgress

```json
{
  "points": 0,
  "currentStreak": 0,
  "bestStreak": 0,
  "lastActiveDate": null,
  "weeklyJokerUsed": false,
  "badges": [],
  "sessions": []
}
```

### Session

```json
{
  "id": "session_001",
  "date": "2026-06-29",
  "durationMinutes": 15,
  "mode": "daily",
  "subject": "mathematiques",
  "questionsAnswered": 12,
  "correctAnswers": 9,
  "pointsEarned": 95
}
```

### Exercise

```json
{
  "id": "math_001",
  "subject": "mathematiques",
  "chapter": "probabilites",
  "type": "qcm",
  "difficulty": 1,
  "question": "Quelle est la probabilité d'obtenir pile avec une pièce équilibrée ?",
  "choices": ["1/4", "1/2", "1", "2"],
  "answer": "1/2",
  "explanation": "Une pièce équilibrée a deux issues équiprobables : pile ou face."
}
```

### RevisionSheet

```json
{
  "id": "fr_grammaire_001",
  "subject": "francais",
  "chapter": "grammaire",
  "title": "Identifier la fonction d'un mot",
  "summary": "Une fonction indique le rôle d'un mot ou d'un groupe dans la phrase.",
  "example": "Dans 'Le chat dort', 'Le chat' est sujet du verbe 'dort'.",
  "commonMistake": "Ne pas confondre nature et fonction."
}
```

### Annale

```json
{
  "id": "annale_2025_math_juin",
  "year": 2025,
  "subject": "mathematiques",
  "session": "juin",
  "type": "epreuve",
  "path": "Documents supplementaires - Brevet general France/...",
  "hasCorrection": true
}
```

En V1, ce modèle reste interne. Il sert à tracer l'origine d'un exercice ou d'une fiche, mais il n'est pas obligatoirement affiché dans l'interface.

## 11. Architecture technique recommandée

### V1 simple

- `index.html`
- `styles.css`
- `app.js`
- `data/exercises.js`
- `data/revisionSheets.js`
- `assets/`

Stockage :

- `localStorage` pour la progression ;
- JSON statique pour les exercices et fiches ;
- références internes aux annales utilisées comme sources.

Avantages :

- très simple ;
- fonctionne offline ;
- facile à modifier ;
- pas besoin d'installation complexe.

Limites :

- pas de synchronisation ;
- progression liée au navigateur ;
- catalogue PDF à maintenir si les fichiers changent.

### V2 possible

- PWA installable ;
- IndexedDB ;
- import/export de sauvegarde ;
- profils locaux separes sur un meme appareil ;
- transfert de progression entre appareils par export/import ou code de sauvegarde ;
- reflexion sur une synchronisation multi-appareils avec compte eleve ;
- mode parent/professeur ;
- génération de rapports.

Point a etudier : la V1 stocke la progression dans le navigateur. Cela protege l'usage offline, mais un eleve qui travaille sur telephone, tablette et PC ne retrouve pas automatiquement ses badges et son historique. Il faudra donc choisir entre une solution simple et offline, comme export/import ou QR code de sauvegarde, et une vraie synchronisation en ligne avec comptes, base de donnees, securite et contraintes RGPD.

## 12. Roadmap

### Phase 1 - Fondation

Objectif : créer une app offline navigable.

Tâches :

- créer la structure HTML/CSS/JS ;
- créer la navigation principale ;
- créer le tableau de bord ;
- créer le stockage local ;
- créer le système de points de base ;
- créer le streak quotidien ;
- intégrer un petit jeu de données d'exercices.

Livrable :

- app utilisable localement ;
- première session de révision possible.

### Phase 2 - Contenus progressifs issus des annales

Objectif : transformer les annales en contenus pédagogiques utilisables.

Tâches :

- sélectionner les notions récurrentes des annales ;
- créer des fiches claires avec prérequis ;
- créer des exercices découverte / consolidation / type brevet ;
- ajouter des corrections expliquées ;
- garder une référence interne vers les PDF sources.

Livrable :

- première base de contenus vraiment exploitable par l'élève.

### Phase 3 - Exercices interactifs

Objectif : rendre l'entraînement quotidien utile.

Tâches :

- créer 20 à 30 exercices par matière pour commencer ;
- ajouter corrections immédiates ;
- enregistrer les réponses ;
- calculer réussite par matière et chapitre ;
- afficher les erreurs fréquentes.

Livrable :

- sessions quotidiennes avec vrai suivi.

### Phase 4 - Progression et recommandations

Objectif : personnaliser les révisions.

Tâches :

- tableau points forts / points faibles ;
- classement fort / moyen / faible ;
- recommandation automatique du jour ;
- historique des sessions ;
- graphique simple des 7 / 30 derniers jours.

Livrable :

- l'élève sait quoi travailler ensuite.

### Phase 5 - Gamification

Objectif : rendre l'app motivante sans la transformer en jeu vide.

Tâches :

- badges ;
- niveaux ;
- missions quotidiennes ;
- mission hebdomadaire ;
- animation de réussite ;
- message de fin de session.
- badges de persévérance conditionnés à une révision réelle avant de refaire une question ratée.
- objectif quotidien base sur une séance sans faute, et non sur un simple compteur de questions.
- si une erreur bloque l'objectif quotidien, l'eleve doit revoir le cours puis reussir plusieurs questions proches du meme type avant que l'erreur soit consideree comme reparee.
- les badges debloques doivent etre visibles immediatement dans l'interface, avec un signal graphique plus fort qu'un simple texte.

Livrable :

- boucle de motivation complète.

### Phase 6 - Amélioration du contenu

Objectif : enrichir la base pédagogique.

Tâches :

- ajouter plus de fiches ;
- ajouter plus d'exercices ;
- créer des parcours par chapitre ;
- ajouter des séries mixtes type brevet ;
- ajouter auto-évaluation guidée pour rédaction et développement construit.

Livrable :

- app plus complète et plus proche des vraies épreuves.

### Phase finale - Epreuve orale

Objectif : traiter l'oral du brevet uniquement quand l'application de revision des epreuves ecrites sera terminee et suffisamment complete.

Taches :

- definir une methode claire pour choisir et presenter un sujet ;
- creer des modeles de plans pour parcours, EPI, histoire des arts ou projet ;
- ajouter des entrainements chronometres ;
- proposer des questions possibles du jury ;
- ajouter une grille d'auto-evaluation simple.

Livrable :

- module oral ajoute a la toute fin, apres les cours, exercices, corrections, progression et gamification des epreuves ecrites.

## 13. Priorités UX

- L'élève doit pouvoir commencer une session en moins de 10 secondes.
- Ne jamais afficher trop d'informations à la fois.
- Les boutons importants doivent être gros et visibles.
- Les résultats doivent être encourageants, même en cas d'erreur.
- Les notions doivent être introduites clairement avant les questions type brevet.
- La progression doit être compréhensible sans jargon.
- Le design doit être coloré mais sérieux.

## 14. Risques à éviter

- Trop de fonctionnalités dès le départ.
- Trop de gamification punitive.
- Une application jolie mais sans contenu utile.
- Des corrections automatiques trop ambitieuses.
- Des exercices trop difficiles trop tôt.
- Des contenus qui supposent que tout le programme est déjà connu.
- Un suivi de progression incompréhensible.
- Une navigation trop profonde.
- Une dépendance à Internet.

## 15. Définition de réussite de la V1

La V1 est réussie si un élève peut :

1. ouvrir l'app sans Internet ;
2. voir sa mission du jour ;
3. faire une session courte ;
4. répondre à des exercices ;
5. voir ses corrections ;
6. gagner des points ;
7. faire progresser son streak ;
8. comprendre une notion nouvelle ;
9. voir ses points faibles ;
10. revenir le lendemain avec envie de continuer.

---

## Note de clarification - architecture actuelle

Le projet a beaucoup evolue depuis ce cahier des charges initial.

Ce document reste la reference pour la vision produit et la roadmap generale.

L'etat reel du projet, l'architecture actuelle, les fichiers, les generateurs offline, le schema universel des exercices et les prochaines priorites techniques sont decrits dans :

`Etat actuel et architecture - Application revision brevet.md`

---

## Convention de sauvegarde

Quand l'utilisateur demande de "sauvegarder" le projet, cela signifie :

1. mettre a jour tous les fichiers `.md` de pilotage et de contexte ;
2. verifier que le code passe les controles disponibles ;
3. verifier que les compteurs et l'etat du projet sont a jour ;
4. creer un point de sauvegarde clair ;
5. pousser le code sur GitHub si un depot Git et un remote GitHub sont configures.

Si le depot GitHub n'est pas encore configure, il faut le signaler clairement et faire au minimum une sauvegarde locale documentee.

## Priorite proche - Mise en ligne GitHub

Il faut rapidement mettre le projet en ligne sur GitHub pour :

- sauvegarder l'historique du code ;
- versionner les contenus et generateurs ;
- faciliter les retours d'autres IA ou contributeurs ;
- suivre les issues et idees ;
- pouvoir revenir en arriere si une evolution casse l'application.

Cette mise en ligne ne doit pas changer la contrainte principale : l'application doit rester utilisable offline.
