import { useEffect } from "react";
import { useState } from "react";
import '../Styles/Products.css'
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

function FetchedData(){
    const [data, setData] = useState([])

    const getData = async() =>{
        try {
           const res = await fetch('http://localhost:5000/products/page')       
           const preData = await res.json()
        //    console.log(preData);
           setData(preData)
        } catch (err) {
            console.log(`something wrong:${err}!`);
            
        }
    }
    useEffect(()=>{
        getData()
    },[])
    
    const addToCart = (productId) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Fetch cart from localStorage
        const productToAdd = data.find((item) => item.id === productId); // Find the product to add
    
        if (productToAdd) {
            // Check if the item already exists in the cart
            const existingItemIndex = cartItems.findIndex((item) => item.id === productId);
    
            if (existingItemIndex > -1) {
                // If exists, update quantity
                cartItems[existingItemIndex].quantity += 1;
            } else {
                // If not, add it to the cart
                cartItems.push({ ...productToAdd, quantity: 1 });
            }
            // Save updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));
            alert(`${productToAdd.name} added to cart!`); // Optional: Feedback to user
        }
    };
    return(
        <>
        <Navbar/>
        <Header/>
        <div id="parent">
        {data.map((element, index)=>{
            console.log(element._id);
            
            return(
            <div key={index} id="card">
                <Link to={`/products/${element._id}`}>
                <img src={element.photo} alt={element.name} width={'100px'} id="pdimg"/>
                </Link>
                <p>{element.name}</p>
                <h3>{element.price}</h3>
                <button onClick={() => addToCart(element.id)}>Add to cart</button>
            </div>
            )
        })}    
        </div>
        <Footer/>
        </>
    )
}
export default FetchedData