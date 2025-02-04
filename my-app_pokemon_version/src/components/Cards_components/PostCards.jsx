import { useState, useEffect } from "react";
import GetSetsService from "../../service/Set";


export default function PostCards() {
  const { data: allSets } = GetSetsService();
  const [id, setId] = useState('');

  const [name_sets, setNameSets] = useState('');

  const [title, setCardtitle] = useState('');
  const [id_pokemon, setCardid_pokemon] = useState();
  const [type_pokemon, setCardtype_pokemon] = useState('');
  const [id_sets] = useState('');
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
      const selectedSet = allSets.find((set) => set.id === parseInt(id));
      if (selectedSet) {
        setNameSets(selectedSet.name_sets);
      }
    }
  }, [id, allSets]);

  const handlePostCard = async (e) => {
    e.preventDefault();

    console.log("test 1")

    try {
      console.log("tentative de conexcion...");

      const cardData = {
        title,
        id_pokemon: parseInt(id_pokemon, 0),
        type_pokemon,
        id_sets: parseInt(id, 0),
        release_date,
        resum,
        stock: parseInt(stock, 0),
        price: parseFloat(price),
        illustration_rare,
        illustration_speciale_rare,
        illustration_hyper_rare,
      };

      const response = await fetch('http://localhost:3001/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
        credentials: 'include',
      });

      console.log( title, id_pokemon, type_pokemon, id_sets, release_date, resum, stock, price, name_sets, illustration_rare, illustration_speciale_rare, illustration_hyper_rare );

      console.log("reponce reçue :", response);


      if (!response.ok) {
        const errorData = await response.json();
        console.log("err envoyer par le serv :", errorData);
        throw new Error(errorData.message || 'err  de la connexion');
      }
      window.location.reload();
    } catch (err) {
      console.log("Une erreur s'est produite :", err);
      setMessage(err.message);
    }

    
  };

  return (
    <div>

      <main>

        <h2>Ajouter une Carte</h2>


        {message && <p>{message}</p>}

        <form onSubmit={handlePostCard}>

          <div>
            <label>
              Nom de la carte  :
              <input
                type="texte"
                placeholder="Entrer nom de la carte "
                value={title}
                onChange={(e) => setCardtitle(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Numéro du Pokémon  :
              <input
                type="number"
                placeholder="Entré l'id du pokémon"
                value={id_pokemon}
                onChange={(e) => setCardid_pokemon(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Type du pokémon:
              <select
                value={type_pokemon}
                onChange={(e) => setCardtype_pokemon(e.target.value)} required>

                <option value="">-- Sélectionner une type de pokémon --</option>
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
            Selectionner
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
            La date de créaton de la carte :
              <input
                type="date"
                placeholder="Entrez la date de création de la carte"
                value={release_date}
                onChange={(e) => setCardrelease_date(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
            Description de la carte :
              <input
                type="texte"
                placeholder="Entrez la description de la carte"
                value={resum}
                onChange={(e) => setCardresum(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
            Le stock de la carte :
              <input
                type="number"
                placeholder="Entrez le stock de la carte"
                value={stock}
                onChange={(e) => setCardstock(e.target.value)}
                required
              />
            </label>
          </div>
          
          <div>
            <label>
            Le prix de la carte :
              <input
                type="number" step="0.01"
                placeholder="Entrez le prix de la carte"
                value={price}
                onChange={(e) => setCardprice(e.target.value)}
                required
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

          <button type="submit">Ajout de la carte</button>

        </form>
      </main>
    </div>
  );
}