SOPONOV — PACKAGE HOSTINGER

INSTALLATION
1. Dans hPanel Hostinger > Sites web > Gestionnaire de fichiers.
2. Ouvrir le dossier public_html.
3. Sauvegarder/supprimer l'ancien contenu de public_html.
4. Envoyer le CONTENU de ce ZIP dans public_html (pas le dossier parent).
5. Vérifier que .htaccess est bien présent dans public_html.
6. Ouvrir votre domaine.
7. L'ancienne URL /35nn2mp44mk/home/soponov fonctionne aussi grâce au routage .htaccess.

CONTENU
- index.html : application Soponov
- assets/app.css : interface
- assets/app.js : catalogue, recherche, genres, tendances
- data/catalog.json : catalogue public reconstruit
- .htaccess : compatibilité Hostinger + anciennes routes

IMPORTANT
Cette archive est une reconstruction autonome de la partie publique visible du site.
Le backend original, la base de données privée, les secrets serveur et le système de
lecture vidéo de l'ancien hébergement ne peuvent pas être récupérés depuis le HTML public
et ne sont donc pas inclus.

Ce ZIP peut être uploadé tel quel sur un hébergement Hostinger Apache/LiteSpeed.
