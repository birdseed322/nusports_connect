import React, { useState } from "react";
import { getReviews } from "../../../GraphQLQueries/queries";
import ReviewsPill from "./ReviewsPill";

function ProfileReviewTab(props) {
  const user = props.user;
  const [userReviews, setUserReviews] = useState([]);

  React.useEffect(() => {
    const apiCall = async () => {
      const reviews = await getReviews(user.username);
      setUserReviews(reviews.data.data.userReviews);
    };
    apiCall();
  }, []);
  console.log(userReviews);

  return (
    <div className="profile-tab-info">
      {userReviews.map((review) => {
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

export default ProfileReviewTab;
