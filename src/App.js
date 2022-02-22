import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './App.css';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
