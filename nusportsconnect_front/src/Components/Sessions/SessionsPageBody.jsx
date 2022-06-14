import React from 'react';
import './sessionspagestyles.css'
import star from '../../pics/star.png'
import dummyHostProfilePic from '../../pics/defaultProfilePic.png'
import personIcon from '../../pics/person.png';
import AnnouncementInput from './AnnouncementInput';
import FriendOverlay from './FriendOverlay';
import ChatBox from './ChatBox';

function SessionsPageBody(props){

    const [friendOverlay, setFriendOverlay] = React.useState(false);

    //props used to retrieve user information.
    //Use React router dom (useParams) to get id from url. Use id to query necessary info abt session. API call initialised from this componenet. No props needed.
    const user = props.user;

    const dummyEvent = {
        host : "Wesley Teo",
        sport : "Badminton",
        location : "UTSH3",
        date : "21st May 2022",
        startTime: "3.30pm" ,
        duration : 2,
        description : "This is a long sentence.This is a long sentence.This is a long sentence.This is a long sentence.This is a long sentence.",
        minStars : 4,
        participants : ["Joe", "Tom", "Peter", "James", "Wesley Teo"],
        maxParticipants : 8
    }

    const participant = dummyEvent.participants.includes(user.name);
    const host = dummyEvent.host === user.name;
    //another api call to retrieve host details
    const hostRating = "4.8/5"

    const participantsPax = dummyEvent.participants.length + "/" + dummyEvent.maxParticipants
    const title = dummyEvent.sport + " @ " + dummyEvent.location + ", " + dummyEvent.date + " " + dummyEvent.startTime + " (" + dummyEvent.duration + " hours)"
    var minStars = []
    for (var i = 0; i < dummyEvent.minStars; i++){
        minStars.push("star");
    }


    return(
        <div className='session-page-body'>
            <div className='session-left'>
                <div className='event-header'>
                    <h1 className='event-title'>{title}</h1>
                    <div className='event-host-details'>
                        <h3 className='event-subtitle'>Hosted by: {dummyEvent.host}</h3>
                        <img className='event-host-img' alt='event host profile pic' src = {dummyHostProfilePic}/>
                        <img className='event-host-star-icon' alt='event host star icon' src = {star}/>
                        <p className='event-host-rating'>{hostRating}</p>  
                    </div>
                </div> 
                <div className='event-description-box'>
                        <div className='event-description'>
                            <div className='event-description-desc'>
                                <p className='event-description-header'>Description</p>
                                <p className='event-description-body'>{dummyEvent.description}</p>                 
                            </div>
                            <div className='event-description-desc'>
                                <p className='event-description-header'>Minimum stars</p>
                                {minStars.map(() => {
                                    return <img className='event-minimum-stars' alt='stars' src={star}/> 
                                })}
                            </div>
                        </div>
                </div>
                {host||participant ? <ChatBox /> : <button className='join-btn'>I want to go!</button>}
            </div>
            <div className='session-right'>
                <div className='who-going-box'>
                    <p className='who-going-box-title'>Who's going?</p>
                    <img className='participant-pic' alt='participant pic' src = {dummyHostProfilePic}/>
                    <p className='expand-who-going' onClick={() => setFriendOverlay(true)}>...</p>

                    <div className='participant-pax-grp'>
                        <p className='participant-pax'>{participantsPax}</p>
                        <img alt='man' className='participant-icon' src={personIcon}/>
                    </div>
                </div>
                <div className='announcement-box-grp'>
                    <div className='announcement-box'>
                        <h2 className='announcement-header'>Announcements</h2>
                        Some code to map announcements
                    </div>         
                    {host ? <AnnouncementInput /> : null}
                    <FriendOverlay open={friendOverlay} closeOverlay={()=>setFriendOverlay(false)} participants={dummyEvent.participants}/>
                </div>                         
            </div>
        </div>
    )

}

export default SessionsPageBody;