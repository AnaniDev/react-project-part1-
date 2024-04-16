import { NavLink } from 'react-router-dom';
import icon from "./../../assets/shopping.png"
import "./../Navbar/Navbar.css";
export default function Navbar() {

  return (
    <div className="center">
      <div className="navbar">
        <div className="icon-div">
          <img src={icon} alt="icon" className="icon" />
          <h2>Shopylol</h2>
        </div>
        <div>
          <nav>
            <ul>
              <li><NavLink to="/" className='navlink navlist'>Home</NavLink></li>
              <li><NavLink to="/products" className='navLink navlist'>Products</NavLink></li>
              <li><NavLink to="/categories" className='navlink navlist'>Categories</NavLink></li>
              <li><NavLink to="/cart" className='navlink navlist'>Cart</NavLink></li>
              <li><NavLink to="/signin" className='navlink navlist signin'>Sign In</NavLink></li>
              <li><NavLink to="/signup" className='navlink navlist signup'>Sign Up</NavLink></li>       
            </ul>
          </nav>
        </div>
      </div>
    </div>
    
  );
} 
