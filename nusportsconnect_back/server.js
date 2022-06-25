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
    graphql
} = require('graphql');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
let User = require('./models/User');
const { hash, compare } = require('bcryptjs');
const cors = require('cors');
const { createAccessToken, createRefreshToken, isAuth } = require('./auth/auth');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
var getAccountCreationDate = require('./helperFunctions');
const Session = require('./models/Session');
const { ObjectId } = require('mongodb');

require('dotenv').config();

//Create instance of app and define port

const app = express();
const port = process.env.PORT || 5000;

//Add dependencies for app to use
app.use(cors({ credentials: true, exposedHeaders: ['Authorization'], origin : "http://localhost:3000"}));
app.use(cookieParser());
app.use(isAuth);
app.use(express.json());

//Create connection to database. Change to appropriate database URI
const dbURI = process.env.LOCAL_DB_URI;

mongoose.connect(dbURI, { useNewURLParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connection with DB successful!');
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})

//Definining GraphQL object types
const UserType = new GraphQLObjectType({
    name: "User",
    description: "This represents a user",
    fields: () => ({
        username: { type: GraphQLNonNull(GraphQLString) },
        email : {type : GraphQLNonNull(GraphQLString)},
        fName : {type : GraphQLNonNull(GraphQLString)},
        lName : {type : GraphQLNonNull(GraphQLString)},
        accountCreationDate : {type : GraphQLString}
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
        id: {type: GraphQLNonNull(GraphQLString)},
        sport: { type: GraphQLNonNull(GraphQLString) },
        location : {type : GraphQLNonNull(GraphQLString)},
        startTime : {type : GraphQLNonNull(GraphQLString)},
        endTime : {type : GraphQLNonNull(GraphQLString)},
        currentParticipants : {type : GraphQLNonNull(GraphQLInt)},
        maxParticipants : {type : GraphQLNonNull(GraphQLInt)}
    })
});

//Defining GraphQL scalar types

const dateTime = new GraphQLScalarType({
    name : 'DateTime',
    description : 'Date time scalar type',
    parseValue(value){
        return new Date(value)
    },
    parseLiteral(ast){
        if(ast.kind === Kind.INT){
            return parseInt(ast.value, 10)
        }
        return null
    },
    serialize(value){
        const date = new Date(value)
        return date.toISOString()
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
            resolve: async () => {
                let users = await User.find().exec()
                users.map((user) => {
                    const cDate = getAccountCreationDate(user.createdAt);
                    user.accountCreationDate = cDate;
                })
                return users
            }
        },
        userProfileInfo: {
            type: UserType,
            description : "Retrieve a user profile information",
            args : {
                username : {type: GraphQLString}
            },
            resolve: async (parent, args, {req, res, user}) => {
                if (!user){
                    throw Error("Not authenticated");
                }

                let result = await User.findOne({username : args.username}).exec()
                const cDate = result.createdAt;
                const accountCreationDate= getAccountCreationDate(cDate)
                return {
                    username : result.username,
                    email : result.email,
                    fName : result.fName,
                    lName : result.lName,
                    accountCreationDate
                };
            }
        },
        userIdentity: {
            type: GraphQLString,
            description: "Get user identity",
            resolve:(_, args, {req, res, user}) => {
                if (!user) {
                    console.log("Not Logged in");
                    return "Not authenticated";
                } else {
                    return user.userId;
                }
            }
        },
        testAuth: {
            type: GraphQLString,
            description: "Test auth",
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
        checkProfileOwner : {
            type : GraphQLBoolean,
            description : "Check if request is made by profile owner",
            args : {
                username : {type : GraphQLString}
            },
            resolve: (parent, args, {req, res, user}) => {
                return (user.username === args.username)
            }
        },
        getSessions : {
            type : GraphQLList(SessionType),
            description : "Convert a list of session id to session objects",
            args : {
                sessions : {type : GraphQLList(GraphQLString)}
            },
            resolve : (_, args, {req, res, user}) =>{
                
                let sessions = async () => {
                    let res = await Session.find({_id : {$in : args.sessions}}).exec()
                    res = res.map(sesh => {
                        return {
                            id: sesh.id,
                            sport: sesh.sport,
                            location : sesh.location,
                            startTime : sesh.startTime,
                            endTime : sesh.endTime,
                            currentParticipants : sesh.participants.length,
                            maxParticipants : sesh.maxParticipant,
                        }
                    });
                    return res
                }
                
                return sessions()
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
            description: "log a user",
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async(_, args, { req, res}) => {
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
        logout : {
            type : GraphQLBoolean,
            resolve : (_, args, {req, res}) => {
                res.cookie('jid', "", { httpOnly: true });
                return true;
            }
        },
        addUser: {
            type: GraphQLBoolean,
            description: "add a user",
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                fName : { type : GraphQLNonNull(GraphQLString)},
                lName : { type : GraphQLNonNull(GraphQLString)}
            },
            resolve: (_, args) => {
                try {
                    const hashedPasswordWord = hash(args.password, 12).then((pw) => {
                        const newUser = new User({
                            username: args.username,
                            password: pw,
                            email: args.email,
                            fName : args.fName,
                            lName : args.lName
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
        createSession: {
            type: GraphQLString,
            description: "create a session",
            args: {
                sport: {type: GraphQLNonNull(GraphQLString)},
                location: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                startTime: {type: GraphQLNonNull(GraphQLString)},
                endTime: {type: GraphQLNonNull(GraphQLString)},
                maxParticipant: {type: GraphQLNonNull(GraphQLInt)},
                minStar: {type: GraphQLNonNull(GraphQLInt)},
                host: {type: GraphQLNonNull(GraphQLString)},
                participants: {type: GraphQLList(GraphQLString)}
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
            description: "join a session",
            args: {
                userId: {type:GraphQLNonNull(GraphQLString)},
                sessionId: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (_, args) => {
                try {
                    const session = Session.findById(args.sessionId).exec().then(sess => {
                        const user = User.findById(args.userId).exec().then(currentUser => {
                            currentUser.currentSessions.push(sess._id)
                            sess.save()
                            sess.participants.push(currentUser._id)
                            currentUser.save()
                        })
                    })
                    return true
                } catch (err){
                    console.log(err)
                    return false
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

app.post("/refresh_token", async (req, res) => {
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