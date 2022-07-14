import React from "react";
import star from "../../../pics/star.png";
import "./ReviewsPillStyles.css";
import defaultProfilePic from "../../../pics/defaultProfilePic.png";

function ReviewsPill(props) {
  const image = props.reviewerPicSrc;
  return (
    <div className="reviews-pill">
      <a href={"/profile/" + props.reviewerUsername}>
        {image === "" ? (
          <img
            className="reviewer-pic"
            alt="profile-pic"
            src={defaultProfilePic}
          />
        ) : (
          <img
            alt="reviewer-pic"
            src={props.reviewerPicSrc}
            className="reviewer-pic"
          />
        )}
      </a>

      <div className="pill-info">
        <a className="profile-link" href={"/profile/" + props.reviewerUsername}>
          <h1 className="reviews-pill-header">{props.reviewerName}</h1>
        </a>

        <p className="reviews-pill-desc">{props.reviewerDesc}</p>
      </div>
      <div className="reviewer-rating-grp">
        <p className="reviewer-rating">{props.reviewerRating}/5</p>
        <img alt="star" src={star} className="reviewer-rating-star" />
      </div>
    </div>
  );
}

export default ReviewsPill;
