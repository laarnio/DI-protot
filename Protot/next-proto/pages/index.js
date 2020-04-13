import gql from 'graphql-tag';
import Link from 'next/link';
import TopFive from '../components/TopFive';
import Product from '../components/Product';

const Index = (props) => (
  <div>
      <h3>Welcome to verkkokauppa</h3>
      <TopFive products={ props.product }/>
  </div>
);

const query = gql`
  query {
    product (order_by: 
      { Sale_info:
          { 
            sold: desc
          }
      },
      limit: 5
    ) {
      id
      name
      image_path
      Sale_info {
        sold
      }
    }
  }
`

Index.getInitialProps = ctx => {
  const apolloClient = ctx.apolloClient;
  return apolloClient.query({ query: query })
    .then(res => {
      console.log(res);
      return res.data;
    });
}

export default Index
