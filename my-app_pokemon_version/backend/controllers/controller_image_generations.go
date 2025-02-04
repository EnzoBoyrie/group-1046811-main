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

func UploadImageGenerations(c *gin.Context) {

	generationsID := c.Param("generations_id")
	var generations model.Generations
	err := config.DB.QueryRow("SELECT id, name_generations FROM Generations WHERE id = ?", generationsID).Scan(&generations.ID, &generations.GenerationName)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Generation Name non trouvée"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de récupération de la GenerationName", "info": err.Error()})
			fmt.Printf("1", err.Error() )
		}
		return
	}

	file, _, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Aucun fichier envoyé"})
		return
	}
	defer file.Close()

	filename := fmt.Sprintf("%s.png", generationsID)
	uploadDir := "./uploads/images/generations" 
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de création du répertoire", "info": err.Error()})
		fmt.Printf("2", err.Error() )
		return
	}
	imagePath := filepath.Join(uploadDir, filename)

	
	outFile, err := os.Create(imagePath)
	if err != nil {
		log.Printf("Erreur création fichier: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de création du fichier pour l'image","info":  err.Error(),})
		fmt.Printf("3", err.Error() )
		return
	}
	defer outFile.Close()

	_, err = outFile.ReadFrom(file)
	if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de copie de l'image", "info": err.Error()})
		fmt.Printf("4", err.Error() )
        return
    }

	image := model.Image{
		ImageName:    filename,
		ImagePath:    imagePath,
		UploadedDate: time.Now().Format("2006-01-02 15:04:05"),
		GenerationsID:       generations.ID,
	}
	query := "INSERT INTO Image (image_name, image_path, uploaded_date, generations_id) VALUES (?, ?, ?, ?)"
	result, err := config.DB.Exec(query, image.ImageName, image.ImagePath, image.UploadedDate, image.GenerationsID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur d'ajout de l'image", "info": err.Error()})
		fmt.Printf("5", err.Error() )
		return
	}

	imageID, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de récupération de l'ID de l'image", "info": err.Error()})
		fmt.Printf("6", err.Error() )
		return
	}

	imageURL := fmt.Sprintf("http://localhost:3001/images/%s", filename)

	c.JSON(http.StatusOK, gin.H{
		"id":            imageID,
		"image_name":    image.ImageName,
		"image_path":    image.ImagePath,
		"uploaded_date": image.UploadedDate,
		"generations_id":       image.GenerationsID,
		"imageUrl":      imageURL,
	})
}

