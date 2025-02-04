import { useState } from "react";


export default function PostGenerations() {
  
 
  const [name_generation, setNameGeneration] = useState('');
  const [creation_date, setCreationDate] = useState('');
  const [description, setDescription] = useState('');

  const [message, setMessage] = useState('');

  
  const handlePostGenerations = async (e) => {
    e.preventDefault(); 

    try {
      console.log("tentative de conexcion...");

      
      const response = await fetch('http://localhost:3001/api/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name_generation,creation_date,description }),
        credentials: 'include',
      });
      
      console.log("test",name_generation,creation_date,description);

      console.log("reponce reçue :", response);

      
      if (!response.ok) {
        const errorData = await response.json();
        console.log("err envoyer par le serv :", errorData);
        throw new Error(errorData.message || 'err  de la connexion');
      }

    } catch (err) {
      console.log("Une erreur s'est produite :", err);
      setMessage(err.message); 
    }

    window.location.reload();
  };

  return (
    <div>
    
      <main>
      
        <h2>Ajoute ta géneration</h2>
        
        
        {message && <p>{message}</p>}

        <form onSubmit={handlePostGenerations}>

    

        <div>
            <label>
              Nom de la géneration  :
              <input 
                type="texte" 
                placeholder="Entrez le nom de la Géneration" 
                value={name_generation}
                onChange={(e) => setNameGeneration(e.target.value)} 
                required 
              />
            </label>
          </div>


          <div>
            <label>
              Date de sortie:
              <input 
                type="date" 
                placeholder="Entrez la date de sortie du Géneration" 
                value={creation_date}
                onChange={(e) => setCreationDate(e.target.value)} 
                required 
              />
            </label>
          </div>

          <div>
            <label>
            Description de la Géneration :
              <input 
                type="texte" 
                placeholder="Entrez la descrription de la Géneration" 
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                required 
              />
            </label>
          </div>

          <button type="submit">Ajout de la Géneration</button>
          
        </form>
      </main>
    </div>
  );
}