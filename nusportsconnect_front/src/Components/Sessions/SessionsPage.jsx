import React from "react";
import { getUserUsername } from "../../GraphQLQueries/queries";
import Navbar from "../NavBar/Navbar";
import SessionsPageBody from "./SessionsPageBody";

function SessionsPage(props) {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const apiCall = async () => {
      const session = await getUserUsername();
      setUser(session.data.data.userUsername);
    };

    apiCall();
  }, []);

  return (
    <div>
      <Navbar />
      <SessionsPageBody user={user} />
    </div>
  );
}

export default SessionsPage;
