import React from "react";
import "./navStyles.css";
import Logo from "../../pics/Logo.png";
import Notif from "../../pics/Notification.png";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/sessions">
        <img className="logo" src={Logo} alt="" />
      </a>
      <ul>
        <li>
          <a href="/createsession">
            <button className="create">+ create session</button>
          </a>
        </li>
        <li>
          <a href="/notifs">
            {/* change to a dropdown menu */}
            <img className="notif" src={Notif} alt="" />
          </a>
        </li>
        <li>
          <a href="/profile">
            <div className="profile">My Profile</div>
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
