package model

import (
   "time"
   
)

type Purchase_history struct {
   ID            int       `json:"id"`
   UserID        int       `json:"user_id"`
   CardID        int       `json:"card_id"`
   Quantity      int       `json:"quantity"`
   PriceTotal    float64   `json:"price_total"`
   PurchaseDate  time.Time `json:"purchase_date"`
}
