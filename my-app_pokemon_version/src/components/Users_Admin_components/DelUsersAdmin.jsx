import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetSetUsersAdminService from "../../service/SetUsersAdmin";
import { handleLogout } from "../../service/Logout";

export default function DelUsersAdmin() {

  const { data: allSets } = GetSetUsersAdminService();

  const [id, setId] = useState('');
  const [first_name, setUserfirstname] = useState('');
  const [last_name, setUserlastname] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [admin, setUserAdmin] = useState(false);

  const [message, setMessage] = useState('');

  const navigate = useNavigate();


  const currentUserId = 1;

  useEffect(() => {
    if (id) {
      const selectedSet = allSets.find((set) => set.id === parseInt(id));
      if (selectedSet) {
        setUserfirstname(selectedSet.first_name);
        setUserlastname(selectedSet.last_name);
        setUserEmail(selectedSet.email);
        setUserPassword(selectedSet.password);
        setUserAdmin(selectedSet.admin);
      }
    }
  }, [id, allSets]);

  const handleDelSets = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/users/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, password, admin }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const data = await response.json();
      console.log(data);
      setMessage("Suppression réussie !");



      if (parseInt(id) === currentUserId) {
        handleLogout();
        navigate('/#');
      }

    } catch (err) {
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
              Sélectionner l'email de l'utilisateur :
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner un email pour supprimer un compte--</option>
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
