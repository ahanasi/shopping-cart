import React, { useState, useEffect } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (e) => {
    const productID = e.target.dataset.id;
    const item = products[productID - 1];

    if (cart.some((item) => item.id == productID)) {
      setCart((prevState) =>
        prevState.map((product) =>
          product.id == productID ? { ...product, quantity: product.quantity + 1 } : product
        )
      );
    } else {
      setCart((prevState) => [
        ...prevState,
        { id: item.id, title: item.title, price: item.price, quantity: 1 }
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
    document.addEventListener('click', addToCart);

    return () => {
      document.removeEventListener('click', addToCart);
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
            <button className="card-footer-item" data-id={product.id}>
              Add to Cart
            </button>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default Shop;
