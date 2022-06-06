import React from "react";
import "./navStyles.css";
import logo from "./Logo.png";
import notif from "./Notification.png";
function Navbar() {
  return (
    <nav className="navbar">
      <a href="/">
        <img className="logo" src={logo} alt="" />
      </a>
      <ul>
        <li>
          <button className="create">+ create session</button>
        </li>
        <li>
          <img className="notif" src={notif} alt="" />
        </li>
        <li>
          <div className="profile">My Profile</div>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
