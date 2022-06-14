import React from 'react';
import ParticipantBubble from './ParticipantBubble';

function FriendOverlay({open, closeOverlay, participants}){
    if (!open) {
        return null;
    };

    return(
        <div className='friend-overlay'>
            <div className='friend-modal'>
            <button className='close-friend-overlay-btn' onClick={closeOverlay}>x</button>
                <h2 className='friend-overlay-title'>Who's going?</h2>
                <div className='friend-overlay-participant-list'>
                    <ParticipantBubble name = "Joe" rating="3.2"/>
                    <ParticipantBubble name = "Joe" rating="3.2"/>
                    <ParticipantBubble name = "Joe" rating="3.2"/>
                    <ParticipantBubble name = "Joe" rating="3.2"/>
                    <ParticipantBubble name = "Joe" rating="3.2"/>
                </div>
            </div>
        </div>
    )
}

export default FriendOverlay;