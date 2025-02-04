import React, { useState, useEffect } from "react";


export default function GetPurchaseUser() {
  const [data, setData] = useState([]);

 
  const fetchData = async () => {
    console.log("Fetch la liste des utilisateurs");
    try {
      const response = await fetch("http://localhost:3001/api/purchase_history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        console.log("Données reçues :", responseData);
      } else {
        console.error("Erreur lors du fetch des utilisateurs", response.status);
      }
    } catch (err) {
      console.error("Une erreur s'est produite :", err);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
     
      <h1>Pokeshop Voir les achat des user effectuer USER</h1>
      <div>
        <h2>Liste de tous les achats</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.id} {item.user_id} {item.card_id} {item.quantity} {item.price_total} {item.purchase_date}
            </li>
          ))}
        </ul>
        <button onClick={fetchData}>Voir tous les achats éffectués</button>
      </div>
    </div>
  );
}


