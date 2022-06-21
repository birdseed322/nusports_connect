import axios from "axios";
import { getAccessToken } from "../accessToken";
import { graphqlURI } from "../Routes/routes"

function postQuery(query){
    let result = axios({
        url : graphqlURI,
        method : "post",
        withCredentials: true,
        headers: {
            Authorization: "bearer " + getAccessToken()
        },
        data : {
            query
        }
    })
    .catch(err => console.log(err));

    return result;
}

export function addUser(username, password, email, fName, lName) {
    const query = `
    mutation {
        addUser(username:"${username}" password:"${password}" email:"${email}" fName:"${fName}" lName:"${lName}")
    }
 
    `

    const result = axios.post(graphqlURI, {
            query
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

    return result.status;

}

export async function loginUser(username, password) {
    const query = `
    mutation{
        login(username: "${username}" password:"${password}"){
            accessToken
        }
      }
    `

    let result = await axios({
        url : graphqlURI,
        method : "post",
        withCredentials: true,
        data : {
            query
        }
    })
    .catch(err => console.log(err));

    return result;
}

export function logout(){
    const query = `
    mutation{
        logout
      }
    `
    return postQuery(query);
}

export function testAuth(){
    const query = `
    query{
        testAuth
      }
    `

    return postQuery(query)
}

export function findUser(username){
    const query = `
    query{
        userProfileInfo(username:"${username}"){
          username
          email
          fName
          lName
          accountCreationDate
        }
      }
    `
    return postQuery(query);
}

export function checkProfileOwner(username){
    const query = `
    query{
        checkProfileOwner(username:"${username}")
      }
    `
    return postQuery(query);
}