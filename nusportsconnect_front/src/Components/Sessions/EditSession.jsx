import React from "react";
import { useParams } from "react-router-dom";
import { getSessionInfo, getUserUsername, testAuth } from "../../GraphQLQueries/queries";
import { Loading } from "../Loading/Loading";
import Navbar from "../NavBar/Navbar";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import EditSessionBody from "./EditSessionBody";

function EditSession(props) {
  const [sessionOwner, setSessionOwner] = React.useState("");
  const [ownUser, setOwnUser] = React.useState("");
  const [data, setData] = React.useState("")
  const {id} = useParams()
  const socket = props.socket
  React.useEffect(() => {
    const apiCall = async () => {
      const data = await testAuth();
      setData(data.data.data.testAuth)
      const ownUser = await getUserUsername();
      setOwnUser(ownUser.data.data.userUsername)
      const sessionOwner = await getSessionInfo(id);
      setSessionOwner(sessionOwner.data.data.getSessionInfo.host.username);
    };
    apiCall();
  }, []);
  if (data === "Not authenticated" || data === null || ownUser !== sessionOwner || data === "") {
    return <Loading />;
  }

  return (
    <div>
      <Navbar socket={socket}/>
      <EditSessionBody />
    </div>
  );
}

export default EditSession;
