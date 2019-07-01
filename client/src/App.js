import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookList from './componets/Book';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
uri: 'http://localhost:4000/graphql'
});

class App extends React.Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div className="App">
       <BookList/>
      </div>
      </ApolloProvider>
      
    );
  }
 
}

export default App;
