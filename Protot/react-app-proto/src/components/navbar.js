import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = () => (
  <nav className="navbar navbar-expand navbar-dark bg-primary">
    <div className="container">
      <Link className="navbar-brand" to="/">Verkkokauppa</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" >About</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default NavBar
