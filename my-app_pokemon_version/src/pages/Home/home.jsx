import { useAuth } from "../../service/Auth";
import { handleLogout } from "../../service/Logout";
import "../../css/home.css";
import Testbar from "../../components/SearchBar"

export default function Home() {
  const isAuthenticated = useAuth();

  return (
    <div className="menu inner-shadow">
         
      <header className="header_main">
      <a className="Logo" href="/">
      <img src={require("../../img/poke.png")} className="img-of-poke1"/>
      </a>
      
        {/* <a href="/">
        <h3 className="Logo">Logo</h3>
        </a> */}
        <nav className="link">
          <a href="/generations">Générations</a>
          {/* <a href="/sets">Extensions</a> */}
          <a href="/purchase">Achats</a>
          <Testbar/>
        </nav>

        <nav className="login-button">
          {!isAuthenticated ? (
            <>
              <a href="/login">S'identifier</a>
              <a href="/register">Nous rejoindre</a>
            </>
          ) : (
            <>
              <a href="/profile">Mon Profil</a>
              <a href="/#" onClick={handleLogout}>
                Déconnexion
                
              </a>
            </>
          )}
        </nav>
      </header>
      <img src={require("../../img/back.gif")} className="img-of-poke2"/>
      <main className="mainContent">
        <div className="boxMain">
          <h1 className="title">Bienvenue au Pokeshop</h1>
          <p className="lead">
            Un magasin pour acheter de belles cartes Pokemon
          </p>
          <a href="/generations">
            Nos produits
          </a>
        </div>
        {/* <img src={require("../../img/back.gif")} className="img-of-poke2"/> */}
      </main>
      {/* <img src={require("../../img/back.gif")} className="img-of-poke2"/> */}

      {/* Footer */}
      <footer className="footer">
        <p className="footer-credit">Pokestore est géré par la team rocket</p>
      </footer>
    </div>

  );
}
