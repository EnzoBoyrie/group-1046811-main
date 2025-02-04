
# Groupe de moules_g et plafor_e 1044740
# API achat de livre (Lybrary)

## Qu'est-ce que Lybrary ?

Lybrary est une API faite en GO, GIN et Maria_DB, qui permet l'achat de livres. Tout est fait avec une gestion administrateur et utilisateur. Les administrateurs peuvent voir, créer, modifier et supprimer les catégories, les auteurs, les livres et les utilisateurs qui sont dans l'API. Les utilisateurs, eux, peuvent se créer un compte pour pouvoir réaliser des achats tout en pouvant voir les livres et auteurs pour effectuer leur achat. S'ils veulent modifier leur profil, c'est possible tout comme le supprimer.

Pour pouvoir utiliser cette API, il est obligatoire de se connecter (sauf pour créer un utilisateur ou bien pour les routes info).

Pour tester cette API, il est recommandé d'utiliser Postman, car les raw sont fournis dans cette documentation.

Voici l'exemple de la route compléte:

"http://localhost:3001/api/login"

## Comment installer ?


On comance par instaler go: 

"brew install go"

En suit on instal gin:

1. Vous devez d'abord  installer Go Language. Ensuite, vous pouvez utiliser la commande Go ci-dessous pour installer Gin. 

"go get -u github.com/gin-gonic/gin"

2. Importez-le dans votre code : 

"import "github.com/gin-gonic/gin""

3.  Importez net/http. C'est indispensable, par exemple, en utilisant des constantes telles que http StatusOK. 

import "net/http"


En suit on instal mariadb:

"brew install mariadb"


Pour finire on ajoute la database avec c'est table :

```
CREATE DATABASE Library;

 USE library;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK( 
    email LIKE '%@%.%'),
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE 
);

CREATE TABLE Author (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name_author VARCHAR(100) NOT NULL,
    last_name_author VARCHAR(100) NOT NULL,
    birth_day_date DATE,
    description TEXT
);

CREATE TABLE Book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    release_date DATE,
    resum TEXT,
    stock INT DEFAULT 0,
    price DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Author(id)
);


CREATE TABLE Purchase_history (
id INT PRIMARY KEY AUTO_INCREMENT, 
user_id INT, 
book_id INT, 
quantity INT, 
price_total DECIMAL(10,2), 
purchase_date DATETIME 
);

```

## Comment naviguer dans l'API ?

### Pour ce faire, les routes info :

La route "/api" vous montre directement toutes les routes que vous pouvez réaliser.

La route "/api/info/books" vous montre directement toutes les routes que vous pouvez réaliser concernant les livres.

La route "/api/info/users" vous montre directement toutes les routes que vous pouvez réaliser concernant les utilisateurs.

La route "/api/info/authors" vous montre directement toutes les routes que vous pouvez réaliser concernant les auteurs.

La route "/api/info/purchase_history" vous montre directement toutes les routes que vous pouvez réaliser concernant les achats.

### Ce qui est réalisable dans l'API avec les routes :

#### La connexion à son compte :

Pour pouvoir utiliser cette API, il est obligatoire de se connecter (sauf pour créer un utilisateur). Voici les routes de connexion :

Cette route est un POST "/api/login", elle permet de se connecter à son profil.

Voici le raw pour se connecter à son compte :

```json
{
    "email": "*@*.*",
    "password": "1234"
}

```

---

Cette route est un POST "/api/logout", elle permet de se déconnecter de son profil.



#### Pour les utilisateurs :


Cette route est un GET "/api/users", elle permet de voir tous les utilisateurs dans la base de données, que ce soit en admin ou en utilisateur.

Si vous êtes juste un utilisateur, vous verrez uniquement votre profil. Si vous êtes admin, vous verrez les profils de tout le monde.


---

Cette route est un GET "/api/users/:id", elle permet de chercher un utilisateur avec son id dans la base de données, que ce soit en admin ou en utilisateur. Pour ce faire, ajoutez à la place de (:id) l'id de l'utilisateur que vous voulez voir.

