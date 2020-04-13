import Product from '../components/Product';

const TopFive = ({ products }) => {
  return(
    <div>
      <h4>Top 5 products sold</h4>
      <div className="row">
        {products.map(product => <Product key={product.id} product={product} /> )} 
      </div>
    </div>
    )

}

export default TopFive;