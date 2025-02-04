# API Lybrary

## Qu'est-ce que Lybrary ?

Lybrary est une API construite avec Go, Gin et MariaDB, permettant l'achat de livres en ligne. L'API gère deux types d'utilisateurs :

 Administrateurs : peuvent créer, modifier, supprimer et visualiser des catégories, auteurs, livres et utilisateurs
 Utilisateurs : peuvent créer un compte, acheter des livres, modifier leur profil et consulter les livres et les auteurs.

### Prérequis

 Go : Le langage utilisé pour l'API
 in : Le framework web utilisé pour gérer les routes
 MariaDB : La base de données utilisée pour stocker les données

### Installation

1. Installer Go :

   ```
   brew install go
   ```
2. Installer Gin :

Après avoir installé Go, vous pouvez installer Gin avec la commande suivante :
```
go
Copier le code
import (
    "github.com/gin-gonic/gin"
    "net/http"
)
```
3. Installer MariaDB :

```
brew install mariadb
```

### Route d'info:

Route "/api" : Affiche toutes les routes disponibles.

Route "/api/info/books" : Affiche toutes les routes relatives aux livres.

Route "/api/info/users" : Affiche toutes les routes relatives aux utilisateurs.

Route "/api/info/authors" : Affiche toutes les routes relatives aux auteurs.

Route "/api/info/purchase_history" : Affiche toutes les routes relatives aux achats.

### Routes de l'API

1. Connexion et Déconnexion:

POST /api/login : Permet de se connecter à un compte utilisateur.

Exemple de requête :


```
{
    "email": "user@example.com",
    "password": "1234"
}
```
POST /api/logout : Permet de se déconnecter.

2. Utilisateurs:

GET /api/users : Récupère tous les utilisateurs (admin voit tous les utilisateurs, utilisateur ne voit que son propre profil).

GET /api/users/:id : Récupère un utilisateur par son ID.

POST /api/users : Crée un utilisateur.

Exemple de requête :

```
{
    "first_name": "esteban",
    "last_name": "pla fortea",
    "email": "user@example.com",
    "password": "1234"
}
```

PUT /api/users/:id : Modifie un utilisateur par son ID.
PUT /api/users/admin/:id : Modifie un utilisateur par son ID et c'est permission.

Exemple de requête :

```
{
    "first_name": "esteban",
    "last_name": "pla fortea",
    "email": "newemail@example.com",
    "password": "newpassword",
    "admin": true
}
```

DELETE /api/users/:id : Supprime un utilisateur par son ID.

3. Auteurs:

GET /api/authors : Récupère tous les auteurs.

GET /api/authors/:id : Récupère un auteur par son ID.

POST /api/authors : Crée un auteur (accessible uniquement par un administrateur).

Exemple de requête :

```
{
    "first_name_author": "Oda",
    "last_name_author": "eishiro",
    "birth_day_date": "1903-06-25",
    "description": "Createur de one piece."
}

```
PUT /api/authors/:id : Modifie un auteur par son ID.

DELETE /api/authors/:id : Supprime un auteur par son ID.

4. Livres:

GET /api/books : Récupère tous les livres.

GET /api/books/:id : Récupère un livre par son ID.

POST /api/books : Crée un livre (accessible uniquement par un administrateur).

Exemple de requête :

```
{
    "title": "one piece",
    "author_id": 1,
    "release_date": "2000-06-08",
    "resum": "Une histoire de pirate.",
    "stock": 100,
    "price": 9.99
}
```

PUT /api/books/:id : Modifie un livre par son ID.

Exemple de requête :

```
{
    "title": "one piece",
    "author_id": 1,
    "release_date": "2000-06-08",
    "resum": "Histoirre de pirate",
    "stock": 100,
    "price": 12.99
}
```
DELETE /api/books/:id : Supprime un livre par son ID.

5. Historique des Achats:

GET /api/purchase_history : Récupère l'historique des achats (l'utilisateur ne voit que ses propres achats, l'admin voit tout).

GET /api/purchase_history/:id : Récupère un achat par son ID.

POST /api/purchase_history : Effectue un achat.

Exemple de requête :

```
{
    "book_id": 1,
    "quantity": 3
}
```
Sécurité:

Tous les mots de passe sont hachés avant d'être stockés dans la base de données. Même les administrateurs ne peuvent pas voir les mots de passe en clair.

Exemple d'utilisation avec Postman:

Vous pouvez tester les différentes routes de l'API avec Postman. Il est recommandé d'utiliser les formats de requêtes (raw) fournis dans cette documentation pour simplifier l'intégration.