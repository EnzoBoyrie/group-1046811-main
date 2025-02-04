import React from "react";
import { Link } from "react-router-dom";
import { handleLogout } from "../service/Logout";
import Test from "../pages/test";
import { useAuth } from "../service/Auth";


export default function Header() {
    const isAuthenticated = useAuth();
    return (

        <div className="nav-body">
            <div className="nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/generations">Générations</a></li>
                    <li><a href="/purchase">Achats</a></li>
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
                </ul>
            </div>
        </div>
    );
}