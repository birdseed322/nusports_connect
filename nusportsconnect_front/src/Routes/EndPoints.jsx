import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../Components/Login/Login";
import Navbar from "../Components/NavBar/Navbar";
import Sessions from "../Components/Event/Sessions";
import PersonalProfileSession from "../Components/Profile/Sessions/PersonalProfileSession";
import EventPillHost from "../Components/EventPill/EventPillHost";
import PersonalProfileHistory from "../Components/Profile/History/PersonalProfileHistory";
import PersonalProfileFriends from "../Components/Profile/Friends/PersonalProfileFriends";
import PersonalProfileReview from "../Components/Profile/Reviews/PersonalProfileReviews";
import SessionsPage from "../Components/Sessions/SessionsPage";

function EndPoints(){

    return (
        <BrowserRouter>
            <Routes>
                {/*Add routes and corresponding components here. To connect route to component, use the element=COMPONENT_NAME. See below*/}

                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/navBarTest" element={<Navbar/>}/>
                <Route exact path="/sessions" element={<Sessions/>}/>
                <Route exact path="/sessions/eventID" element={<SessionsPage />}/>
                <Route exact path="/profile" element={<PersonalProfileSession/>}/>
                <Route exact path="/profile/history" element={<PersonalProfileHistory/>}/>
                <Route exact path="/profile/friends" element={<PersonalProfileFriends/>}/>
                <Route exact path="/profile/reviews" element={<PersonalProfileReview/>}/>
                <Route exact path="/eventPillHost" element={<EventPillHost/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default EndPoints;