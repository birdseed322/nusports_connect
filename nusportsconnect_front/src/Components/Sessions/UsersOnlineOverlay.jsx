import React from "react";

function UsersOnlineOverlay({ open, closeOverlay, participants }) {
  if (!open) {
    return null;
  }

  return (
    <div className="friend-overlay">
      <div className="users-online-modal">
        <button className="close-friend-overlay-btn" onClick={closeOverlay}>
          x
        </button>
        <h2 className="friend-overlay-title">Users Online ({participants.length})</h2>
        <div className="users-online-overlay-participant-list">
          {participants.map((participant) => {
            return (
                <p>{participant}</p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersOnlineOverlay;
