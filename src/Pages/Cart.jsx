import { useState, useEffect } from 'react';
import '../Styles/Cart.css';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Cart = () => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [cartTotal, setCartTotal] = useState(0);

    const reduceQty = (item) => {
        const updatedCart = cartItems
            .map((cartItem) => {
                if (cartItem.id === item.id) {
                    const updatedQuantity = cartItem.quantity - 1;
                    return updatedQuantity > 0 ? { ...cartItem, quantity: updatedQuantity } : null;
                }
                return cartItem;
            })
            .filter(Boolean); // Remove null items
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
        setCartItems(updatedCart); // Update state
    };

    useEffect(() => {
        // Calculate total price
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += parseFloat(item.price) * item.quantity;
        });
        setCartTotal(totalPrice);

        // Update localStorage whenever cart changes
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);
    

    return (
        <>
            <Navbar />
            <Header />
            <h1>Cart Page</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.id} id="cartdiv">
                        <img src={item.photo} alt={item.name} width={'80px'} />
                        <h3>{item.name}</h3>
                        <h3>Price: ${item.price}</h3>
                        <section>
                            <button onClick={() => increaseQty(item)}>+</button>
                            <h3 style={{ textAlign: 'center' }}>Qty. {item.quantity}</h3>
                            <button onClick={() => reduceQty(item)}>-</button>
                        </section>
                        <button onClick={() => removeFromLocalStorage(item.id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div id="ordervalue">
                <p style={{ fontSize: '20px' }}>Order Value: {Math.floor(cartTotal)}$ Only</p>
                <p style={{ fontSize: '20px' }}>Delivery: FREE</p>
                <button>Proceed to Pay</button>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
