import { useState, useEffect } from "react";

export default function GetSetCardService() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetch la liste des set");
      try {
        const response = await fetch("http://localhost:3001/api/cards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log("Réponse de reçue:", data);
        } else {
          console.error("Erreur lors du fetch des sets", response.status);
        }
      } catch (err) {
        console.error("Une erreur s'est produite :", err);
      }
    };

    fetchData();
  }, []);

  return { data };
}
