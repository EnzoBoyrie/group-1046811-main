import { useParams } from "react-router-dom";
import GetGenerationsService from "../../service/SetGenerations";
import Navbar from "../../components/Navbar";
import GetSetsService from "../../service/Set";
import "../../css/sets.css"
import Header from "../../components/Header.jsx"

export default function GenerationsById() {
  const { id } = useParams();
  const { data: allSet } = GetSetsService();
  const { data: allGen } = GetGenerationsService();

  const filteredSets = allSet.filter((item) => item.name_generation === id);
  const filteredGen = allGen.filter((item) => item.name_generation === id);

  console.log("test", filteredGen)
  console.log("test id", filteredGen.id)

  return (
    <>
      {/* <Navbar /> */}
      <Header />
      {filteredGen.map((item) => (
        <div key={item.id} className="gen-sets-title-box">
          <img
            src={`http://localhost:3001/images/generations/${item.id}.png`}
            className="gen-sets-image"
          />
          <div className="gen-sets-description-box">
            <p className="gen-sets-description">
              {item.description}
            </p>
            <div className="gen-sets-creation-date-wrapper">
              <div className="gen-sets-creation-date">
                {item.creation_date}
              </div>
            </div>
          </div>
        </div>


      ))}
      
      {filteredSets.length === 0 ? (
        <>
        <h1 className="cart-title">Nous allons bientôt ajouter du contenu</h1>
        <p className="empty-cart-message">Notre employé s'en occupe! </p>
        <a className="img-no-sets">
        <img src={require("../../img/ronfleex.gif")} className="img-of-ronflex"/>
        </a>
        </>
      ) : (
      <div className="container-set">
        <ul className="sets-list grid">
          {filteredSets.map((item) => (
            <li key={item.id} className="set-item">
              <a href={`/sets/${item.name_sets}`} className="set-link">
                <img
                  src={`http://localhost:3001/images/sets/${item.id}.png`}
                  className="set-image"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      )
    }
    </>
  );
}
