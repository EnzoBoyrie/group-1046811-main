import { useState } from "react";

import Navbar from "../../components/Navbar";

import GetSets from "../../components/Sets_components/GetSets";
import PostSets from "../../components/Sets_components/PostSets";
import PutSets from "../../components/Sets_components/PutSets";
import DelSets from "../../components/Sets_components/DelSets";
import ImageUploaderSets from "../../components/Sets_components/UplodeImageSets.jsx";

import GetPurchaseUser from "../../components/Purchase_components/GetPurchaseUser";
import GetPurchaseAdmin from "../../components/Purchase_components/GetPurchaseAdmin";
import PostPurchase from "../../components/Purchase_components/PostPurchase";

import GetUsersAdmin from "../../components/Users_Admin_components/GetUsersAdmin.jsx";
import PostUsersAdmin from "../../components/Users_Admin_components/PostUsersAdmin.jsx";
import PutUsersAdmin from "../../components/Users_Admin_components/PutUsersAdmin.jsx";
import DelUsersAdmin from "../../components/Users_Admin_components/DelUsersAdmin.jsx";

import GetGenerations from "../../components/Generations_components/GetGenerations.jsx";
import PostGenerations from "../../components/Generations_components/PostGenerations.jsx";
import PutGenerations from "../../components/Generations_components/PutGenerations.jsx";
import DelGenerations from "../../components/Generations_components/DelGenerations.jsx";
import ImageUploaderGenerations from "../../components/Generations_components/UplodeImageGenerations.jsx";

import GetCards from "../../components/Cards_components/GetCards.jsx";
import PostCards from "../../components/Cards_components/PostCards.jsx";
import PutCards from "../../components/Cards_components/PutCards.jsx";
import DelCards from "../../components/Cards_components/DelCards.jsx";
import ImageUploaderCards from "../../components/Cards_components/UplodeImageCards.jsx";
import "../../css/Admin.css"

import Header from "../../components/Header.jsx";

