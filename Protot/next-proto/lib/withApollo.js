import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: 'https://dippa-backend.herokuapp.com/v1/graphql',
      headers: {
        'x-hasura-access-key': process.env.HASURA_ACCESS_KEY,
      },
      cache: new InMemoryCache().restore(initialState || {})
    })
);