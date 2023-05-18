# todo-list
## Installation du projet
### Côté serveur (/apps/serveur)
<ins>Ajouter le fichier .env à la racine du serveur et compléter les informations suivantes :</ins> </br>
DB_URI=l'url de la base de données mongoDB </br>
DB_USER=Nom de l'utilsateur sur mongoDB</br>
DB_PASSWORD=Mot de passe de la bdd sur mongoDB</br>
JWT_SECRET=mysecretkey123</br></br>
Exécuter la commande __npm install__ à la racine du serveur
### Côté front (/apps/app)
<ins>Ajouter le fichier .env à la racine du front et compléter les informations suivantes :</ins> </br>
IP_ADDR_SERV=[adresse IP du serveur]</br></br>
Exécuter la commande __npm install__ à la racine du front
Exécuter la commande __npx cap sync__ dans le répertoire ./src-capacitor
## Démarrer le projet
Exécuter la commande __npm run dev__ sur le serveur (/apps/serveur) pour lancer le serveur sur votre PC
Exécuter la commande __npm run dev__ sur le front (/apps/app) pour lancer le front sur votre PC
Exécuter la commande __npx quasar -m capacitor -T [android/ios]__ sur le front (/apps/app) pour émuler l'application sur un smartphone
