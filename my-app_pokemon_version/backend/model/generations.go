package model


type Generations struct {
    ID                int    `json:"id"`
    GenerationName    string `json:"name_generation"`
    CreationDate     string  `json:"creation_date"`
    Description       string `json:"description"`
}
