import React from 'react';
import EventPillHost from '../../EventPill/EventPillHost';

function ProfileHistoryTab(props){

    //Dummy code. Ideally will pull a list of events associated w member. Then use map function to create pill for each event.
    const event = {
        eventName : "Badminton",
        eventLocation : "UTSH2",
        eventStart : "9am",
        eventEnd : "11am",
        eventCurrentPax : 3,
        eventMaxPax : 4,
        eventHost : "Peter Tan"
    }

    //Check if host of event. Should be inside the map function when parsing through list of event.
    const host = props.user.name === event.eventHost

    return(
        <div className="profile-tab-info">
            <EventPillHost host={host} history={true} event={event}/>
        </div>
    )
}

export default ProfileHistoryTab;