Si vous êtes juste un utilisateur, vous verrez uniquement votre profil. Si vous êtes admin, vous verrez les profils de tout le monde.

---

Cette route est un POST "/api/users", elle permet de créer un compte utilisateur dans la base de données. Cette commande est accessible aux utilisateurs et aux administrateurs.

Il faut tout de même savoir que si vous êtes le premier utilisateur de la base de données, vous aurez automatiquement le grade d'administrateur, et qu'il est impossible de créer un compte directement en admin.

Information supplémentaire : tous les mots de passe mis dans la base de données seront hashés, donc illisibles pour n'importe quel utilisateur, même par les administrateurs.

Voici le raw pour créer un utilisateur :

```json
{
    "first_name": "Ici le prénom de l'utilisateur",
    "last_name": "Ici le nom de l'utilisateur",
    "email": "*@*.*",
    "password": "1234"
}
```

---

Cette route est en PUT "/api/users/admin/:id" elle permet de modifier des utilisateurs dans la base de données. Cette commande est accessible aux administrateurs.

Informations supplémentaires : tous les mots de passe mis à jour dans la base de données seront tout de même hachés, donc illisibles pour n'importe quel utilisateur, même par les administrateurs. Si vous ne mettez rien dans le mot de passe, l'ancien mot de passe sera rétabli.

Dans cette commande, on gère les permissions d'administrateur.

Voici le format RAW pour modifier un utilisateur :

```json
{
 "first_name": "Ici le prénom de l'utilisateur à modifier",
 "last_name": "Ici le nom de l'utilisateur à modifier",
 "email": "*@*.*", // (l'email à modifier est toujours sous la forme suivante "*@*.*" les * sont des caractères)
 "password": "1234", // (Ici le mot de passe qui sera haché à modifier)
 "admin": true // (Ici on spécifie si on veut que l'utilisateur soit admin (true) ou juste utilisateur (false))
}
```


---

Cette route est en PUT "/api/users/:id" elle permet de modifier des utilisateurs dans la base de données. Cette commande est accessible aux utilisateurs et aux administrateurs.

Informations supplémentaires : tous les mots de passe mis à jour dans la base de données seront tout de même hachés, donc illisibles pour n'importe quel utilisateur, même par les administrateurs. Si vous ne mettez rien dans le mot de passe, l'ancien mot de passe sera rétabli.

Voici le format RAW pour modifier un utilisateur :

```json
{
 "first_name": "Ici le prénom de l'utilisateur à modifier",
 "last_name": "Ici le nom de l'utilisateur à modifier",
 "email": "*@*.*", // (l'email à modifier est toujours sous la forme suivante "*@*.*" les * sont des caractères)
 "password": "1234" // (Ici le mot de passe qui sera haché à modifier)
}
```

---

Cette route est en DELETE "/api/users/:id" elle permet de supprimer des utilisateurs dans la base de données. Cette commande est accessible aux utilisateurs et aux administrateurs. 

Pour ce faire, tu ajoutes à la place de (:id) l'ID de l'utilisateur que tu veux supprimer. De plus, si un utilisateur veut supprimer un autre utilisateur, il ne pourra pas.


#### Pour les auteurs :


Cette route est en GET "/api/authors" elle permet de voir tous les auteurs dans la base de données, que ce soit en admin ou en user.

---

Cette route est en GET "/api/authors/:id" elle permet de chercher un auteur avec son ID dans la base de données, que ce soit en admin ou en user. Pour ce faire, tu ajoutes à la place de (:id) l'ID de l'auteur que tu veux voir.

---

Cette route est en POST "/api/authors" elle permet de créer/ajouter des auteurs dans la base de données. Cette commande est accessible uniquement aux administrateurs.

Voici le format RAW pour créer un auteur :

