# Source map courte

Ce fichier resume les sources utilisees pour construire les contenus de Brevet Sprint.

## Sources principales

- Anciens sujets officiels du DNB serie generale, France.
- Sujets et corriges Eduscol / Education nationale quand disponibles.
- Corriges et ressources APMEP pour les mathematiques.
- Baremes et corrections publics pour francais, histoire-geo EMC et sciences.
- Cours de niveau college utilises comme inspiration pedagogique.

## Usage dans l'app

Les sources servent a :

- construire des cours simples ;
- creer des exercices courts ;
- creer des reponses ecrites fermees ;
- creer des sujets guides ;
- proposer des anciens sujets complets en PDF.

Les PDF ne sont pas recopies dans les cours. Ils restent disponibles comme anciens sujets.

## Emplacement des contenus

- Cours/exercices : `data/content.js` et `data/extra-content-*.js`.
- Notions : `data/notions.js`.
- Anciens sujets : `data/annales.js` et `annales/`.
- Generateurs : `generators/`.

## Regles

- Brevet general uniquement.
- France uniquement.
- Pas brevet pro, CAP ou bac.
- Les corrections longues ne sont pas automatisees.
- Les reponses ecrites doivent rester corrigeables automatiquement.
