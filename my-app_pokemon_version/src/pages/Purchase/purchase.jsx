import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../../css/purchase.css";
import Header from "../../components/Header.jsx"

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemove = (cardId) => {
    setCart(cart.filter((item) => item.id !== cardId));
  };

  const increaseQuantity = (cardId) => {
    setCart(
      cart.map((item) =>
        item.id === cardId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (cardId) => {
    setCart(
      cart.map((item) =>
        item.id === cardId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    const x = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const test = x.toFixed(2);
    return test
  };


  const handleCheckout = async () => {
    const purchaseHistory = cart.map((item) => ({
      card_id: item.id,
      quantity: item.quantity,
      price_total: item.price * item.quantity,
    }));
  
    try {
      const response = await fetch("http://localhost:3001/api/purchase_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(purchaseHistory),
      });
  
      if (response.status === 401) {
        alert("Votre session a expiré, ou vous n'etes pas connecter. Veuillez vous reconnecter.");
        navigate("/login");
        return;
      }
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Merci pour votre achat.");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/");
      } else {
        alert("Erreur: " + data.error);
        console.error("Erreur serveur:", data.error);
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur:", error);
      alert("Une erreur inattendue s'est produite. Veuillez réessayer plus tard.");
    }
  };

  return (
    <>
    {/* <Navbar className="navbar-inside-card"/> */}
    <Header />
    <div className="cart-chut">
    <div className="cart-container">
      <h1 className="cart-title">Votre Panier</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Votre panier est vide.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-content">
                <p className="item-name">Nom de la carte : {item.title}</p>
                <p className="item-price">Prix unitaire : {item.price} €</p>
                <p className="item-total">
                  Prix total : {(item.price * item.quantity).toFixed(2)} €
                </p>

                <div className="quantity-buttons">
                  {item.quantity === 1 && (
                    <button
                      className={`remove-button ${item.quantity === 1 ? "visible" : ""
                        }`}
                      onClick={() => handleRemove(item.id)}
                    >
                      🗑️
                    </button>
                  )}
                  {item.quantity > 1 && (
                    <button
                      className="decrease-button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                  )}
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="increase-button"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <img
                className="box-card"
                src={`http://localhost:3001/images/cards/${item.id}.png`}
                alt="Description de l'image"
              />
            </div>
          ))}
          <p className="total-price">Total du coût des article dans le panier : {getTotalPrice()} €</p>
          <button className="checkout-button" onClick={handleCheckout}>
            Valider les achats
          </button>
        </div>
      )}
    </div>
    </div>
    </>
  );
}
