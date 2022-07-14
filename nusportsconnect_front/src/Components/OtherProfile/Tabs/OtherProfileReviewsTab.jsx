import React, { useState } from "react";
import { getReviews } from "../../../GraphQLQueries/queries";
import ReviewsPill from "../../Profile/Reviews/ReviewsPill";

function OtherProfileReviewsTab(props) {
  const otherUser = props.user;
  const [otherUserReviews, setOtherUserReviews] = useState([]);
  React.useEffect(() => {
    const apiCall = async () => {
      const reviews = await getReviews(otherUser.username);
      setOtherUserReviews(reviews.data.data.userReviews);
    };
    apiCall();
  }, []);

  return (
    <div className="profile-tab-info">
      {otherUserReviews.map((review) => {
        return (
          <ReviewsPill
            reviewerUsername={review.reviewer.username}
            reviewerName={review.reviewer.fName + " " + review.reviewer.lName}
            reviewerDesc={review.comment}
            reviewerRating={review.rating}
            reviewerPicSrc={review.reviewer.image}
          />
        );
      })}
    </div>
  );
}

export default OtherProfileReviewsTab;
