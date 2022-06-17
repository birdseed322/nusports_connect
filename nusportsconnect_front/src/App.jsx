import React from "react";
import { setAccessToken } from "./accessToken";
import EndPoints from "./Routes/EndPoints";
function App() {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(()=>{
    fetch("http://localhost:5000/refresh_token", {credentials:"include", method:'POST'})
    .then(async x => {
      const data = await x.json();
      setAccessToken(data.accessToken)
      setLoading(false)
    })
  }, [])

  if(loading){
    return <div>loading...</div>
  }

  return (
    <div className="App">
      <EndPoints />
      {/* <CreateSession /> */}
    </div>
  );
}

export default App;
