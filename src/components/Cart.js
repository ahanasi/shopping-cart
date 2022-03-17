import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';

const Cart = ({ cart }) => {
  const [cartTotal, setTotal] = useState(0);

  useEffect(() => {
    const calcTotal = () => {
      const total = Object.keys(cart).reduce(function (total, product) {
        return total + Number(cart[product].price);
      }, 0);
      setTotal(total.toFixed(2));
    };
    calcTotal();
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
                  <p>
                    <strong>{product.title}</strong>
                    <br />
                    <small className="has-text-success">In Stock</small>
                    <br />
                    Qty: {product.quantity}
                  </p>
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
  cart: PropType.array
};

export default Cart;
