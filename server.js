const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean,
    defaultFieldResolver,
    GraphQLScalarType,
    Kind,
    graphql,
    GraphQLFloat
} = require('graphql');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
let User = require('./models/User');
let Review = require('./models/Review');
const Session = require('./models/Session');
const { hash, compare } = require('bcryptjs');
const cors = require('cors');
const { createAccessToken, createRefreshToken, isAuth } = require('./auth/auth');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
var { getCreationDate, formatAMPM } = require('./helperFunctions');
const { ObjectId } = require('mongodb');
const path = require('path');
const { CallTracker } = require('assert');
let Chat = require('./models/Chat');
const Announcement = require('./models/Announcement');

require('dotenv').config();

//Create instance of app and define port

const app = express();
const port = process.env.PORT || 5000;

//Add dependencies for app to be functional
app.use(cors({ credentials: true, exposedHeaders: ['Authorization'], origin: "https://nusportsconnect.herokuapp.com/" }));
// app.use(cors({ credentials: true, exposedHeaders: ['Authorization'], origin: "http://localhost:3000/" }));
app.use(cookieParser());
app.use(isAuth);
app.use(express.json({limit: '50mb'}));

const server = require('http').createServer(app)

//Create connection to database. Change to appropriate database URI
const dbURI = process.env.LOCAL_DB_URI;

mongoose.connect(dbURI, { useNewURLParser: true });

const connection = mongoose.connection;

const io = require("socket.io")(server, {
    transports : ["websocket", "polling"],
    reconnection: false
})

connection.once('open', () => {
    console.log('Connection with DB successful!');
})

server.listen(port, () => {
    console.log('Server is running on port:' + port);
})

//Websocket Responses

let rooms = {}

io.on("connection", client => {
    var currentRoomId;
    var currentUser;
    client.on("username", ({username, room}) => {
        console.log(username + " connected to room " + room)
        const user = {
            name : username,
            id : client.id 
        }
        client.join(room)
        currentRoomId = room;
        currentUser = username
        if (rooms[room] === undefined) {
            rooms[room] = new Set()
            rooms[room].add(username)
        } else {
            rooms[room].add(username)   
        }
        
        io.to(room).emit("connected", Array.from(rooms[room]))
    })

    client.on("send", ({message, room}) => {
        const newChat = new Chat({
            room,
            author : message.user,
            message : message.message
        })

        newChat.save().then(() => {
            io.to(room).emit("message", {
                message : message.message,
                time: new Date().getTime(),
                author: message.user
            })
        }).catch(err => console.log(err))
    })

    client.on("disconnect", () => {
        try {
            rooms[currentRoomId].delete(currentUser)
            io.to(currentRoomId).emit("user disconnected", Array.from(rooms[currentRoomId]))
        } catch(err){

        }
        io.emit("disconnected", client.id)
    })

    client.on("send announcement", message => {
        const newAnnouncement = new Announcement({
            room: currentRoomId,
            message
        })

        newAnnouncement.save().then(() => {
            io.to(currentRoomId).emit("announcement", {
                message,
                time: new Date().getTime()
            })
        }).catch(err => console.log(err))
    })

    client.on("delete announcement", message => {

        Announcement.find({message}).deleteMany({}).then(() => {
            io.to(currentRoomId).emit("deleted announcement", {
                message
            })
        }).catch(err => console.log(err))
    })
})



//Definining GraphQL object types
const UserType = new GraphQLObjectType({
    name: "User",
    description: "This represents a user",
    fields: () => ({
        username: { type: GraphQLNonNull(GraphQLString) },
        ratings: { type: GraphQLList(GraphQLFloat) },
        email: { type: GraphQLNonNull(GraphQLString) },
        fName: { type: GraphQLNonNull(GraphQLString) },
        lName: { type: GraphQLNonNull(GraphQLString) },
        interests: { type: GraphQLString },
        image: {type : GraphQLString},
        reviews: { type: GraphQLList(ReviewType)}, 
        currentSessions: { type: GraphQLList(SessionType)},
        accountCreationDate: { type: GraphQLString }
    })
});

const ReviewType = new GraphQLObjectType({
    name: "Review",
    description: "This represents a review",
    fields: () => ({
        reviewer: { type: UserType },
        reviewee: { type: UserType },
        rating: { type: GraphQLInt },
        comment: { type: GraphQLString },
        reviewCreationDate: { type: GraphQLString },
        sessionId: { type: GraphQLString }
    })
});


