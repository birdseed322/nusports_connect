const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose')
let User = require('./models/User')
const { hash } = require('bcryptjs')
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
        name : {type : GraphQLNonNull(GraphQLString)},
        password : {type : GraphQLNonNull(GraphQLString)}
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
        }
    })
})


const RootMutationType = new GraphQLObjectType({
    name : "mutation",
    description : "root mutation",
    fields : () => ({
        addUser : {
            type : GraphQLString,
            description : "add a user",
            args : {
                name : {type : GraphQLNonNull(GraphQLString)},
                password : {type : GraphQLNonNull(GraphQLString)}
            },
            resolve : (_, args) => {
                const hashedPasswordWord = hash(args.password, 12).then((pw) => {
                    const newUser = new User({
                        username : args.name,
                        password : pw
                    })
    
                    newUser.save()
                    .then(() => {
                        console.log("Success!")
                    })  
                }).then(() => {
                    return "Successful!"
                }).catch((err) => {
                    return err
                })
            }
        }
    })
})

const graphqlSchema = new GraphQLSchema({
    query : RootQueryType,
    mutation : RootMutationType
})

app.use('/graphql', expressGraphQL({
    schema: graphqlSchema,
    graphiql: true
}))


