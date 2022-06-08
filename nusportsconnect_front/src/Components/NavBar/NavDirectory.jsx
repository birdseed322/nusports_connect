import React from "react";
import NavBar from "./Navbar";
import Sessions from "../Event/Sessions";

const NavDirectory = () => {
  console.log(window.location.pathname);
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Sessions />;
      break;
    case "/sessions":
      component = <Sessions />;
      break;
    case "/createsession":
      component = <Sessions />;
      // component = will be <CreateSession />;
      break;
    case "/notifs":
      component = <Sessions />;
      // component = will be <Notifs />; (But most likely will just be a dropdown menu)
      break;
    case "/profile":
      component = <Sessions />;
      // component = will be <Profile />;
      break;
    default:
      component= <Sessions />;
      break;
  }
  return (
    <div>
      <NavBar />
      {component}
    </div>
  );
};

export default NavDirectory;
