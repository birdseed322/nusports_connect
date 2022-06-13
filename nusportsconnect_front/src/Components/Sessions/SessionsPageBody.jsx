import React from 'react';
import './sessionspagestyles.css'
import star from '../../pics/star.png'
import dummyHostProfilePic from '../../pics/defaultProfilePic.png'
import personIcon from '../../pics/person.png';

function SessionsPageBody(props){

    const description = "This is a long sentence.This is a long sentence.This is a long sentence.This is a long sentence.This is a long sentence."

    function handleWhoGoing(e){
        console.log("expanded");
    }

    return(
        <div className='session-page-body'>
            <div className='session-left'>
                <div className='event-header'>
                    <h1 className='event-title'>Basketball @ PGPR Basketball court 2, 21st May 2022 3.30pm (2 hours)</h1>
                    <div className='event-host-details'>
                        <h3 className='event-subtitle'>Hosted by: Wesley Teo</h3>
                        <img className='event-host-img' alt='event host profile pic' src = {dummyHostProfilePic}/>
                        <img className='event-host-star-icon' alt='event host star icon' src = {star}/>
                        <p className='event-host-rating'>4.8/5</p>  
                    </div>
                </div> 
                <div className='event-description-box'>
                        <div className='event-description'>
                            <div className='event-description-desc'>
                                <p className='event-description-header'>Description</p>
                                <p className='event-description-body'>{description}</p>                 
                            </div>
                            <div className='event-description-desc'>
                                <p className='event-description-header'>Minimum stars</p>
                                <img className='event-minimum-stars' alt='stars' src={star}/>
                                <img className='event-minimum-stars' alt='stars' src={star}/>
                                <img className='event-minimum-stars' alt='stars' src={star}/>   
                            </div>
                        </div>
                </div>
                <div className='chat-box'>
                    This is the chat box
                    <textarea className='chat-input' />
                    <button type='submit' className='send-icon'>Send</button>
                </div>
            </div>

            <div className='session-right'>
                <div className='who-going-box'>
                    <p className='who-going-box-title'>Who's going?</p>
                    <img className='participant-pic' alt='participant pic' src = {dummyHostProfilePic}/>
                    <p className='expand-who-going' onClick={handleWhoGoing}>...</p>
                    
                    <div className='participant-pax-grp'>
                        <p className='participant-pax'>5/8</p>
                        <img alt='man' className='participant-icon' src={personIcon}/>
                    </div>
                </div>
                <div className='announcement-box-grp'>
                    <div className='announcement-box'>
                        <h2 className='announcement-header'>Announcements</h2>
                        Some code to map announcements
                    </div>         
                    <textarea className='announcement-input'/>
                    <button className='send-announcement-icon'>+</button>
                </div>                         
            </div>
        </div>
    )

}

export default SessionsPageBody;