const LoginResponse = new GraphQLObjectType({
    name: "LoginResponse",
    description: "This represents a login response",
    fields: () => ({
        accessToken: { type: GraphQLString }
    })
});

const SessionType = new GraphQLObjectType({
    name: "Session",
    description: "This represents a session",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        sport: { type: GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        minStar: { type: GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLNonNull(GraphQLString) },
        startTime: { type: GraphQLNonNull(GraphQLString) },
        endTime: { type: GraphQLNonNull(GraphQLString) },
        fullStartTime: { type: GraphQLNonNull(GraphQLString) },
        fullEndTime: { type: GraphQLNonNull(GraphQLString) },
        participants: { type: GraphQLList(UserType) },
        participantsId: {type: GraphQLList(GraphQLString)},
        host: { type: UserType },
        currentParticipants: { type: GraphQLNonNull(GraphQLInt) },
        maxParticipants: { type: GraphQLNonNull(GraphQLInt) },
    })
});

const ChatType = new GraphQLObjectType({
    name: "Chat",
    desctiption : "This represents a chat message",
    fields: () => ({
        room : {type : GraphQLNonNull(GraphQLString)},
        author : {type : GraphQLNonNull(GraphQLString)},
        message : {type : GraphQLNonNull(GraphQLString)},
        time : {type : GraphQLNonNull(GraphQLString)}
    })
})

//Defining GraphQL scalar types
const dateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date time scalar type',
    parseValue(value) {
        return value
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10)
        }
        return null
    },
    serialize(value) {
        const date = new Date(value)
        return date
    }
})


