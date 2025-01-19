import { useState, useEffect } from "react";
import "../Styles/Cart.css";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Initialize cart from localStorage
  const initializeCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  };

  // Add or update an item in the cart
  const addOrUpdateItem = (newItem) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem._id === newItem._id) {
        return { ...cartItem, quantity: cartItem.quantity + newItem.quantity };
      }
      return cartItem;
    });

    // Add new item if it's not already in the cart
    if (!cartItems.some((item) => item._id === newItem._id)) {
      updatedCart.push(newItem);
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase item quantity
  const increaseQty = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease item quantity
  const reduceQty = (item) => {
    const updatedCart = cartItems
      .map((cartItem) => {
        if (cartItem._id === item._id) {
          const updatedQuantity = cartItem.quantity - 1;
          return updatedQuantity > 0 ? { ...cartItem, quantity: updatedQuantity } : null;
        }
        return cartItem;
      })
      .filter(Boolean); // Remove null items
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    initializeCart();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <h1>Cart Page</h1>
      {console.log(cartItems)}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} id="cartdiv">
            <img src={item.photo} alt={item.name} width="80px" />
            <h3>{item.name}</h3>
            <h3>Price: ${item.price}</h3>
            <h3>Subtotal: ${item.price * item.quantity}</h3>
            <section>
              <button onClick={() => increaseQty(item)}>+</button>
              <h3 style={{ textAlign: "center" }}>Qty: {item.quantity}</h3>
              <button onClick={() => reduceQty(item)} disabled={item.quantity <= 1}>
                -
              </button>
            </section>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div id="ordervalue">
        <p style={{ fontSize: "20px" }}>
          Order Value: ${calculateTotal().toFixed(2)}
        </p>
        <p style={{ fontSize: "20px" }}>Delivery: FREE</p>
        <button disabled={cartItems.length === 0}>Proceed to Pay</button>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
