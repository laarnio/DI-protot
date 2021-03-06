import gql from 'graphql-tag';
import Product from '../components/Product';
import React, { useState } from 'react';

const ProductsPage = (props) => {
  const data = props;

  const [category, setCategory] = useState({id: 0, name: 'All'});
  const [dropdownVisibility, setDropdownVisibility] = useState(false)
  
  return(
    <div>
      <h3>Products > { category.name }</h3>
      <ul className="nav nav-tabs">
        <li className="nav-item dropdown" onClick={(() => setDropdownVisibility(!dropdownVisibility))}>
          <div className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Categories</div>
          <div className={showDropdown(dropdownVisibility)}>
            <div className="dropdown-item" onClick={() => setCategory({id: 0, name: 'All'})}>All</div>
            {data.category.map(category_option => <div key={category_option.id} className="dropdown-item" onClick={(() => setCategory(category_option))}>{category_option.name}</div> )}
          </div>
        </li>
      </ul>
      <div className="row product-container">
        { selectedCategoryProducts(category, data) }
      </div>
    </div>
  )
}

const showDropdown = (dropdownVisibility) => {
  return dropdownVisibility ? 'dropdown-menu show' : 'dropdown-menu';
}

const selectedCategoryProducts = (selectedCategory, data) => {
  if(selectedCategory.id === 0) {
    return data.product.map(product => <Product key={ product.id } product={ product } />)
  }
  const category = data.category.find(item => selectedCategory.id === item.id);
  return category.Category_products.map(product => <Product key={ product.Product.id } product={ product.Product } />);
}

const query = gql`
  query {
    category {
      id
      name
      Category_products {
        Product {
          id
          name
          image_path
        }
      }
    }
    product {
      id
      name
      image_path
    }
  }
`

ProductsPage.getInitialProps = ctx => {
  const productID = ctx.query.id;
  const apolloClient = ctx.apolloClient;
  return apolloClient.query({ query: query, variables: {id: productID}})
    .then(res => {
      return res.data;
    });
  
}

export default ProductsPage;
