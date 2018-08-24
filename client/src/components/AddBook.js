import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getAuthors} from '../queries/queries'


class AddBook extends Component {
    displayAuthors(){
        var { data } = this.props;
        if(data.loading){
            return (<option disabled>Loading authors...</option>)
        } else {
            return data.authors.map(author => {
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }


    render(){

        return(
            <form id="add-book">
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

//need to be sure to bind the query to the component
export default graphql(getAuthors)(AddBook);
