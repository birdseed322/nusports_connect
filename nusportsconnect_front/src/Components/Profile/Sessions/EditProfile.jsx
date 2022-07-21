import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { findUser, getUserUsername } from "../../../GraphQLQueries/queries";
import { Loading } from "../../Loading/Loading";
import Navbar from "../../NavBar/Navbar";
import NotAuthenticated from "../../NotAuthenticated/NotAuthenticated";
import EditProfileBody from "./EditProfileBody";
import { setPageTitle } from "../../../generalFunctions"

function EditProfile(props) {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [ownUser, setOwnUser] = useState("");
  const socket = props.socket

  React.useEffect(() => {
    const apiCall = async () => {
      const user = await findUser(id);
      const username = await getUserUsername();
      setUser(user.data.data.userProfileInfo);
      setOwnUser(username.data.data.userUsername);
    };
    apiCall();
    setPageTitle("NUSportsConnect - Edit profile")
  
  }, [id]);

  if (ownUser === "" || user === null) {
    return <Loading />;
  } else if (user.username !== ownUser) {
    return <NotAuthenticated />;
  }

  return (
    <div>
      <Navbar socket={socket}/>
      <EditProfileBody user={user} />
    </div>
  );
}

export default EditProfile;
