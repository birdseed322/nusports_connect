import React from "react";
import ParticipantBubble from "../Sessions/ParticipantBubble";

function SearchOverlayFLNames({ filteredFLNames, handleClick }) {
  return (
    <div>
      <button
        className="find-user-btn"
        onClick={() => handleClick("Usernames")}
      >
        Find by username
      </button>
      {filteredFLNames.length !== 0 ? (
        filteredFLNames.map((name) => {
          return (
            <ParticipantBubble
              username={name.username}
              name={name.fName + " " + name.lName}
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

export default SearchOverlayFLNames;
