import Link from 'next/link';
import '../scss/product.scss';

const Product = (props) => {
  const imagePath = '/static/' + props.product.image_path;
  const linkPath = '/products/' + props.product.id;
  return (
    <div className="column">
      <Link href="/products/[id]" as={ linkPath }>
        <div className="image-container">
          <img key={props.product.id} src={imagePath} alt={props.product.name} className="image"></img>
        </div>
        </Link>
        <p className="productName">{props.product.name}</p>
    </div>
    )
}

export default Product;