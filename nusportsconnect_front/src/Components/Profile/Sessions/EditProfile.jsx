import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { findUser, getUserUsername } from "../../../GraphQLQueries/queries";
import { Loading } from "../../Loading/Loading";
import Navbar from "../../NavBar/Navbar";
import NotAuthenticated from "../../NotAuthenticated/NotAuthenticated";
import EditProfileBody from "./EditProfileBody";

function EditProfile() {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [ownUser, setOwnUser] = useState("");

  React.useEffect(() => {
    const apiCall = async () => {
      const user = await findUser(id);
      const username = await getUserUsername();
      setUser(user.data.data.userProfileInfo);
      setOwnUser(username.data.data.userUsername);
    };
    apiCall();
  }, [id]);

  if (
    user === "Not authenticated" ||
    user === null ||
    user.username !== ownUser
  ) {
    return <NotAuthenticated />;
  } else if (user === "") {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <EditProfileBody user={user} />
    </div>
  );
}

export default EditProfile;
