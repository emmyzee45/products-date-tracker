import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";
import Announcement from "../Announcement";
import { logout } from "../../redux/userRedux";


const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

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
          <Link to="/" style={{background: "transparent", color: "white", textDecoration: "none"}}>
            <li className="navlistItem">Homepage</li>
          </Link>
          {/* <Link to="/products" style={{background: "transparent", color: "white", textDecoration: "none"}}>
          <li className="navlistItem">Products</li>
          </Link> */}
          {isAuthenticated && (
            <Link to="/addproduct" style={{background: "transparent", color: "white", textDecoration: "none"}}>
          <li className="navlistItem">Add Product</li>
          </Link>
          )}
          <li className='navlogoimg'>TRACKER</li>
          <li className="navlistItem">Events</li>
          <li className="navlistItem">Blog</li>
          <li className="navlistItem">Contact</li>
        </ul>
      </div>
      {/* <Link to="/cart"> */}
        <div className="navitem">
        <ul className="navlist">
          {isAuthenticated ? (
            <li className="navlistItem" onClick={handleLogout}>Logout</li>
          ):(
            <Link to="/login" style={{background: "transparent", color: "white", textDecoration: "none"}}>
              <li className="navlistItem">Login</li>
            </Link>
          )}
        </ul>
          <Link to="/cart">
          <div className="navcart">
            <img src="/img/cart.png" alt="/" className="navcatimg" />
            <div className="navcounter">{quantity}</div>
          </div>
          </Link>
        </div>
      {/* </Link> */}
    </div>
    <Announcement />
    </>
  ); 
};

export default Navbar;
