import React from "react"
import { formatAMPM } from "../../generalFunctions"
import "./chatStyles.css"

export default function Chat(props){
    const chatStyle = props.owner ? "chat-owner" : "chat-other"
    const chatCase = props.owner ? "chat-case-owner" : "chat-case-other"
    const time = formatAMPM(new Date(parseInt(props.time)));
    return (
        <div className={chatCase}>
            {props.owner? null : <p className="chat-username">{props.user}</p>}
            <div className={chatStyle}>
                <p className="chat-message">{props.text}</p>
                <p className="chat-time">{time}</p>
            </div>
        </div>
    )

}