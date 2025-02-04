import { useState } from "react";


function GetGenerations() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log("Fetch la liste des generations");
    try {
      const response = await fetch("http://localhost:3001/api/generations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        setData(data.generations || []); 
        console.log("Réponse reçue:", data); 
        
        
        
      } else {
        console.error("Erreur lors du fetch des Generations", response.status);
      }
    } catch (err) {
      console.log("Une erreur s'est produite :", err);
    }
  };

  return (
    <div>
      <h1>Pokeshop Génerations</h1>
      <div>
        <h2>Liste des Generations</h2>
        <ul>
          {Array.isArray(data) && data.map((item) => (
            <li key={item.id}>
              {item.id} {item.name_generation} {item.creation_date} {item.description}
            </li>
          ))}
        </ul>
        <button onClick={fetchData}>Je montre les Generations dispo</button>
      </div>
    </div>
  );
}

export default GetGenerations;