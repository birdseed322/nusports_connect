import React, { useState } from "react";
import { getReviews } from "../../../GraphQLQueries/queries";
import ReviewsPill from "../../Profile/Reviews/ReviewsPill";

function OtherProfileReviewsTab(props) {
  const otherUser = props.user;
  const [otherUserReviews, setOtherUserReviews] = useState([]);
  const [noReviews, setNoReviews] = useState(false);

  React.useEffect(() => {
    const apiCall = async () => {
      const reviews = await getReviews(otherUser.username);
      setOtherUserReviews(reviews.data.data.userReviews);
      if (otherUserReviews.length === 0) {
        setNoReviews(true);
      }
    };
    apiCall();
  }, []);
  return (
    <div className="profile-tab-info">
      {noReviews ? (
        <h1 className="not-found">No reviews 😔</h1>
      ) : (
        otherUserReviews.reverse().map((review) => {
          return (
            <ReviewsPill
              reviewerUsername={review.reviewer.username}
              reviewerName={review.reviewer.fName + " " + review.reviewer.lName}
              reviewerDesc={review.comment}
              reviewerRating={review.rating}
              reviewerPicSrc={review.reviewer.image}
              reviewCreationDate={review.reviewCreationDate}
            />
          );
        })
      )}
    </div>
  );
}

export default OtherProfileReviewsTab;
