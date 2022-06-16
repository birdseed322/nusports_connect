import React from 'react';
import FriendBubble from '../../FriendBubble/FriendBubble';

function OtherProfileFriendsTab(props){

    const friend = {
        name : "Joe Peter Jonas",
        imgSrc : "https://media.istockphoto.com/vectors/thumb-up-emoticon-vector-id157030584?k=20&m=157030584&s=612x612&w=0&h=TsRUZrgOW19D1f3WMleDrgGL-xfI6g0ZYhJDp58lS0E="
    }

    return(
        <div className="profile-tab-info">
            <div className='profile-friend-tab-header'>
                <h2 className='friend-count'>{props.user.friendCount} Friends</h2>
            </div>
            <div className='friends-tab'>
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
                <FriendBubble friend={friend} />
            </div>
        </div>
    )
}

export default OtherProfileFriendsTab;