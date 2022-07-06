import React from "react";
import { getUserUsername } from "../../GraphQLQueries/queries";
import { Loading } from "../Loading/Loading";
import Navbar from "../NavBar/Navbar";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import SessionsPageBody from "./SessionsPageBody";

function SessionsPage(props) {
  const [user, setUser] = React.useState("");
    React.useEffect(() => {
        const apiCall = async () => {
          const session = await getUserUsername();
          setUser(session.data.data.userUsername);
        };
      
        apiCall();
      }, []);
      if (user === "Not authenticated") {
        return <NotAuthenticated />;
      } else if (user === "") {
        return <Loading />
      }

  return (
    <div>
      <Navbar />
      <SessionsPageBody user={user} />
    </div>
  );
}

export default SessionsPage;
