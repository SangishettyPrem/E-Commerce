import React, { useEffect, useState } from 'react';
import './App.css';
import { Navbar, Products, Cart, Checkout } from './Components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [CartItems, setCart] = useState([]);
  const [order, setorder] = useState({});
  const [errorMessage, seterrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }


  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async () => {
    await commerce.cart.empty();
    setCart([]);
  };

  const refershCart = async () => {
    const { cart } = await commerce.cart.refresh();
    setCart(cart);
  }

  const handleCaptureCheckOut = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setorder(incomingOrder);
      refershCart();
    } catch (error) {
      console.log("Error: " + error);
      seterrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalCartItem={CartItems.total_items} />
        <Routes>
          <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
          <Route path='/cart' element={<Cart cart={CartItems} handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart} />} />
          <Route path='/checkout' element={<Checkout cart={CartItems}
            order={order}
            onCaptureCheckOut={handleCaptureCheckOut}
            error={errorMessage} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
