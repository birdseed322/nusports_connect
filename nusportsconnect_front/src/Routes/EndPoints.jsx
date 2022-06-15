import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/Login/Login";
import Navbar from "../Components/NavBar/Navbar";
import Sessions from "../Components/Event/Sessions";
import PersonalProfileSession from "../Components/Profile/Sessions/PersonalProfileSession";
import EventPillHost from "../Components/EventPill/EventPillHost";
import PersonalProfileHistory from "../Components/Profile/History/PersonalProfileHistory";
import PersonalProfileFriends from "../Components/Profile/Friends/PersonalProfileFriends";
import PersonalProfileReview from "../Components/Profile/Reviews/PersonalProfileReviews";
import SessionsPage from "../Components/Sessions/SessionsPage";
import CreateSession from "../Components/Sessions/CreateSession";
import OtherPersonalProfileSession from "../Components/OtherProfile/Sessions/OtherPersonalProfileSession";

function EndPoints() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Add routes and corresponding components here. To connect route to component, use the element=COMPONENT_NAME. See below*/}

        <Route exact path="/" element={<Login />} />
        <Route exact path="/navBarTest" element={<Navbar />} />
        <Route exact path="/sessions" element={<Sessions />} />
        <Route exact path="/sessions/eventID" element={<SessionsPage />} />
        <Route exact path="/createsession" element={<CreateSession />} />
        <Route exact path="/:id" element={<PersonalProfileSession />} />
        <Route
          exact
          path="/:id/history"
          element={<PersonalProfileHistory />}
        />
        <Route
          exact
          path="/:id/friends"
          element={<PersonalProfileFriends />}
        />
        <Route
          exact
          path="/:id/reviews"
          element={<PersonalProfileReview />}
        />
        <Route
          exact
          path="/otherprofile"
          element={<OtherPersonalProfileSession />}
        />
        
        <Route exact path="/eventPillHost" element={<EventPillHost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default EndPoints;
