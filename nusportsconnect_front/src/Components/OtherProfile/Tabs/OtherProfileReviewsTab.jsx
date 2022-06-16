import React from 'react';
import ReviewsPill from '../../Profile/Reviews/ReviewsPill';

function OtherProfileReviewsTab(props){
    
    //Dummy code for reviews pill info.

    return(
        <div className="profile-tab-info">
            <ReviewsPill reviewerName="Klay Thompson" reviewerSport="Basketball" reviewerDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum varius sit amet mattis vulputate enim nulla." reviewerRating={4} reviewerPicSrc='https://static01.nyt.com/images/2020/11/20/sports/20nba-klay-print1-sub/19nba-klay-1-mediumSquareAt3X.jpg'/>
        </div>
    )
}

export default OtherProfileReviewsTab;