import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

const ProductDetail = () => {
    const { id } = useParams(); // Extract 'id' from URL parameters
    console.log(id);
    
    const [newData, setNewData] = useState(null); // Initialize state for product data
    const [error, setError] = useState(null); // State to handle errors

    const fetchProductData = async () => {
        if (!id) {
            setError("Product ID is missing.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`);
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
    },[id]);

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
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <img
                    src={newData.photo}
                    alt={newData.name}
                    width={"350px"}
                    style={{ margin: "auto", marginTop: "70px", marginBottom: "30px" }}
                />
                <h2>{newData.name}</h2>
                <h3>Rs.{newData.price}/-</h3>
                <button>Add to cart</button>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
