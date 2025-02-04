import { useState, useEffect } from "react";
import GetGenerationsService from "../../service/SetGenerations";

export default function PutGenerations() {
  const { data: allGenerations } = GetGenerationsService();
  const [id, setId] = useState('');

  const [name_generation, setNameGeneration] = useState('');
  const [creation_date, setCreationDate] = useState('');
  const [description, setDescription] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      console.log(id)
      const selectedGenerations = allGenerations.find((set) => set.id === parseInt(id));
      if (selectedGenerations) {
      
        setNameGeneration(selectedGenerations.name_generation);
        setCreationDate(selectedGenerations.creation_date);
        setDescription(selectedGenerations.description);
      }
    }
  }, [id, allGenerations]);

  const handlePutGenerations = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion...");

      const response = await fetch(`http://localhost:3001/api/generations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name_generation, creation_date, description }),
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
        <h2>Modifier une Géneration</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handlePutGenerations}>
          <div>
            <label>
              Sélectionner l'ID de la Generations :
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner une Generations --</option>
                {allGenerations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_generation}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Nom de la Géneration :
              <input
                type="text"
                placeholder="Entrez le nom de la Generation"
                value={name_generation}
                onChange={(e) => setNameGeneration(e.target.value)}/>
            </label>
          </div>

      

          <div>
            <label>
              Date de sortie :
              <input
                type="date"
                placeholder="Entrez la date de sortie de la Géneration"
                value={creation_date}
                onChange={(e) => setCreationDate(e.target.value)}/>
            </label>
          </div>

          <div>
            <label>
              Description de la Generation :
              <input
                type="text"
                placeholder="Entrez la description de la Géneration"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            </label>
          </div>

          <button type="submit">Modifier la Géneration</button>
        </form>
      </main>
    </div>
  );
}
