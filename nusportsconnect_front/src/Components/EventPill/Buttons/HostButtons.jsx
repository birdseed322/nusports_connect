import React from 'react';

function HostButtons(props) {
    return (
        <div className='host-btns'>
        <button className='event-action-btn view-event-btn' onClick={() => window.location.href = "/sessions/" + props.id} >View</button>
        <button className='event-action-btn edit-event-btn' onClick={() => window.location.href = "/sessions/" + props.id + "/edit"}>Edit</button>
        <button className='event-action-btn leave-event-btn' onClick={props.handleLeave}>Leave</button>
    </div>
    )
}

export default HostButtons;