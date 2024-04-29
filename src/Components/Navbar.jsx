import { Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import '../Styles/Navbar.css'
import Home from '../Pages/Home';

const Navbar = () => {
  return (
    <div id='navbar'>
      <section>
        <p>Customer Service</p>
        <p>Newsletter</p>
        <p>Find a store</p>
      </section>
      <section>
        <Link to={'/'}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png" alt="HM" width={'100'} />
        </Link>
      </section>
      <section>
          <Link to="/login">
            <Avatar bg='red.500' icon={<AiOutlineUser fontSize='2.5rem' />} />
          </Link>
          <Link>
          <Avatar bg='red.500' icon={<FaRegHeart fontSize='2.2rem' />} />
          </Link>
          <Link to={'/cart'}>
          <Avatar bg='red.500' icon={<MdOutlineShoppingCart fontSize='2rem' />} />
          </Link>
      </section>
    </div>
  );
};

export default Navbar;
