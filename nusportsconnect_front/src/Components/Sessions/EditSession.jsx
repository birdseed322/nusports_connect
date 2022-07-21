import React from "react";
import { testAuth } from "../../GraphQLQueries/queries";
import { Loading } from "../Loading/Loading";
import Navbar from "../NavBar/Navbar";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import EditSessionBody from "./EditSessionBody";

function EditSession(props) {
  const [data, setData] = React.useState("");
  const socket = props.socket
  React.useEffect(() => {
    const apiCall = async () => {
      const res = await testAuth();
      setData(res.data.data.testAuth);
    };
    apiCall();
  }, []);

  if (data === "Not authenticated" || data === null) {
    return <NotAuthenticated />;
  } else if (data === "") {
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
