const express = require('express');
// this lays the groundwork for our supercharged endpoint
// this package allows express to understand GQL
// we use it as middleware on a route
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const app = express()

mongoose.connect('mongodb://denis:4200Meadow@ds127362.mlab.com:27362/graphql-ninja')
mongoose.connection.once('open', ()=>{
    console.log("connected to mLab")
})

// setting up express middleware to handoff the request to graphQL
// the gql function is there to handle the request
// params are the schema
//setting up graphiql === postman
app.use('/graphql', graphqlHTTP({
    schema,
    //turning on graphiql
    graphiql:true
}))


app.listen(PORT, ()=>{
    console.log(`listening on PORT: ${PORT}`)
})