import { useState, useEffect } from "react";

export default function GetSetsService() {
  const [data, setData] = useState([]);

  useEffect(() => {
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

        if (response.ok) {
          const data = await response.json();
          setData(data.sets || []);
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

  console.log("Contenue de data:", data)
  return { data };
}
