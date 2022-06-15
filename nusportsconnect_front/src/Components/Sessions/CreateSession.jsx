import React from "react";
import Navbar from "../NavBar/Navbar";
import CreateSessionBody from "./CreateSessionBody";
import "./createStyles.css";

function CreateSession() {
  return (
    <div>
      <Navbar />
      <CreateSessionBody />
    </div>
  );
}

export default CreateSession;