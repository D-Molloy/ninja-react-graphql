const graphql = require('graphql');
const _ = require('lodash');
//defining the graph
//we have two object types - Books and Authors
// need to define what goes in them, how they interact with each other
//  destructuring ObjectType off of graphQL
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// DUMMY DATA
const books = [
    {name: 'The Demon Haunted World', genre: 'Self Help', id: '1'},
    {name: 'The Shining', genre: 'Horror', id: '2'},
    {name: 'Dr. Sleep', genre: 'Horror', id: '3'}
]

//fields needs to be a function is that types will have references to another, and the function allows universal knowledge of others
//
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name:{type: GraphQLString},
        genre:{type: GraphQLString}
    })
});

// Roots are your entry points
// each field is a type of query
// root fields arent in a function
    //`book` query is defining that it needs an id arg that's a string
// resolve take in parents and arg - get the data we need from the db
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{id: {type: GraphQLString}},
            resolve(parent, args){
                //code to get data from db/other source
                //finding book with the id
               return _.find(books, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery,
})