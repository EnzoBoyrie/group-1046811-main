import { useState } from "react";
import "../../css/register.css";
import Header from "../../components/Header.jsx"
import { handleLogout } from "../../service/Logout";
import { Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router";


export default function SignUp() {

  const [first_name, setUsrfirstname] = useState("");
  const [last_name, setUserlastname] = useState("");
  const [email, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      console.log("tentative de conexcion...");

      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
        }),
        credentials: "include",
      });

      console.log("test", first_name, last_name, email, password);

      console.log("reponse reçue :", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("err envoyer par le serv :", errorData);
        throw new Error(errorData.message || "err connexion");
      } else {
        const data = await response.json();
        console.log("ça marche", data);
        alert("Compte crée !")
        navigate("/")


      }
    } catch (err) {
      console.log("Une erreur s'est produite :", err);
      setMessage(err.message);
    }
  };

  return (
    <>
      {message && <p>{message}</p>}
      <Header />
      <main className="register-main">
        <section className="container-register">
          <div className="register-header">
            <header>Nous Rejoindre</header>
          </div>
          <form onSubmit={handleSignIn} className="form-register">
            <div className="column-register">
              <div className="input-box-register">
                <label>Prénom</label>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={first_name}
                  onChange={(e) => setUsrfirstname(e.target.value)}
                />
              </div>
              <div className="input-box-register">
                <label>Nom</label>
                <input
                  type="text"
                  placeholder="Nom"
                  value={last_name}
                  onChange={(e) => setUserlastname(e.target.value)}
                />
              </div>
            </div>
            <div className="input-box-register">
              <label>Email</label>
              <input
                className="input-field-register"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setUsermail(e.target.value)}
              />
            </div>
            <div className="input-box-register">
              <label>Mot de passe</label>
              <input
                className="input-field-register"
                type="text"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Inscription</button>
          </form>
        </section>
      </main>
    </>
  );
}