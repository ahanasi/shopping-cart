import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';

const Cart = ({ cart, removeItemFromCart }) => {
  const [cartTotal, setTotal] = useState(0);

  const getIDForRemoval = (e) => {
    const productID = e.target.dataset.id;
    removeItemFromCart(productID);
  };

  useEffect(() => {
    const calcTotal = () => {
      const total = Object.keys(cart).reduce(function (total, product) {
        return total + Number(cart[product].price);
      }, 0);
      setTotal(total.toFixed(2));
    };
    calcTotal();
  });

  useEffect(() => {
    const btns = document.getElementsByClassName('delItem');
    for (let index = 0; index < btns.length; index++) {
      btns[index].addEventListener('click', getIDForRemoval);
    }

    return () => {
      for (let index = 0; index < btns.length; index++) {
        btns[index].removeEventListener('click', getIDForRemoval);
      }
    };
  });

  if (cart && Object.keys(cart).length === 0) {
    return (
      <div className="m-2 columns is-centered">
        <p className="is-size-3 title">Your shopping cart is empty!</p>
      </div>
    );
  } else {
    return (
      <div className="column is-half is-offset-one-quarter">
        <div className="is-flex is-justify-content-end">
          <p className="is-size-6	is-italic	">Price</p>
        </div>
        <hr className="my-1" />
        {cart.reduce((all, product) => {
          if (product.quantity === 0) {
            return all;
          }
          return all.concat(
            <article className="media" key={product.id}>
              <figure className="media-left image is-64x64">
                <img src={product.imgURL} alt={product.title} />
              </figure>
              <div className="media-content">
                <div className="content">
                  <strong>{product.title}</strong>
                  <br />
                  <small className="has-text-success">In Stock</small>
                  <br />
                  <div className="is-flex is-flex-direction-row is-align-items-center">
                    Qty: {product.quantity} |
                    <button className="button is-ghost is-small px-1 delItem" data-id={product.id}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="media-right">
                <div className="content">
                  <p>
                    <br />
                    <strong>${product.price}</strong>
                  </p>
                </div>
              </div>
            </article>
          );
        }, [])}
        <hr className="my-1" />
        <div className="is-flex is-justify-content-end">
          <p className="is-size-4">
            Subtotal: <strong>${cartTotal}</strong>
          </p>
        </div>
      </div>
    );
  }
};

Cart.propTypes = {
  cart: PropType.array,
  removeItemFromCart: PropType.func
};

export default Cart;
