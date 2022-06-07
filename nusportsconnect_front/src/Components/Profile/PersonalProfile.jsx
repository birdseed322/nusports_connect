import React from "react"
import "./profileHeaderStyles.css";
import Navbar from "../NavBar/Navbar"
import ProfileHeader from "./ProfileHeader"
import ProfileBody from "./ProfileBody"

//Assume loads to profile sessions by default

function PersonalProfile(){

    return(
        <div>
        <Navbar/>
        <ProfileHeader/>
        <ProfileBody />
        </div>
    )
}

export default PersonalProfile;