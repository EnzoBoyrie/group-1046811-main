package main

import (
	
	"github.com/gin-gonic/gin"

	"MY_API/config"
	"MY_API/router"
	
	"github.com/gin-contrib/cors"
)


func main() {
	
	config.InitDB()

	demarrage := gin.Default()

	demarrage.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Content-Type", "Authorization","Credentials"},
        AllowCredentials: true,
    }))

	
	router.RouterCards(demarrage)
	router.RouterUsers(demarrage)
	router.RouterGenerations(demarrage)
	router.RouterSets(demarrage)
	router.RouterPurchaseHistory(demarrage)
	router.RouterLogin(demarrage)
	router.RouterUsersAdmin(demarrage)
	router.RouterImage(demarrage)
	


	demarrage.Static("/images/cards", "./uploads/images/cards")
	demarrage.Static("/images/sets", "./uploads/images/sets")
	demarrage.Static("/images/generations", "./uploads/images/generations")

	

	demarrage.Run(":3001")
	
}
