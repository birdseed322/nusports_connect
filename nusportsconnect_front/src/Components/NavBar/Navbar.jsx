import React, { useState } from "react";
import "./navStyles.css";
import Logo from "../../pics/Logo.png";
import Notif from "../../pics/Notification.png";
import {
  findUser,
  getAllUsernames,
  getUserUsername,
} from "../../GraphQLQueries/queries";
import defaultPic from "../../pics/defaultProfilePic.png";
import Alert from "../Alert/Alert";
import Dropdown from "./Dropdown";

function Navbar() {
  const [username, setUsername] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userImage, setUserImage] = useState("");
  const [alert, setAlert] = useState(false);
  // const [allUsers, setAllUsers] = useState("");

  React.useEffect(() => {
    const apiCall = async () => {
      const userUsername = await getUserUsername();
      setUsername(userUsername.data.data.userUsername);
      const userDetails = await findUser(username);
      setUserImage(userDetails.data.data.userProfileInfo.image);
      // let users = await getAllUsernames();
      // setAllUsers(users.data.data.allUsernames);
    };
    apiCall();
  });

  function handleCloseAlert() {
    setAlert(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (searchInput !== "") {
        let allUsers = await getAllUsernames();
        allUsers = allUsers.data.data.allUsernames;
        const searchInputLower = searchInput.toLowerCase();
        allUsers = allUsers.filter((user) =>
          user.username.includes(searchInputLower)
        );
        if (allUsers.length === 0) {
          setAlert(true);
        } else {
          window.location.href = "/profile/" + allUsers[0].username;
        }
      }
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
              {alert ? (
                <Alert
                  message="No user found"
                  handleCloseAlert={handleCloseAlert}
                />
              ) : null}
              <button className="search-button" type="submit">
                search
              </button>
              {/* <Dropdown /> */}
            </form>
            {/* <div className="dropdown">
              {allUsers !== "" ? (
                <Dropdown />
              ) : // ? allUsers.map((user) => <div> {user.username} </div>)
              null}
            </div> */}
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
