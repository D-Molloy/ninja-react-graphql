import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBooksQuery} from '../queries/queries';

class BookList extends Component {
    displayBooks(){
        var {data} = this.props
        //check the loading property
        if(data.loading){
            return (<div>Loading books...</div>)
        } else {
            return data.books.map(book => {
                return(
                    <li key={book.id}>{book.name}</li>
                )
            })
        }
    }

    render(){
        //book data is this.props.data.books
        console.log(this.props);
        return(
            <div>
                <ul id="book-list" >
                    {this.displayBooks()}
                </ul>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);