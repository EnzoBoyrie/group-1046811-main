import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import GetSetUsersService from "../../service/SetUsers";
import { handleLogout } from "../../service/Logout";  

export default function DelUsers() {
  
  const { data: allSets } = GetSetUsersService();

  const [id, setId] = useState('');
  
  const [first_name, setUserfirstname] = useState('');
  const [last_name, setUserlastname] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); 

  useEffect(() => {
    if (id) {
      console.log(id);
      const selectedSet = allSets.find((set) => set.id === parseInt(id));
      if (selectedSet) {
        setUserfirstname(selectedSet.first_name);
        setUserlastname(selectedSet.last_name);
        setUserEmail(selectedSet.email);
        setUserPassword(selectedSet.password);
      }
    }
  }, [id, allSets]);

  const handleDelSets = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion...");

      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, password }),
        credentials: 'include',
      });

      console.log("Données envoyées :", { first_name, last_name, email, password });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur envoyée par le serveur :", errorData);
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const data = await response.json();
      console.log("Réponse reçue :", data);
      setMessage("Mise à jour réussie !");

      
      handleLogout();  

      
      navigate('/#'); 

    } catch (err) {
      console.log("Une erreur s'est produite :", err);
      setMessage(err.message);
    }
  };

  return (
    <div>
      <main>
        <h2>Supprimer un utilisateur</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleDelSets}>
          <div>
            <label>
              Sélectionner email de l'utilisateur :
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner votre email pour supprimer votre compte--</option>
                {allSets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.email}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">
            Supprimer l'utilisateur + Déconnexion
          </button>
        </form>
      </main>
    </div>
  );
}
