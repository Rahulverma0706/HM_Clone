import { Link } from 'react-router-dom'
import '../Styles/Header.css'

const Header = () => {
  
  
  return (
    <div id='header'>
      
      <Link to={'/products/'}>
        <ul id='nav'>
            <li>Ladies</li>
            <li>Men</li>
            <li>Baby</li>
            <li>Kids</li>
            <li>H&M HOME</li>
            <li>Sport</li>
            <li>Sale</li>
            <li>Sustainability</li>
            </ul>
        </Link> 
        <ul>
          <li>Estimated delivery time: 2-7 days</li>
          <li>Members get free shipping above Rs.1999</li>
          <li>Free & flexible 15 days return</li>
        </ul>
        <div id='input'>
          <input type="text" placeholder='Search Products' />
        </div>
             
    </div>
  )
}

export default Header
