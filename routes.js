//Add routes here for organisational purposes. Routes will change once we publish to a hosting service.
//Production
// const refreshTokenRoute = "/refresh_token";
// const reqOriginRoute = "http://localhost:3000/";

//Deployment

const refreshTokenRoute = "https://nusportsconnect.herokuapp.com/refresh_token";
const reqOriginRoute = "https://nusportsconnect.herokuapp.com/";

module.exports = {
    refreshTokenRoute,
    reqOriginRoute
}