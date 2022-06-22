import React from "react"
import {useParams} from 'react-router-dom'
import OtherProfileFriendsTab from "../Tabs/OtherProfileFriendTab"


function OtherProfileFriendsBody(props){
    let {id} = useParams()
    var sessionsTab = "profile-tab profile-tab-text"
    var historyTab = "profile-tab profile-tab-text"
    var friendsTab = "profile-tab-text highlight" 
    var reviewsTab = "profile-tab profile-tab-text"

    return (
        <div className="profile-body">
            <div className="profile-tabs">
                {props.friend ? <h2 className={sessionsTab} onClick={()=>window.location.href="/" + id}>sessions</h2> : null}
                <h2 className={historyTab} onClick={()=>window.location.href="/" + id + "/history"}>history</h2>
                <h2 className={friendsTab} onClick={()=>window.location.href="/" + id + "/friends"}>friends</h2>
                <h2 className={reviewsTab} onClick={()=>window.location.href="/" + id + "/reviews"}>reviews</h2>
            </div>
            <hr/>
            <OtherProfileFriendsTab user={props.user}/>
        </div>
    )
}

export default OtherProfileFriendsBody;