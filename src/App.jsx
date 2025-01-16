import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Products from './Components/Products'
import Cart from "./Pages/Cart"
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import ProductDetail from "./Components/ProductDetail"



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/products" element={
        <PrivateRoute>
          <Products/>
        </PrivateRoute>
      }></Route> 
       { <Route path="/products/:id" element={
        <PrivateRoute>
          <ProductDetail/>
        </PrivateRoute>
      }></Route>}
      <Route path="/cart" element={<Cart/>}></Route>
    </Routes>


    
  
    
    </>
  )
}

export default App
