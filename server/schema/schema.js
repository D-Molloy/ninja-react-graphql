const graphql = require('graphql');

//defining the graph
//we have two object types - Books and Authors
// need to define what goes in them, how they interact with each other
//  destructuring ObjectType off of graphQL
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

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
            args:{id: GraphQLString},
            resolve(parent, args){
                //code to get data from db/other source
                args.id
            }
        }
    }
});

modeule.exports = new GraphQLSchema({
    query:RootQuery,
})