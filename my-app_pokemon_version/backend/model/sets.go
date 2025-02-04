package model


type Sets struct {
    ID                int    `json:"id"`
    SetsName          string `json:"name_sets"`
    GenerationName    string `json:"name_generation"`
    Id_generation     int    `json:"id_generation"`
    CreationDate      string `json:"creation_date"`
    Description       string `json:"description"`
}
