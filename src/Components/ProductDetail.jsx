import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import "../Styles/ProductDetail.css";
const ProductDetail = () => {
    const { id } = useParams(); // Extract 'id' from URL parameters
    
    const [newData, setNewData] = useState(null); // Initialize state for product data
    const [error, setError] = useState(null); // State to handle errors

    const fetchProductData = async () => {
        if (!id) {
            setError("Product ID is missing.");
            return;
        }
    
        try {
            const response = await fetch(`https://hm-clone.onrender.com/products/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            const data = await response.json();
            setNewData(data);
        } catch (error) {
            console.error("Error fetching product details:", error);
            setError(error.message);
        }
    };
    
    useEffect(() => {
        fetchProductData()
    }, [id]);

    // Handle Add to Cart functionality
    const addToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Fetch existing cart from localStorage

        if (newData) {
            const existingItemIndex = cartItems.findIndex((item) => item._id === newData._id);

            if (existingItemIndex > -1) {
                // If the item already exists, increment the quantity
                cartItems[existingItemIndex].quantity += 1;
            } else {
                // If the item doesn't exist, add it with a quantity of 1
                cartItems.push({ ...newData, quantity: 1 });
            }

            // Save the updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cartItems));
            alert(`${newData.name} added to cart!`);
        }
    };

    // Display an error if something goes wrong
    if (error) {
        return (
            <div>
                <Navbar />
                <Header />
                <p style={{ color: "red" }}>Error: {error}</p>
                <Footer />
            </div>
        );
    }

    // Display a loading message while fetching data
    if (!newData) {
        return (
            <div>
                <Navbar />
                <Header />
                <p>Loading...</p>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Header />
            <div style={{ textAlign: "center", marginBottom: "50px" }} className="product-detail-container">
                <img
                    src={newData.photo}
                    alt={newData.name}
                    width={"350px"}
                    style={{ margin: "auto", marginTop: "70px", marginBottom: "30px" }}
                    className="product-image"
                />
                <h2>{newData.name}</h2>
                <h3>Rs.{newData.price}/-</h3>
                <button onClick={addToCart}>Add to cart</button>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
