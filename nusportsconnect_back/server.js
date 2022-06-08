const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean,
    defaultFieldResolver
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

require('dotenv').config();

//Create instance of app and define port

const app = express();
const port = process.env.PORT || 5000;

//Add dependencies for app to use
app.use(cors({ credentials: true, exposedHeaders: ['Authorization'] }));
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
        password: { type: GraphQLNonNull(GraphQLString) }
    })
});

const LoginResponse = new GraphQLObjectType({
    name: "LoginResponse",
    description: "This represents a login response",
    fields: () => ({
        accessToken: { type: GraphQLString }
    })
});

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
            resolve: () => User.find()
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
        addUser: {
            type: GraphQLBoolean,
            description: "add a user",
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => {
                try {
                    const hashedPasswordWord = hash(args.password, 12).then((pw) => {
                        const newUser = new User({
                            username: args.username,
                            password: pw,
                            email: args.email
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

    const user = await User.findOne({ id: payload.userId });

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