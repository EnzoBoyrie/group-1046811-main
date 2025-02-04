package controllers

import (
	"database/sql"
"fmt"
	"net/http"
	
	
	

	"github.com/gin-gonic/gin"

	"MY_API/config"
	"MY_API/model"
) 



func GetAllGenerations(ctx *gin.Context) {// ok
	rows, err := config.DB.Query("SELECT id, name_generations, creation_date, description FROM Generations")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération de la Generations"})
		fmt.Printf("1")
		return
	}
	defer rows.Close()

	var newGenerations []model.Generations
	for rows.Next() {
		var generations model.Generations
		if err := rows.Scan(&generations.ID, &generations.GenerationName, &generations.CreationDate, &generations.Description); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de lecture", "info": err.Error()})
			fmt.Printf("2")
			return
		}
		newGenerations = append(newGenerations, generations)
	}

	if len(newGenerations) == 0 {
		ctx.JSON(http.StatusNoContent, gin.H{"message": "Aucune generations trouvé"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"generations": newGenerations,
	})
}


func GetGenerationsByID(ctx *gin.Context) {// ok
	id := ctx.Param("id")
	var generations model.Generations
	err := config.DB.QueryRow("SELECT * FROM Generations WHERE id = ?", id).Scan(
		&generations.ID,  &generations.GenerationName, &generations.CreationDate, &generations.Description,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"message": "Generations pas trouvé"})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récuperation de la Generations", "info": err.Error()})
		}
		return
	}

	ctx.JSON(http.StatusOK, generations)
}


func CreateGenerations(ctx *gin.Context) {// ok



	
	var newgenerations model.Generations
	if err := ctx.ShouldBindJSON(&newgenerations); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Données pas attendu", "info": err.Error()})
		fmt.Printf("1")
		return
	}
 
	var existingGenerations model.Generations
	err := config.DB.QueryRow("SELECT id FROM Generations WHERE name_generations = ?", newgenerations.GenerationName).Scan(&existingGenerations .ID)
	if err == nil {
		ctx.JSON(http.StatusConflict, gin.H{"message": "Un Generations avec ce nom existe deja"})
		return
	}
	
	_, err = config.DB.Exec(
		"INSERT INTO Generations (name_generations, creation_date, description) VALUES (?, ?, ?)",
	 &newgenerations.GenerationName, &newgenerations.CreationDate, &newgenerations.Description,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la création de la Generations", "info": err.Error()})
		fmt.Printf("2", err.Error())
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Generations créé", "Generations":newgenerations })
}


func UpdatedGenerations(ctx *gin.Context) {// ok
	id := ctx.Param("id")

	var existingGenerations model.Generations
	err := config.DB.QueryRow ("SELECT name_generations, creation_date, description FROM Generations WHERE id = ?", id).Scan(
		
		&existingGenerations.GenerationName,
		&existingGenerations.CreationDate,
		&existingGenerations.Description,
	)
    if err !=nil{
		if err == sql.ErrNoRows{
			ctx.JSON(http.StatusNotFound,gin.H{"error":"Generations pas trouvé"})
		} else {
			ctx.JSON(http.StatusInternalServerError,gin.H{"error":"Err de le recup du Generations","info": err.Error()})
		} 
	} 

	var updatedGenerations model.Generations
	if err := ctx.ShouldBindJSON(&updatedGenerations); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Données pas attendu", "info": err.Error()})
		return
	}

	if updatedGenerations.GenerationName == ""  {
		updatedGenerations.GenerationName = existingGenerations.GenerationName
	}

	if updatedGenerations.CreationDate == "" {
		updatedGenerations.CreationDate = existingGenerations.CreationDate
	}

	if updatedGenerations.Description == ""  {
		updatedGenerations.Description = existingGenerations.Description
	}


	result, err := config.DB.Exec(
		"UPDATE Generations SET name_generations = ?, creation_date = ?, description = ? WHERE id = ?",
		updatedGenerations.GenerationName, updatedGenerations.CreationDate, updatedGenerations.Description, id,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la mise à jour du Generations", "info": err.Error()})
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la verification du nombre de lignes ", "info": err.Error()})
		return
	}

	if rowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Aucun Generations trouvé"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Generations mit à jour", "Generations": updatedGenerations})
}


func DeleteGenerations(ctx *gin.Context) {// ok
	id := ctx.Param("id")
	result, err := config.DB.Exec("DELETE FROM Generations WHERE id = ?", id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la suppression du Generations", "info": err.Error()})
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lorsr de la verif de la suppression", "info": err.Error()})
		return
	}

	if rowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Aucun Generations trouvé"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Generations suprprimé "})
}
