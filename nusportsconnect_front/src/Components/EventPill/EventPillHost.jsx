import React from 'react';
import locationIcon from '../../pics/location-dot-solid.png';
import timeIcon from '../../pics/clock-solid.png';
import personIcon from '../../pics/person.png';
import HostButtons from './Buttons/HostButtons';
import './EventPillStyles.css';

function EventPillHost(props){
    
    return (
        <div className='event-pill'>
            <h1 className='event-pill-header'>Event Header</h1>
            <div className='event-location event-detail-header'>
                <img alt='location-icon' className='location-icon' src={locationIcon}/>
                <p className='event-detail'>Sample location</p>
            </div>
            <div className='event-time event-detail-header'>
                <img alt='time-icon' className='time-icon'src={timeIcon}/>
                <p className='event-detail'>9am - 10am</p>
            </div>
            <div className='event-pax'>
                <p className='event-attendance'>4/4</p>
                <img alt='pax-icon' className='pax-icon' src={personIcon}/>
            </div>
            <HostButtons />
        </div>
    )
}

export default EventPillHost;