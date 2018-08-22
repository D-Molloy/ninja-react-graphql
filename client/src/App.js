import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
//  wraps our application and inject the data we receive into the application
import {ApolloProvider} from 'react-apollo'
//Components
import BookList from './components/BookList'


//  Apollo Client Setups
const client = new ApolloClient({
  //uri to supercharged endpoint
  uri:"http://localhost:400/graphql"
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Denis' Reading List</h1>
          <BookList />
          <BookList />
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
