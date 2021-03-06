import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'


class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre:'',
            authorId:''
        }

    }

    displayAuthors(){
        var data = this.props.getAuthorsQuery;
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

    submitForm=(e)=>{
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            //telling Apollo which queries we want to run after adding a bood
            refetchQueries:[{query: getBooksQuery}]
        })
    }


    render(){

        return(
            <form id="add-book" onSubmit={this.submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input 
                        type="text"
                        onChange={e => this.setState({name: e.target.value})} />
                </div>
              
                <div className="field">
                    <label>Genre:</label>
                    <input 
                        type="text"
                        onChange={e => this.setState({genre: e.target.value})} />
                </div>
              
                <div className="field">
                    <label>Author:</label>
                    <select onChange={e => this.setState({authorId: e.target.value})}>
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
// export default graphql(getAuthors)(AddBook);

// how to add multiple queries/mutations
// need to use the compose method from react-apollo
// this adds the queries to this.props (this.props.getAuthorsQuery / this.props.addBookMutation)
export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook)
