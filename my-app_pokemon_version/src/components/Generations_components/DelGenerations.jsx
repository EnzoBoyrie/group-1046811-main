import { useState, useEffect } from "react";
import GetGenerationsService from "../../service/SetGenerations";

export default function DelGenerations() {
  const { data: allGen } = GetGenerationsService();
  const [id, setId] = useState('');

  const [name_generation, setNameGeneration] = useState('');
  const [creation_date, setCreationDate] = useState('');
  const [description, setDescription] = useState('');
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      const selectedGenerations = allGen.find((set) => set.id === parseInt(id));
      if (selectedGenerations ) {
      
        setNameGeneration(selectedGenerations.name_generation);
        setCreationDate(selectedGenerations.creation_date);
        setDescription(selectedGenerations.description);
      }
    }
  }, [id, allGen]);

  const handleDelGenerations = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion...");

      const response = await fetch(`http://localhost:3001/api/generations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name_generation, creation_date, description }),
        credentials: 'include',
      });

      console.log("Données envoyées :", {name_generation, creation_date, description });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur envoyée par le serveur :", errorData);
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const data = await response.json();
      console.log("Réponse reçue :", data);
      setMessage("Mise à jour réussie !");
    } catch (err) {
      console.log("Une erreur s'est produite :", err);
      setMessage(err.message);
    }
    window.location.reload();
  };

  return (
    <div>
      <main>
        <h2>Supprimer une Géneration</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleDelGenerations}>
          <div>
            <label>
              Sélectionner le nom de la Generation :
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                required>
                <option value="">-- Sélectionner une Generations à suprmier --</option>
                {allGen.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_generation }
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit">Suprmier la Generations </button>
        </form>
      </main>
    </div>
  );
}
