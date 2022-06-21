import React from "react"
import "../Sessions/profileHeaderStyles.css";
import Navbar from "../../NavBar/Navbar"
import ProfileHistoryBody from "./ProfileHistoryBody"
import ProfileSessionHeader from "../Sessions/ProfileSessionHeader"

//Assume loads to profile sessions by default

function PersonalProfileHistory(props){

    //Dummy code to simulate drawing information of user from database. Should ideally be done in useEffect statement, so info loaded before rendering.
    const user = props.user

    return(
        <div>
        <Navbar/>
        <ProfileSessionHeader user = {user} owner={true}/>
        <ProfileHistoryBody user = {user}/>
        </div>
    )
}

export default PersonalProfileHistory;