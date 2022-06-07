import React from "react"
import defaultProfilePic from "../../pics/defaultProfilePic.png"
import star from "../../pics/star.png"
import edit from "../../pics/editbtn.png"

function ProfileHeader(){
    return (
        <div className="profile-header">
            <img className="profile-picture" alt="profile" src={defaultProfilePic}/>

            <div className="profile-details">
                <h1 className="profile-name">DummyName Tan</h1>
                <p className="profile-info">email@gmail.com</p>
                <p className="profile-info">Playing since: 20/02/22</p>
                <p className="profile-info">Interested in: Tennis, Ultimate Frisbee</p>
            </div>
            <div className="profile-rating">
                <img alt="star" src={star} className="star"/>
                <h1 className="profile-rating-score">4.6/5</h1>
            </div>
            <img src={edit} alt="edit button" className="edit-btn"/>
        </div>
    )
}

export default ProfileHeader;