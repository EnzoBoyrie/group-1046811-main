package controllers

import (
	"database/sql"
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"MY_API/config"
	"MY_API/model"
) 




func GetAllCards(ctx *gin.Context) {// ok
	rows, err := config.DB.Query("SELECT * FROM Card")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la recupération de la Card"})
		return
	}
	defer rows.Close()

	var cards []model.Card
	for rows.Next() {
		var card model.Card
		if err := rows.Scan(&card.ID, &card.Title, &card.PokemonID, &card.PokemonType,  &card.SetsID, &card.ReleaseDate, &card.Resum, &card.Stock , &card.Price, &card.Illustration_Rare, &card.Illustration_Speciale_Rare,&card.Illustration_Hyper_Rare); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de carte ", "info": err.Error()})
			return
		}
		cards = append(cards, card)
	}

	ctx.JSON(http.StatusOK, cards)
}
	
	
func GetCardsByID(ctx *gin.Context) {// ok
	id := ctx.Param("id")
	var card model.Card
	err := config.DB.QueryRow("SELECT * FROM Card WHERE id = ?", id).Scan(
		&card.ID, &card.Title, &card.PokemonID, &card.PokemonType, &card.SetsID, &card.ReleaseDate, &card.Resum, &card.Stock, &card.Price, &card.Illustration_Rare, &card.Illustration_Speciale_Rare,&card.Illustration_Hyper_Rare,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"message": "Carte pas trouvé"})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la recup de la carte", "info": err.Error()})
		}
		return
	}

	ctx.JSON(http.StatusOK, card)
}


func CreateCards(ctx *gin.Context) {// ok



	var newCard model.Card
	if err := ctx.ShouldBindJSON(&newCard); err != nil {
		fmt.Println(newCard)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Données pas attendues", "info": err.Error()})
		return
	}
 
	var existingCard model.Card
	err := config.DB.QueryRow("SELECT id FROM Card WHERE title = ? AND id_sets = ?", newCard.Title, newCard.SetsID).Scan(&existingCard.ID)
	if err == nil {
		ctx.JSON(http.StatusConflict, gin.H{"message": "Une carte avec ce nom existe deja"})
		return
	}
	
	_, err = config.DB.Exec(
		"INSERT INTO Card (id, title, id_pokemon, type_pokemon, id_sets, release_date, resum, stock, price, illustration_rare, illustration_speciale_rare, illustration_hyper_rare) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		&newCard.ID, &newCard.Title, &newCard.PokemonID, &newCard.PokemonType, &newCard.SetsID, &newCard.ReleaseDate, &newCard.Resum, &newCard.Stock, &newCard.Price,  &newCard.Illustration_Rare, &newCard.Illustration_Speciale_Rare,&newCard.Illustration_Hyper_Rare)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la création de la carte", "info": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Carte créé et ajoutée "})
}


func UpdateCards(ctx *gin.Context) {
	
	id := ctx.Param("id")

	
	var existingCard model.Card
	err := config.DB.QueryRow(
		"SELECT title, id_pokemon, type_pokemon, id_sets, release_date, resum, stock, price, illustration_rare, illustration_speciale_rare, illustration_hyper_rare FROM Card WHERE id = ?",
		id,
	).Scan(
		&existingCard.Title,
		&existingCard.PokemonID,
		&existingCard.PokemonType,
		&existingCard.SetsID,
		&existingCard.ReleaseDate,
		&existingCard.Resum,
		&existingCard.Stock,
		&existingCard.Price,
		&existingCard.Illustration_Rare,
		&existingCard.Illustration_Speciale_Rare,
		&existingCard.Illustration_Hyper_Rare,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Carte introuvable"})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération de la carte", "details": err.Error()})
			fmt.Print( "1", err.Error())
		}
		return
	}

	
	var updatedCard model.Card
	if err := ctx.ShouldBindJSON(&updatedCard); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Données invalides", "details": err.Error()})
		
		return
	}

	
	if updatedCard.Title == "" {
		updatedCard.Title = existingCard.Title
	}
	if updatedCard.PokemonID == 0 {
		updatedCard.PokemonID = existingCard.PokemonID
	}
	if updatedCard.PokemonType == "" {
		updatedCard.PokemonType = existingCard.PokemonType
	}
	if updatedCard.SetsID == 0 {
		updatedCard.SetsID = existingCard.SetsID
	}
	if updatedCard.ReleaseDate == "" {
		updatedCard.ReleaseDate = existingCard.ReleaseDate
	}
	if updatedCard.Resum == "" {
		updatedCard.Resum = existingCard.Resum
	}
	if updatedCard.Stock == 0 {
		updatedCard.Stock = existingCard.Stock
	}
	if updatedCard.Price == 0 {
		updatedCard.Price = existingCard.Price
	}
	if !updatedCard.Illustration_Rare {
		updatedCard.Illustration_Rare = existingCard.Illustration_Rare
	}
	if !updatedCard.Illustration_Speciale_Rare {
		updatedCard.Illustration_Speciale_Rare = existingCard.Illustration_Speciale_Rare
	}
	if !updatedCard.Illustration_Hyper_Rare {
		updatedCard.Illustration_Hyper_Rare = existingCard.Illustration_Hyper_Rare
	}

	
	result, err := config.DB.Exec(
		`UPDATE Card SET title = ?, id_pokemon = ?, type_pokemon = ?, id_sets = ?, release_date = ?, resum = ?, stock = ?, price = ?, illustration_rare = ?, illustration_speciale_rare = ?, illustration_hyper_rare = ? WHERE id = ?`,
		updatedCard.Title,
		updatedCard.PokemonID,
		updatedCard.PokemonType,
		updatedCard.SetsID,
		updatedCard.ReleaseDate,
		updatedCard.Resum,
		updatedCard.Stock,
		updatedCard.Price,
		updatedCard.Illustration_Rare,
		updatedCard.Illustration_Speciale_Rare,
		updatedCard.Illustration_Hyper_Rare,
		id,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la mise à jour", "details": err.Error()})
		fmt.Print("2")
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Aucune mise à jour effectuée"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Carte mise à jour avec succès", "card": updatedCard})
}



func DeleteCards(ctx *gin.Context) {// ok
	id := ctx.Param("id")
	result, err := config.DB.Exec("DELETE FROM Card WHERE id = ?", id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la suppression de la carte", "info": err.Error()})
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de la verification de la suppression", "info": err.Error()})
		return
	}

	if rowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Carte pas trouvée"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Carte supprimée "})
}
