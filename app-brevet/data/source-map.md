# Traçabilité des contenus pédagogiques

Ce fichier sert à garder le lien entre les annales récupérées et les cours/exercices créés dans l'application.

## Mathématiques

Sources utilisées :
- `2025 - Brevet general - Epreuve - Mathematiques.pdf`
- `Documents supplementaires - Brevet general France/Annales officielles Eduscol - Metropole/2024/2024 - Brevet general - Epreuve - Mathematiques - Metropole - Juin.pdf`
- `Documents supplementaires - Brevet general France/Mathematiques - APMEP - Metropole`

Notions transformées en contenus :
- probabilités avec urne ou roue ;
- statistiques : moyenne, médiane ;
- programmes de calcul et expressions ;
- fonctions : image et antécédent ;
- géométrie : Pythagore, Thalès, trigonométrie ;
- QCM type brevet.

## Français

Sources utilisées :
- `2025 - Brevet general - Epreuve - Francais - Sujet complet.pdf`
- `Documents supplementaires - Brevet general France/Annales officielles Eduscol - Metropole`
- `Documents supplementaires - Brevet general France/Francais - Corrections et baremes academiques (Nancy-Metz)`

Notions transformées en contenus :
- compréhension et justification par citation ;
- grammaire : nature, fonction, compléments ;
- réécriture avec changement de personne ;
- accords de dictée ;
- méthode de réponse courte.

## Histoire-Géographie-EMC

Sources utilisées :
- `2025 - Brevet general - Epreuve - Histoire-Geographie-EMC.pdf`
- `Documents supplementaires - Brevet general France/Annales officielles Eduscol - Metropole`

Notions transformées en contenus :
- analyse de document ;
- espace productif industriel ;
- repères ;
- développement construit ;
- valeurs de la République.

## Sciences et technologie

Sources utilisées :
- `2025 - Brevet general - Epreuve - Sciences.pdf`
- `Documents supplementaires - Brevet general France/Annales officielles Eduscol - Metropole`
- `Documents supplementaires - Brevet general France/Sciences-Technologie - STI Eduscol - Metropole`

Notions transformées en contenus :
- lecture de graphiques et tableaux ;
- photosynthèse et production de matière organique ;
- expérience avec facteur testé ;
- pH ;
- masse volumique ;
- capteurs, conditions et algorithmes.

## Règle de création

Les contenus de l'app ne recopient pas les annales. Ils transforment les compétences récurrentes en exercices progressifs :

1. découverte ;
2. consolidation ;
3. type brevet.

## Diversification ajoutée

Le fichier `extra-content.js` ajoute des mini-cours et exercices courts pour éviter la répétition :

- calculs, pourcentages, proportionnalité, équations, aires, volumes, échelles ;
- homophones, accords, participe passé, figures de style, point de vue, rédaction ;
- guerres mondiales, guerre froide, décolonisation, aires urbaines, citoyenneté ;
- cellule, microorganismes, circuits électriques, vitesse, chaîne d'information.

Ces contenus restent alignés avec les compétences vues dans les annales, mais sont reformulés en entraînements courts.

## Diversification supplementaire 2027

Le fichier `extra-content-2.js` ajoute un second lot de cours et d'exercices pour un eleve qui passera le brevet en juin 2027 et qui n'a pas encore vu tout le programme.

Axes ajoutes :

- mathematiques : puissances, calcul litteral, equations, vitesse, Thales, tableur, probabilites, statistiques, volumes ;
- francais : COD/COI, phrase complexe, valeurs des temps, connecteurs, accords, narrateur, reecriture ;
- histoire-geographie-EMC : regimes totalitaires, Resistance, guerre froide, construction europeenne, espaces de faible densite, periurbanisation, mondialisation, amenagement, laicite, citoyennete, defense ;
- sciences et technologie : ADN, pH, energie, circuits, immunite, boucles, fonctions d'usage, capteurs.

Le but est de multiplier les questions courtes, avec correction immediate, pour eviter que l'eleve ait l'impression de refaire toujours les memes exercices.

## Diversification ciblee - etape 1

Le fichier `extra-content-3.js` ajoute un lot d'exercices courts pour renforcer les chapitres encore peu couverts : algorithmique/tableur, calcul litteral, equations, grandeurs, lecture, redaction, analyse de document, developpement construit, geographie, EMC, donnees scientifiques et technologie.

Objectif de cette etape : augmenter la variete sans changer encore le moteur d'exercices, afin de consolider la base avant les formats longs et les parcours hebdomadaires.

