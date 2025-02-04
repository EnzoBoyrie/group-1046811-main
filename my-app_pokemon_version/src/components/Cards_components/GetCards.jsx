import { useState } from "react";

function GetCards() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log("Fetch la liste des sets");
    try {
      const response = await fetch("http://localhost:3001/api/cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        setData(data);
        console.log("donner recu :", data);
      } else {
        console.error("Erreur lors du fetch des user", response.status);
      }
    } catch (err) {
      console.log("Une erreur s'est produite :", err);
    }
  };

  return (
    <div>
      {/* <h1>Pokeshop Carte</h1> */}
      <div>
        <h2>Liste des Cartes</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.id} {item.title} {item.id_pokemon} {item.type_pokemon}{" "}
              {item.id_sets} {item.release_date} {item.resum} {item.stock}{" "}
              {item.price} {item.illustration_rare}{" "}
              {item.illustration_speciale_rare} {item.illustration_hyper_rare}
            </li>
          ))}
        </ul>
        <button onClick={fetchData}>Je montre les cartes dispo</button>
      </div>
    </div>
  );
}

export default GetCards;
