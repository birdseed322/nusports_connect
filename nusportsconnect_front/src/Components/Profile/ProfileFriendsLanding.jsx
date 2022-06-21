import React from 'react';
import {useParams} from 'react-router-dom'
import { checkProfileOwner, findUser } from '../../GraphQLQueries/queries';
import NotAuthenticated from '../NotAuthenticated/NotAuthenticated';
import OtherPersonalProfileFriends from '../OtherProfile/Friends/OtherPersonalProfileFriends';
import PersonalProfileFriends from './Friends/PersonalProfileFriends';

//Landing page for profile. Checks the info given in the browser cookie (Generated during login) to see if the profile you are viewing is yours

function ProfileFriendsLanding(){
  const [data, setData] = React.useState("")
  const [owner, setOwner] = React.useState(false);
  const {id} = useParams();
  //Upon mounting component, data retrieved and sent down to profile component.
  React.useEffect(()=>{
    const apiCall = async () => {
      const user = await findUser(id)
      setData(user.data.data.userProfileInfo)
      const check = await checkProfileOwner(id)
      setOwner(check.data.data.checkProfileOwner)
    };

    apiCall()
  },[id])

  if (data === "Not authenticated" || data === "" || data === null){
    return <NotAuthenticated />
  }

  return owner ? <PersonalProfileFriends user={data}/> : <OtherPersonalProfileFriends user={data}/>

}

export default ProfileFriendsLanding;