import React from "react"
import "../../Profile/Sessions/profileStyles.css";
import Navbar from "../../NavBar/Navbar"
import ProfileSessionHeader from "../../Profile/Sessions/ProfileSessionHeader";
import OtherProfileFriendsBody from "./OtherProfileFriendsBody";

function OtherPersonalProfileFriends(props){
    const user = props.user;
    //Based on user info and the API call to backend retrieving this profile's info
    const friend = true;

    return(
        <div>
        <Navbar/>
        <ProfileSessionHeader user = {user} owner={false} friend={friend}/>
        <OtherProfileFriendsBody user = {user} friend={friend}/>
        </div>
    )
}

export default OtherPersonalProfileFriends;