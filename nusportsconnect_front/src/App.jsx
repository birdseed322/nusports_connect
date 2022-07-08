import React from "react";
import { setAccessToken } from "./accessToken";
import { Loading } from "./Components/Loading/Loading";
import EndPoints from "./Routes/EndPoints";
import { refreshTokenRoute } from "./Routes/routes";

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
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <EndPoints />
    </div>
  );
}

export default App;
