
import React from 'react';
import { graphql } from 'gatsby';
import Product from '../components/ProductThumbnail';
class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      categories: [],
      product: null,
      dropdownVisibility: false,
      selectedCategory: {id: 0, name: 'All'},
      loading: true
    }
  }

  componentDidMount() {
    this.setState({ categories: this.props.data.dippaBackend.category, products: this.props.data.dippaBackend.product, loading: false });
  }

  expandDropdown = () => {
    this.setState({ dropdownVisibility: !this.state.dropdownVisibility});
  }
  showDropdown = () => {
    return this.state.dropdownVisibility ? 'dropdown-menu show' : 'dropdown-menu';
  }
  selectCategory = (category) => {
    this.setState({selectedCategory: category})
  }

  selectedCategoryProducts = () => {
    const selectedCategory = this.state.categories.find(category => category.id === this.state.selectedCategory.id);
    if(selectedCategory) {
      const selectedCategoryProducts = selectedCategory.Category_products;
      if(selectedCategoryProducts) {
        return selectedCategoryProducts.map(product => <Product key={product.Product.id} product={product.Product} />)
      }
    }
    return this.state.products.map(product => <Product key={ product.id } product={ product } />);
  }

  render(){
    if(this.state.loading) {
      return <div>Loading</div>
    }
    return(
      <div>
        <h3>Products > {this.state.selectedCategory.name}</h3>
        <ul className="nav nav-tabs">
          <li className="nav-item dropdown" onClick={(() => this.expandDropdown())}>
            <div className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Categories</div>
            <div className={this.showDropdown()}>
              <div className="dropdown-item" onClick={() => this.selectCategory({id: 0, name: 'All'})}>All</div>
              {this.state.categories.map(category => <div key={category.id} className="dropdown-item" onClick={(() => this.selectCategory(category))}>{category.name}</div> )}
            </div>
          </li>
        </ul>
        <div className="row product-container">
          {this.selectedCategoryProducts()}
        </div>
      </div>
  )
  }
}
export const query = graphql`
  query {
    dippaBackend {
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
  }
`;

export default ProductsPage;
