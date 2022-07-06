import React from "react";
import { testAuth } from "../../GraphQLQueries/queries";
import { Loading } from "../Loading/Loading";
import Navbar from "../NavBar/Navbar";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import CreateSessionBody from "./CreateSessionBody";

function CreateSession() {
  const [data, setData] = React.useState("")
  React.useEffect(() => {
    const apiCall = async () => {
      const res = await testAuth();
      setData(res.data.data.testAuth);
    }
    apiCall()
  },[])

  if (data === "Not authenticated" || data === null) {
    return <NotAuthenticated />;
  } else if (data === "") {
    return <Loading />;
  }
  
  return (
    <div>
      <Navbar />
      <CreateSessionBody />
    </div>
  );
}

export default CreateSession;
