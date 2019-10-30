import Link from 'next/link';

const NavBar = () => (
  <nav className="navbar navbar-expand navbar-dark bg-primary">
    <div className="container">
      <Link href="/" as="/"><a className="navbar-brand">Verkkokauppa</a></Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="/products" as="/products"><a className="nav-link">Products</a></Link>
          </li>
          <li className="nav-item">
            <Link href="/cart" as="/cart"><a className="nav-link">Cart</a></Link>
          </li>
          <li className="nav-item">
            <Link href="/" as ="/"><a className="nav-link">Home</a></Link>
          </li>
          <li className="nav-item">
            <Link href="/about" as="/"><a className="nav-link">About</a></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default NavBar
