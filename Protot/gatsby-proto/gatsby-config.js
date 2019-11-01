require('dotenv').config();
const fetch = require('isomorphic-fetch');
const {createHttpLink} = require('apollo-link-http');

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Verkkokauppa',
    author: 'Henrik Hartiala'
  },
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'hasura',
        fieldName: 'dippaBackend',
        createLink: () => {
          return createHttpLink({
            uri: 'https://dippa-backend.herokuapp.com/v1/graphql',
            headers: {
              'x-hasura-access-key': process.env.HASURA_ACCESS_KEY,
            },
            fetch,
          })
        }
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ["HASURA_ACCESS_KEY"]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass'
  ]
}
