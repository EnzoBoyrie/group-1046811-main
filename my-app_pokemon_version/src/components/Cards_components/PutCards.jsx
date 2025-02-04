import { useState, useEffect } from "react";
import GetSetsService from "../../service/Set";
import GetSetCardService from "../../service/SetCards";

export default function PutCards() {
  const { data: allCards } = GetSetCardService();
  const [id_carde, setId_carde] = useState('');

  const { data: allSets } = GetSetsService();
  const [id, setId] = useState('');
  const [title, setCardtitle] = useState('');
  const [id_pokemon, setCardid_pokemon] = useState();
  const [type_pokemon, setCardtype_pokemon] = useState('');
  const [release_date, setCardrelease_date] = useState('');
  const [resum, setCardresum] = useState('');
  const [stock, setCardstock] = useState();
  const [price, setCardprice] = useState();
  const [illustration_rare, setCardillustration_rare] = useState(false);
  const [illustration_speciale_rare, setCardillustration_speciale_rare] = useState(false);
  const [illustration_hyper_rare, setCardillustration_hyper] = useState(false);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id_carde) {
      const selectedcards = allCards.find((cards) => cards.id === parseInt(id_carde));
      if (selectedcards) {
        setCardtitle(selectedcards.title);
        setCardid_pokemon(selectedcards.id_pokemon);
        setCardtype_pokemon(selectedcards.type_pokemon);
        setId(selectedcards.id_sets); 
        setCardrelease_date(selectedcards.release_date);
        setCardresum(selectedcards.resum);
        setCardstock(selectedcards.stock);
        setCardprice(selectedcards.price);
        setCardillustration_rare(selectedcards.illustration_rare);
        setCardillustration_speciale_rare(selectedcards.illustration_speciale_rare);
        setCardillustration_hyper(selectedcards.setCardillustration_hyper);

       
      }
    }
  }, [id_carde, allCards]);

  const handlePostCard = async (e) => {
    e.preventDefault();

    try {
      const cardData = {
        title,
        id_pokemon: parseInt(id_pokemon, 10),
        type_pokemon,
        id_sets: parseInt(id, 10),
        release_date,
        resum,
        stock: parseInt(stock, 10),
        price: parseFloat(price),
        illustration_rare,
        illustration_speciale_rare,
        illustration_hyper_rare,
      };

      const response = await fetch(`http://localhost:3001/api/cards/${id_carde}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log( title, id_pokemon, type_pokemon,  release_date, resum, stock, price, illustration_rare, illustration_speciale_rare, illustration_hyper_rare );
        throw new Error(errorData.message || 'Erreur de connexion');
        
      }

      setMessage('Carte modifiée avec succès.');
      window.location.reload();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <main>
        <h2>Modifier une Carte</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handlePostCard}>
          <label>
            Sélectionner le nom de la carte :
            <select
              value={id_carde}
              onChange={(e) => setId_carde(e.target.value)}
              required
            >
              <option value="">-- Sélectionner une carte --</option>
              {allCards?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <div>
            <label>
              Nom du Pokémon à modifier :
              <input
                type="text"
                placeholder="Entrez le nom du Pokémon à modifier"
                value={title}
                onChange={(e) => setCardtitle(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Numéro du Pokémon à modifier :
              <input
                type="number"
                placeholder="Entrez l'id du Pokémon à modifier"
                value={id_pokemon}
                onChange={(e) => setCardid_pokemon(Number(e.target.value))}
              />
            </label>
          </div>

          <div>
            <label>
              Type du Pokémon à modifier :
              <select
                value={type_pokemon}
                onChange={(e) => setCardtype_pokemon(e.target.value)}
              >
                <option value="">-- Sélectionner un type de Pokémon --</option>
                <option value="Acier">Acier</option>
                <option value="Combat">Combat</option>
                <option value="Dragon">Dragon</option>
                <option value="Eau">Eau</option>
                <option value="Électrik">Électrik</option>
                <option value="Fée">Fée</option>
                <option value="Feu">Feu</option>
                <option value="Glace">Glace</option>
                <option value="Insecte">Insecte</option>
                <option value="Normal">Normal</option>
                <option value="Plante">Plante</option>
                <option value="Poison">Poison</option>
                <option value="Psy">Psy</option>
                <option value="Roche">Roche</option>
                <option value="Sol">Sol</option>
                <option value="Spectre">Spectre</option>
                <option value="Ténèbres">Ténèbres</option>
                <option value="Vol">Vol</option>
                <option value="Stellaire">Stellaire</option>
              </select>
            </label>
          </div>

          <div>
            Selectionner un set à modifier
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
          </div>

          <div>
            <label>
              Date de création à modifier :
              <input
                type="date"
                value={release_date}
                onChange={(e) => setCardrelease_date(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Description de la carte à modifier :
              <input
                type="text"
                placeholder="Entrez la description à modifier"
                value={resum}
                onChange={(e) => setCardresum(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Le stock de la carte à modifier :
              <input
                type="number"
                placeholder="Entrez le stock à modifier"
                value={stock}
                onChange={(e) => setCardstock(Number(e.target.value))}
              />
            </label>
          </div>

          <div>
            <label>
              Le prix de la carte à modifier :
              <input
                type="number" step="0.01"
                placeholder="Entrez le prix à modifier"
                value={price}
                onChange={(e) => setCardprice(Number(e.target.value))}
              />
            </label>
          </div>

          <div>
            <label>
            illustration_rare à modifier :
              <select value={illustration_rare} onChange={(e) => setCardillustration_rare(e.target.value === "true")}>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </label>
          </div>

          <div>
            <label>
            illustration_speciale_rare à modifier :
              <select value={illustration_speciale_rare} onChange={(e) => setCardillustration_speciale_rare(e.target.value === "true")}>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </label>
          </div>

          <div>
            <label>
            illustration_hyper à modifier :
              <select value={illustration_hyper_rare} onChange={(e) => setCardillustration_hyper(e.target.value === "true")}>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </label>
          </div>

          <button type="submit">Modifier la carte</button>
        </form>
      </main>
    </div>
  );
}
