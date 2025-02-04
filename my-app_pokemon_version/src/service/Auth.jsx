import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/token", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        setIsAuthenticated(data.Status);
      } catch (error) {
        console.error("Erreur lors de la vérification du token", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);


  return isAuthenticated;
};