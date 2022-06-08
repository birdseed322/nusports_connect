import axios from "axios";
import { graphqlURI } from "../Routes/routes"

function addUser(username, password, email) {

    const query = "mutation{\n  addUser(username:\"" + username + "\" password:\"" + password + "\" email:\"" + email + "\")\n}";

    const result = axios.post(graphqlURI, {
            query
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

    return result.status;

}

export { graphqlURI, addUser };