import { useState } from "react";


function GetSets() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log("Fetch la liste des sets");
    try {
      const response = await fetch("http://localhost:3001/api/sets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
  
      console.log("Réponse brute : ", response); 
  
      if (response.ok) {
        const data = await response.json();
        console.log("Données reçues : ", data); 
        setData(data.sets || []);
      } else {
        console.error("Erreur du fetch des sets", response.status);
      }
    } catch (err) {
      console.log("Une erreur s'est produite :", err);
    }
  };

  return (
    <div>
      <h1>Pokeshop sets</h1>
      <div>
        <h2>Liste des Sets</h2>
        <ul>
          {Array.isArray(data) && data.map((item) => (
            <li key={item.id}>
              {item.id} {item.name_sets} {item.name_generation} {item.creation_date} {item.description}
            </li>
          ))}
        </ul>
        <button onClick={fetchData}>Voir les sets disponible</button>
      </div>
    </div>
  );
}

export default GetSets;