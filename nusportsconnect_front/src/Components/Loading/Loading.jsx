import React from 'react';
import "./loading.css"

export function Loading(){
    return(
        <div className="loading">
            <div className='dot dot1'></div>
            <div className='dot dot2'></div>
            <div className='dot dot3'></div>
        </div>
    )
}