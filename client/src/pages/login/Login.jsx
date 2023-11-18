import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import FormInput from "../../components/form/FormInput";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userRedux";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import Footer from "../../components/footer/Footer";

const Login = () => {
  // const [isFetching, setIsFetching] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const isFetching = useSelector((state) => state.user.isFetching);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
     
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await makeRequest.post("auth", values);
      dispatch(loginSuccess(res.data));
      toast.success("Successfully logged In")
      navigate(from, { replace: true })
      // window.location.replace("/")
    }catch(err) {
      dispatch(loginFailure())
      if (!err?.response) {
        toast.error('No Server Response');
    } else if (err.response?.status === 400) {
        toast.error('Invalid Email or Password');
    } else if (err.response?.status === 401) {
        toast.error('Unauthorized');
    } else {
        toast.error('Login Failed');
    }
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="loginContainer">
      <form>
        <h1 className="login-title">Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
          <button 
            className="logButton" 
            disabled={isFetching} 
            style={{background: isFetching && "#46507c", cursor: isFetching && "not-allowed"}} 
            onClick={handleSubmit}
          >
            {isFetching ? "Processing..." : "Submit"}
          </button>
      
        {/* <div className="loginHrContainer">
          <div className="loginHr"></div>
          <div className="loginOr">OR</div>
          <div className="loginHr"></div>
        </div>
        <button className="logingoogle">
          <img src="/img/g2.png" className="googleIcon"/>
          <div className="googleText">Login with Google</div>
        </button> */}
      </form>
      <Link to="/register" className="registerButton">Register</Link>
    </div>
    <Footer />
    </>
  );
};

export default Login;
