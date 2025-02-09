import { useEffect, useState } from "react";
import "../Styles/Products.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

function FetchedData() {
  const [data, setData] = useState([]); // Stores the fetched data
  const [sortOption, setSortOption] = useState(""); // For sorting products
  const [filter, setFilter] = useState(""); // For filtering products by clothing type

  // Fetch product data from the API
  const getData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/page`);
      const preData = await res.json();
      setData(preData); // Set data once fetched from the API
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
  };

  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);

  // Sort the products based on the selected option
  const handleSort = (option) => {
    let sortedData = [...data]; // Make a copy of the data to sort
    if (option === "lowToHigh") {
      sortedData.sort((a, b) => a.price - b.price); // Sort low to high
    } else if (option === "highToLow") {
      sortedData.sort((a, b) => b.price - a.price); // Sort high to low
    }
    setData(sortedData); // Update the state with sorted data
  };

  // Filter the products based on the clothing type
  const handleFilter = (type) => {
    setFilter(type); // Set the current filter
    const filteredData = data.filter((product) =>
      product.name.toLowerCase().includes(type.toLowerCase()) // Filter by name
    );
    setData(filteredData); // Update the state with filtered data
  };

  // Add an item to the cart
  const addToCart = (productId) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Fetch existing cart from localStorage
    const productToAdd = data.find((item) => item._id === productId); // Find the product by _id

    if (productToAdd) {
      // Check if the item already exists in the cart
      const existingItemIndex = cartItems.findIndex((item) => item._id === productId);

      if (existingItemIndex > -1) {
        // If exists, update the quantity
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // If not, add it to the cart with a default quantity of 1
        cartItems.push({ ...productToAdd, quantity: 1 });
      }

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert(`${productToAdd.name} added to cart!`); // Optional: Feedback to the user
    } else {
      alert("Product not found!");
    }
  };

  return (
    <>
      <Navbar />
      <Header />
      
      {/* Sorting and Filtering Options */}
      <div className="filters">
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            handleSort(e.target.value); // Call the sort function when an option is selected
          }}
        >
          <option value="">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <input
          type="text"
          placeholder="Filter by clothing type (e.g. T-shirt)"
          value={filter}
          onChange={(e) => handleFilter(e.target.value)} // Call filter function on change
        />
      </div>

      <div id="parent">
        {data.map((element) => (
          <div key={element._id} id="card">
            <Link to={`/products/${element._id}`}>
              <img
                src={element.photo}
                alt={element.name}
                width={"100px"}
                id="pdimg"
              />
            </Link>
            <p>{element.name}</p>
            <h3>${element.price}</h3>
            <button onClick={() => addToCart(element._id)}>Add to cart</button>
          </div>
        ))}
      </div>
      
      <Footer />
    </>
  );
}

export default FetchedData;
