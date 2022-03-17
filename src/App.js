import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './App.css';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Nav from './components/Nav';

function App() {
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  const addToCart = (product, productID, productQuantity) => {
    console.log(productQuantity, typeof productQuantity);
    if (cart.some((item) => item.id == productID)) {
      setCart((prevState) =>
        prevState.map((product) =>
          product.id == productID
            ? {
                ...product,
                quantity: product.quantity + productQuantity,
                price: (product.unitPrice * product.quantity + productQuantity).toFixed(2)
              }
            : {
                ...product,
                price: (product.unitPrice * product.quantity).toFixed(2)
              }
        )
      );
    } else {
      setCart((prevState) => [
        ...prevState,
        {
          id: product.id,
          title: product.title,
          unitPrice: product.price.toFixed(2),
          price: (product.price * productQuantity).toFixed(2),
          quantity: productQuantity,
          imgURL: product.image
        }
      ]);
    }
  };

  useEffect(() => {
    const updateCartQuantity = () => {
      const sum = cart.reduce((a, { quantity }) => a + quantity, 0);
      setCartQuantity(sum);
    };

    updateCartQuantity();
  }, [cart]);

  return (
    <div className="App">
      <Nav cartQuantity={cartQuantity} />
      <Routes>
        <Route path="/" element={<Shop addToCart={addToCart} />} />
        <Route path="cart" element={<Cart cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;
