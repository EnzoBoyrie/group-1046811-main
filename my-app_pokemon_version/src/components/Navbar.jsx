import React from "react";
import { Link } from "react-router-dom";
import { handleLogout } from "../service/Logout";
import Test from "../pages/test";




  
  

function Navbar() {
  return (
    <div className="navbar-center">
      <ul className="nav-links">
        <Link to="/"><button>Home</button></Link>
        <Link to="/signin"><button>Connexion</button></Link>
        <Link to="/signup"><button>Inscription</button></Link>
        <Link to="/users"><button>Users</button></Link>
        <Link to="/users/admin"><button>UsersAdmin</button></Link>
        <Link to="/purchase"><button>Achat</button></Link>
        <Link to="/cards"><button>Les cartes</button></Link>
        <Link to="/sets"><button>Les sets</button></Link>
        <Link to="/generations"><button>Les Generation</button></Link>
        <Link to="/#" onClick={handleLogout}><button>Déconnexion</button></Link>
        <Link to="/test" onClick={Test}><button>test</button></Link>
        <Link to="/bar"><button>Bar</button></Link>
        <Link to="/imageUploaderCards"><button>ImageUploaderCards</button></Link>
        <Link to="/imageUploaderSets"><button>ImageUploaderSets</button></Link>
        <Link to="/imageUploaderGenerations"><button>ImageUploaderGenerations</button></Link>

      </ul>
    </div>
  );
}

export default Navbar;
