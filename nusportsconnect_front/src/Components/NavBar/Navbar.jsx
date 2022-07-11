import React, { useState } from "react";
import "./navStyles.css";
import Logo from "../../pics/Logo.png";
import Notif from "../../pics/Notification.png";
import { findUser, getUserUsername } from "../../GraphQLQueries/queries";
import defaultPic from "../../pics/defaultProfilePic.png";

function Navbar() {
  const [username, setUsername] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userImage, setUserImage] = useState("");

  React.useEffect(() => {
    const apiCall = async () => {
      const userUsername = await getUserUsername();
      setUsername(userUsername.data.data.userUsername);
      const userDetails = await findUser(username);
      console.log(userDetails);
      try {
        setUserImage(userDetails.data.data.userProfileInfo.image);
      } catch (err) {

      }
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
        "/profile/" + searchedUser.data.data.userProfileInfo.username;
    } catch (err) {
      
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
          <a href={"/profile/" + username}>
            {userImage === "" ? (
              <img className="nav-pic" src={defaultPic} alt="profile-pic" />
            ) : (
              <img className="nav-pic" src={userImage} alt="profile-pic" />
            )}
          </a>
          <li>
            <a href={"/profile/" + username}>
              <div className="profile">My Profile</div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
