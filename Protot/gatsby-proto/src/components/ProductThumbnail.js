import React from 'react';
import { Link } from 'gatsby';
import '../scss/product.scss';

const Product = (props) => {
  const imagePath = '/' + props.product.image_path;
  const linkPath = '/products/' + props.product.id;
  return (
    <div className="column">
      <Link to={ linkPath }>
        <div className="image-container">
          <img key={props.product.id} src={imagePath} alt={props.product.name} className="image"></img>
        </div>
        </Link>
        <p className="productName">{props.product.name}</p>
    </div>
    )
}

export default Product;