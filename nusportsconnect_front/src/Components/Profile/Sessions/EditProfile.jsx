import React from "react";
import { useParams } from "react-router-dom";
import { findUser } from "../../../GraphQLQueries/queries";
import Navbar from "../../NavBar/Navbar";
import EditProfileBody from "./EditProfileBody";

function EditProfile() {
  const { id } = useParams();
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const apiCall = async () => {
      const user = await findUser(id);
      setUser(user.data.data.userProfileInfo);
    };

    apiCall();
  }, [id]);
  return (
    <div>
      <Navbar />
      <EditProfileBody user={user} />
    </div>
  );
}

export default EditProfile;
