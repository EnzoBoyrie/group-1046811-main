package controllers

import (
	"MY_API/config"
	"MY_API/model"
	"fmt"
	"net/http"
	"os"
	"log"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"database/sql"
)

func UploadImageCards(c *gin.Context) { //ok

	cardID := c.Param("card_id")
	var card model.Card
	err := config.DB.QueryRow("SELECT id, title FROM Card WHERE id = ?", cardID).Scan(&card.ID, &card.Title)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Carte non trouvée"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération de la carte", "info": err.Error()})
		}
		return
	}

	file, _, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Aucun fichier envoyé"})
		return
	}
	defer file.Close()

	filename := fmt.Sprintf("%s.png", cardID)
	uploadDir := "./uploads/images/cards" 
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de création du répertoire", "info": err.Error()})
		return
	}
	imagePath := filepath.Join(uploadDir, filename)

	
	outFile, err := os.Create(imagePath)
	if err != nil {
		log.Printf("Erreur création fichier: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erreur lors de la création du fichier pour l'image",
			"info":  err.Error(),
		})
		return
	}
	defer outFile.Close()

	_, err = outFile.ReadFrom(file)
	if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de copie de l'image", "info": err.Error()})
        return
    }

	image := model.Image{
		ImageName:    filename,
		ImagePath:    imagePath,
		UploadedDate: time.Now().Format("2006-01-02 15:04:05"),
		CardID:       card.ID,
	}
	query := "INSERT INTO Image (image_name, image_path, uploaded_date, card_id) VALUES (?, ?, ?, ?)"
	result, err := config.DB.Exec(query, image.ImageName, image.ImagePath, image.UploadedDate, image.CardID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur d'ajout de l'image", "info": err.Error()})
		return
	}

	imageID, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de récupération de l'ID de l'image", "info": err.Error()})
		return
	}

	imageURL := fmt.Sprintf("http://localhost:3001/images/%s", filename)

	c.JSON(http.StatusOK, gin.H{
		"id":            imageID,
		"image_name":    image.ImageName,
		"image_path":    image.ImagePath,
		"uploaded_date": image.UploadedDate,
		"card_id":       image.CardID,
		"imageUrl":      imageURL,
	})
}

