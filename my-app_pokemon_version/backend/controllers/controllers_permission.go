package controllers

import (

	"net/http"

	"github.com/gin-gonic/gin"

	"MY_API/config"
	"MY_API/model"
	
) 


func Permission(ctx *gin.Context) { // ?


    
    Token, err := ctx.Cookie("token")
    if err != nil || Token == "" {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Access refusé, connectez-vous"})
        ctx.Abort()
        return
    }

    var user model.User
    if err := config.DB.QueryRow("SELECT * FROM User WHERE email = ?", Token).
        Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Admin); err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Utilisateur non trouvé"})
        ctx.Abort()
        return
    }

    ctx.Set("user", user)

    if !user.Admin {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Accès interdit, vous n'êtes pas admin"})
        ctx.Abort()
        return
    }

    ctx.Set("admin", true)
    ctx.Next()
} 
