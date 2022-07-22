import React, { useState } from "react";
import "./navStyles.css";
import Logo from "../../pics/Logo.png";
import Notif from "../../pics/Notification.png";
import {
  clearAllNotifications,
  clearNotification,
  findUser,
  getAllUsernames,
  getUserNotifications,
  getSearches,
  getUserUsername,
} from "../../GraphQLQueries/queries";
import defaultPic from "../../pics/defaultProfilePic.png";
import Alert from "../Alert/Alert";
import SearchOverlay from "./SearchOverlay";
import ReactTooltip from "react-tooltip";

function Navbar(props) {
  const [username, setUsername] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userImage, setUserImage] = useState("");
  const [alert, setAlert] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const socket = props.socket;
  const [searchOverlay, setSearchOverlay] = useState(false);
  const [allSearches, setAllSearches] = useState([]);

  React.useEffect(() => {
    const apiCall = async () => {
      const userUsername = await getUserUsername();
      setUsername(userUsername.data.data.userUsername);
      const userDetails = await findUser(userUsername.data.data.userUsername);
      let userNotifications = await getUserNotifications(
        userUsername.data.data.userUsername
      );
      userNotifications = userNotifications.data.data.getUserNotifications.sort(
        (a, b) => {
          return (
            new Date(parseInt(b.createdAt)) - new Date(parseInt(a.createdAt))
          );
        }
      );

      setNotifications(userNotifications);

      try {
        setUserImage(userDetails.data.data.userProfileInfo.image);
      } catch (err) {}
    };

    apiCall();

    socket.on("new notification", (notification) => {
      const newNotif = {
        message: notification.message,
        link: notification.link,
        createdAt: new Date().getTime(),
      };
      setNotifications((prev) => {
        return [newNotif, ...prev];
      });
    });
  }, []);

  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
      return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
      return `${day} ${month} at ${hours}:${minutes}`;
    }

    return `${day} ${month} ${year}. at ${hours}:${minutes}`;
  }

  function timeAgo(dateParam) {
    if (!dateParam) {
      return null;
    }

    const date =
      typeof dateParam === "object" ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000;
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if (seconds < 5) {
      return "now";
    } else if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 90) {
      return "about a minute ago";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (isToday) {
      return getFormattedDate(date, "Today");
    } else if (isYesterday) {
      return getFormattedDate(date, "Yesterday");
    } else if (isThisYear) {
      return getFormattedDate(date, false, true);
    }

    return getFormattedDate(date);
  }

  function handleCloseAlert() {
    setAlert(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const editedSearchInput = searchInput.toLowerCase().replace(/ /g, "");
      setSearchInput(editedSearchInput);
      if (editedSearchInput !== "") {
        let allNames = await getSearches();
        allNames = allNames.data.data.users;
        setAllSearches(allNames);
        setSearchOverlay(true);
      } else {
        setSearchOverlay(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleClearNotifications() {
    clearAllNotifications(username);
    setNotifications([]);
  }

  async function handleClearNotification(time, link) {
    await clearNotification(username, time, link);
    setNotifications((prev) =>
      prev.filter((x) => x.createdAt !== time && x.link !== link)
    );
  }

  return (
    <div>
      <nav className="navbar">
        <a href="/sessions" data-tip="View all sessions">
          <ReactTooltip place="bottom" type="dark" effect="solid" />
          <img className="logo" src={Logo} alt="" />
        </a>

        <ul>
          <div></div>
          <li>
            <form className="nav-search-form" onSubmit={handleSubmit}>
              <input
                className="nav-search-input"
                type="text"
                name="search"
                id="search"
                placeholder="Find a user"
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
            </form>
          </li>
          <li>
            <a href="/createsession">
              <button className="create">+ create session</button>
            </a>
          </li>
          <li>
            {/* change to a dropdown menu */}
            <div className="notif-icon-grp">
              <img
                className="notif"
                src={Notif}
                alt=""
                onClick={() => setShowNotification((prev) => !prev)}
              />
              {notifications.length > 0 ? (
                <div className="notification-counter">
                  {notifications.length}
                </div>
              ) : null}
            </div>
            {showNotification ? (
              <div className="notifications">
                <h1 className="notification-header">Notifications</h1>
                <p
                  className="notification-clear-btn"
                  onClick={handleClearNotifications}
                >
                  clear all notifications
                </p>
                {notifications.length > 0 ? 
                notifications.map(notification => {
                  const notificationCreationTime = timeAgo(parseInt(notification.createdAt))
                  return <div className="notification">
                    <button className="notification-cancel" onClick={() => handleClearNotification(notification.createdAt, notification.link)}>x</button>
                    <p className="notification-message" onClick={()=>{
                      handleClearNotification(notification.createdAt, notification.link).then(() => window.location.href = notification.link)
                    }}>{notification.message}</p>
                    <p className="notification-time">{notificationCreationTime}</p>
                  </div>
                }) : <h2 className="notification-empty">You have no notifications!</h2>}
                </div> ): null
              }
          </li>
          <a href={"/profile/" + username} data-tip="View profile">
            {userImage === "" ? (
              <img className="nav-pic" src={defaultPic} alt="profile-pic" />
            ) : (
              <img className="nav-pic" src={userImage} alt="profile-pic" />
            )}
            <ReactTooltip place="bottom" type="dark" effect="solid" />
          </a>

          <li>
            <a href={"/profile/" + username} data-tip="View profile">
              <div className="profile">My Profile</div>
              <ReactTooltip place="bottom" type="dark" effect="solid" />
            </a>
          </li>
        </ul>
      </nav>

      <SearchOverlay
        open={searchOverlay}
        closeOverlay={() => setSearchOverlay(false)}
        searchInput={searchInput}
        allSearches={allSearches}
      />
    </div>
  );
}
export default Navbar;