## Cours structures - etape 2

Les rappels courts ont ete transformes en cours guides affiches dans les sessions, l'onglet Cours et la revision d'erreurs.

Structure ajoutee a chaque cours :

- introduction de la notion ;
- explication plus developpee ;
- methode pas a pas ;
- exemple guide ;
- prerequis ;
- point a retenir ;
- piege frequent ;
- question de verification.

Ces cours restent rediges pour l'application, sans copie de cours externes. Ils s'inspirent des attendus du DNB, des programmes de cycle 4 et de ressources de revision gratuites comme Eduscol et Lumni.

## Exercices longs guides - etape 3

Le fichier `extra-content-4.js` ajoute des sujets longs guides, a faire sur cahier avec une grille d'auto-evaluation dans l'application.

Contenus ajoutes :

- 3 sujets de francais : redaction, reecriture, lecture/interpretation ;
- 3 sujets de mathematiques : probleme de vitesse, geometrie, fonctions ;
- 3 sujets d'histoire-geographie-EMC : developpement construit, analyse de document, laicite ;
- 3 sujets de sciences/technologie : graphique, chaine energetique, systeme automatique.

Objectif : preparer les formats qui ne peuvent pas etre corriges automatiquement comme un QCM, tout en donnant une methode, des attendus et une auto-evaluation simple.

## Coherence cours-exercices - etape 4

Le moteur de session a ete corrige pour choisir une notion de cours, puis proposer uniquement des exercices du meme chapitre ou d'un chapitre correspondant.

Correction importante : une session de mathematiques sur les probabilites ne doit plus enchainer ensuite avec mediane ou triangle rectangle. Le meme principe s'applique a toutes les matieres.

Le fichier `extra-content-5.js` ajoute un lot d'exercices supplementaires pour densifier les notions trop courtes : probabilites, equations, grandeurs, tableur/algorithmique, lecture et langue, reecriture, redaction, citoyennete, mondialisation, valeurs de la Republique, donnees scientifiques, SVT et technologie.

## Correctifs UX - QCM et badges

Deux corrections importantes ont ete ajoutees :

- les choix des QCM sont maintenant melanges a l'affichage pour que la bonne reponse ne soit pas toujours en premiere position ;
- les badges ont un design plus lisible, avec un etat debloque plus valorisant et un etat a gagner plus distinct.

La correction des QCM reste fiable car chaque bouton garde la valeur reelle de la reponse, meme apres melange visuel.

## Architecture generateurs offline - etape 5

L'application conserve les 194 exercices statiques deja crees comme banque validee, puis ajoute une architecture de generation offline.

Ajouts :

- `data/notions.js` : registre de notions avec prerequis, type de contenu, chemin de cours et generateurs associes ;
- `data/schema.md` : schema universel pour exercices statiques et generes ;
- `generators/registry.js` : registre de generateurs, seeds, melange et helpers ;
- `generators/math-calcul.js` : premiers generateurs mathematiques ;
- `generators/science-calcul.js` : premier generateur physique-chimie ;
- `tools/validate-content.js` : validation locale des contenus et generateurs.

Principe : les sessions peuvent maintenant melanger exercices existants et variantes generees, tout en gardant un seul format d'exercice. Les erreurs sur exercices generes stockent `generatorId` et `seed` pour pouvoir reconstruire la meme question.

## Registre de notions et liaison notionId - etape 6

Le fichier `data/notions.js` a ete etendu pour couvrir les 33 chapitres utilises par les contenus actuels.

Les contenus existants sont maintenant relies automatiquement a une notion stable :

- cours ;
- exercices statiques ;
- sujets guides.

Le validateur controle desormais qu'un `notionId` existe et correspond a une notion connue. Cette etape prepare le choix manuel de notion, les prerequis et les futurs generateurs par notion.

## Convention de sauvegarde

Une demande utilisateur de "sauvegarde" signifie que les fichiers `.md` doivent etre remis a jour, que les validateurs doivent etre executes, et que le code doit etre pousse sur GitHub si le depot distant existe.

Etat actuel : le dossier n'est pas encore un depot Git configure. Tant que GitHub n'est pas configure, la sauvegarde doit etre locale et documentee.

## Generateurs mathematiques - etape 7

Un nouveau lot de generateurs mathematiques offline a ete ajoute.

Generateurs ajoutes :

