import React from 'react';
import { getUserUsername } from '../../GraphQLQueries/queries';
import Navbar from '../NavBar/Navbar';
import SessionsPageBody from './SessionsPageBody';

function SessionsPage(props) {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        const apiCall = async () => {
          const session = await getUserUsername();
          setUser(session.data.data.userUsername);
        };
      
        apiCall();
      }, []);
    //Dummy code to simulate drawing information of user from database. Should ideally be done in useEffect statement, so info loaded before rendering.
    // const user = {
    //     name : "Samuel Tay",
    //     email : "someemail@gmail.com",
    //     rating : 4.6,
    //     creationDate : "20/02/22",
    //     sportingInterests : ["Tennis", "Ultimate Frisbee"]
    // } 

    return (
        <div>
            <Navbar />
            <SessionsPageBody user={user}/>
        </div>
    )

}

export default SessionsPage;