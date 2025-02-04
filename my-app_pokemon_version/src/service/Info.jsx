import { useState, useEffect } from "react";

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {

        const response = await fetch("http://localhost:3001/api/users/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil");
        }

        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setUser(data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du profil utilisateur", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { user, loading, error };
};
