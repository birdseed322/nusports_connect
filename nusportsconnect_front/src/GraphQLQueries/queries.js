import axios from "axios";
import { getAccessToken } from "../accessToken";

//Posts a query from React app to GraphQL backend server
function postQuery(query) {
    let result = axios({
            url: '/graphql',
            method: "post",
            withCredentials: true,
            headers: {
                Authorization: "bearer " + getAccessToken()
            },
            data: {
                query
            }
        })
        .catch(err => console.log(err));

    return result;
}

//Creates a new user
export function addUser(username, password, email, fName, lName) {
    const query = `
    mutation {
        addUser(
        username:"${username}"
        password:"${password}" 
        email:"${email}" 
        fName:"${fName}" 
        lName:"${lName}" 
        )
    }
 
    `
    
    const result = axios.post('/graphql', {
            query
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

    return result.status;

}

//Logins a user
export async function loginUser(username, password) {
  const query = `
  mutation{
        login(username: "${username}" password:"${password}"){
          accessToken
        }
      }
      `
      
      let result = await axios({
        url: '/graphql',
        method: "post",
        withCredentials: true,
        data: {
          query
        }
      })
      .catch(err => console.log(err));
      
      return result;
    }
    
//Logs a user out
export function logout() {
  const query = `
  mutation{
      logout
  }
  `
  return postQuery(query);
}

//Gets the id of a user 
export function getUserIdentity() {
    const query = `
    query{
        userIdentity
      }
    `
    return postQuery(query);
}

//Retrieves the username of a user
export function getUserUsername() {
    const query = `
    query{
        userUsername
      }
    `
    return postQuery(query);
}

//Retrieves the usernames from all users in the database
export function getAllUsernames() {
    const query = `
    query{
        allUsernames {
          username
        }
      }
    `
    return postQuery(query);
}

//Updates a user's personal information
export function updateUser(username, email, fName, lName, interests, image) {

    const query = `
    mutation {
        updateUser(
        username: "${username}" 
        email: "${email}" 
        fName: "${fName}" 
        lName: "${lName}" 
        interests: "${interests}"
        image: "${image}"
        )
      }
    `
     return postQuery(query);
}

//Adds a review to a user
export function addReview(reviewerUsername, revieweeUsername, rating, comment, sessionId) {
  const query = `
  mutation {
    addReview(
      reviewerUsername: "${reviewerUsername}"
      revieweeUsername: "${revieweeUsername}"
      rating: ${rating}
      comment: "${comment}"
      sessionId: "${sessionId}"
    )
  }
  `
  return postQuery(query);
}

//Retrieves the list of reviews of a user
export function getReviews(username) {
  const query = `
    query{
      userReviews(username: "${username}") {
        reviewer {
          username
          fName
          lName
          image
        }
        sessionId
        rating
        comment
        reviewCreationDate        
      }
    }
  `
  return postQuery(query);
}

//Retrieves the id of all current sessions of a user
export function getUserCurrentSessionsId(username) {
    const query = `
  query{
    userProfileInfo(username:"${username}") {
      currentSessions {
        id
      }
    }
  }
  `
    return postQuery(query);
}

//Retrieves the information of all sessions in the database
export function getAllSessions() {
    const query = `
    query{
      sessions {
        id
        sport
        location
        date
        startTime
        fullStartTime
        fullEndTime
        endTime
        host {
          username
        }
        currentParticipants
        maxParticipants
      }
    }
    `
    return postQuery(query)
}

//Tests the authentication of a user
export function testAuth() {
    const query = `
    query{
        testAuth
      }
    `

    return postQuery(query)
}

//Finds a user based on their username
export function findUser(username) {
const query = `
    query{
        userProfileInfo(username:"${username}"){
          username
          email
          fName
          lName
          interests
          ratings
          image
          accountCreationDate
        }
      }
    `
    return postQuery(query);
}

//Checks if a request is made by the profile owner (When viewing personal profile or other profile)
export function checkProfileOwner(username) {
    const query = `
    query{
        checkProfileOwner(username:"${username}")
      }
    `
    return postQuery(query);
}


//Creates a new session
export function createSession(sport, location, description, startDate, endDate, maxParticipant, minStar, host) {
    const query = `
    mutation {
        createSession(
          sport:"${sport}" 
          location:"${location}" 
          description:"${description}" 
          startTime:"${startDate}" 
          endTime:"${endDate}" 
          maxParticipant:${maxParticipant} 
          minStar:${minStar} 
          host:"${host}" 
          participants:[]
          )
      }
    `
    return postQuery(query);
}

//Edits a session's information
export function editSession(id, location, description, startTime, endTime, maxParticipant, minStar) {
    const query = `
  mutation{
    editSession(id:"${id}" location:"${location}" description:"${description}" startTime:"${startTime}" endTime:"${endTime}" maxParticipant:${maxParticipant} minStar:${minStar})
  }
  `;
    return postQuery(query);
}

//Retrieves the information of a session
export function getSessionInfo(sessionId) {
    const query = `
    query{
        getSessionInfo(id:"${sessionId}") {
          sport
          location
          date
          description
          minStar
          startTime
          fullStartTime
          endTime
          fullEndTime
          host {
            fName
            lName
            username
            ratings
            image
          }
          participants {
            fName
            lName
            username
            ratings
            image
            reviews {
              sessionId
            }
          }
          currentParticipants
          maxParticipants
        }
      }
    `
    return postQuery(query);
}

//Joins a session
export function joinSession(userId, sessionId) {
    const query = `
    mutation {
        joinSession(userId:"${userId}" sessionId:"${sessionId}")
      }
    `
    return postQuery(query);
}

//Leaves a session
export function leaveSession(sessionId) {
  const query = `
  mutation{
    leaveSession(sessionId:"${sessionId}")
  }
  `
  return postQuery(query);
}

//Retrieves all current sessions of a user
export function getUserCurrentSessions(username) {
    const query = `
    query{
      getUserCurrentSessions(username:"${username}") {
        id
        sport
        location
        date
        startTime
        endTime
        fullStartTime
        fullEndTime
        host{
          username
        }
        participantsId
        currentParticipants
        maxParticipants
      }
    }
  `
    return postQuery(query);
}

//Retrieves all the chat releated to a room
export function getRoomChat(room) {
  const query = `
  query{
    getRoomChat(roomId : "${room}"){
      author
      message
      time
    }
  }
  `

  return postQuery(query)
}

//Retrieves all the announcements related to a room
export function getRoomAnnouncement(room) {
  const query = `
  query{
    getRoomAnnouncement(roomId : "${room}"){
      message
      time
    }
  }
  `

  return postQuery(query)
}

//Retrieves user notifications
export function getUserNotifications(username) {
  const query = `
  query{
    getUserNotifications(username:"${username}") {
      message
      link
      createdAt
    }
  }
  `

  return postQuery(query)
}

//Clear all users notifications
export function clearAllNotifications(username){
  const query = `
  mutation {
    clearAllNotifications(username:"${username}")
  }
  `

  return postQuery(query)
}

//Clear a single notification
export function clearNotification(username, time, link){
  const query = `
  mutation {
    clearNotification(username:"${username}" createdAt:"${time}" link:"${link}")
  }
  `

  return postQuery(query)
}

//Create notifications for upcoming sessions
export function checkUpcomingSessions(username){
  const query = `
  mutation{
    checkUpcomingSessions(username:"${username}")
  }
  `

  return postQuery(query)
}

//Create notifications to review sessions
export function checkSessionEnded(username){
  const query = `
  mutation{
    checkSessionEnded(username:"${username}")
  }
  `

  return postQuery(query)
}