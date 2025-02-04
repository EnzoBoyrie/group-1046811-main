package controllers

import (
	"database/sql"
"fmt"
	"net/http"
	
	
	

	"github.com/gin-gonic/gin"

	"MY_API/config"
	"MY_API/model"
) 



func GetAllSets(ctx *gin.Context) {// ok
	rows, err := config.DB.Query("SELECT id, name_sets, name_generation, creation_date, description FROM Sets")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération du sets"})
		return
	}
	defer rows.Close()

	var newSets []model.Sets
	for rows.Next() {
		var sets model.Sets
		if err := rows.Scan(&sets.ID, &sets.SetsName, &sets.GenerationName, &sets.CreationDate , &sets.Description); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur de lecture", "info": err.Error()})
			return
		}
		newSets = append(newSets, sets)
	}

	if len(newSets) == 0 {
		ctx.JSON(http.StatusNoContent, gin.H{"message": "Aucun sets trouvé"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"sets": newSets,
	})
}


func GetSetsByID(ctx *gin.Context) {// ok
	id := ctx.Param("id")
	var sets model.Sets
	err := config.DB.QueryRow("SELECT * FROM Sets WHERE id = ?", id).Scan(
		&sets.ID, &sets.SetsName, &sets.GenerationName, &sets.CreationDate, &sets.Description,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"message": "Sets pas trouvé"})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récuperation du sets", "info": err.Error()})
		}
		return
	}

	ctx.JSON(http.StatusOK, sets)
}


func CreateSets(ctx *gin.Context) {// ok
	var newSets model.Sets
	if err := ctx.ShouldBindJSON(&newSets); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Données pas attendu", "info": err.Error()})
		fmt.Printf("1", err.Error(), newSets)
		return
	}

	fmt.Println(newSets)
 
	var existingSets model.Sets
	err := config.DB.QueryRow("SELECT id FROM Sets WHERE name_sets = ? AND name_generation = ?", newSets.SetsName, newSets.GenerationName).Scan(&existingSets.ID)
	if err == nil {
		ctx.JSON(http.StatusConflict, gin.H{"message": "Un sets avec ce nom existe deja"})
		return
	}
	
	_, err = config.DB.Exec(
		"INSERT INTO Sets (name_sets, name_generation, id_generation, creation_date, description) VALUES (?, ?, ?, ?, ?)",
		newSets.SetsName, newSets.GenerationName, newSets.Id_generation, newSets.CreationDate, newSets.Description,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la création du sets", "info": err.Error()})
		fmt.Printf("2", err.Error())
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Sets créé", "sets":newSets })
}


func UpdatedSets(ctx *gin.Context) {// ok
	id := ctx.Param("id")

	var existingSets model.Sets
	err := config.DB.QueryRow ("SELECT name_sets, name_generation, id_generation, creation_date, description FROM Sets WHERE id = ?", id).Scan(
		&existingSets.SetsName,
		&existingSets.GenerationName,
		&existingSets.Id_generation,
		&existingSets.CreationDate,
		&existingSets.Description,
	)
    if err !=nil{
		if err == sql.ErrNoRows{
			ctx.JSON(http.StatusNotFound,gin.H{"error":"Sets pas trouvé"})
		} else {
			ctx.JSON(http.StatusInternalServerError,gin.H{"error":"Err de le recup du sets","info": err.Error()})
			fmt.Println("1", err)
		} 
	} 

	var updatedSets model.Sets
	if err := ctx.ShouldBindJSON(&updatedSets); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Données pas attendu", "info": err.Error()})
		return
	}

	if updatedSets.SetsName == ""  {
		updatedSets.SetsName = existingSets.SetsName
	}

	if updatedSets.GenerationName == ""  {
		updatedSets.GenerationName = existingSets.GenerationName
	}

	if updatedSets.Id_generation == 0  {
		updatedSets.Id_generation = existingSets.Id_generation
	}

	if updatedSets.CreationDate == "" {
		updatedSets.CreationDate = existingSets.CreationDate
	}

	if updatedSets.Description == ""  {
		updatedSets.Description = existingSets.Description
	}


	result, err := config.DB.Exec(
		"UPDATE Sets SET name_sets = ?, name_generation = ?, id_generation = ?, creation_date = ?, description = ? WHERE id = ?",
		updatedSets.SetsName, updatedSets.GenerationName, updatedSets.Id_generation, updatedSets.CreationDate, updatedSets.Description, id,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la mise à jour du sets", "info": err.Error()})
		fmt.Println("2", err)
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la verification du nombre de lignes ", "info": err.Error()})
		fmt.Println("3", err)
		return
	}

	if rowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Aucun sets trouvé"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Sets mit à jour", "sets": updatedSets})
}


func DeleteSets(ctx *gin.Context) {// ok
	id := ctx.Param("id")
	result, err := config.DB.Exec("DELETE FROM Sets WHERE id = ?", id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la suppression du sets", "info": err.Error()})
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lorsr de la verif de la suppression", "info": err.Error()})
		return
	}

	if rowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Aucun sets trouvé"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Sets suprprimé "})
}
