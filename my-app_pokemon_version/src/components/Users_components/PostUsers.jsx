import { useState } from "react";


export default function PostUsers() {
  
 
  const [first_name, setUserfirstname] = useState('');
  const [last_name, setUserlastname] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  
  const [message, setMessage] = useState('');

  

  const handlePostUsers = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion...");

      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name,last_name,email,password }),
        credentials: 'include',
      });
      
      console.log("test",first_name,last_name,email,password);

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
  };

  return (
    <div>
      
      <main>
      <h1>Bienvenue au Pokeshop</h1>
        <h2>Inscritpion au Pokeshop</h2>
        <p>Inscris toi dans le merveilleux magasin Pokeshop</p>
        
        {message && <p>{message}</p>}

        <form onSubmit={handlePostUsers}>

        <div>
            <label>
              Prénom du dresseur  :
              <input 
                type="firstname" 
                placeholder="Entrez votre prénom" 
                value={first_name}
                onChange={(e) => setUserfirstname(e.target.value)} 
                required 
              />
            </label>
          </div>

        <div>
            <label>
              Nom du dresseur :
              <input 
                type="lastname" 
                placeholder="Entrez votre nom" 
                value={last_name}
                onChange={(e) => setUserlastname(e.target.value)} 
                required 
              />
            </label>
          </div>

          <div>
            <label>
              Mail du dresseur :
              <input 
                type="email" 
                placeholder="Entrez votre mail" 
                value={email}
                onChange={(e) => setUserEmail(e.target.value)} 
                required 
              />
            </label>
          </div>

          <div>
            <label>
              Mot de passe :
              <input 
                type="password" 
                placeholder="Entrez votre mot de passe" 
                value={password}
                onChange={(e) => setUserPassword(e.target.value)} 
                required 
              />
            </label>
          </div>

        

          <button type="submit">Inscription</button>
          
        </form>
      </main>
    </div>
  );
}