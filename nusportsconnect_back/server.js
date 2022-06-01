const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql')
const { sign } = require('jsonwebtoken')
const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose')
let User = require('./models/User')
const { hash, compare } = require('bcryptjs')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())



const dbURI = process.env.LOCAL_DB_URI;

mongoose.connect(dbURI, {useNewURLParser: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connection with DB successful!');
})

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
})


const UserType = new GraphQLObjectType({
    name : "User",
    description : "This represents a user",
    fields : () => ({
        username : {type : GraphQLNonNull(GraphQLString)},
        password : {type : GraphQLNonNull(GraphQLString)}
    })
})

const LoginResponse = new GraphQLObjectType({
    name : "LoginResponse",
    description : "This represents a login response",
    fields : () => ({
        accessToken : {type : GraphQLString}
    })
})


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
                    throw new Error("wrong password")
                }

                res.cookie('jid',
                 sign({userId : user.id}, process.env.JWTREFRESHSECRET, 
                    {expiresIn : '15m'}),
                    {httpOnly : true})

                return ({
                    accessToken : sign({userId : user.id}, process.env.JWTSECRET, 
                        {expiresIn : '15m'})
                })
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
    expressGraphQL((req, res) => ({
        schema: graphqlSchema,
        graphiql: true, 
        context : {req, res}
    }))
)


