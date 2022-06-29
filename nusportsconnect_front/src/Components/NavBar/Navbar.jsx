import React from "react";
import "./navStyles.css";
import Logo from "../../pics/Logo.png";
import Notif from "../../pics/Notification.png";
import { getUserUsername } from "../../GraphQLQueries/queries";

function Navbar() {
  const [username, setUsername] = React.useState("");
  React.useEffect(() => {
    const apiCall = async () => {
      const user = await getUserUsername();
      setUsername(user.data.data.userUsername);
      // console.log(username);
    };
    apiCall();
  });
  return (
    <div>
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
            <a href={"/" + username}>
              <div className="profile">My Profile</div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
