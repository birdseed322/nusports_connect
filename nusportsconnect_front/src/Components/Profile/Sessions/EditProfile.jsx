import React from "react";
import { useParams } from "react-router-dom";
import { findUser } from "../../../GraphQLQueries/queries";
import { Loading } from "../../Loading/Loading";
import Navbar from "../../NavBar/Navbar";
import NotAuthenticated from "../../NotAuthenticated/NotAuthenticated";
import EditProfileBody from "./EditProfileBody";

function EditProfile() {
  const { id } = useParams();
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    const apiCall = async () => {
      const user = await findUser(id);
      setUser(user.data.data.userProfileInfo);
    };

    apiCall();
  }, [id]);
  
  if (user === "Not authenticated" || user === null) {
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
