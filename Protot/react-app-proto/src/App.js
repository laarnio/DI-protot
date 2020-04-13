import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';

import Layout from './components/layout';
import AboutPage from './components/aboutPage';
import MainPage from './components/mainPage';
import CartPage from './components/cartPage';
import ProductsPage from './components/productsPage';
import ProductPage from './components/productPage';

import './scss/bootswatch.scss';
import './scss/style.scss';

const client = new ApolloClient({
  uri: 'https://dippa-backend.herokuapp.com/v1/graphql',
  headers: {
  'x-hasura-access-key': process.env.REACT_APP_HASURA_ACCESS_KEY,
  }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={ MainPage } />
            <Route path="/about" component={ AboutPage } />
            <Route path="/cart" component={ CartPage } />
            <Route exact path="/products" component= { ProductsPage } />
            
            <Route path="/products/:id" component={ ProductPage } />
            
          </Switch>
        </Layout>
      </Router>
    </ApolloProvider>
  );
}

export default App;
