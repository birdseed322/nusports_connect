import React from "react"
import defaultProfilePic from "../../pics/defaultProfilePic.png"
import star from "../../pics/star.png"
import edit from "../../pics/editbtn.png"

function ProfileHeader(props){
    const user = props.user;

    return (
        <div className="profile-header">
            <img className="profile-picture" alt="profile" src={defaultProfilePic}/>

            <div className="profile-details">
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-info">{user.email}</p>
                <p className="profile-info">Playing since: {user.creationDate}</p>
                <p className="profile-info">Interested in: {user.sportingInterests.join(', ')}</p>
            </div>
            <div className="profile-rating">
                <img alt="star" src={star} className="star"/>
                <h1 className="profile-rating-score">{user.rating}/5</h1>
            </div>
            <img src={edit} alt="edit button" className="edit-btn"/>
        </div>
    )
}

export default ProfileHeader;