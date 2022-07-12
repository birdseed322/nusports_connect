import React from "react";
import "./alertStyles.css";

export default function Alert(props) {
  return (
    <div className="alert">
      <button className="close-alert" onClick={props.handleCloseAlert}>
        x
      </button>
      <p className="alert-message">{props.message}</p>
    </div>
  );
}
