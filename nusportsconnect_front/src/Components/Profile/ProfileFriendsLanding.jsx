import React from 'react';
import {useParams} from 'react-router-dom'
import OtherPersonalProfileFriends from '../OtherProfile/Friends/OtherPersonalProfileFriends';
import PersonalProfileFriends from './Friends/PersonalProfileFriends';

//Landing page for profile. Checks the info given in the browser cookie (Generated during login) to see if the profile you are viewing is yours

function ProfileFriendsLanding(){

  const {id} = useParams();
  const user = {
    name: "Samuel Tay",
    username : "samuel.tay",
    email: "someemail@gmail.com",
    rating: 4.6,
    creationDate: "20/02/22",
    sportingInterests: ["Tennis", "Ultimate Frisbee"],
  };

  return id === user.username ? <PersonalProfileFriends/> : <OtherPersonalProfileFriends />

}

export default ProfileFriendsLanding;