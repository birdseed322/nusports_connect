import React from 'react';
import './FriendBubbleStyles.css'


function FriendBubble(props){

    //Potentially link to friend profile?
    const friendInfo = props.friend;

    return (
        <div className='friend-bubble'>
            <img src={friendInfo.imgSrc} className='friend-profile-pic' alt='profilepic'/>
            <h2 className='friend-name'>{friendInfo.name}</h2>
        </div>
    )
}

export default FriendBubble;