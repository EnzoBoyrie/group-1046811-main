package controllers

import (
	"database/sql"
	"net/http"

	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	
	"golang.org/x/crypto/bcrypt"

	"MY_API/config"
	"MY_API/model"
	"MY_API/utils"
)

var secretKey = []byte("12345123")


func GetAllUsersAdmin(ctx *gin.Context) { //ok
	user, err := utils.Claims(ctx)
	if err != nil {
		fmt.Println("c pas good")
		ctx.Abort()
		return
	} else {
		fmt.Println("c good")
	}

	if !user.Admin {
		user, err := utils.Claims(ctx)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "user pas authentifié"})
			return
		}

		rows, err := config.DB.Query("SELECT * FROM User WHERE id = ?", user.ID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la recupération de l'utilisateur"})
			return
		}
		defer rows.Close()

		var users []model.User
		if rows.Next() {
			var user model.User
			if err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Admin); err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur  lectur", "info": err.Error()})
				return
			}
			users = append(users, user)
		}
		fmt.Println(users)
		ctx.JSON(http.StatusOK, users)
	} else {
		rows, err := config.DB.Query("SELECT * FROM User")
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération de l'utilisateur"})
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
		fmt.Println(users)
		ctx.JSON(http.StatusOK, users)
	}
}

func UpdateUserAdmin(ctx *gin.Context) { // ok
    
    isAdmin, exists := ctx.Get("userAdmin")
    fmt.Println("isAdmin:", isAdmin)  
    if !exists || !isAdmin.(bool) {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Accès refusé : vous n'êtes pas administrateur"})
        return
    }

    id := ctx.Param("id")
    var updatedUser model.User

    if err := ctx.ShouldBindJSON(&updatedUser); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "données mal ecrite et pas atendu"})
        return
    }

    var existingUser model.User
    err := config.DB.QueryRow(
        "SELECT first_name, last_name, email, password, admin FROM User WHERE id = ?", id,
    ).Scan(&existingUser.FirstName, &existingUser.LastName, &existingUser.Email, &existingUser.Password, &existingUser.Admin)

    if err != nil {
        if err == sql.ErrNoRows {
            ctx.JSON(http.StatusNotFound, gin.H{"error": "user pas trouvé"})
        } else {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "erreur de la recup de l'user"})
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

    _, err = config.DB.Exec(
        "UPDATE User SET first_name = ?, last_name = ?, email = ?, password = ?, admin = ? WHERE id = ?",
        updatedUser.FirstName, updatedUser.LastName, updatedUser.Email, hashedPassword, updatedUser.Admin, id,
    )
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "erreur de la mise à jour de l'userr"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "user mis à jour", "user": updatedUser})
}

func DeleteUserAdmin(ctx *gin.Context) { // ok
    id := ctx.Param("id")

    userIDToDelete, err := strconv.Atoi(id)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "ID invalide"})
        return
    }

    
    user, err := utils.Claims(ctx)
    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "user  pas co"})
        return
    }

    
    if !user.Admin && user.ID != userIDToDelete {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Vous n'avez pas la permission de supr ce user"})
        return
    }

    
    result, err := config.DB.Exec("DELETE FROM User WHERE id = ?", userIDToDelete)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur  de la supr de l'user", "info": err.Error()})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur  de la verif de la surp", "info": err.Error()})
        return
    }

    if rowsAffected == 0 {
        ctx.JSON(http.StatusNotFound, gin.H{"message": "user pas trouvé"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "user supprimé avec succès"})
}



