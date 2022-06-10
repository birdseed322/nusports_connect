import React from "react"
import "../Sessions/profileHeaderStyles.css";
import Navbar from "../../NavBar/Navbar"
import ProfileSessionHeader from "../Sessions/ProfileSessionHeader"
import ProfileFriendsBody from "./ProfileFriendsBody";

//Assume loads to profile sessions by default

function PersonalProfileFriends(){

    //Dummy code to simulate drawing information of user from database. Should ideally be done in useEffect statement, so info loaded before rendering.
    const user = {
        name : "Samuel Tay",
        email : "someemail@gmail.com",
        rating : 4.6,
        creationDate : "20/02/22",
        sportingInterests : ["Tennis", "Ultimate Frisbee"],
        friendCount : 18
    } 

    return(
        <div>
        <Navbar/>
        <ProfileSessionHeader user = {user}/>
        <ProfileFriendsBody user = {user}/>
        </div>
    )
}

export default PersonalProfileFriends;