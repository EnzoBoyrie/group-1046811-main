import { useProfile } from "../../service/Info";
import { useAuth } from "../../service/Auth";
import NotFound from "../../components/NotFound";
import Header from "../../components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/profile.css";

import GetUsers from "../../components/Users_components/GetUsers";
import PutUsers from "../../components/Users_components/PutUsers";
import DelUsers from "../../components/Users_components/DelUsers";

import GetPurchaseUser from "../../components/Purchase_components/GetPurchaseUser";

const UserProfile = () => {
  const isAuthenticated = useAuth();
  const { user, loading, error } = useProfile();
  const [activeTab, setActiveTab] = useState(1);
  const [activeParametre, setActiveParametre] = useState(1);

  const handleTabClick = (tabNumber) => setActiveTab(tabNumber);
  const handleParametreClick = (ParametreNumber) => setActiveParametre(ParametreNumber);

  if (loading) {
    return <div className="loading-message">Chargement du profil...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        {!isAuthenticated ? <NotFound /> : <p>Erreur : {error}</p>}
      </div>
    );
  }

  if (user && user.length > 0) {
    const { first_name, last_name, email, admin } = user[0];

    return (
      <>
        <Header />
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-title">
              Profil de {first_name} {last_name}
            </h1>
            <p className="profile-email">Email : {email}</p>
          </div>

          <div className="profile-bar">
            <button
              className={`tab-button ${activeTab === 1 ? "active" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              Profil
            </button>
            <button
              className={`tab-button ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleTabClick(2)}
            >
              Paramètres
            </button>
            <button
              className={`tab-button ${activeTab === 3 ? "active" : ""}`}
              onClick={() => handleTabClick(3)}
            >
              Commandes
            </button>

            {admin && (
              <Link to="/dashboard" className="admin-dashboard-link">
                <button className="admin-dashboard-button">Admin Dashboard</button>
              </Link>
            )}
          </div>

          <div className="tab-content">
            {activeTab === 1 && (
              <div className="tab-section">
                <GetUsers />
              </div>
            )}

            {activeTab === 2 && (
              <div className="tab-section">
                <div className="settings-container">
                  <button
                    className={`settings-button ${activeParametre === 1 ? "active" : ""}`}
                    onClick={() => handleParametreClick(1)}
                  >
                    Modifier un Utilisateur
                  </button>
                  <button
                    className={`settings-button ${activeParametre === 2 ? "active" : ""}`}
                    onClick={() => handleParametreClick(2)}
                  >
                    Supprimer un Utilisateur
                  </button>

                  {activeParametre === 1 && (
                    <div className="settings-content">
                      <PutUsers />
                    </div>
                  )}

                  {activeParametre === 2 && (
                    <div className="settings-content">
                      <DelUsers />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="tab-section">
                <GetPurchaseUser />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default UserProfile;