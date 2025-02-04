import React from 'react';

function NotFound() {
  return (
    <div>
      <h1>Erreur 401</h1>
      <p>La page que vous cherchez n'existe pas:</p>
      <img src={require("../img/bug.gif")} className="img-of-bug"/>
    </div>
  );
}

export default NotFound;