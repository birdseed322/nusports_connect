import React from 'react';
import star from '../../pics/star.png'
import defaultProfilePic from '../../pics/defaultProfilePic.png'

function ParticipantBubble(props){
    return (
        <div className='participant-bubble'>
            <img className='participant-prof-pic' alt='participant profile' src={defaultProfilePic}/>
            <div className='participant-details'>
                <p className='participant-name'>{props.name}</p>
                <img className='participant-rating-star' alt='star' src={star}/>
                <p className='participant-rating'>{props.rating}/5</p>
            </div>
        </div>
    )
}

export default ParticipantBubble;