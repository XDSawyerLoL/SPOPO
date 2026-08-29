SOPONOV PLAYER V3

Le lecteur est intégré au site.

POUR CONNECTER UN FILM :
1. Place le fichier vidéo dans public_html/media/
   Exemple : public_html/media/normal.mp4

2. Édite public_html/media/sources.json :
{
  "Normal": {
    "src": "/media/normal.mp4",
    "type": "video/mp4"
  }
}

Tu peux aussi utiliser une URL HTTPS vers un média que tu héberges ou que tu es autorisé à diffuser.

OPTIONS :
- MP4 / WebM via le navigateur
- HLS .m3u8 (natif ou via HLS.js)
- sous-titres WebVTT
- poster
- reprise de lecture locale
- PiP
- plein écran
- vitesse
- clavier : Espace/K, ←/→, M, F, P

EXEMPLE SOUS-TITRES :
{
  "Normal": {
    "src": "/media/normal.mp4",
    "poster": "/media/normal.jpg",
    "subtitle": "/media/normal-fr.vtt",
    "subtitleLang": "fr",
    "subtitleLabel": "Français"
  }
}
