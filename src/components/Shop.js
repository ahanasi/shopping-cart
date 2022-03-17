import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  const sanitizeQuantity = (id) => {
    const quant = document.getElementById(id).value;
    let sanitizedInput;

    if (quant < 0) {
      sanitizedInput = 0;
    } else {
      sanitizedInput = Number(quant);
    }
    clearInput(id);
    return sanitizedInput;
  };

  const clearInput = (id) => {
    document.getElementById(id).value = '';
  };

  const getProductForCart = (e) => {
    const productID = e.target.dataset.id;
    const product = products[productID - 1];
    const productQuantity = sanitizeQuantity(productID);
    addToCart(product, productID, productQuantity);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
      setProducts(products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const btns = document.getElementsByClassName('addBtn');
    for (let index = 0; index < btns.length; index++) {
      btns[index].addEventListener('click', getProductForCart);
    }

    return () => {
      for (let index = 0; index < btns.length; index++) {
        btns[index].removeEventListener('click', getProductForCart);
      }
    };
  });

  return (
    <div className="columns is-multiline is-centered">
      {products.map((product) => {
        return (
          <div className="card box column is-2 m-2" key={product.id}>
            <div className="card-image">
              <figure className="image is-3by4">
                <img src={product.image} alt="product.title" />
              </figure>
            </div>
            <div className="card-content">
              <div className="content is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                <div>
                  <strong>{product.title}</strong>
                </div>
                <div className="mt-2">${Number(product.price).toFixed(2)}</div>
              </div>
            </div>
            <footer className="card-footer is-flex is-justify-content-space-between is-align-items-center">
              <input
                id={product.id}
                className="input is-small"
                type="number"
                min="0"
                step={1}
                width="10"
              />
              <button
                className="card-footer-item addBtn button is-small is-success is-light"
                data-id={product.id}>
                Add to Cart
              </button>
            </footer>
          </div>
        );
      })}
    </div>
  );
};

Shop.propTypes = {
  addToCart: PropTypes.func
};

export default Shop;
