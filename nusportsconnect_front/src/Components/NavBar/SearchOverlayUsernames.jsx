import React from "react";
import ParticipantBubble from "../Sessions/ParticipantBubble";

function SearchOverlayUsernames({ filteredUsernames, handleClick }) {
  return (
    <div>
      <button className="find-user-btn" onClick={() => handleClick("Names")}>
        Find by name
      </button>

      {filteredUsernames.length !== 0 ? (
        filteredUsernames.map((name) => {
          return (
            <ParticipantBubble
              username={name.username}
              name={name.username}
              rating={name.ratings}
              image={name.image}
            />
          );
        })
      ) : (
        <h1>No users found!</h1>
      )}
    </div>
  );
}

export default SearchOverlayUsernames;
