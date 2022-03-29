import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart, removeItemFromCart, changeItemQty }) => {
  const [cartTotal, setTotal] = useState(0);

  const getProductID = (e) => {
    const selectedBtn = e.currentTarget;
    const productID = selectedBtn.dataset.id;
    if (selectedBtn.classList.contains('delItem')) {
      removeItemFromCart(productID);
    } else if (selectedBtn.classList.contains('incrementBtn')) {
      console.log(productID);
      changeItemQty(productID, 1);
    } else if (selectedBtn.classList.contains('decrementBtn')) {
      changeItemQty(productID, -1);
    } else {
      return;
    }
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
    const incrementBtns = document.getElementsByClassName('incrementBtn');
    const decrementBtns = document.getElementsByClassName('decrementBtn');

    for (let index = 0; index < btns.length; index++) {
      btns[index].addEventListener('click', getProductID);
      incrementBtns[index].addEventListener('click', getProductID);
      decrementBtns[index].addEventListener('click', getProductID);
    }

    return () => {
      for (let index = 0; index < btns.length; index++) {
        btns[index].removeEventListener('click', getProductID);
        incrementBtns[index].removeEventListener('click', getProductID);
        decrementBtns[index].removeEventListener('click', getProductID);
      }
    };
  });

  if (cartTotal == 0) {
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
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <p className="level-item">Qty:</p>
                      <div className="level-item">
                        <button
                          className="button incrementBtn is-small is-ghost px-1"
                          data-id={product.id}>
                          <span className="icon is-small">
                            <FontAwesomeIcon icon={faPlus} />
                          </span>
                        </button>
                        <div className="px-2">{product.quantity}</div>
                        <button
                          className="button decrementBtn is-small is-ghost px-1"
                          data-id={product.id}>
                          <span className="icon is-small">
                            <FontAwesomeIcon icon={faMinus} />
                          </span>
                        </button>
                      </div>
                      <button
                        className="level-item button is-ghost is-small px-1 delItem"
                        data-id={product.id}>
                        Delete
                      </button>
                    </div>
                  </nav>
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
  removeItemFromCart: PropType.func,
  changeItemQty: PropType.func
};

export default Cart;
