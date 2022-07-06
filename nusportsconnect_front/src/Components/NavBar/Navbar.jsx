import React from "react";
import "./navStyles.css";
import Logo from "../../pics/Logo.png";
import Notif from "../../pics/Notification.png";
import { findUser, getUserUsername } from "../../GraphQLQueries/queries";

function Navbar() {
  const [username, setUsername] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");

  React.useEffect(() => {
    const apiCall = async () => {
      const user = await getUserUsername();
      setUsername(user.data.data.userUsername);
    };
    apiCall();
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const searchInputLower = searchInput.toLowerCase();
      const searchedUser = await findUser(searchInputLower);
      console.log(searchedUser);
      window.location.href =
        "/" + searchedUser.data.data.userProfileInfo.username;
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <nav className="navbar">
        <a href="/sessions">
          <img className="logo" src={Logo} alt="" />
        </a>
        <ul>
          <li>
            <form className="nav-search-form" onSubmit={handleSubmit}>
              <input
                className="nav-search-input"
                type="text"
                name="search"
                id="search"
                placeholder="Find username"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="search-button" type="submit">
                {" "}
                search{" "}
              </button>
            </form>
          </li>
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