//Root query and Root mutation
const RootQueryType = new GraphQLObjectType({
    name: "query",
    description: "Root query",
    fields: () => ({
        user: {
            type: UserType,
            description: "An instance of a user",
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => console.log(args.id)
        },
        users: {
            type: GraphQLList(UserType),
            description: "Retrieve all users",
            resolve: async() => {
                let users = await User.find().exec()
                users.map((user) => {
                    const cDate = getCreationDate(user.createdAt)
                    user.accountCreationDate = cDate;
                })
                return users;
            }
        },
        sessions: {
            type: GraphQLList(SessionType),
            description: "Retrieve all Session",
            resolve: async() => {
                let sessions = await Session.find().exec()
                sessions = sessions.map(async(sesh) => {
                    const host = await User.findById(sesh.host).exec()
                    return {
                        id: sesh.id,
                        sport: sesh.sport,
                        location: sesh.location,
                        date: dateTime.serialize(sesh.startTime).toDateString(),
                        startTime: formatAMPM(dateTime.serialize(sesh.startTime)),
                        endTime: formatAMPM(dateTime.serialize(sesh.endTime)),
                        host,
                        fullStartTime: sesh.startTime,
                        fullEndTime: sesh.endTime,
                        currentParticipants: sesh.participants.length,
                        maxParticipants: sesh.maxParticipant,
                    }
                })
                return sessions;
            }
        },
        getSessionInfo: {
            type: SessionType,
            description: "Retrieve information about a session",
            args: {
                id: { type: GraphQLString }
            },
            resolve: async(parent, args) => {
                let session = await Session.findById(args.id).exec().then(async(sesh) => {
                    let host = await User.findById(sesh.host).exec();
                    let users = await User.find({ _id: { $in: sesh.participants } }).exec();
                    users = users.map(async (user) => { 
                        let reviews = await Review.find( {_id: {$in: user.reviews}}).exec()
                        return {
                            fName: user.fName,
                            lName: user.lName,
                            username: user.username,
                            ratings: user.ratings,
                            image: user.image,
                            reviews
                        }
                    });
                    return {
                        sport: sesh.sport,
                        location: sesh.location,
                        date: dateTime.serialize(sesh.startTime).toDateString(),
                        description: sesh.description,
                        minStar: sesh.minStar,
                        startTime: formatAMPM(dateTime.serialize(sesh.startTime)),
                        fullStartTime: sesh.startTime,
                        endTime: formatAMPM(dateTime.serialize(sesh.endTime)),
                        fullEndTime: sesh.endTime,
                        host,
                        participants: users,
                        currentParticipants: sesh.participants.length,
                        maxParticipants: sesh.maxParticipant,
                    }
                })
                return session
            }

        },
        allUsernames: {
            type: GraphQLList(UserType),
            description: "Retrive all users",
            resolve: async() => {
                let all = await User.find().exec();
                return all;
        }
    }, 
        userProfileInfo: {
            type: UserType,
            description: "Retrieve a user's profile information",
            args: {
                username: { type: GraphQLString }
            },
            resolve: async(parent, args, { req, res, user }) => {
                if (!user) {
                    throw Error("Not authenticated");
                }

                const result = await User.findOne({ username: args.username }).exec()
                const cDate = result.createdAt;
                const accountCreationDate = getCreationDate(cDate)
                const currentSessions = await Session.find({ _id: { $in: result.currentSessions } }).exec()
                const reviews = await Review.find({ _id: { $in: result.reviews  } }).exec()
                return {
                    username: result.username,
                    email: result.email,
                    fName: result.fName,
                    lName: result.lName,
                    interests: result.interests,
                    ratings: result.ratings,
                    image: result.image,
                    reviews,
                    currentSessions,
                    accountCreationDate
                };
            }
        },
        userIdentity: {
            type: GraphQLString,
            description: "Get the id of a user",
            resolve: (_, args, { req, res, user }) => {
                if (!user) {
                    return "Not authenticated";
                } else {
                    return user.userId;
                }
            }
        },
        userUsername: {
            type: GraphQLString,
            description: "Get the username of a user",
            resolve: (_, args, { req, res, user }) => {
                if (!user) {
                    console.log("Not Logged in");
                    return "Not authenticated";
                } else {
                    return user.username;
                }
            }
        },
        userReviews: {
            type: GraphQLList(ReviewType),
            description: "Get a list of a user's reviews",
            args: {
                username: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                let reviewee = await User.findOne({ username: args.username }).exec()
                let revieweeReviews = await Review.find({ _id: { $in: reviewee.reviews } }).exec()
                revieweeReviews = revieweeReviews.map(async(review) => {
                    const cDate = getCreationDate(review.createdAt)
                    const reviewer = await User.findById(review.reviewer).exec()
                    return {
                        reviewer,
                        rating: review.rating,
                        comment: review.comment,
                        reviewCreationDate: cDate
                    };
                });
                return revieweeReviews;
            }
        },
        testAuth: {
            type: GraphQLString,
            description: "Test authentication of user",
            resolve: (_, args, { req, res, user }) => {
                if (!user) {
                    console.log("Not Logged in");
                    return "Not authenticated";
                } else {
                    console.log("Logged in");
                    return "Your user ID is : " + user.userId;
                }
            }
        },
        checkProfileOwner: {
            type: GraphQLBoolean,
            description: "Check if request is made by profile owner",
            args: {
                username: { type: GraphQLString }
            },
            resolve: (parent, args, { req, res, user }) => {
                return (user.username === args.username);
            }
        },
        getSessions: {
            type: GraphQLList(SessionType),
            description: "Convert a list of session id to session objects",
            args: {
                sessions: { type: GraphQLList(GraphQLString) }
            },
            resolve: (_, args, { req, res, user }) => {

                let sessions = async() => {
                    let res = await Session.find({ _id: { $in: args.sessions } }).exec()
                    res = res.map(sesh => {
                        return {
                            id: sesh.id,
                            sport: sesh.sport,
                            location: sesh.location,
                            startTime: sesh.startTime,
                            endTime: sesh.endTime,
                            currentParticipants: sesh.participants.length,
                            maxParticipants: sesh.maxParticipant,
                        }
                    });
                    return res;
                }

                return sessions();
            }
        },
        getRoomChat : {
            type: GraphQLList(ChatType),
            description: "Retrieve previous chat from room",
            args: {
                roomId : {type: GraphQLString}
            },
            resolve: async (_, args) => {
                let messages = await Chat.find({room : args.roomId}).exec()
                messages = messages.map(message => ({
                    author : message.author,
                    message : message.message,
                    time : message.createdAt
                }))

                return messages
            }
        },
        getRoomAnnouncement : {
            type: GraphQLList(ChatType),
            description: "Retrieve previous announcements from room",
            args: {
                roomId : {type: GraphQLString}
            },
            resolve: async (_, args) => {
                let messages = await Announcement.find({room : args.roomId}).exec()
                messages = messages.map(message => ({
                    message : message.message,
                    time : message.createdAt
                }))

                return messages
            }
        },
        getUserCurrentSessions: {
            type: GraphQLList(SessionType),
            description: "Retrieve list of user's current sessions",
            args: {
                username: { type: GraphQLString }
            },
            resolve: async(_, args) => {
                let res = await User.findOne({ username: args.username }).exec()
                let userSessions = await Session.find({ _id: { $in: res.currentSessions } }).exec()
                userSessions = userSessions.map(async(sesh) => {
                    const host = await User.findById(sesh.host).exec()
                    return {
                        id: sesh.id,
                        sport: sesh.sport,
                        location: sesh.location,
                        date: dateTime.serialize(sesh.startTime).toDateString(),
                        startTime: formatAMPM(dateTime.serialize(sesh.startTime)),
                        endTime: formatAMPM(dateTime.serialize(sesh.endTime)),
                        host,
                        fullStartTime: sesh.startTime,
                        fullEndTime: sesh.endTime,
                        participantsId: sesh.participants,
                        currentParticipants: sesh.participants.length,
                        maxParticipants: sesh.maxParticipant,
                    };
                });

                return userSessions;
            }
        }
    })
});


