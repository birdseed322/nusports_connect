const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
let User = require('./models/User');
const { hash, compare } = require('bcryptjs');
const cors = require('cors');
const { createAccessToken, createRefreshToken, isAuth } = require('./auth/auth');

require('dotenv').config();

//Create instance of app and define port

const app = express();
const port = process.env.PORT || 5000;

//Add dependencies for app to use
app.use(cors({credentials: true, exposedHeaders:['Authorization']}));
app.use(isAuth);
app.use(express.json());

//Create connection to database. Change to appropriate database URI
const dbURI = process.env.LOCAL_DB_URI;

mongoose.connect(dbURI, {useNewURLParser: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connection with DB successful!');
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})

//Definining GraphQL object types
const UserType = new GraphQLObjectType({
    name : "User",
    description : "This represents a user",
    fields : () => ({
        username : {type : GraphQLNonNull(GraphQLString)},
        password : {type : GraphQLNonNull(GraphQLString)}
    })
});

const LoginResponse = new GraphQLObjectType({
    name : "LoginResponse",
    description : "This represents a login response",
    fields : () => ({
        accessToken : {type : GraphQLString}
    })
});

//Root query and Root mutation
const RootQueryType = new GraphQLObjectType({
    name : "query",
    description : "Root query",
    fields : () => ({
        user : {
            type : UserType,
            description : "An instance of a user",
            args : {
                id : {type : GraphQLInt}
            },
            resolve : (parent, args) => console.log(args.id)
        },
        users : {
            type : GraphQLList(UserType),
            description : "Retrieve all users",
            resolve : () => User.find()
        },
        testAuth : {
            type : GraphQLString,
            description: "Test auth",
            resolve : (_,args,{req, res, user}) => {
                if (!user){
                    console.log("Not Logged in")
                } else {
                    console.log("Logged in")
                }
                console.log(user)
                return "Test"
            }
        } 
    })
})


const RootMutationType = new GraphQLObjectType({
    name : "mutation",
    description : "root mutation",
    fields : () => ({
        login : {
            type : LoginResponse,
            description : "log a user",
            args : {
                username : {type : GraphQLNonNull(GraphQLString)},
                password : {type : GraphQLNonNull(GraphQLString)}
            },
            resolve : async (_, args, {req, res}) => {
                const user = await User.findOne({username : args.username})

                if (!user){
                    throw new Error("could not find user")
                }

                const valid = await compare(args.password, user.password)

                if (!valid) {
                    throw new Error("wrong password");
                }

                res.cookie('jid',createRefreshToken(user),
                    {httpOnly : true});

                const accessToken = createAccessToken(user)
                
                return ({
                    accessToken : accessToken
                });
            }
        },
        addUser : {
            type : GraphQLBoolean,
            description : "add a user",
            args : {
                username : {type : GraphQLNonNull(GraphQLString)},
                password : {type : GraphQLNonNull(GraphQLString)}
            },
            resolve : (_, args) => {
                try {
                    const hashedPasswordWord = hash(args.password, 12).then((pw) => {
                        const newUser = new User({
                            username : args.username,
                            password : pw
                        })
                        newUser.save()
                    })
                } catch (err) {
                    console.log(err)
                    return false
                }
                return true
            }
        }
    })
})

const graphqlSchema = new GraphQLSchema({
    query : RootQueryType,
    mutation : RootMutationType
})

app.use('/graphql', 
    expressGraphQL((req, res) => {
        return {
        schema: graphqlSchema,
        graphiql: {headerEditorEnabled : true},
        context : {req, res, user:req.user}
    };})
);


