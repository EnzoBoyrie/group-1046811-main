import React, { useState, useEffect } from "react";


export default function GetUsersAdmin() {
  const [data, setData] = useState([]);

 
  const fetchData = async () => {
    console.log("Fetch la liste des utilisateurs");
    try {
      const response = await fetch("http://localhost:3001/api/users/admin", {
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
     
      <h1>Pokeshop Profile</h1>
      <div>
        <h2>Liste des dresseurs</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.id} {item.first_name} {item.last_name} {item.email} {item.password} {item.admin}
            </li>
          ))}
        </ul>
        <button onClick={fetchData}>Voir le compte</button>
      </div>
    </div>
  );
}


