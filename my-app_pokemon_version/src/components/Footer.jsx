import React from "react";
// import './footer.css';
import iconeLivre from "../img/icone_livre.jpg";

export default function Footer() {
  return (
    <div className="" footer>
      <div className="sb_footer section_padding">
        <div className="sb_footer-links ">
          <div className="sb_footer-links-div">
            <h4>Sur nous</h4>
            <a href="/info">
              <p>Info sur nous</p>
            </a>
            <a href="/infoM">
              <p>Info sur moi</p>
            </a>
            <a href="/infoV">
              <p>Info sur vous</p>
            </a>
          </div>
          <div className="sb_footer-links-div"></div>
          <h4>Ressource</h4>
          <a href="/Ressource">
            <p>Ressource sur nous</p>
          </a>
          <a href="/RessourceN">
            <p>Info sur nous</p>
          </a>
          <a href="/RessourceV">
            <p>Info sur nous</p>
          </a>

          <div className="sb_footer-links-div"></div>
          <h4>Resau</h4>
          <p>
            <img src={iconeLivre} alt="" />
          </p>
        </div>

        <hr></hr>

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@{new Date().getFullYear()}codeInn. All right reserved.</p>
          </div>
          <div className="sb_footer-below-link">
            <a href="/terms">
              {" "}
              <div>
                <p>Therme et condition</p>
              </div>
            </a>
            <a href="/private">
              {" "}
              <div>
                <p>privé</p>
              </div>
            </a>
            <a href="/securtiy">
              {" "}
              <div>
                <p>securtité</p>
              </div>
            </a>
            <a href="/Cookis">
              {" "}
              <div>
                <p>Cookis declaration</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
