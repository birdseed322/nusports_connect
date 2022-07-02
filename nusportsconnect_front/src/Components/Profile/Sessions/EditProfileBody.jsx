import React, { useState } from "react";
import { updateUser } from "../../../GraphQLQueries/queries";
import "./EditProfileStyles.css";

function EditProfileBody({ user }) {
  // const [email, setEmail] = React.useState(user.email);
  const [email, setEmail] = React.useState(user.email);
  const [fName, setFName] = React.useState(user.fName);
  const [lName, setLName] = React.useState(user.lName);
  const [interests, setInterests] = React.useState(user.interests);

  React.useEffect(() => {
    const apiCall = async () => {
      setEmail(user.email);
      setFName(user.fName);
      setLName(user.lName);
      setInterests(user.interests);
    };
    apiCall();
  }, [user.email, user.fName, user.lName, user.interests]);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      updateUser(user.username, email, fName, lName, interests);
    } catch (err) {
      console.log(err);
    }
  }

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

      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="fName">First Name: </label>
        <input
          type="text"
          id="fName"
          onChange={(e) => setFName(e.target.value)}
          value={fName}
        />

        <label htmlFor="lName">Last Name: </label>
        <input
          type="text"
          id="lName"
          onChange={(e) => setLName(e.target.value)}
          value={lName}
        />

        <label htmlFor="interests">Interested in: </label>
        <input
          type="text"
          id="interests"
          onChange={(e) => setInterests(e.target.value)}
          value={interests}
        />

        <button className="edit-button" type="submit">
          edit
        </button>
      </form>
    </div>
  );
}

export default EditProfileBody;
