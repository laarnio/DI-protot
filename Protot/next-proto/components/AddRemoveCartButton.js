import gql from 'graphql-tag';
import {useMutation } from '@apollo/react-hooks';
import { GET_PRODUCTS_ON_CART } from '../pages/cart';
import { GET_CART_AMOUNT } from '../pages/products/[id]';

export const AddRemoveCartButton = (props) => {
  let mutationQuery;
  let disabled = false;
  let variables = { userID: props.userId, productID: props.productId, amount: props.amount };
  console.log(props.initialAmount, props.amount, props.initialAmount + props.amount)
  if(props.initialAmount + props.amount <= 0) {
    variables = { userID: props.userId, productID: props.productId}
    mutationQuery = REMOVE_PRODUCT_FROM_CART;
  }
  else if(props.initialAmount !== 0) {
    mutationQuery = UPDATE_PRODUCT_ON_CART;
  }
  else {
    mutationQuery = INSERT_PRODUCT_TO_CART;
  }
  const [addToCart, { data }] = useMutation(mutationQuery, {
    refetchQueries: () => [
      {
        query: GET_PRODUCTS_ON_CART,
        variables: {
          userID: props.userId
        }
      },
      {
        query: GET_CART_AMOUNT,
        variables: {
          userID: props.userId,
          productID: props.productId
        }
      }
    ]
  });
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addToCart({ 
            variables: variables,
          })
        }}
      >
        <button type="submit">{props.children}</button>
      </form>
    </div>
  )
}

const INSERT_PRODUCT_TO_CART = gql`
  mutation insert_user_product ($userID: Int!, $productID: Int!, $amount: Int!) {
    insert_user_product(
      objects: [
        {
          userID: $userID,
          productID: $productID,
          amount: $amount
        }
      ]
    ) {
      returning {
        userID
      }
    }
  }
`;

const UPDATE_PRODUCT_ON_CART = gql`
  mutation update_user_product ($userID: Int!, $productID: Int!, $amount: Int!) {
    update_user_product(
      where: {userID: { _eq: $userID } , productID: { _eq: $productID } },
      _inc: { amount: $amount }
    ) {
      returning {
        productID
        userID
        amount
      }
    }
  }
`;

const REMOVE_PRODUCT_FROM_CART = gql`
  mutation delete_user_product ($userID: Int!, $productID: Int!) {
    delete_user_product(
      where: {userID: { _eq: $userID } , productID: { _eq: $productID } }
    ) {
      returning {
        userID
        productID
        amount
      }
    }
  }
`;

export default { AddRemoveCartButton };