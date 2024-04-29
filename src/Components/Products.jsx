import { useEffect } from "react";
import { useState } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import '../Styles/Products.css'
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

function FetchedData(){
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/`)
        .then((res)=>res.json())
        .then(data=>(setData(data)))
        
    },[])
    const addToCart = (productId) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const productToAdd = data.find((item) => item.id === productId);
    
        if (productToAdd) {
            const existingItem = cartItems.find((item) => item.id === productId);
    
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ ...productToAdd, quantity: 1 });
            }
    
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    };
    
    
    return(
        <>
        <Navbar/>
        <Header/>
        <div id="parent">
        {data.map((element, index)=>{
            return(
            
            <div key={index} id="card">
                <Link to={`/products/${element.id}`}>
                <img src={element.image} alt={element.title} width={'100px'} id="pdimg"/>
                </Link>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <CircularProgress value={element.rating.rate/5*100} color='green.400'>
                    <CircularProgressLabel>
                   {Math.floor(element.rating.rate/5*100)}%

                     </CircularProgressLabel>
                </CircularProgress>
                <p>Rating: {element.rating.rate}</p>
                <h3>{element.price}</h3>
                <button onClick={() => addToCart(element.id)}>Add to cart</button>
            </div>
            
        
            )
        })}    
        </div>
        
        </>
    )

}

export default FetchedData