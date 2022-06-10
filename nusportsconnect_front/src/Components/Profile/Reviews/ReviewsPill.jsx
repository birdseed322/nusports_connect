import React from 'react';
import star from '../../../pics/star.png'
import './ReviewsPillStyles.css';


function ReviewsPill(props){

    return (
        <div className='reviews-pill'>
            <img alt='reviewer-pic' src={props.reviewerPicSrc} className='reviewer-pic' />
            <div className='pill-info'>
                <h1 className='reviews-pill-header'>{props.reviewerName}</h1>
                <p className='reviews-pill-desc-sport'>Sports played together: {props.reviewerSport}</p>
                <p className='reviews-pill-desc'>{props.reviewerDesc}</p>
            </div>
            <div className='reviewer-rating-grp'>
                <p className='reviewer-rating'>{props.reviewerRating}/5</p>
                <img alt='star' src={star} className='reviewer-rating-star'/>
            </div>
        </div>
    )
}

export default ReviewsPill;