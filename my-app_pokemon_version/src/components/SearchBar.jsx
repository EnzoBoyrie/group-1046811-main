import React, { useState } from "react";

export default function Testbar() {
  const SearchBar = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);

    const fetchData = async (value) => {
      try {
        const response = await fetch("http://localhost:3001/api/cards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          const filteredData = result.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          );
          setData(filteredData);
          console.log("Données reçues :", filteredData);
        } else {
          console.error("Erreur lors du fetch :", response.status);
        }
      } catch (err) {
        console.log("Une erreur s'est produite :", err);
      }
    };

    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    };

    return (
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Que cherches-tu ?"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />

        <div className="results">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="result-item">
                <a href={`/card/${item.id}`}>{item.title}</a>
              </div>
            ))
          ) : (
            input && <p>Aucun résultat trouvé.</p>
          )}
        </div>
      </div>
    );
  };

  return <SearchBar />;
}
