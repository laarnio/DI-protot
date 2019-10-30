import gql from 'graphql-tag';
import Product from '../components/Product';

class TopFive extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    this.setState({products: this.props.products})
  }
  render(){
    return(
      <div>
        <h4>Top 5 products sold</h4>
    
        <div className="row">
          {this.state.products.map(product => <Product key={product.id} product={product} /> )} 
        </div>
      </div>
      )
  }
}

export default TopFive;