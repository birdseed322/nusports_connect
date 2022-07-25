import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { reqOriginRoute } from "../../Routes/routes";
import { addReview } from "../../GraphQLQueries/queries";
import "./reviewStyles.css";

function Review(props) {
  const { id } = useParams();
  const [revieweeUsername, setRevieweeUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const socket = props.socket;
  let allParticipants = props.participants;
  let reviewerUsername = props.reviewer;
  let sessionId = props.sessionId;

  console.log(allParticipants);
  function isUserReviewed(reviewArray) {
    const filterReviewArray = reviewArray.filter(
      (review) =>
        review.sessionId === sessionId &&
        review.reviewer.username === reviewerUsername
    );
    return filterReviewArray.length !== 0 ? false : true;
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
      socket.emit("send review", {
        reviewerUsername,
        revieweeUsername,
        link: reqOriginRoute + "profile/" + revieweeUsername,
      });
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
                isUserReviewed(participant.reviews)
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