export default function AdminDashboard() {
  const [activeTask, setActiveTast] = useState(1);
  const [activeUserAdmin, setActiveUserAdmin] = useState(1);
  const [activeGeneration, setActiveGeneration] = useState(1);
  const [activeSets, setActiveSets] = useState(1);
  const [activeCards, setActiveCards] = useState(1);
  const [activePurchase, setActivePurchase] = useState(1);

  const handleTaskClick = (taskNumber) => setActiveTast(taskNumber);
  const handleUserAdminClick = (UserAdminNumber) => setActiveUserAdmin(UserAdminNumber);
  const handleGenerationClick = (GenerationNumber) => setActiveGeneration(GenerationNumber);
  const handleSetsClick = (SetsNumber) => setActiveSets(SetsNumber);
  const handleCardsClick = (CardsNumber) => setActiveCards(CardsNumber);
  const handlePurchaseClick = (PurchaseNumber) => setActivePurchase(PurchaseNumber);

  return (
    <>

    <Header/>
    <div className="admin-dashboard">

      <div className="task-selector">
        <button className={`task-button ${activeTask === 1 ? "active" : ""}`} onClick={() => handleTaskClick(1)}>
          Gestion Utilisateur Administrateur
        </button>
        <button className={`task-button ${activeTask === 2 ? "active" : ""}`} onClick={() => handleTaskClick(2)}>
          Générations de Pokémon
        </button>
        <button className={`task-button ${activeTask === 3 ? "active" : ""}`} onClick={() => handleTaskClick(3)}>
          Extensions Pokémon
        </button>
        <button className={`task-button ${activeTask === 4 ? "active" : ""}`} onClick={() => handleTaskClick(4)}>
          Cartes Pokémon
        </button>
        <button className={`task-button ${activeTask === 5 ? "active" : ""}`} onClick={() => handleTaskClick(5)}>
          Achat de Carte
        </button>
      </div>

      <div className="task-content">
        {activeTask === 1 && (
          <div className="user-admin-section">
            <h2>Gestion Utilisateur Administrateur</h2>
            <div className="user-admin-buttons">
              <button className={`user-admin-button ${activeUserAdmin === 1 ? "active" : ""}`} onClick={() => handleUserAdminClick(1)}>
                Voir Tous les Utilisateurs en Admin
              </button>
              <button className={`user-admin-button ${activeUserAdmin === 2 ? "active" : ""}`} onClick={() => handleUserAdminClick(2)}>
                Créer un Utilisateur Admin
              </button>
              <button className={`user-admin-button ${activeUserAdmin === 3 ? "active" : ""}`} onClick={() => handleUserAdminClick(3)}>
                Modifier un Utilisateur
              </button>
              <button className={`user-admin-button ${activeUserAdmin === 4 ? "active" : ""}`} onClick={() => handleUserAdminClick(4)}>
                Supprimer un Utilisateur
              </button>
            </div>
            <div className="user-admin-content">
              {activeUserAdmin === 1 && <GetUsersAdmin />}
              {activeUserAdmin === 2 && <PostUsersAdmin />}
              {activeUserAdmin === 3 && <PutUsersAdmin />}
              {activeUserAdmin === 4 && <DelUsersAdmin />}
            </div>
          </div>
        )}

        {activeTask === 2 && (
          <div className="generation-section">
            <h2>Générations de Pokémon</h2>
            <div className="generation-buttons">
              <button className={`generation-button ${activeGeneration === 1 ? "active" : ""}`} onClick={() => handleGenerationClick(1)}>
                Voir Toutes les Générations
              </button>
              <button className={`generation-button ${activeGeneration === 2 ? "active" : ""}`} onClick={() => handleGenerationClick(2)}>
                Créer une Génération
              </button>
              <button className={`generation-button ${activeGeneration === 3 ? "active" : ""}`} onClick={() => handleGenerationClick(3)}>
                Modifier une Génération
              </button>
              <button className={`generation-button ${activeGeneration === 4 ? "active" : ""}`} onClick={() => handleGenerationClick(4)}>
                Supprimer une Génération
              </button>
              <button className={`generation-button ${activeGeneration === 5 ? "active" : ""}`} onClick={() => handleGenerationClick(5)}>
                Ajouter une Image à une Génération
              </button>
            </div>
            <div className="generation-content">
              {activeGeneration === 1 && <GetGenerations />}
              {activeGeneration === 2 && <PostGenerations />}
              {activeGeneration === 3 && <PutGenerations />}
              {activeGeneration === 4 && <DelGenerations />}
              {activeGeneration === 5 && <ImageUploaderGenerations />}
            </div>
          </div>
        )}

        {activeTask === 3 && (
          <div className="sets-section">
            <h2>Extensions Pokémon</h2>
            <div className="sets-buttons">
              <button className={`sets-button ${activeSets === 1 ? "active" : ""}`} onClick={() => handleSetsClick(1)}>
                Voir Toutes les Extensions
              </button>
              <button className={`sets-button ${activeSets === 2 ? "active" : ""}`} onClick={() => handleSetsClick(2)}>
                Créer une Extension
              </button>
              <button className={`sets-button ${activeSets === 3 ? "active" : ""}`} onClick={() => handleSetsClick(3)}>
                Modifier une Extension
              </button>
              <button className={`sets-button ${activeSets === 4 ? "active" : ""}`} onClick={() => handleSetsClick(4)}>
                Supprimer une Extension
              </button>
              <button className={`sets-button ${activeSets === 5 ? "active" : ""}`} onClick={() => handleSetsClick(5)}>
                Ajouter une Image à une Extension
              </button>
            </div>
            <div className="sets-content">
              {activeSets === 1 && <GetSets />}
              {activeSets === 2 && <PostSets />}
              {activeSets === 3 && <PutSets />}
              {activeSets === 4 && <DelSets />}
              {activeSets === 5 && <ImageUploaderSets />}
            </div>
          </div>
        )}

        {activeTask === 4 && (
          <div className="cards-section">
            <h2>Cartes Pokémon</h2>
            <div className="cards-buttons">
              <button className={`cards-button ${activeCards === 1 ? "active" : ""}`} onClick={() => handleCardsClick(1)}>
                Voir Toutes les Cartes
              </button>
              <button className={`cards-button ${activeCards === 2 ? "active" : ""}`} onClick={() => handleCardsClick(2)}>
                Créer une Carte
              </button>
              <button className={`cards-button ${activeCards === 3 ? "active" : ""}`} onClick={() => handleCardsClick(3)}>
                Modifier une Carte
              </button>
              <button className={`cards-button ${activeCards === 4 ? "active" : ""}`} onClick={() => handleCardsClick(4)}>
                Supprimer une Carte
              </button>
              <button className={`cards-button ${activeCards === 5 ? "active" : ""}`} onClick={() => handleCardsClick(5)}>
                Ajouter une Image à une Carte
              </button>
            </div>
            <div className="cards-content">
              {activeCards === 1 && <GetCards />}
              {activeCards === 2 && <PostCards />}
              {activeCards === 3 && <PutCards />}
              {activeCards === 4 && <DelCards />}
              {activeCards === 5 && <ImageUploaderCards />}
            </div>
          </div>
        )}

        {activeTask === 5 && (
          <div className="purchase-section">
            <h2>Achat de Cartes</h2>
            <div className="purchase-buttons">
              <button className={`purchase-button ${activePurchase === 1 ? "active" : ""}`} onClick={() => handlePurchaseClick(1)}>
                Voir Mes Achats
              </button>
              <button className={`purchase-button ${activePurchase === 2 ? "active" : ""}`} onClick={() => handlePurchaseClick(2)}>
                Voir Tous les Achats
              </button>
              <button className={`purchase-button ${activePurchase === 3 ? "active" : ""}`} onClick={() => handlePurchaseClick(3)}>
                Faire un Achat
              </button>
            </div>
            <div className="purchase-content">
              {activePurchase === 1 && <GetPurchaseUser />}
              {activePurchase === 2 && <GetPurchaseAdmin />}
              {activePurchase === 3 && <PostPurchase />}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
