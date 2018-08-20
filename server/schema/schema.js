const graphql = require('graphql');
const _ = require('lodash');
//defining the graph
//we have two object types - Books and Authors
// need to define what goes in them, how they interact with each other
//  destructuring ObjectType off of graphQL
//  GraphQLID allows for int or string to be used in the query. Converts ints to strings
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

// DUMMY DATA
const books = [
    {name: 'Cosmos', genre: 'Self Help', id: '1', authorId:"1"},
    {name: 'The Demon Haunted World', genre: 'Self Help', id: '2', authorId:"1"},
    {name: 'Pale Blue Dot', genre: 'Self Help', id: '3', authorId:"1"},
    {name: 'The Shining', genre: 'Horror', id: '4', authorId:"2"},
    {name: 'Dr. Sleep', genre: 'Horror', id: '5', authorId:"2"},
    {name: 'Rules for a Knight', genre: 'Fantasy', id: '6', authorId:"3"}
]

const authors =[
    {name: 'Carl Sagan', age: 'Dead', id:'1' },
    {name: 'Stephen King', age:'60' , id:'2' },
    {name: 'Ethan Hawke', age:'45' , id:'3' }
]

//fields needs to be a function is that types will have references to another, and the function allows universal knowledge of others
// when we have type relations (e.g. every book has an author and every author has books) the books need to be able to bounce back and force with the functions
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
        //linking book to author
        // parent param comes into play the first time
        author:{
            type: AuthorType,
            resolve(parent, args){
                // 1 - console.log below
                console.log(parent)
                //find the author whose id matches parent.authorId
                return _.find(authors,{id: parent.authorId})
            }
        }
    })
});

// 1 - example query
// {
//     book(id: 1) {
//       name
//       genre
//       author {
//         name
//       }
//     }
//   }

// logs
// { name: 'The Demon Haunted World',
//   genre: 'Self Help',
//   id: '1',
//   authorId: '1' }


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: GraphQLInt}
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
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db/other source
                //finding book with the id
               return _.find(books, {id: args.id})
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parents, args){
                return _.find(authors, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery,
})