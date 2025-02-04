

import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./Components/List"


function Cherchebar() {
  return (
    <div className="main">
      <h1>Recherche</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List />
    </div>
  );
}

export default Cherchebar;