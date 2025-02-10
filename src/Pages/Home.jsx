import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import Slideshow from '../Components/ProductSlideshow'
import '../Styles/Home.css'
import { Popover, PopoverTrigger,  PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody,} from '@chakra-ui/react'

const Home = () => {
  
  return (
    <>
   <div>
    <Navbar/>
    <Header/>
   <Popover>
        <PopoverTrigger>
        <img src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fcd%2F13%2Fcd13526854d5c26855f24a2b649d1a855f190cfe.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]" alt="" width={'450px'} style={{margin:'auto', paddingTop:'30px'}}/>
            
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Rs.1999.00</PopoverHeader>
                <PopoverBody>Regular Fit Linen-blend shirt</PopoverBody>
                </PopoverContent>
                </Popover>
   
    <Popover>
    <h3>Spring update</h3>
    <p>New season essentials.</p>
    <button>Shop now</button>
    <Slideshow/>
        <PopoverTrigger>
        <img src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fc1%2F85%2Fc185e088726346b29907f834e46dd5a694585566.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]" style={{margin:'auto',width:'450px', paddingTop:'30px'}}/>
            
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Rs.1999.00</PopoverHeader>
                <PopoverBody>Regular Fit Linen-blend shirt</PopoverBody>
                </PopoverContent>
                </Popover>
    <section style={{marginTop:'30px'}}>
    <button>Womenswear</button>
    <button>Menswear</button>
    <button>Kidswear</button>
    </section>
   </div>
   <div id='hover'>
    <img src="https://lp2.hm.com/hmgoepprod?source=url[https://www2.hm.com/content/dam/global_campaigns/season_09/ladies/6049a/6049A-3x1-spring-2024.jpg]&scale=size[960]&sink=format[jpeg],quality[80]" alt="" width={'50%'} style={{margin:'auto', marginTop:'50px', height:'200px'}}/>
    <button>Summer Deal upto 80% OFF</button>
   </div>

   <h3>New Arrivals</h3>
    
<Footer/>      
    </>
  )
}

export default Home
