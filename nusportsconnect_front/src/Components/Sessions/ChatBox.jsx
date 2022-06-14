import React from 'react';

function ChatBox(){
    return (
        <div className='chat-box'>
        This is the chat box
        <textarea className='chat-input' />
        <button type='submit' className='send-icon'>Send</button>
    </div>
    )
}

export default ChatBox;