import axios from "axios";
import { getAccessToken } from "../accessToken";
import { graphqlURI } from "../Routes/routes"

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

export function loginUser(username, password) {
    const query = `
    mutation{
        login(username: "${username}" password:"${password}"){
            accessToken
        }
      }
    `

    let result = axios({
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

export function testAuth(){
    const query = `
    query{
        testAuth
      }
    `
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