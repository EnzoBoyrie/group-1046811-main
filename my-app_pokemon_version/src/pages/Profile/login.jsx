import { useState } from "react";
import { useNavigate } from "react-router";
import "../../css/login.css";
import { handleLogout } from "../../service/Logout";
import Header from "../../components/Header.jsx"



export default function SignIn() {
  const [email, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      console.log("tentative de conexcion...");

      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      console.log("test", password, email);

      console.log("reponse reçue :", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("err envoyer par le serv :", errorData);
        throw new Error(errorData.message || "err  de la connexion");
      }

      const data = await response.json();

      const expires = new Date();
      expires.setHours(expires.getHours() + 1);

      console.log("Token jwt stocké dans le cookie.");

      console.log("Conexion");
      console.log("donnée reçu :", data);

      alert("Vous êtes connecté");

      navigate("/");
    } catch (err) {
      console.log("Une erreur s'est produite :", err);
      alert(err);
    }
  };

  return (
    <>
<Header />
      <div className="login-main">
        <div>
          <form onSubmit={handleSignIn}>
            <div className="login-box-login">
              <div className="login-header">
                <header>Connexion</header>
              </div>
              <div className="input-box-login">
                <input
                  type="text"
                  className="input-field-login"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setUsermail(e.target.value)}
                  autoComplete="Off"
                  required
                />
              </div>
              <div className="input-box-login">
                <input
                  type="password"
                  className="input-field-login"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="Off"
                  required
                />
              </div>
              <div className="forgot">
                <section className="section-login">
                
                </section>
              </div>
              <div className="input-submit-login">
                <button className="submit-btn" id="submit"></button>
                <label htmlFor="submit">Connexion</label>
              </div>
              <div className="sign-up-link">
                <p>
                  Vous n'avez pas de compte?/
                  <a href="/register">S'enregistrer</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}