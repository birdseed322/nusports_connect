import React from 'react';

function ParticipantButtons(props) {
    return (
        <div className='host-btns'>
        <button className='event-action-btn view-event-btn' onClick={() => window.location.href = "/sessions/" + props.id} >View</button>
        <button className='event-action-btn leave-event-btn'>Leave</button>
    </div>
    )
}

export default ParticipantButtons;