import React from "react"
import "./profileHeaderStyles.css";
import Navbar from "../../NavBar/Navbar"
import ProfileSessionBody from "./ProfileSessionBody"
import ProfileSessionHeader from "./ProfileSessionHeader"

//Assume loads to profile sessions by default

function PersonalProfileSession(){

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
        <ProfileSessionHeader user = {user}/>
        <ProfileSessionBody user = {user}/>
        </div>
    )
}

export default PersonalProfileSession;