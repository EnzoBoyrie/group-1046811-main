package controllers

import (
	"database/sql"
	"net/http"

	"fmt"
	"strconv"
	

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"MY_API/config"
	"MY_API/model"
	"MY_API/utils"
)





func GetAllUsers(ctx *gin.Context) {//ok
    
    user, err := utils.Claims(ctx)
    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        ctx.Abort()
        return
    }

    fmt.Println("User:", user)

    
    query := "SELECT * FROM User WHERE ID = ?"
    rows, err := config.DB.Query(query, user.ID)  
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la recup de l'utilisateur"})
        return
    }
    defer rows.Close()

    var users []model.User
    for rows.Next() {
        var user model.User
        if err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Admin); err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de lecture", "info": err.Error()})
            return
        }
        users = append(users, user)
    }

    
    if err := rows.Err(); err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de l'ajout des info", "info": err.Error()})
        return
    }

    ctx.JSON(http.StatusOK, users)
}



func GetUserByID(ctx *gin.Context) { //ok
	id := ctx.Param("id")

	var userInfo model.User

	err := config.DB.QueryRow("SELECT id, first_name, last_name, email, password, admin FROM User WHERE id = ?", id).Scan(
		&userInfo.ID, &userInfo.FirstName, &userInfo.LastName, &userInfo.Email, &userInfo.Password, &userInfo.Admin,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"message": "Aucun utilisateur trouvé"})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération de l'utilisateur", "info": err.Error()})
		}
		return
	}

	ctx.JSON(http.StatusOK, userInfo)
}

// creation de user + add user er1 admin + hash de password
func CreateUser(ctx *gin.Context) {// ok
	var user model.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"info": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors du 'hash' du mot de passe"})
		return
	}

	var userCount int
	err = config.DB.QueryRow("SELECT COUNT(*) FROM User").Scan(&userCount)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"info": "Erreur lors de la vérification des utilisateurs"})
		return
	}

	if userCount == 0 {
		user.Admin = true
	} else {
		user.Admin = false
	}

	_, err = config.DB.Exec(
		"INSERT INTO User (first_name, last_name, email, password, admin) VALUES (?, ?, ?, ?, ?)",
		user.FirstName, user.LastName, user.Email, string(hashedPassword), user.Admin)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la création de l'utilisateur"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "user créé", "admin": user.Admin})
}

func UpdateUser(ctx *gin.Context) { // ok
    
    user, err := utils.Claims(ctx)
    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "user pas co"})
        return
    }

    
    id := ctx.Param("id")

    
    idInt, err := strconv.Atoi(id)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "id pas bonne"})
        return
    }

    
    if user.ID != idInt {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Vous n'avez pas les droits pour modiffier cet user"})
        return
    }

    var updatedUser model.User
    if err := ctx.ShouldBindJSON(&updatedUser); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "données mal ecrite et pas atendu"})
        return
    }

    
    var existingUser model.User
    err = config.DB.QueryRow(
        "SELECT first_name, last_name, email, password FROM User WHERE id = ?", idInt,
    ).Scan(&existingUser.FirstName, &existingUser.LastName, &existingUser.Email, &existingUser.Password)

    if err != nil {
        if err == sql.ErrNoRows {
            ctx.JSON(http.StatusNotFound, gin.H{"error": "user introuvable"})
        } else {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "erreur  de la recup de l'user"})
        }
        return
    }

    
    var hashedPassword string
    if updatedUser.Password != "" {
        hashedPasswordBytes, err := bcrypt.GenerateFromPassword([]byte(updatedUser.Password), bcrypt.DefaultCost)
        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "erreur du hachage du mot de passe"})
            return
        }
        hashedPassword = string(hashedPasswordBytes)
    } else {
        hashedPassword = existingUser.Password
    }

    
    result, err := config.DB.Exec(
        "UPDATE User SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?",
        updatedUser.FirstName, updatedUser.LastName, updatedUser.Email, hashedPassword, idInt,
    )
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "erreur  de la mise à jour de l'user"})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur  de la verif de la mise à jour", "info": err.Error()})
        return
    }

    if rowsAffected == 0 {
        ctx.JSON(http.StatusNotFound, gin.H{"message": "user pas trouvé"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "user mis à jour ", "user": updatedUser})
}





func DeleteUser(ctx *gin.Context) { //ok
    
    user, err := utils.Claims(ctx)
    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "user pas co"})
        return
    }

    
    id := ctx.Param("id")

    
    idInt, err := strconv.Atoi(id)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "id invalide"})
        return
    }

    
    if user.ID != idInt {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Vous n'avez pas les droits pour supr cet user"})
        return
    }


    
    result, err := config.DB.Exec("DELETE FROM User WHERE id = ?", user.ID)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la supr de l'user", "info": err.Error()})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la verif de la suppression", "info": err.Error()})
        return
    }

    if rowsAffected == 0 {
        ctx.JSON(http.StatusNotFound, gin.H{"message": "user pas trouvé"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "Votre compte a été supprimé avec succès"})
}





func Profile(c *gin.Context) { // ?
	tokenString, err := c.Cookie("token")

	if err != nil {
		fmt.Println("Aucun token dans le cookie")
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("pas de toke correct: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		fmt.Printf("Parsing du token mauvais: %v\n", err)
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Mauv token"})
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		fmt.Println("Claim fail")
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Claim fail"})
	}

	id, ok := claims["id"].(float64)
	if !ok {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Mauv token"})
	}

	rows, err := config.DB.Query("SELECT * FROM User WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la recupération de l'utilisateur"})
		return
	}
	defer rows.Close()

	var users []model.User
	if rows.Next() {
		var user model.User
		if err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Admin); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur  lectur", "info": err.Error()})
			return
		}
		users = append(users, user)
	}
	fmt.Println(users)
	c.JSON(http.StatusOK, users)
}
