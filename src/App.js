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
    if (cart.some((item) => item.id == productID)) {
      setCart((prevState) =>
        prevState.map((product) =>
          product.id == productID
            ? { ...product, quantity: product.quantity + productQuantity }
            : product
        )
      );
    } else {
      setCart((prevState) => [
        ...prevState,
        { id: product.id, title: product.title, price: product.price, quantity: productQuantity }
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
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
