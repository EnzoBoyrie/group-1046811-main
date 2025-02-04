import { useState, useEffect } from "react";
import GetGenerationsService from "../../service/SetGenerations";


export default function PostSets() {
  const { data: allGenerations } = GetGenerationsService();
  const [id, setId] = useState(0);
 
  const [name_generation, setSetsname_generation] = useState('');

  let id_generation = 0

  const [name_sets, setSetsnamesets] = useState('');
  const [creation_date, setSetscreationdate] = useState('');
  const [description, setSetsdescription] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      const selectedGenerations = allGenerations.find((set) => set.id === parseInt(id));
      if (selectedGenerations) {
        setSetsname_generation(selectedGenerations.name_generation);
      }
      
    }
  }, [id, allGenerations]);

  id_generation = Number(id)

  console.log(typeof id_generation);
  

  const handlePostSets = async (e) => {
    e.preventDefault(); 

    try {
      console.log("tentative de conexcion...");

      const cardData = {
        name_sets,
        creation_date,
        description,
        name_generation,
        id_generation,
      };
      
      console.log(name_generation)

      const response = await fetch('http://localhost:3001/api/sets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name_sets,creation_date,description, name_generation, id_generation, cardData }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log("err envoyer par le serv :", errorData);
        throw new Error(errorData.message || 'err  de la connexion');
      }

    } catch (err) {
      console.log("Une erreur s'est produite :", err);
      setMessage(err.message); 
    }
  };

  return (
    <div>
    
      <main>
      
        <h2>Ajoute ton Set</h2>
        
        
        {message && <p>{message}</p>}

        <form onSubmit={handlePostSets}>

        <div>
            <label>
              Nom du sets  :
              <input 
                type="texte" 
                placeholder="Entrez le nom du set" 
                value={name_sets}
                onChange={(e) => setSetsnamesets(e.target.value)} 
                required 
              />
            </label>
          </div>

          
          <div>
            Selectionner géneration
          <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner une géneration --</option>
                {allGenerations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_generation}
                  </option>
                ))}
              </select>
          </div>


          <div>
            <label>
              Date de sortie:
              <input 
                type="date" 
                placeholder="Entrez la date de sortie du set" 
                value={creation_date}
                onChange={(e) => setSetscreationdate(e.target.value)} 
                required 
              />
            </label>
          </div>

          <div>
            <label>
            Description du set :
              <input 
                type="texte" 
                placeholder="Entrez la description du set" 
                value={description}
                onChange={(e) => setSetsdescription(e.target.value)} 
                required 
              />
            </label>
          </div>

          <button type="submit">Ajout du set</button>
          
        </form>
      </main>
    </div>
  );
}