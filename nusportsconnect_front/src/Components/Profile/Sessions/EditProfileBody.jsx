import React from "react";
import "./EditProfileStyles.css";

function EditProfileBody({ user }) {
  console.log(user);
  return (
    <div className="edit-container">
      <div className="edit-header">
        <h1 className="edit-title">Edit Profile</h1>
      </div>
      {/* Can edit:
      email
      fName
      lName
      interests
      profile picture */}
      <form className="edit-form">
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" placeholder={user.email} />

        <label htmlFor="fName">First Name: </label>
        <input type="text" id="fName" placeholder={user.fName} />

        <label htmlFor="lName">Last Name: </label>
        <input type="text" id="lName" placeholder={user.lName} />

        <label htmlFor="interests">Interested in: </label>
        <input type="text" id="interests" placeholder={user.interests} />

        <button className="edit-button" type="submit">
          edit
        </button>
      </form>
    </div>
  );
}

export default EditProfileBody;
