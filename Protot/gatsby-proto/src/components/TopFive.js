import React from 'react';
import ProductThumbnail from '../components/ProductThumbnail';

const TopFive = (props) => {
  return(
    <div>
      <h4>Top 5 products sold</h4>
      <div className="row">
        {props.products.map(product => <ProductThumbnail key={product.id} product={product} /> )} 
      </div>
    </div>
  )
}
export default TopFive;
