import React from "react"
import "./profileBodyStyles.css";
import ProfileSessionsTab from "./Tabs/ProfileSessionsTab";

function ProfileBody(props){

    var sessionsTab = "profile-tab profile-tab-text"
    var historyTab = "profile-tab profile-tab-text"
    var friendsTab = "profile-tab profile-tab-text"
    var reviewsTab = "profile-tab profile-tab-text"

    switch(props.highlighted){
        case "sessions":
            sessionsTab = "profile-tab-text highlight";
            break;
        case "history":
            historyTab = "profile-tab-text highlight";
            break;
        case "friends":
            friendsTab = "profile-tab-text highlight";
            break;
        case "reviews":
            reviewsTab = "profile-tab-text highlight";
            break;
        default:
            sessionsTab = "profile-tab-text highlight";
            break;
    }

    return (
        <div className="profile-body">
            <div className="profile-tabs">
                <h2 className={sessionsTab}>sessions</h2>
                <h2 className={historyTab}>history</h2>
                <h2 className={friendsTab}>friends</h2>
                <h2 className={reviewsTab}>reviews</h2>
            </div>
            <hr/>
            <ProfileSessionsTab user={props.user} />
        </div>
    )
}

export default ProfileBody;