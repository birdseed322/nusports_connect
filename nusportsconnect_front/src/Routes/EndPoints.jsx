import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../Components/Login/Login";
import Navbar from "../Components/NavBar/Navbar";
import Sessions from "../Components/Event/Sessions";
import PersonalProfile from "../Components/Profile/PersonalProfile";
import EventPillHost from "../Components/EventPill/EventPillHost";

function EndPoints(){

    return (
        <BrowserRouter>
            <Routes>
                {/*Add routes and corresponding components here. To connect route to component, use the element=COMPONENT_NAME. See below*/}

                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/navBarTest" element={<Navbar/>}/>
                <Route exact path="/sessions" element={<Sessions/>}/>
                <Route exact path="/profile" element={<PersonalProfile/>}/>
                <Route exact path="/eventPillHost" element={<EventPillHost/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default EndPoints;