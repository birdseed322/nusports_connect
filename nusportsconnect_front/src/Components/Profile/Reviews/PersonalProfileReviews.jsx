import React from "react"
import "../Sessions/profileHeaderStyles.css";
import Navbar from "../../NavBar/Navbar"
import ProfileSessionHeader from "../Sessions/ProfileSessionHeader"
import ProfileReviewsBody from "./ProfileReviewsBody"

//Assume loads to profile sessions by default

function PersonalProfileReview(){

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
        <ProfileReviewsBody user = {user}/>
        </div>
    )
}

export default PersonalProfileReview;