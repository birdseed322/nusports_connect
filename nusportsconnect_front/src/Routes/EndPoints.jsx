import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/Login/Login";
import Navbar from "../Components/NavBar/Navbar";
import Sessions from "../Components/Event/Sessions";
import EventPillHost from "../Components/EventPill/EventPillHost";
import SessionsPage from "../Components/Sessions/SessionsPage";
import CreateSession from "../Components/Sessions/CreateSession";
import ProfileSessionLanding from "../Components/Profile/ProfileSessionLanding";
import ProfileHistoryLanding from "../Components/Profile/ProfileHistoryLanding";
import ProfileFriendsLanding from "../Components/Profile/ProfileFriendsLanding";
import ProfileReviewsLanding from "../Components/Profile/ProfileReviewsLanding";
import { Loading } from "../Components/Loading/Loading";
import NotAuthenticated from "../Components/NotAuthenticated/NotAuthenticated";
import EditProfile from "../Components/Profile/Sessions/EditProfile";

function EndPoints() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Add routes and corresponding components here. To connect route to component, use the element=COMPONENT_NAME. See below*/}

        <Route exact path="/" element={<Login />} />
        <Route exact path="/navBarTest" element={<Navbar />} />
        <Route exact path="/loading" element={<Loading />} />
        <Route exact path="/sessions" element={<Sessions />} />
        <Route exact path="/sessions/:id" element={<SessionsPage />} />
        <Route exact path="/createsession" element={<CreateSession />} />
        <Route exact path="/:id" element={<ProfileSessionLanding />} />
        <Route exact path="/:id/editprofile" element={<EditProfile />} />
        <Route exact path="/unauthenticated" element={<NotAuthenticated />} />
        <Route exact path="/:id/history" element={<ProfileHistoryLanding />} />
        <Route exact path="/:id/friends" element={<ProfileFriendsLanding />} />
        <Route exact path="/:id/reviews" element={<ProfileReviewsLanding />} />
        <Route exact path="/eventPillHost" element={<EventPillHost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default EndPoints;
