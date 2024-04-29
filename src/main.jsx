import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import {ContextProvider} from './Context/ContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
  <ContextProvider>
  {/* <CartProvider> */}
    <BrowserRouter>
    <App />
    </BrowserRouter>  
    {/* </CartProvider> */}
    </ContextProvider>
    </ChakraProvider>
  
)
