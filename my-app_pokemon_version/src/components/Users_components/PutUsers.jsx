import { useState, useEffect } from "react";
import GetSetUsersService from "../../service/SetUsers";

export default function PutUsers() {
  const { data: allSets } = GetSetUsersService();
  const [id, setId] = useState('');

  const [first_name, setUserfirstname] = useState('');
  const [last_name, setUserlastname] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
 
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      console.log(id)
      const selectedSet = allSets.find((set) => set.id === parseInt(id));
      if (selectedSet) {
        setUserfirstname(selectedSet.first_name);
        setUserlastname(selectedSet.last_name);
        setUserEmail(selectedSet.email);
      }
    }
  }, [id, allSets]);

  const handlePutUsers = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion...");

      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, password}),
        credentials: 'include',
      });

      console.log("Données envoyées :", { first_name, last_name, email, password,});

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
        <h2>Modifier un utilisateur</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handlePutUsers}>
          <div>
            <label>
              Sélectionner l'email de l'utilisateur :
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner un Utilisateur avec son email --</option>
                {allSets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.email}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Prénom a modifier :
              <input
                type="text"
                placeholder="Entrez le prénom à modifier"
                value={first_name}
                onChange={(e) => setUserfirstname(e.target.value)} />
            </label>
          </div>

          <div>
            <label>
              Nom à modifier :
              <input
                type="text"
                placeholder="Entrez le nom a modifier"
                value={last_name}
                onChange={(e) => setUserlastname(e.target.value)} />
            </label>
          </div>

          <div>
            <label>
              Email a modifier :
              <input
                type="text"
                placeholder="Entrez le Email à modifier"
                value={email}
                onChange={(e) => setUserEmail(e.target.value)} />
            </label>
          </div>

          <div>
            <label>
              password à modiffier :
              <input
                type="text"
                placeholder="Entrer le password à modiffier "
                value={password}
                onChange={(e) => setUserPassword(e.target.value)} />
            </label>
          </div>


          <button type="submit">Modifier le Set</button>
        </form>
      </main>
    </div>
  );
}