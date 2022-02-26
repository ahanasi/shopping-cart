import React, { useState, useEffect } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const sanitizeQuantity = (id) => {
    const quant = document.getElementById(id).value;
    let sanitizedInput;

    if (parseInt(quant) < 0) {
      sanitizedInput = 0;
    } else {
      sanitizedInput = parseInt(quant);
    }
    clearInput(id);
    return sanitizedInput;
  };

  const clearInput = (id) => {
    document.getElementById(id).value = '';
  };

  const addToCart = (e) => {
    const productID = e.target.dataset.id;
    const item = products[productID - 1];

    const itemQuantity = sanitizeQuantity(productID);

    if (cart.some((item) => item.id == productID)) {
      setCart((prevState) =>
        prevState.map((product) =>
          product.id == productID
            ? { ...product, quantity: product.quantity + itemQuantity }
            : product
        )
      );
    } else {
      setCart((prevState) => [
        ...prevState,
        { id: item.id, title: item.title, price: item.price, quantity: itemQuantity }
      ]);
    }
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
      btns[index].addEventListener('click', addToCart);
    }

    return () => {
      for (let index = 0; index < btns.length; index++) {
        btns[index].removeEventListener('click', addToCart);
      }
    };
  }, [addToCart]);

  console.log(cart);

  return (
    <div className="columns is-multiline is-centered">
      {products.map((product) => (
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
              <div>${product.price}</div>
            </div>
          </div>
          <footer className="card-footer">
            <input id={product.id} type="number" min="0" step={1} />
            <button className="card-footer-item addBtn" data-id={product.id}>
              Add to Cart
            </button>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default Shop;
