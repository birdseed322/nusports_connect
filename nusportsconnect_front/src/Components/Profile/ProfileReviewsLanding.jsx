import React from 'react';
import {useParams} from 'react-router-dom'
import OtherPersonalProfileReviews from '../OtherProfile/Reviews/OtherPersonalProfileReviews';
import PersonalProfileReview from './Reviews/PersonalProfileReviews';

//Landing page for profile. Checks the info given in the browser cookie (Generated during login) to see if the profile you are viewing is yours

function ProfileReviewsLanding(){

    const {id} = useParams();
    const user = {
      name: "Samuel Tay",
      username : "samuel.tay",
      email: "someemail@gmail.com",
      rating: 4.6,
      creationDate: "20/02/22",
      sportingInterests: ["Tennis", "Ultimate Frisbee"],
    };

    return id === user.username ? <PersonalProfileReview /> : <OtherPersonalProfileReviews/>

}

export default ProfileReviewsLanding;