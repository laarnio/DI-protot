import React from 'react';
import { AddRemoveCartButton } from '../components/AddRemoveCartButton';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  calculateTotal = (cartItems) => {
    let totalPrice = 0;
      cartItems.forEach(item => {
        if(item.amount > 0){
          totalPrice += item.Product.price * item.amount;
        }
      });
      return totalPrice;
  }

  render() {
    const CartItems = () => {
      const { loading, error, data } = useQuery(GET_PRODUCTS_ON_CART, {variables: { userID: 1 }});
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      const cartItems = data.user_product;
      const totalPrice = this.calculateTotal(cartItems);

      return(
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Remove</th>
              <th>Add</th>
            </tr>
            </thead>

            <tbody>
            {cartItems.map(item => <CartItem item={ item } key={ item.Product.id } />)}
            </tbody>
          </table>
          <p>Total: {totalPrice}</p>
        </div>
      );
    }
    

    const CartItem = (props) => {
      const product = props.item.Product
      return (
        <tr>
          <td><Link to={`/products/${product.id}`}>{ product.name }</Link></td>
          <td>{ product.price }</td>
          <td>{ props.item.amount > 0 ? props.item.amount : 0 }</td>
          <td><AddRemoveCartButton userId={1} amount={-1} initialAmount={props.item.amount} productId={product.id}>-</AddRemoveCartButton></td>
          <td><AddRemoveCartButton userId={1} amount={1} productId={product.id}>+</AddRemoveCartButton></td>
        </tr>
      );
    }
    
    return (
      <div>
        <h3>Cart</h3>
        <CartItems />
      </div>
    );
  }
} 
const GET_PRODUCTS_ON_CART = gql`
  query user_product ($userID: Int!) {
    user_product(
      order_by: { 
        Product: {
          name: asc
        }
      },
      where: {userID: {_eq: $userID}}
      ) {
      userID
      Product {
        id
        name
        price
      }
      amount
    }
  }
  `;

export default Cart;