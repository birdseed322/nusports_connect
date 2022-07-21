import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/Login/Login";
import Sessions from "../Components/Event/Sessions";
import SessionsPage from "../Components/Sessions/SessionsPage";
import CreateSession from "../Components/Sessions/CreateSession";
import ProfileSessionLanding from "../Components/Profile/ProfileSessionLanding";
import ProfileHistoryLanding from "../Components/Profile/ProfileHistoryLanding";
import EditSession from "../Components/Sessions/EditSession";
import EditProfile from "../Components/Profile/Sessions/EditProfile";

//Create routes for the different webpages with different URLs throughout the app.
function EndPoints(props) {
  const socket = props.socket
  return (
    <BrowserRouter>
      <Routes>
        {/*Add routes and corresponding components here. To connect route to component, use the element=COMPONENT_NAME. See below*/}
        <Route exact path="/" element={<Login socket={socket}/>} />
        <Route exact path="/sessions" element={<Sessions socket={socket}/>} />
        <Route exact path="/sessions/:id" element={<SessionsPage socket={socket}/>} />
        <Route exact path="/sessions/:id/edit" element={<EditSession socket={socket}/>} />
        <Route exact path="/createsession" element={<CreateSession socket={socket}/>} />
        <Route exact path="/profile/:id" element={<ProfileSessionLanding socket={socket}/>} />
        <Route
          exact
          path="/profile/:id/editprofile"
          element={<EditProfile socket={socket}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default EndPoints;
