import React, { useState } from "react";
import { updateUser } from "../../../GraphQLQueries/queries";
import "./EditProfileStyles.css";
import noPic from "../../../pics/defaultProfilePic.png";

function EditProfileBody({ user }) {
  const [email, setEmail] = useState(user.email);
  const [fName, setFName] = useState(user.fName);
  const [lName, setLName] = useState(user.lName);
  const [interests, setInterests] = useState(user.interests);
  const [image, setImage] = useState({ noPic });

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
      // const imageData = new FormData();
      // imageData.append("image", image, image.name);
      // console.log(imageData.get("image"));
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

      <form className="edit-form" onSubmit={handleSubmit}>
        {/* <label htmlFor="image">Profile Picture: </label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}

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

        <button
          className="edit-button"
          type="submit"
          onClick={() => (window.location.href = "/" + user.username)}
        >
          edit
        </button>
      </form>
    </div>
  );
}

export default EditProfileBody;
