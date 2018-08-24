import { gql } from 'apollo-boost';

const getAuthors = gql`
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

export {getAuthors, getBooksQuery};