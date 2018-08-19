const express = require('express');
// this lays the groundwork for our supercharged endpoint
// this package allows express to understand GQL
// we use it as middleware on a route
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const PORT = process.env.PORT || 4000;
const app = express()


// setting up express middleware to handoff the request to graphQL
// the gql function is there to handle the request
// params are the schema
//setting up graphiql === postman
app.use('/graphql', graphqlHTTP({
    schema,
    //graphiql
    graphiql:true
}))


app.listen(PORT, ()=>{
    console.log(`listening on PORT: ${PORT}`)
})