import React from 'react';
import Chat from './Chat';

function ChatBox(props){
    React.useEffect(()=>{
        var elem = document.getElementsByClassName('chat-box')[0];
        elem.scrollTop = elem.scrollHeight;
    })
    return (
        <div className='chat'>
            <button onClick={props.usersOnlineOverlay} className="toggle-usersOnlineOverlay">Active users</button>
            <div className='chat-box'>
            {props.messages.map(x =>{
                return <Chat owner={props.owner === x.author} user={x.author} text={x.message} time={x.time}/>
            }
            )}
            </div>
            <div className='chat-input-grp'>
                <textarea placeholder='Message' className='chat-input' value={props.message} onChange={e =>props.setMessage(e.target.value)}/>
                <button type='submit' className='send-icon' onClick={() => {
                    props.handleSendMessage()
                }}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox;