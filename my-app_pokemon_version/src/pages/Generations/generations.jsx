import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import GetGenerationsService from "../../service/SetGenerations";
import "../../css/gnerations.css";

export default function Generations() {
const { data: allGen } = GetGenerationsService();

  return (
    <div>
      {/* <Navbar /> */}
      <Header />
      <img src={require("../../img/Pokemon-Logo.png")} alt="Description de l'image" className="gen-sets-image"/>
      <div className="container-set">
      <ul className="gen-list grid">
        {allGen.map((item) => (
          <li key={item.id} value={item.id} className="gen-item">
            <a href={`generations/${item.name_generation}`} className="gen-link">
            <img src={`http://localhost:3001/images/generations/${item.id}.png`} alt="Description de l'image" className="gen-image"/>
            </a>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
