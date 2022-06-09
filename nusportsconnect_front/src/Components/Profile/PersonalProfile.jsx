import React from "react"
import "./profileHeaderStyles.css";
import Navbar from "../NavBar/Navbar"
import ProfileHeader from "./ProfileHeader"
import ProfileBody from "./ProfileBody"

//Assume loads to profile sessions by default

function PersonalProfile(){

    //Dummy code to simulate drawing information of user from database. Should ideally be done in useEffect statement, so info loaded before rendering.
    const user = {
        name : "Samuel Tay",
        email : "someemail@gmail.com",
        rating : 4.6,
        creationDate : "20/02/22",
        sportingInterests : ["Tennis", "Ultimate Frisbee"]
    } 

    return(
        <div>
        <Navbar/>
        <ProfileHeader user = {user}/>
        <ProfileBody user = {user}/>
        </div>
    )
}

export default PersonalProfile;