import { useState, useEffect } from "react";
import GetSetsService from "../../service/Set";

export default function PutSets() {
  const { data: allSets } = GetSetsService();
  const [id, setId] = useState('');
  const [name_sets, setNameSets] = useState('');
  const [name_generation, setNameGeneration] = useState('');
  const [creation_date, setCreationDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      console.log(id)
      const selectedSet = allSets.find((set) => set.id === parseInt(id));
      if (selectedSet) {
        setNameSets(selectedSet.name_sets);
        setNameGeneration(selectedSet.name_generation);
        setCreationDate(selectedSet.creation_date);
        setDescription(selectedSet.description);
      }
    }
  }, [id, allSets]);

  const handlePutSets = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion...");

      const response = await fetch(`http://localhost:3001/api/sets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name_sets, name_generation, creation_date, description }),
        credentials: 'include',
      });

      console.log("Données envoyées :", { name_sets, name_generation, creation_date, description });

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
        <h2>Modifier un Set</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handlePutSets}>
          <div>
            <label>
              Sélectionner l'ID du Set :
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner un Set --</option>
                {allSets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_sets}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Nom du Set :
              <input
                type="text"
                placeholder="Entrez le nom du set"
                value={name_sets}
                onChange={(e) => setNameSets(e.target.value)}/>
            </label>
          </div>

          <div>
            <label>
              Sélection de la gen :
              <select
                value={id}
                onChange={(e) => setNameGeneration(e.target.value)}
                required
              >
                <option value="">-- Sélectionner un gen --</option>
                {allSets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_generation}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Date de sortie :
              <input
                type="date"
                placeholder="Entrez la date de sortie du set"
                value={creation_date}
                onChange={(e) => setCreationDate(e.target.value)}/>
            </label>
          </div>

          <div>
            <label>
              Description du set :
              <input
                type="text"
                placeholder="Entrez la description du set"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            </label>
          </div>

          <button type="submit">Modifier le Set</button>
        </form>
      </main>
    </div>
  );
}
