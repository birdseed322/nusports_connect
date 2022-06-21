const { sign, verify } = require('jsonwebtoken');
const { User } = require('../models/User');

//Function to create access token
function createAccessToken(user) {
    return(sign({userId : user.id, username: user.username, tokenVersion : user.tokenVersion}, process.env.JWTSECRET, 
        {expiresIn : '15m'}));
}

//Function to create refresh token
function createRefreshToken(user) {
    return (sign({userId : user.id, username: user.username, tokenVersion : user.tokenVersion}, process.env.JWTREFRESHSECRET, 
        {expiresIn : '7d'}));
}

//Function to determine if user is authenticated (Has access token)
async function isAuth(req) {
    const authorization = req.headers.authorization;
    
    if (authorization){
        try {
            const token = authorization.split(' ')[1];
            verify(token, process.env.JWTSECRET, (err, user) => {
                req.user = user;
            });
        } catch (err){
            console.log(err);
        }
    }

    return req.next();
}


module.exports = { createAccessToken, createRefreshToken, isAuth};