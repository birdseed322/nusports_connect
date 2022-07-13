import React from "react";
import { useParams } from "react-router-dom";
import { checkProfileOwner, findUser } from "../../GraphQLQueries/queries";
import { Loading } from "../Loading/Loading";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";
import OtherPersonalProfileReviews from "../OtherProfile/Reviews/OtherPersonalProfileReviews";
import PersonalProfileReview from "./Reviews/PersonalProfileReviews";

//Landing page for profile. Checks the info given in the browser cookie (Generated during login) to see if the profile you are viewing is yours

function ProfileReviewsLanding() {
  const [data, setData] = React.useState("");
  const [owner, setOwner] = React.useState(false);
  const { id } = useParams();
  //Upon mounting component, data retrieved and sent down to profile component.
  React.useEffect(() => {
    const apiCall = async () => {
      const user = await findUser(id);
      setData(user.data.data.userProfileInfo);
      const check = await checkProfileOwner(id);
      setOwner(check.data.data.checkProfileOwner);
    };

    apiCall();
  }, [id]);

  if (data === "Not authenticated" || data === null) {
    return <NotAuthenticated />;
  } else if (data === "") {
    return <Loading />;
  }

  return owner ? (
    <PersonalProfileReview user={data} />
  ) : (
    <OtherPersonalProfileReviews user={data} />
  );
}

export default ProfileReviewsLanding;
