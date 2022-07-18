import React from "react"

export default function Chat(props){
    const time = new Date(parseInt(props.time)).toDateString().replace(/^\S+\s/,'')
    return (
        <div className="announcement-item">
            <p className="announcement-time">{time}</p>
            <li className="announcement">
                <p className="announcement-message">{props.message}</p>
                {props.host ? <button className="announcement-del" onClick={() => props.handleDeleteAnnouncement(props.message)}>x</button> : null}
            </li>
        </div>
    )

}