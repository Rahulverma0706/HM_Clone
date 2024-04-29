import React, { useState, useEffect } from 'react';
import '../Styles/Cart.css';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Center } from '@chakra-ui/react';

const Cart = () => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [cartTotal, setCartTotal] = useState(0);

    const reduceQty = (item) => {
        const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
                const updatedQuantity = cartItem.quantity - 1;
                if (updatedQuantity <= 0) {
                    removeFromLocalStorage(cartItem.id);
                    return null; 
                }
                return { ...cartItem, quantity: updatedQuantity };
            }
            return cartItem;
        }).filter(Boolean); 
        setCartItems(updatedCart);
    };

    const increaseQty = (item) => {
        const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCartItems(updatedCart);
    };

    const removeFromLocalStorage = (itemId) => {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        setCartTotal(totalPrice);
    }, [cartItems]);

    return (
        <>
            <Navbar />
            <Header />
            <h1>Cart Page</h1>
            {cartItems.map((item) => (
                <div key={item.id} id="cartdiv">
                    <img src={item.image} alt={item.title} width={'80px'} />
                    <h3>{item.title}</h3>
                    <h3>Price: ${item.price}</h3>

                    <section>
                        <button onClick={() => increaseQty(item)}>+</button>
                        <h3 style={{ textAlign: 'center' }}>Qty. {item.quantity}</h3>
                        <button onClick={() => reduceQty(item)}>-</button>
                    </section>
                </div>
            ))}
            <div id='ordervalue'>
                <p style={{ fontSize: '20px' }}>Order Value: {Math.floor(cartTotal)}$ Only</p>
                <p style={{ fontSize: '20px' }}>Delivery: FREE</p>
                <button>Proceed to Pay</button>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
