const express = require('express');
// this lays the groundwork for our supercharged endpoint
// this package allows express to understand GQL
// we use it as middleware on a route
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 4000;

const app = express()

app.listen(PORT, ()=>{
    console.log(`listening on PORT: ${PORT}`)
})

// setting up express middleware to handoff the request to graphQL
// the gql function is there to handle the request
// params are the schema
app.use('/graphql', graphqlHTTP({

    
}))