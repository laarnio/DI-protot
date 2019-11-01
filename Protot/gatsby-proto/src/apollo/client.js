import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: 'https://dippa-backend.herokuapp.com/v1/graphql',
  headers: {
    'x-hasura-access-key': process.env.HASURA_ACCESS_KEY,
  },
  fetch

})