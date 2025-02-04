import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import mixitup from "mixitup";
import GetSetCardService from "../../service/SetCards";
import GetSetsService from "../../service/Set";
import "../../css/cards.css";
import Header from "../../components/Header.jsx"

export default function GenerationsById() {
  const { id } = useParams();
  const { data: allSet } = GetSetsService();
  const { data: allCard } = GetSetCardService();

  const [quantities, setQuantities] = useState({});
  const filteredSetsForCard = allSet.filter((item) => item.name_sets === id);

  console.log("caca",filteredSetsForCard)

  const id_sets = useMemo(() => {
    const filteredSets = allSet?.filter((item) => item.name_sets === id) || [];
    return filteredSets.length > 0 ? filteredSets[0].id : null;
  }, [allSet, id]);

  const filteredCard = useMemo(() => {
    return id_sets
      ? allCard?.filter((item) => item.id_sets === id_sets) || []
      : [];
  }, [id_sets, allCard]);

  const filteredIllustration_Rare = filteredCard.filter(
    (item) => item.illustration_rare === true
  );

  const filteredIllustration_Hyper_Rare = filteredCard.filter(
    (item) => item.illustration_hyper_rare === true
  );

  const filteredIllustration_Special = filteredCard.filter(
    (item) => item.illustration_speciale_rare === true
  );
  console.log("test", filteredIllustration_Rare)
  console.log("test2", filteredIllustration_Hyper_Rare)
  console.log("test3", filteredIllustration_Special)

  useEffect(() => {
    if (filteredCard.length > 0) {
      const mixer = mixitup(".featured__content", {
        selectors: {
          target: ".mix",
        },
        animation: {
          duration: 600,
        },
      });

      return () => mixer.destroy();
    }
  }, [filteredCard]);

  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };


  const handleAddToCart = (card) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === card.id);

    const quantity = quantities[card.id] || 1;

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: card.id,
        title: card.title,
        price: card.price,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${card.title} ajouté au panier !`);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Header />
      {filteredSetsForCard.map((item) => (
        <div key={item.id} className="gen-sets-title-box">
          <img
            src={`http://localhost:3001/images/sets/${item.id}.png`}
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

      <section className="featured section" id="featured">
        <div className="featured__container container">
          <ul className="featured__filters">
            <li>
              <button className="featured__item active-featured" data-filter="all">
                <span>+</span>
              </button>
            </li>
            <li>
              <button className="featured__item" data-filter=".category-a">
                Illustration Rare
              </button>
            </li>
            <li>
              <button className="featured__item" data-filter=".category-b">
                Illustration Speciale Rare
              </button>
            </li>
            <li>
              <button className="featured__item" data-filter=".category-c">
                Illustration Hyper Rare
              </button>
            </li>
          </ul>
          <div className="featured__content">
            {filteredIllustration_Rare.filter((card) => card.stock > 0).map((card) => (
              <article key={card.id} className="featured__card mix category-a">
                <a href={`/card/${card.id}`}>
                <img
                  src={`http://localhost:3001/images/cards/${card.id}.png`}
                  alt={card.name}
                  className="featured__img"
                />
                </a>
                <div>
                  <p>{card.price} $</p>
                  <button onClick={() => handleDecrease(card.id)}>-</button>
                  <span>{quantities[card.id] || 0}</span>
                  <button onClick={() => handleIncrease(card.id)}>+</button>
                  <button onClick={() => handleAddToCart(card)}>
                    Add
                  </button>
                </div>
              </article>
            ))}

            {filteredIllustration_Special.filter((card) => card.stock > 0).map((card) => (
              <article key={card.id} className="featured__card mix category-b">
                <a href={`/card/${card.id}`}>
                <img
                  src={`http://localhost:3001/images/cards/${card.id}.png`}
                  alt={card.name}
                  className="featured__img"
                />
                </a>
                <div>
                <p>{card.price} $</p>
                  <button onClick={() => handleDecrease(card.id)}>-</button>
                  <span>{quantities[card.id] || 0}</span>
                  <button onClick={() => handleIncrease(card.id)}>+</button>
                  <button onClick={() => handleAddToCart(card)}>
                    Add
                  </button>
                </div>
              </article>
            ))}

            {filteredIllustration_Hyper_Rare.filter((card) => card.stock > 0).map((card) => (
              <article key={card.id} className="featured__card mix category-c">
                <a href={`/card/${card.id}`}>
                <img
                  src={`http://localhost:3001/images/cards/${card.id}.png`}
                  alt={card.name}
                  className="featured__img"
                />
                </a>
                <div>
                <p>{card.price} $</p>
                  <button onClick={() => handleDecrease(card.id)}>-</button>
                  <span>{quantities[card.id] || 0}</span>
                  <button onClick={() => handleIncrease(card.id)}>+</button>
                  <button onClick={() => handleAddToCart(card)}>
                    Add
                  </button>
                </div>
              </article>
            ))}

            {filteredCard.filter((card) => card.stock === 0).map((card) => (
              <article key={card.id} className="featured__card__hs">
                <a href={`/card/${card.id}`}>
                <img
                  src={`http://localhost:3001/images/cards/${card.id}.png`}
                  alt={card.name}
                  className="featured__img"
                />
                </a>
                <div>
                <p>Carte plus disponible</p>
                </div>
              </article>
            ))}
            
          </div>
        </div>
      </section>
    </>
  );
}
