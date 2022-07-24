import React from "react";
import { setAccessToken } from "./accessToken";
import { Loading } from "./Components/Loading/Loading";
import EndPoints from "./Routes/EndPoints";
import { refreshTokenRoute } from "./Routes/routes";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnection: false,
});

function App() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(refreshTokenRoute, {
      credentials: "include",
      method: "post",
    }).then(async (x) => {
      const data = await x.json();
      setAccessToken(data.accessToken);
      setLoading(false);
      const username = jwt_decode(data.accessToken).username;
      socket.emit("login", username);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <EndPoints socket={socket} />
    </div>
  );
}

export default App;
