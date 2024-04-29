import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { Center } from "@chakra-ui/react";

const ProductDetail = () => {
    const { id } = useParams()
    console.log(id);
    const [newData, setNewData] = useState([])
    
        useEffect(()=>{
            function FetchedData(){        
            fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res)=>res.json())
            .then((data)=>setNewData(data))
        }
        FetchedData()
        },[id])
        console.log(newData);
  return (
    <div>
        <Navbar/>
        <Header/>
        
            <div style={{textAlign:'center', marginBottom:'50px'}}>
                <img src={newData.image} alt={newData.title} width={'350px'} style={{margin:'auto', marginTop:'70px', marginBottom:'30px'}}/>
                <h2>{newData.title}</h2>
                <h3>Rs.{newData.price}/-</h3>
                <button>Add to cart</button>
                <p></p>
            </div>   
        <Footer/>
    </div>
  )
}

export default ProductDetail
