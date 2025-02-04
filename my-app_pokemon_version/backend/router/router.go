package router

import (

	"github.com/gin-gonic/gin"

	"MY_API/controllers"
	"MY_API/utils"


)


func RouterImage(demarrage *gin.Engine) { //ok
	

	demarrage.POST("/api/images/card/:card_id",controllers.UploadImageCards)													// accès (admin)(user)
	demarrage.POST("/api/images/sets/:sets_id",controllers.UploadImageSets)	
	demarrage.POST("/api/images/generations/:generations_id",controllers.UploadImageGenerations)	
					
}





func RouterCards(demarrage *gin.Engine) { //ok
	

	demarrage.GET("/api/cards", controllers.GetAllCards)													// accès (admin)(user)
	demarrage.GET("/api/cards/:id", controllers.GetCardsByID)	
												
	demarrage.POST("/api/cards", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.CreateCards) 							// accès (admin)	
	demarrage.PUT("/api/cards/:id", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.UpdateCards)						// accès (admin)
	demarrage.DELETE("/api/cards/:id", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.DeleteCards)					// accès (admin)
}


func RouterUsers(demarrage *gin.Engine) {// ok 

	demarrage.GET("/api/users/profile", utils.AuthenticateMiddleware, controllers.Profile)	

	demarrage.GET("/api/users", utils.AuthenticateMiddleware, controllers.GetAllUsers)												
	demarrage.GET("/api/users/:id", utils.AuthenticateMiddleware, controllers.GetUserByID)						
	demarrage.POST("/api/users", controllers.CreateUser)																		
	demarrage.PUT("/api/users/:id", utils.AuthenticateMiddleware, controllers.UpdateUser) 
	demarrage.DELETE("/api/users/:id", utils.AuthenticateMiddleware, controllers.DeleteUser)												
}

func RouterUsersAdmin(demarrage *gin.Engine) {// ok 
																	
	demarrage.GET("/api/users/admin", utils.AuthenticateMiddleware,utils.AdminMiddleware(), controllers.GetAllUsersAdmin)												
	demarrage.GET("/api/users/admin:id", utils.AuthenticateMiddleware, controllers.GetUserByID)						
	

	demarrage.PUT("/api/users/admin/:id", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.UpdateUserAdmin)
	demarrage.DELETE("/api/users/admin/:id", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.DeleteUserAdmin)												// accès (admin)(user)
}

func RouterGenerations(demarrage *gin.Engine) {//ok


	demarrage.GET("/api/generations", controllers.GetAllGenerations) 												    // accès (admin)(user)
	demarrage.GET("/api/generations/:id", controllers.GetGenerationsByID)	                                            // accès (admin)(user)
											
	demarrage.POST("/api/generations", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.CreateGenerations) 						    // accès (admin)
	demarrage.PUT("/api/generations/:id", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.UpdatedGenerations)						// accès (admin)
	demarrage.DELETE("/api/generations/:id", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.DeleteGenerations)					// accès (admin)
}



func RouterSets(demarrage *gin.Engine) {//ok


	demarrage.GET("/api/sets", controllers.GetAllSets) 												    // accès (admin)(user)
	demarrage.GET("/api/sets/:id", controllers.GetSetsByID)	                                            // accès (admin)(user)
											
	demarrage.POST("/api/sets", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.CreateSets) 						    // accès (admin)
	demarrage.PUT("/api/sets/:id", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.UpdatedSets)						// accès (admin)
	demarrage.DELETE("/api/sets/:id", utils.AuthenticateMiddleware, utils.AdminMiddleware(), controllers.DeleteSets)					// accès (admin)
}


func RouterPurchaseHistory(demarrage *gin.Engine) { //non
	

	demarrage.GET("/api/purchase_history", utils.AuthenticateMiddleware, controllers.GetAllPurchaseHistory)
	demarrage.GET("/api/admin/purchase_history", utils.AuthenticateMiddleware,utils.AdminMiddleware(), controllers.GetAllPurchaseHistoriesAdmin)									    
	demarrage.GET("/api/purchase_history/:id", utils.AuthenticateMiddleware,controllers.Permission, controllers.GetPurchaseHistoryByID)	    // accès (admin)(use)
	demarrage.POST("/api/purchase_history", controllers.CreatePurchaseHistory)								// accès (admin)(use)

}


func RouterLogin(demarrage *gin.Engine) { //ok


	demarrage.POST("/api/login", controllers.LoginUser)

	demarrage.POST("/api/logout", controllers.LogoutUser)

	demarrage.GET("/api/token", controllers.Token)
}

