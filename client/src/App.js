import Product from "./pages/Product";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductList from "./pages/ProductList";
import NewProduct from "./pages/newproduct/Newproduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />}>
          {/* <Home /> */}
        </Route>
        <Route path="/addproduct" element={<NewProduct />} >
          {/* <ProductList /> */}
        </Route>
        <Route path="/products" element={<ProductList />} >
          {/* <ProductList /> */}
        </Route>
        <Route path="/product/:id" element={<Product />}>
          {/* <Product /> */}
        </Route>
        <Route path="/cart" element={<Cart />}>
          {/* <Cart /> */}
        </Route>
        <Route path="/success" element={<Success />}>
          {/* <Success /> */}
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}>
          {/* <Register /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