const RootMutationType = new GraphQLObjectType({
    name: "mutation",
    description: "root mutation",
    fields: () => ({
        login: {
            type: LoginResponse,
            description: "log a user in",
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async(_, args, { req, res }) => {
                const user = await User.findOne({ username: args.username })

                if (!user) {
                    throw new Error("could not find user")
                }

                const valid = await compare(args.password, user.password);

                if (!valid) {
                    throw new Error("wrong password");
                }

                res.cookie('jid', createRefreshToken(user), { httpOnly: true });

                const accessToken = createAccessToken(user)

                return ({
                    accessToken: accessToken
                });
            }
        },
        logout: {
            type: GraphQLBoolean,
            description: "log a user out",
            resolve: (_, args, { req, res }) => {
                res.cookie('jid', "", { httpOnly: true });
                return true;
            }
        },
        addUser: {
            type: GraphQLBoolean,
            description: "Create a new user",
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                fName: { type: GraphQLNonNull(GraphQLString) },
                lName: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, args) => {
                try {
                    const hashedPasswordWord = hash(args.password, 12).then((pw) => {
                        const newUser = new User({
                            username: args.username,
                            password: pw,
                            email: args.email,
                            fName: args.fName,
                            lName: args.lName,
                        });
                        newUser.save();
                    });
                } catch (err) {
                    console.log(err);
                    return false;
                }
                return true;
            }
        },
        updateUser: {
            type: GraphQLBoolean,
            description: "Update a user's personal information",
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                fName: { type: GraphQLString },
                lName: { type: GraphQLString },
                interests: { type: GraphQLString },
                image: {type: GraphQLString}
            },
            resolve: (_, args) => {
                try {
                    User.updateOne(
                        {username: args.username},
                        { $set: {
                            email: args.email,
                            fName: args.fName,
                            lName: args.lName,
                            interests: args.interests,
                            image: args.image
                            }
                        }
                    ).exec();
                } catch (err) {
                    console.log(err);
                    return false;
                }
                return true;
            }
        },

        addReview: {
            type: GraphQLBoolean,
            description: "Add a review for a user",
            args: {
                reviewerUsername: { type: GraphQLString },
                revieweeUsername: { type: GraphQLString },
                rating: { type: GraphQLInt },
                comment: { type: GraphQLString },
                sessionId: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                try {
                        const reviewer = await User.findOne({ username: args.reviewerUsername }).exec()
                        const reviewee = await User.findOne({ username: args.revieweeUsername }).exec()
                        const newReview = new Review({
                            reviewer: reviewer,
                            reviewee: reviewee,
                            rating: args.rating,
                            comment: args.comment,
                            sessionId: args.sessionId
                        });
                        newReview.save();

                        reviewee.ratings.push(args.rating);
                        reviewee.reviews.push(newReview);
                        reviewee.save();

                    } catch (err) {
                    console.log(err);
                    return false;
                }
                return true;
            }
        },

        createSession: {
            type: GraphQLString,
            description: "Create a session",
            args: {
                sport: { type: GraphQLNonNull(GraphQLString) },
                location: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                startTime: { type: GraphQLNonNull(GraphQLString) },
                endTime: { type: GraphQLNonNull(GraphQLString) },
                maxParticipant: { type: GraphQLNonNull(GraphQLInt) },
                minStar: { type: GraphQLNonNull(GraphQLInt) },
                host: { type: GraphQLNonNull(GraphQLString) },
                participants: { type: GraphQLList(GraphQLString) }
            },
            resolve: (_, args) => {
                const newSession = new Session({
                    sport: args.sport,
                    location: args.location,
                    description: args.description,
                    startTime: dateTime.parseValue(args.startTime),
                    endTime: dateTime.parseValue(args.endTime),
                    maxParticipant: args.maxParticipant,
                    minStar: args.minStar,
                    host: args.host,
                    participants: args.participants
                })
                try {
                    newSession.save()
                    return newSession.id
                } catch (err) {
                    console.log(err)
                    return "error"
                }

            }
        },
        joinSession: {
            type: GraphQLBoolean,
            description: "Join a session",
            args: {
                userId: { type: GraphQLNonNull(GraphQLString) },
                sessionId: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                try {
                    const session = Session.findById(args.sessionId).exec().then(sess => {
                        const user = User.findById(args.userId).exec().then(currentUser => {
                            currentUser.currentSessions.push(sess._id);
                            sess.participants.push(currentUser._id);
                            if (sess.participants.length === 1) {
                                sess.host = currentUser._id
                            }
                            sess.save();
                            currentUser.save();
                        })
                    })
                    return true;
                } catch (err) {
                    console.log(err);
                    return false;
                }

            }
        },
        leaveSession: {
            type: GraphQLBoolean,
            description: "Leave a session",
            args: {
                sessionId: {type : GraphQLNonNull(GraphQLString)}
            },
            resolve: async (_,args,{req, res, user}) => {
                try {
                    const session = await Session.findById(args.sessionId).exec()
                    session.participants = session.participants.filter((participant) => participant.toString() !== user.userId)
                    if (session.host.toString() === user.userId && session.participants.length !== 0){
                        session.host = session.participants[0];
                    }
                    session.save()
                    const participant = await User.findById(user.userId).exec()
                    participant.currentSessions = participant.currentSessions.filter((session) => session.toString() !== args.sessionId)
                    participant.save()

                    return true
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }
        },
        editSession: {
            type: GraphQLBoolean,
            description: "Edit details of session",
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                location: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                startTime: { type: GraphQLNonNull(GraphQLString) },
                endTime: { type: GraphQLNonNull(GraphQLString) },
                maxParticipant: { type: GraphQLNonNull(GraphQLInt) },
                minStar: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_, args, { req, res, user }) => {
                if (!user) {
                    throw new Error("Not authenticated");
                }

                try {
                    Session.findById(args.id).exec().then(sesh => {
                        if (args.maxParticipant === 1 || args.maxParticipant < sesh.participants.length || args.maxParticipant > 30) {
                            return false;
                        }
                        sesh.location = args.location;
                        sesh.description = args.description;
                        sesh.startTime = dateTime.parseValue(args.startTime);
                        sesh.endTime = dateTime.parseValue(args.endTime);
                        sesh.maxParticipant = args.maxParticipant;
                        sesh.minStar = args.minStar;
                        sesh.save();
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        },
        revokeRefreshTokenForUser: {
            type: GraphQLBoolean,
            description: "Invalidate user's refresh token",
            args: { userId: { type: GraphQLString } },
            resolve: (_, args) => {
                User.findById(args.userId, (err, user) => {
                    user.tokenVersion = user.tokenVersion + 1;
                    user.save();
                });
                return true;
            }

        }
    })
})

const graphqlSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.use('/graphql',
    expressGraphQL((req, res) => {
        return {
            schema: graphqlSchema,
            graphiql: { headerEditorEnabled: true },
            context: { req, res, user: req.user }
        };
    })
);



//Route to refresh token

app.post("/refresh_token", async(req, res) => {
    const token = req.cookies.jid;

    if (!token) {
        return res.send({ ok: false, accessToken: '' });
    }

    let payload = null;

    try {
        payload = verify(token, process.env.JWTREFRESHSECRET);
    } catch (err) {
        console.log(err);
        res.send({ ok: false, accessToken: '' });
    }

    const user = await User.findById(payload.userId);

    if (!user) {
        return res.send({ ok: false, accessToken: '' });
    }

    //Validate to ensure that refresh token is not used by blacklisted member
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: '' });
    }
    res.cookie('jid', createRefreshToken(user), { httpOnly: true });
    res.send({ ok: true, accessToken: createAccessToken(user) });

});

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('nusportsconnect_front/build'))

    app.get('*', (req, res) => {
        console.log("Loading other files")
        res.sendFile(path.resolve(__dirname, 'nusportsconnect_front','build','index.html'))
    })
}