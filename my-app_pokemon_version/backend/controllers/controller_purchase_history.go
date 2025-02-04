package controllers

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"MY_API/config"
	"MY_API/model"
	"MY_API/utils"
)

func GetAllPurchaseHistoriesAdmin(ctx *gin.Context) { //ok

	user, err := utils.Claims(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "user pas co"})
		return
	}
	fmt.Printf("User ID: %d", user.ID)

	rows, err := config.DB.Query("SELECT id, user_id, card_id, quantity, price_total, purchase_date FROM Purchase_history")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la recup de l'historique des achats / facture"})
		return
	}
	defer rows.Close()

	var purchases []model.Purchase_history
	for rows.Next() {
		var purchase model.Purchase_history
		var purchaseDate []byte

		if err := rows.Scan(&purchase.ID, &purchase.UserID, &purchase.CardID, &purchase.Quantity, &purchase.PriceTotal, &purchaseDate); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la lecture de l'historique", "info": err.Error()})
			return
		}

		if len(purchaseDate) > 0 {
			purchase.PurchaseDate, err = time.Parse("2006-01-02 15:04:05", string(purchaseDate))
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la conversion de la date", "info": err.Error()})
				return
			}
		}

		purchases = append(purchases, purchase)
	}

	if len(purchases) == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Aucun achat trouvé"})
		return
	}

	ctx.JSON(http.StatusOK, purchases)
}

func GetAllPurchaseHistory(ctx *gin.Context) { //ok
	
	user, err := utils.Claims(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "user pas co"})
		return
	}

	
	rows, err := config.DB.Query("SELECT id, user_id, card_id, quantity, price_total, purchase_date FROM Purchase_history WHERE user_id = ?", user.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la recup de l'historique d'achat/facture", "info": err.Error()})
		return
	}
	defer rows.Close()

	
	var purchases []model.Purchase_history
	for rows.Next() {
		var purchase model.Purchase_history
		var purchaseDate string

		
		if err := rows.Scan(&purchase.ID, &purchase.UserID, &purchase.CardID, &purchase.Quantity, &purchase.PriceTotal, &purchaseDate); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la lecture de l'historique", "info": err.Error()})
			return
		}

		
		if purchaseDate != "" {
			purchase.PurchaseDate, err = time.Parse("2006-01-02 15:04:05", purchaseDate)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la conversion de la date", "info": err.Error()})
				return
			}
		}

		purchases = append(purchases, purchase)
	}

	
	if len(purchases) == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Aucun achat trouvé"})
		return
	}

	
	ctx.JSON(http.StatusOK, purchases)
}


func GetPurchaseHistoryByID(ctx *gin.Context) {//!
	

	purchaseID := ctx.Param("id")
	

	if purchaseID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "L'ID d'achat est requis"})
		return
	}

	var purchase model.Purchase_history
	var purchaseDate []byte

	err := config.DB.QueryRow("SELECT id, user_id, card_id, quantity, price_total, purchase_date FROM Purchase_history WHERE id = ?", purchaseID).
		Scan(&purchase.ID, &purchase.UserID, &purchase.CardID, &purchase.Quantity, &purchase.PriceTotal, &purchaseDate)

	if err != nil {
		if err == sql.ErrNoRows {

			ctx.JSON(http.StatusNotFound, gin.H{"message": "erreur : Aucun achat trouvé avec ce ID"})
		} else {

			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "erreur lors de la recupérartion de l'achat", "info": err.Error()})
		}
		return
	}

	if len(purchaseDate) > 0 {
		purchase.PurchaseDate, err = time.Parse("2006-01-02 15:04:05", string(purchaseDate))
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "erreur lors de la conversion de la date", "info": err.Error()})
			return
		}
	}

	ctx.JSON(http.StatusOK, purchase)
}

func CreatePurchaseHistory(ctx *gin.Context) {
    var purchaseHistories []model.Purchase_history
	userTest, err := utils.Claims(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "user pas co"})
		return
	}

	fmt.Println(userTest.Admin)

    if err := ctx.ShouldBindJSON(&purchaseHistories); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Problème dans l'écriture", "info": err.Error()})
        return
    }
	fmt.Println("test", purchaseHistories)

    tokenString, err := utils.Claims(ctx)
    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Pas connecté"})
        return
    }

    var user model.User
    err = config.DB.QueryRow("SELECT id FROM User WHERE id = ?", tokenString.ID).Scan(&user.ID)
    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Aucun utilisateur trouvé"})
        return
    }

    for i, purchaseHistory := range purchaseHistories {
        purchaseHistory.UserID = user.ID

        var cardCount int
        err = config.DB.QueryRow("SELECT COUNT(*) FROM Card WHERE id = ?", purchaseHistory.CardID).Scan(&cardCount)
        if err != nil || cardCount == 0 {
            ctx.JSON(http.StatusBadRequest, gin.H{"error": "Carte non trouvée pour l'achat numéro " + strconv.Itoa(i+1)})
            return
        }

        var cardPrice, cardStock float64
        err = config.DB.QueryRow("SELECT price, stock FROM Card WHERE id = ?", purchaseHistory.CardID).Scan(&cardPrice, &cardStock)
        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération des détails de la carte pour l'achat numéro " + strconv.Itoa(i+1)})
            return
        } else if cardStock < float64(purchaseHistory.Quantity) {
            ctx.JSON(http.StatusBadRequest, gin.H{"error": "Stock insuffisant pour l'achat numéro " + strconv.Itoa(i+1)})
            return
        }

        purchaseHistory.PriceTotal = cardPrice * float64(purchaseHistory.Quantity)
        purchaseHistory.PurchaseDate = time.Now()

        _, err = config.DB.Exec(
            "INSERT INTO Purchase_history (user_id, card_id, quantity, price_total, purchase_date) VALUES (?, ?, ?, ?, ?)",
            purchaseHistory.UserID, purchaseHistory.CardID, purchaseHistory.Quantity, purchaseHistory.PriceTotal, purchaseHistory.PurchaseDate,
        )
        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de l'ajout de l'achat numéro " + strconv.Itoa(i+1), "info": err.Error()})
            return
        }

        _, err = config.DB.Exec(
            "UPDATE Card SET stock = stock - ? WHERE id = ?",
            purchaseHistory.Quantity, purchaseHistory.CardID,
        )
        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la mise à jour du stock des cartes pour l'achat numéro " + strconv.Itoa(i+1)})
            return
        }
    }

    ctx.JSON(http.StatusCreated, gin.H{
        "message":   "Achats réussis",
        "purchases": purchaseHistories,
    })
}
