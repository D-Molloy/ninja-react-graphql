import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;


const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const getBookQuery = gql`
    query($id: ID){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`


//MUST use double quotes inside of queries
// mutation() - mutation variables adding in the names of the variables that will be passed in the component making the query
//$ === query variable
//! === strict
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};