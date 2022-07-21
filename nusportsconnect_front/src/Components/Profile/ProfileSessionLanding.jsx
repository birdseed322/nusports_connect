import React from "react";
import { useParams } from "react-router-dom";
import { setPageTitle } from "../../generalFunctions";
import { checkProfileOwner, findUser } from "../../GraphQLQueries/queries";
import { Loading } from "../Loading/Loading";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import OtherPersonalProfileSession from "../OtherProfile/Sessions/OtherPersonalProfileSession";
import PersonalProfileSession from "./Sessions/PersonalProfileSession";
//Landing page for profile. Checks the info given in the browser cookie (Generated during login) to see if the profile you are viewing is yours

function ProfileSessionLanding(props) {
  const [data, setData] = React.useState("");
  const [owner, setOwner] = React.useState(false);
  const { id } = useParams();
  const socket = props.socket
  //Upon mounting component, data retrieved and sent down to profile component.
  React.useEffect(() => {
    const apiCall = async () => {
      const user = await findUser(id);
      setData(user.data.data.userProfileInfo);
      const check = await checkProfileOwner(id);
      setOwner(check.data.data.checkProfileOwner);
      setPageTitle(
        "NUSportsConnect - " +
          user.data.data.userProfileInfo.fName +
          "'s profile"
      );
    };
    apiCall();
  }, [id]);
  if (data === "Not authenticated" || data === null) {
    return <NotAuthenticated />;
  } else if (data === "") {
    return <Loading />;
  }
  return owner ? (
    <PersonalProfileSession user={data} socket={socket}/>
  ) : (
    <OtherPersonalProfileSession user={data} socket={socket}/>
  );
}

export default ProfileSessionLanding;
