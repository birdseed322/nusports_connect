import React, { useState } from "react";
import { addReview } from "../../GraphQLQueries/queries";
import "./reviewStyles.css";

function Review(props) {
  const [revieweeUsername, setRevieweeUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  let allParticipants = props.participants;
  let reviewerUsername = props.reviewer;
  let sessionId = props.sessionId;

  function isUserRevieweed(reviewArray) {
    const filterReviewArray = reviewArray.filter(
      (review) => review.sessionId === sessionId
    );
    return filterReviewArray.length === 0 ? true : false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addReview(
        reviewerUsername,
        revieweeUsername,
        rating,
        comment,
        sessionId
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="review-container">
      <h1 className="review-header">Review</h1>
      <form className="review-form" onSubmit={handleSubmit}>
        <select
          className="review-input"
          id="particpant"
          onChange={(e) => setRevieweeUsername(e.target.value)}
          required
        >
          <option disabled selected value>
            Select a participant
          </option>
          {allParticipants
            .filter(
              (participant) =>
                participant.username !== reviewerUsername &&
                isUserRevieweed(participant.reviews)
            )
            .map((participant) => {
              return (
                <option value={participant.username}>
                  {participant.fName + " " + participant.lName}
                </option>
              );
            })}
        </select>

        <div>&nbsp;Rate your interaction with this particpant</div>

        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              required
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
        <br />
        <textarea
          className="review-input comment"
          name="comment"
          id="comment"
          placeholder="Write a comment"
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <br />
        <button className="review-button">Submit</button>
      </form>
    </div>
  );
}

export default Review;
