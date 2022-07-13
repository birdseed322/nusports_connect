import React from 'react';

function ChatBox(props){
    return (
        <div className='chat-box'>
        {props.messages.map(x => <div>
            <h1>{x.user}</h1>
            <p>{x.text}</p>
        </div>)}
        <textarea className='chat-input' value={props.message} onChange={e =>props.setMessage(e.target.value)}/>
        <button type='submit' className='send-icon' onClick={() => {
            props.handleSendMessage()
        }}>Send</button>
    </div>
    )
}

export default ChatBox;