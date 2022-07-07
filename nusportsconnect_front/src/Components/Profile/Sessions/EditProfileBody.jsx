import React, { useState } from "react";
import { updateUser } from "../../../GraphQLQueries/queries";
import "./EditProfileStyles.css";
import defaultProfilePic from "../../../pics/defaultProfilePic.png";
function EditProfileBody({ user }) {
  const [email, setEmail] = useState(user.email);
  const [fName, setFName] = useState(user.fName);
  const [lName, setLName] = useState(user.lName);
  const [interests, setInterests] = useState(user.interests);
  const [baseImage, setBaseImage] = useState(user.image);
  const defaultPic = defaultProfilePic;
  React.useEffect(() => {
    const apiCall = async () => {
      setEmail(user.email);
      setFName(user.fName);
      setLName(user.lName);
      setInterests(user.interests);
      setBaseImage(user.image);
    };
    apiCall();
  }, [user.email, user.fName, user.lName, user.interests, user.image]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateUser(
        user.username,
        email,
        fName,
        lName,
        interests,
        baseImage
      );
      console.log("updated");
      window.location.href = "/profile/" + user.username;
    } catch (err) {
      console.log(err);
    }
  }
  console.log(baseImage);
  return (
    <div className="edit-container">
      <div className="edit-panel">
        <h1 className="edit-title">Edit Profile</h1>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="edit-item">
            <label htmlFor="image">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Profile Picture:{" "}
            </label>
            <input
              className="image-upload"
              type="file"
              onChange={(e) => uploadImage(e)}
            />
          </div>
          {baseImage !== "" ? (
            <img className="profile-pic" name="image" src={baseImage} alt="" />
          ) : (
            <img
              className="profile-pic"
              name="image"
              src={defaultProfilePic}
              alt=""
            />
          )}
          <button
            type="button"
            className="remove-button"
            onClick={(e) => setBaseImage("")}
          >
            Remove Profile Picture
          </button>
          <div className="edit-item">
            <label htmlFor="email">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email:{" "}
            </label>
            <input
              type="email"
              className="edit-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="edit-item">
            <label htmlFor="fName">First Name: </label>
            <input
              type="text"
              className="edit-input"
              id="fName"
              onChange={(e) => setFName(e.target.value)}
              value={fName}
            />
          </div>
          <div className="edit-item">
            <label htmlFor="lName">Last Name: </label>
            <input
              type="text"
              className="edit-input"
              id="lName"
              onChange={(e) => setLName(e.target.value)}
              value={lName}
            />
          </div>
          <div className="edit-item">
            <label htmlFor="interests">Interested in: </label>
            <textarea
              type="text"
              className="edit-input edit-description"
              id="interests"
              onChange={(e) => setInterests(e.target.value)}
              value={interests}
            />
          </div>
          <button className="edit-button" type="submit">
            edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileBody;
