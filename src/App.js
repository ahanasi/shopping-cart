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
    if (productQuantity == 0) return;
    if (cart.some((item) => item.id == productID)) {
      setCart((prevState) =>
        prevState.map((product) =>
          product.id == productID
            ? {
                ...product,
                quantity: product.quantity + productQuantity,
                price: (product.unitPrice * (product.quantity + productQuantity)).toFixed(2)
              }
            : {
                ...product,
                price: (product.unitPrice * product.quantity).toFixed(2)
              }
        )
      );
    } else {
      if (productQuantity < 0) return;
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

  const changeItemQty = (productID, changeVal) => {
    console.log(productID, changeVal);
    const product = cart.filter((item) => item.id == productID);
    addToCart(product, productID, changeVal);
  };

  const removeItemFromCart = (productID) => {
    const newCart = cart.filter((item) => {
      return item.id != productID;
    });
    console.log(newCart);
    setCart(newCart);
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
        <Route path="/shopping-cart" element={<Shop addToCart={addToCart} />} />
        <Route
          path="cart"
          element={
            <Cart
              cart={cart}
              removeItemFromCart={removeItemFromCart}
              changeItemQty={changeItemQty}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
