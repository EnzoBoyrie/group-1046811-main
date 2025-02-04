package model


type Image struct {
    ID              int    `json:"id"`
    ImageName       string `json:"image_name"`
    ImagePath       string `json:"image_path"`
    UploadedDate    string `json:"uploaded_date"`
    CardID          int    `json:"card_id"`  
	GenerationsID   int    `json:"generations_id"`  
	SetsID          int    `json:"sets_id"`  
}

