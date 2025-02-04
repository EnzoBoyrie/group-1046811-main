export const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Déconexioné");
      console.log("donner recu :", data);
      alert("vous etes deco")
      window.location.reload();
    } else {
      console.error("err  de la deco :", await response.text());
    }
  } catch (error) {
    console.error("err  lors de la deco :", error);
  }
};
