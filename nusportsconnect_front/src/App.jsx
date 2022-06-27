import React from "react";
import { setAccessToken } from "./accessToken";
import { Loading } from "./Components/Loading/Loading";
import EndPoints from "./Routes/EndPoints";

function App() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("http://localhost:5000/refresh_token", {
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
