const graphql = require('graphql');

//defining the graph
//we have two object types - Books and Authors
// need to define what goes in them, how they interact with each other
//  destructuring ObjectType off of graphQL
const {GraphQLObjectType, GraphQLString} = graphql

//fields needs to be a function is that types will have references to another, and the function allows universal knowledge of others
//
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name:{type: GraphQLString},
        genre:{type: GraphQLString}
    })
})