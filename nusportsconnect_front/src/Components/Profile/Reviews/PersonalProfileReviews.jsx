import React from "react"
import "../Sessions/profileHeaderStyles.css";
import Navbar from "../../NavBar/Navbar"
import ProfileSessionHeader from "../Sessions/ProfileSessionHeader"
import ProfileReviewsBody from "./ProfileReviewsBody"

//Assume loads to profile sessions by default

function PersonalProfileReview(props){

    //Dummy code to simulate drawing information of user from database. Should ideally be done in useEffect statement, so info loaded before rendering.
    const user = props.user

    return(
        <div>
        <Navbar/>
        <ProfileSessionHeader user = {user} owner={true}/>
        <ProfileReviewsBody user = {user}/>
        </div>
    )
}

export default PersonalProfileReview;