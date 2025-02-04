package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"MY_API/config"
	"MY_API/model"
	"MY_API/utils"
)

// pour ce co + token cookis
func LoginUser(ctx *gin.Context) { // ok
	var login model.User

	if err := ctx.ShouldBindJSON(&login); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Les données ne correspondent pas "})
		return
	}

	fmt.Println("Login", login)

	var user model.User
	err := config.DB.QueryRow("SELECT id, first_name, last_name, email, password, admin FROM User WHERE email = ?",
		login.Email).Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Admin)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Email ou mot de passe incorrect"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(login.Password))

	if err != nil {

		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Email ou mot de passe pas bon 2"})
		return
	}

	tokenString, err := utils.CreateToken(&user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating token"})
		return
	}

	ctx.SetCookie("token", tokenString, 3600, "/", "localhost", false, true) // 1h de co

	ctx.JSON(http.StatusOK, gin.H{"message": "Connexion réussie"})
}

// pour ce deco
func LogoutUser(ctx *gin.Context) { // ok
	ctx.SetCookie("token", "", -1, "/", "localhost", false, true)
	fmt.Println("User deco")
	ctx.JSON(http.StatusOK, gin.H{"message": "tu es déconnecté"})

}

func Token(c *gin.Context) { // ?
	tokenString, err := c.Cookie("token")

	if tokenString == "" || err != nil {
		c.JSON(http.StatusOK, gin.H{"Status": false})
	} else {
		c.JSON(http.StatusOK, gin.H{"Status": true})
	}
}
