import { gql } from 'apollo-boost';
import React from 'react';
import ProductThumbnail from '../components/productThumbnail';
import { useQuery } from '@apollo/react-hooks';

const TopFive = () => {
  const { loading, error, data } = useQuery(GET_TOP_FIVE_SOLD_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return(
    <div>
      <h4>Top 5 products sold</h4>
  
      <div className="row">
        {data.product.map(product => <ProductThumbnail key={product.id} product={product} /> )} 
      </div>
    </div>
    )
  
}
const GET_TOP_FIVE_SOLD_PRODUCTS = gql`
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

export default TopFive;