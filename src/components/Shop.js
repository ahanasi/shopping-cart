import React, { useState, useEffect } from 'react';

const Shop = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());

      setProducts(products);
    };
    fetchProducts();
  }, []);

  const [products, setProducts] = useState([]);

  return (
    <div className="columns is-multiline">
      {products.map((product) => (
        <div className="card box column is-2" key={product.id}>
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
        </div>
      ))}
    </div>
  );
};

export default Shop;
