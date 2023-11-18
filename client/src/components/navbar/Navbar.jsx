import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";
import Announcement from "../Announcement";


const Navbar = () => {
  // const quantity = useSelector((state) => state.cart.quantity);

  return (
    <>
    <div className="navcontainer">
      <div className="navitem">
        <div className="navcallButton">
          <img src="/img/telephone.png" alt="/" className="navcallimg"/>
        </div>
        <div className="navtexts">
          <div className="navtext">ORDER NOW!</div>
          <div className="navtext">012 345 678</div>
        </div>
      </div>
      <div className="navitem">
        <ul className="navlist">
          {/* <Link to="/"> */}
            <li className="navlistItem">Homepage</li>
          {/* </Link> */}
          <li className="navlistItem">Products</li>
          <li className="navlistItem">Menu</li>
          <img src="/img/logo.png" alt="/" className='navlogoimg' />
          <li className="navlistItem">Events</li>
          <li className="navlistItem">Blog</li>
          <li className="navlistItem">Contact</li>
        </ul>
      </div>
      {/* <Link to="/cart"> */}
        <div className="navitem">
          <div className="navcart">
            <img src="/img/cart.png" alt="/" className="navcatimg" />
            <div className="navcounter">3</div>
          </div>
        </div>
      {/* </Link> */}
    </div>
    <Announcement />
    </>
  ); 
};

export default Navbar;
