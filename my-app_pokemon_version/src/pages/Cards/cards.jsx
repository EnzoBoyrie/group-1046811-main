import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import GetSetCardService from "../../service/SetCards";
import "../../css/incards.css"
import Header from "../../components/Header.jsx"

export default function CardById() {
  const { id } = useParams();
  const { data: allCard } = GetSetCardService();

  const numericId = Number(id);

  const filteredCard = allCard.filter((item) => item.id === numericId);
  console.log(filteredCard);

  return (
    <>
      <Header className="header-inside-card" />
      <div className="all-body-card">
          <div className="card-box-all">
            {filteredCard.map((item) => (
              <div key={item.id}>
                <div className="card-box">
                  <img
                    src={`http://localhost:3001/images/cards/${item.id}.png`}
                    alt={item.description}
                    className="card-img"
                  />
                  <div className="card-text">
                    <div className="card-header-box">
                      <h1 className="card-title">
                        {item.title}
                      </h1>
                      <p className="card-type">{item.type_pokemon}</p>
                      <p className="release-date">{item.release_date}</p>
                      <p className="release-date">{item.stock} unité</p>
                    </div>
                    <div className="card-body-box">
                      <p className="card-description">{item.resum}</p>
                    </div>

                  </div>

                </div>

              </div>


            ))}
          </div>
        </div>
      {numericId === 51 ? (
        <>
        <div>
          
          <a className="empty-cart-message"href="/LE_FERDETER_DE_JUAN"> le fer de terre de juan </a>
          </div>
       
        </>
      ) : (
        <>
        </>
      )
      }</>
  );
}