```json
{
 "first_name_author": "Ici le prénom de l'auteur",
 "last_name_author": "Ici le nom de l'auteur",
 "birth_day_date": "0000-00-00", //(Année, mois et jour)
 "description": "Ici la description de l'auteur"
}
```
---

Cette route est en PUT "/api/authors/:id" elle permet de modifier des auteurs dans la base de données. Cette commande est accessible uniquement aux administrateurs.

Voici le format RAW pour modifier un auteur :

```json
{
 "first_name_author": "Ici le prénom de l'auteur à modifier",
 "last_name_author": "Ici le nom de l'auteur à modifier",
 "birth_day_date": "0000-00-00", //(Année, mois et jour)
 "description": "Ici la description de l'auteur à modifier"
}
```
---

Cette route est en DELETE "/api/authors/:id" elle permet de supprimer des auteurs dans la base de données. Cette commande est accessible uniquement aux administrateurs. Pour ce faire, tu ajoutes à la place de (:id) l'ID de l'auteur que tu veux supprimer.


#### Pour les livres :


Cette route est en GET "/api/books" elle permet de voir tous les livres dans la base de données, que ce soit en admin ou en user.

---

Cette route est en GET "/api/books/:id" elle permet de chercher un livre avec son ID dans la base de données, que ce soit en admin ou en user. Pour ce faire, tu ajoutes à la place de (:id) l'ID du livre que tu veux voir.

---

Cette route est en POST "/api/books" elle permet de créer/ajouter des livres dans la base de données. Cette commande est accessible uniquement aux administrateurs.

Voici le format RAW pour créer un livre :

```json
{
 "title": "Ici le titre du livre",
 "author_id": 2, //(Entier donc pas de guillemets)
 "release_date": "0000-00-00", //(Année, mois et jour)
 "resum": "Ici le résumé du livre",
 "stock": 100, //(Entier donc pas de guillemets)
 "price": 5.89 //(Entier donc pas de guillemets + un point)
}
````

---

Cette route est en PUT "/api/books/:id" elle permet de modifier des livres dans la base de données. Cette commande est accessible uniquement aux administrateurs.

Voici le format RAW pour modifier un livre :

```json
{
 "title": "Ici le titre modifié du livre",
 "author_id": 2, //(Entier donc pas de guillemets)
 "release_date": "0000-00-00", //(Année, mois et jour)
 "resum": "Ici pour modifier le résumé du livre",
 "stock": 100, //(Entier donc pas de guillemets)
 "price": 5.89 //(Entier donc pas de guillemets + un point)
}
```

---

Cette route est en DELETE "/api/books/:id" elle permet de supprimer des livres dans la base de données. Cette commande est accessible uniquement aux administrateurs. Pour ce faire, tu ajoutes à la place de (:id) l'ID du livre que tu veux supprimer.

#### Pour les achats :


Cette route est en GET "/api/purchase_history" elle permet de voir tous les achats dans la base de données, que ce soit en admin ou en user.

Si tu es juste un utilisateur, tu verras uniquement tes achats, si tu es admin, tu verras les achats de tout le monde.

---

Cette route est en GET "/api/purchase_history/:id" elle permet de chercher un achat avec son ID dans la base de données, que ce soit en admin ou en user. Pour ce faire, tu ajoutes à la place de (:id) l'ID de l'achat que tu veux voir.

Si tu es juste un utilisateur, tu verras uniquement tes achats, si tu es admin, tu verras les achats de tout le monde.

---

Cette route est en POST "/api/purchase_history" elle permet de faire des achats de livres.

Voici le format RAW pour acheter un livre :

```json
{
 "book_id": 1, // Ici tu mets l'ID du livre que tu veux acheter
 "quantity": 3 // Ici tu mets la quantité de livres que tu veux acheter
}
```

---

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://rendu-git.etna-alternance.net/module-9787/activity-52605/group-1044740.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://rendu-git.etna-alternance.net/module-9787/activity-52605/group-1044740/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.






