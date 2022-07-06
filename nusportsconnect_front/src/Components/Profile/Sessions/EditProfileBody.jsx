import React, { useState } from "react";
import { updateUser } from "../../../GraphQLQueries/queries";
import "./EditProfileStyles.css";

function EditProfileBody({ user }) {
  const [email, setEmail] = useState(user.email);
  const [fName, setFName] = useState(user.fName);
  const [lName, setLName] = useState(user.lName);
  const [interests, setInterests] = useState(user.interests);
  const [baseImage, setBaseImage] = useState(user.image);

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
      window.location.href = "/" + user.username;
    } catch (err) {
      console.log(err);
    }
  }
  console.log(baseImage);
  return (
    <div className="edit-container">
      <div className="edit-header">
        <h1 className="edit-title">Edit Profile</h1>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="image">Profile Picture: </label>
        <input type="file" onChange={(e) => uploadImage(e)} />
        <img src={baseImage} alt="" />
        <button onClick={(e) => setBaseImage("")}>
          {" "}
          Remove Profile Picture
        </button>
        {/*see whether we want this feature to remove profile picture. */}
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
          // onClick={() => (window.location.href = "/" + user.username)}
        >
          edit
        </button>
      </form>
    </div>
  );
}

export default EditProfileBody;
