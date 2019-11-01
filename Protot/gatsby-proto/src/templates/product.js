import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'gatsby';
import '../scss/product.scss';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AddRemoveCartButton } from '../components/AddRemoveCartButton';


const ProductPage = (props) => {
  console.log(props);
  const product = props.data.dippaBackend.product[0];

    const CartDetails = (props) => {
      const {loading, error, data} = useQuery(GET_CART_AMOUNT, { variables: { userID: 1, productID: props.product.id }});
      
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      const amount = data.user_product[0] ? data.user_product[0].amount : 0;
      return (
        <div>
          <p>In Cart: { amount }</p>
          <AddRemoveCartButton userId={1} initialAmount={amount} productId={props.product.id} amount={1} >Add to cart</AddRemoveCartButton>
        </div>
        
      );
    }
    
    const SaleInfo = (props) => {
      console.log(props);
      return (
        <div className="sale-info-container">
          <p>In store: { props.product.Sale_info.in_store }</p>
          <p>Sold: { props.product.Sale_info.sold }</p>
          <CartDetails product={ props.product } />
        </div>
      )
    }

    const AddComment = (props) => {
      const [addComment, { data }] = useMutation(ADD_COMMENT, {
        refetchQueries: () => [
          {
            query: GET_COMMENTS,
            variables: { productID: props.product.id }
          }
        ]
      });

      let commentInput;
      let titleInput;
      return (
        <div className="add-comment-container">
            <form
              onSubmit={e => {
                e.preventDefault();
                addComment({ variables: { title: titleInput.value, comment: commentInput.value, productID: props.product.id, authorID: 1 } })
                commentInput.value = '';
                titleInput.value = '';
              }}
            >
              <p>Title</p>
              <input className="title-input"
                ref={node => {
                  titleInput = node;
                }}
              />
              <p>Comment</p>
              <textarea className="comment-input"
                ref={node => {
                  commentInput = node;
                }}
              />
              <br />
              <button type="submit">Add Comment</button>
            </form>
          </div>
      );
    }
    
    const Comments = (props) => {
      const { loading, error, data } = useQuery(GET_COMMENTS, {variables: {productID: props.product.id}});

      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div className="comments">
          <h4>Comments</h4>
          { data.comment.map(comment => <Comment key={ comment.id } comment={ comment } />) }
        </div>
      );
    }

    const Comment = (props) => {
      return (
        <div className="comment-box">
          <h6>{ props.comment.title }</h6>
          <p>{ props.comment.comment }</p>
        </div>
      );
    }
    
    const Description = (props) => {
      return (
        <div className="description-container">
          <h4>Description</h4>
          <p>{props.product.description}</p>
          <h4>Additional information</h4>
          <p>{props.product.additional_information}</p>
        </div>
      );
    }

  return (
    <div className="product-container">     
      <h3>{ product.name }</h3>
        <div className="row image-row">
          <div className="image-container">
            <img alt={product.name} src={'/' + product.image_path} className="image"></img>
          </div>
          <SaleInfo product={product} />
        </div>
        <div className="price">{product.price}€</div>
      
      <Description product={product} />
      <Comments product={product} />
      <AddComment product={product} /> 
    </div>);
}


export default ProductPage;

export const GET_PRODUCT_DETAILS = graphql`
  query($id: Int!) {
    dippaBackend {
      product (where: {id: { _eq: $id }}) {
        id
        name
        image_path
        description
        price
        additional_information
        Sale_info {
          sold
          in_store
        }
      }
    }
  }
`

const GET_COMMENTS = gql`
  query($productID: Int) {
    comment(where: { product_id: {_eq: $productID} }) {
      Author {
        username
      }
      id
      title
      comment
    }
  }
`;

const GET_CART_AMOUNT = gql`
  query get_cart_amount ($productID: Int!, $userID: Int!) {
    user_product (where: {productID: { _eq: $productID }, userID: { _eq: $userID }}) {
      amount
    }
  }
`;

const ADD_COMMENT = gql`
  mutation insert_comment($productID: Int!, $authorID: Int!, $title: String!, $comment: String!) {
    insert_comment(
      objects: [
        {
          product_id: $productID,
          author_id: $authorID,
          title:$title,
          comment: $comment
        }
      ]
    ) {
      returning {
        Author{
          username
        }
        id
        title
        comment
      }
    }
  }
`;
