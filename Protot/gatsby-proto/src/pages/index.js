import React from 'react';
import { graphql } from 'gatsby';
import TopFive from '../components/TopFive';

export const query = graphql`
query {
  dippaBackend{
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
}
`

const IndexPage = ({ data }) => {
  return (
    <div>
      <h3>Welcome to verkkokauppa</h3>
      {<TopFive products={ data.dippaBackend.product }/>}
    </div>
  )
}

export default IndexPage;