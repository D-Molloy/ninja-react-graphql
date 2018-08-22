const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author')
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
    GraphQLInt,
    GraphQLList,
    // used to insure a mutation value is not null
    GraphQLNonNull
} = graphql;



// FIELDS' value is a function so that the schema doesn't throw errors due to references of other types (BookType)
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: GraphQLInt},
        // we grab a list of BookTypes searches (bc authors have more than one book)
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //get the id from the parent object and use it to filter into a new array
                // return _.filter(books, {authorId: parent.id})

                return Book.find({authorId: parent.id})
            }
        }

    })
});


//fields needs to be a function is that types will have references to another, and the function allows universal knowledge of others
// when we have type relations (e.g. every book has an author and every author has books) the books need to be able to bounce back and force with the functions
//
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
                // local data method
                //find the author whose id matches parent.authorId
                // return _.find(authors,{id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
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
            //    return _.find(books, {id: args.id})
            return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parents, args){
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        // to get all books
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
                //find all
                return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
                return Author.find({})
            }
        }
    }
});
/// EXAMPLE QUERIES FOR ABOVE:
// {
//     authors {
//       name
//       age
//       books {
//         name
//       }
//     }
//   }

// {
//     author(id: "5b7cd7817e62fc0aa0d73ecf") {
//       name
//       age
//       books {
//         name
//       }
//     }
//   }

//mutations - adding/updating/deleting
//  queries are just objects, but mutations require you to explicitly say it:
// mutation{
// 	addAuthor(name: "Carl Sagan", age: 80){
//     name
//     age
//   }
// }
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args:{
                name:{ type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                //creating a local instance of the Author datatype
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                //saving the instance to the db
                //want to return the data from the save
                return author.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parents, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                
                return book.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})