- simplification de fractions ;
- addition de fractions de meme denominateur ;
- puissances de 10 ;
- priorites operatoires ;
- proportionnalite ;
- fonctions : image ;
- fonctions : antecedent ;
- Pythagore : calcul de longueur ;
- reciproque de Pythagore ;
- Thales ;
- trigonometrie : cosinus.

Le nombre total de generateurs offline passe de 9 a 20.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 400 exercices generes : 0 reponse absente des choix.

Le serveur local n'etait pas actif au moment du controle HTTP, mais les validations Node sont passees.

## Generateurs sciences et technologie - etape 8

Un nouveau lot de generateurs offline a ete ajoute pour les sciences et la technologie.

Generateurs ajoutes :

- pH : acide, neutre, basique ;
- chaine energetique ;
- circuit electrique ouvert ou ferme ;
- mouvement et vitesse moyenne ;
- SVT : facteur teste dans une experience ;
- technologie : distinguer capteur et actionneur.

Le nombre total de generateurs offline passe de 20 a 26.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 650 exercices generes : 0 reponse absente des choix.

Le serveur local n'etait pas actif au moment du controle HTTP, mais les validations Node sont passees.

## Generateurs francais - etape 9

Un nouveau lot de generateurs offline a ete ajoute pour le francais.

Generateurs ajoutes :

- grammaire : trouver le sujet ;
- grammaire : distinguer COD et COI ;
- orthographe : homophones a/as/a accent ;
- orthographe : homophones et/est ;
- orthographe : accord dans le groupe nominal ;
- reecriture : changement de pronom ;
- reecriture : changement de temps ;
- lecture et langue : valeur des temps du recit.

Le nombre total de generateurs offline passe de 26 a 34.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 850 exercices generes : 0 reponse absente des choix.

## Generateurs complementaires et cours enrichis - etape 10

Un nouveau lot de generateurs offline a ete ajoute pour densifier les notions encore trop peu couvertes.

Generateurs ajoutes :

- mathematiques : developper une expression litterale ;
- mathematiques : factoriser une expression litterale ;
- mathematiques : evaluer une expression litterale ;
- mathematiques : calculer une mediane ;
- mathematiques : convertir une grandeur ;
- mathematiques : calculer le volume d'un pave droit ;
- sciences : lire un graphique ;
- sciences : lire un tableau de donnees ;
- SVT : identifier un critere de classification ;
- SVT : heredite et variation ;
- technologie : effet d'une boucle dans un algorithme ;
- technologie : distinguer fonction d'usage et solution technique.

Le nombre total de generateurs offline passe de 34 a 46.

Les cours affiches avant exercice ont ete enrichis par familles de notions : statistiques, calcul litteral, equations, geometrie, SVT, physique-chimie et technologie.

Validation effectuee :

- `node tools\validate-content.js` : OK ;
- echantillon de 1380 exercices generes : 0 reponse absente des choix.

## Refonte visuelle des badges - etape 11

La vue Badges a ete retravaillee pour mieux montrer la progression :

- etat "A gagner" en rendu plat, gris et non 3D ;
- paliers debloques prepares en bronze, argent et or ;
- medaille CSS offline avec rayons, bouclier et ruban ;
- objectif affiche sur le ruban : sessions, jours, points, questions, reussites ou erreurs reparees ;
- grille responsive : 3 colonnes desktop, 2 colonnes tablette, 1 colonne mobile.

Validation effectuee :

- `node --check app.js` : OK ;
- `node tools\validate-content.js` : OK ;
- controle navigateur local sur `http://127.0.0.1:4174/` : 14 cartes badges, 14 medailles, aucune erreur console.

## Mise en ligne GitHub - etape 12

Le projet a ete publie sur GitHub :

```txt
https://github.com/PARRAGAantoine/brevet-des-colleges
```

GitHub Pages est configure avec le workflow `.github/workflows/pages.yml`.

URL publique de l'application :

```txt
https://parragaantoine.github.io/brevet-des-colleges/
```

Les PDF d'annales, les documents supplementaires et les sauvegardes locales restent exclus du depot via `.gitignore`.

## Decision a etudier - progression multi-appareils

La progression actuelle est stockee dans `localStorage`, donc elle reste locale au navigateur.

Point a traiter plus tard :

- profils locaux pour plusieurs utilisateurs sur un meme appareil ;
- export/import ou QR code de sauvegarde pour transferer manuellement une progression ;
- eventuelle synchronisation en ligne avec compte eleve, a cadrer en V2 avec backend, securite et RGPD.
