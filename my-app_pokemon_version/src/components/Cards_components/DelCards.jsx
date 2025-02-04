import { useState, useEffect } from "react";
import GetSetCardService from "../../service/SetCards";

export default function DelCards() {
  const { data: allCards } = GetSetCardService();
  const [id, setId] = useState('');


  const [title, setCardtitle] = useState('');
  const [id_pokemon, setCardid_pokemon] = useState();
  const [type_pokemon, setCardtype_pokemon] = useState('');
  const [id_sets, setCardid_sets] = useState();
  const [release_date, setCardrelease_date] = useState('');
  const [resum, setCardresum] = useState('');
  const [stock, setCardstock] = useState();
  const [price, setCardprice] = useState();
  const [illustration_rare, setCardillustration_rare] = useState(false);
  const [illustration_speciale_rare, setCardillustration_speciale_rare] = useState(false);
  const [illustration_hyper_rare, setCardillustration_hyper] = useState(false);

  const [message, setMessage] = useState('');


  useEffect(() => {
    if (id) {
      const selectedcards = allCards.find((cards) => cards.id === parseInt(id));
      if (selectedcards) {
        setCardtitle(selectedcards.title);
        setCardid_pokemon(selectedcards.id_pokemon);
        setCardtype_pokemon(selectedcards.type_pokemon);
        setCardid_sets(selectedcards.id_sets);
        setCardrelease_date(selectedcards.release_date);
        setCardresum(selectedcards.resum);
        setCardstock(selectedcards.stock);
        setCardprice(selectedcards.price);
        setCardillustration_rare(selectedcards.illustration_rare);
        setCardillustration_speciale_rare(selectedcards.illustration_speciale_rare);
        setCardillustration_hyper(selectedcards.illustration_hyper);

      }
    }
  }, [id, allCards]);

  const handleDelCards = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion...");

      const response = await fetch(`http://localhost:3001/api/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, id_pokemon, type_pokemon, id_sets, release_date, resum, stock, price, illustration_rare, illustration_speciale_rare, illustration_hyper_rare }),
        credentials: 'include',
      });

      console.log("Données envoyées :", { title, id_pokemon, type_pokemon, id_sets, release_date, resum, stock, price, illustration_rare, illustration_speciale_rare, illustration_hyper_rare  });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur envoyée par le serveur :", errorData);
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const data = await response.json();
      console.log("Réponse reçue :", data);
      setMessage("Suppresion réussie !");
      window.location.reload();
    } catch (err) {
      console.log("Une erreur s'est produite :", err);
      setMessage(err.message);
    }
  };

  return (
    <div>
      <main>
        <h2>Supprimer une Carte</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleDelCards}>
          <div>
            <label>
              Sélectionner le nom de la carte à supprimer :
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner un Carte à supprimer --</option>
                {allCards.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Supprimer la carte</button>
        </form>
      </main>
    </div>
  );
}
