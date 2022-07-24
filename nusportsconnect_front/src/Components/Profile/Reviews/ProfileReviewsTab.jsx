import React, { useState } from "react";
import { getReviews } from "../../../GraphQLQueries/queries";
import ReviewsPill from "./ReviewsPill";

function ProfileReviewTab(props) {
  const user = props.user;
  const [userReviews, setUserReviews] = useState([]);
  const [noReviews, setNoReviews] = useState(false);

  React.useEffect(() => {
    const apiCall = async () => {
      const reviews = await getReviews(user.username);
      setUserReviews(reviews.data.data.userReviews);
      if (userReviews.length === 0) {
        setNoReviews(true);
      }
    };
    apiCall();
  }, []);
  console.log(userReviews[0]);
  return (
    <div className="profile-tab-info">
      {userReviews.reverse().map((review) => {
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
      })}
      {noReviews ? <h1 className="not-found">No reviews 😔 </h1> : null}
    </div>
  );
}

export default ProfileReviewTab;
