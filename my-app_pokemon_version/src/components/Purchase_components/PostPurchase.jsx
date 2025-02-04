import { useState, useEffect } from "react";
import GetSetCardService from "../../service/SetCards";

export default function PostPurchase() {
  const { data: allCards } = GetSetCardService();
  const [idCard, setIdCard] = useState("");
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");

 
  useEffect(() => {
    if (idCard) {
      const selectedCard = allCards?.find((card) => card.id === parseInt(idCard, 10));
      if (selectedCard) {
        setTitle(selectedCard.title);
        setQuantity(selectedCard.quantity || 0); 
      }
    }
  }, [idCard, allCards]);

  
  const handlePurchase = async (e) => {
    e.preventDefault();
  
    try {
      const cardData = [
        {
          card_id: parseInt(idCard, 10),
          quantity: parseInt(quantity, 10),
        },
      ];
  
      const response = await fetch("http://localhost:3001/api/purchase_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Données envoyées :", {title });
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      setMessage('Carte modifiée avec succès.');
      window.location.reload();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <main>
        <h2>Achat de Carte</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handlePurchase}>
          <label>
            Sélectionnez une carte :
            <select
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              required
            >
              <option value="">-- Sélectionnez une carte --</option>
              {allCards?.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.title}
                </option>
              ))}
            </select>
          </label>
          <div>
            <label>
              Quantité :
              <input
                type="number"
                placeholder="Entrez la quantité"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Acheter</button>
        </form>
      </main>
    </div>
  );
}
