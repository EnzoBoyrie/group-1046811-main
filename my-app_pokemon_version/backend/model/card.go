package model


type Card struct {
   ID                         int     `json:"id"`
   Title                      string  `json:"title"` 
   PokemonID                  int     `json:"id_pokemon"`  
   PokemonType                string  `json:"type_pokemon"`
   SetsID                     int     `json:"id_sets"`     
   ReleaseDate                string  `json:"release_date"`
   Resum                      string  `json:"resum"`
   Stock                      int     `json:"stock"`
   Price                      float64 `json:"price"`
   Illustration_Rare          bool    `json:"illustration_rare"`
   Illustration_Speciale_Rare bool    `json:"illustration_speciale_rare"`
   Illustration_Hyper_Rare         bool    `json:"illustration_hyper_rare"`

}
