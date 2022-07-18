import React from 'react';

function AnnouncementInput(props){
    return (
        <div> 
            <textarea className='announcement-input' onChange={e => props.setAnnouncement(e.target.value)} value={props.announcement}/>
            <button className='send-announcement-icon' onClick={props.handleSendAnnouncement}>+</button>
        </div>
    )
}

export default AnnouncementInput;