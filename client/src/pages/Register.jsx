import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  const handlechange = (e) => {
    const {value, name } = e.target;
    setValues((prev) => ({...prev, [name]: value}))
  }
  const handlesubmit = async(e) => {
    e.preventDefault();
    
    if(values.password !== values.password_confirm) {
      return toast.error("Password did not match!")
    }

    try {
      await publicRequest.post('/auth/register', values);
      navigate("/login");
      toast.success("Account successfully created!")
    }catch(err) {
      toast.error("something went wrong")
      console.log(err);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handlesubmit}>
          <Input name="firstname" onChange={handlechange} placeholder="first name" />
          <Input name="lastname" onChange={handlechange} placeholder="last name" />
          <Input name="username" onChange={handlechange} placeholder="username" />
          <Input name="email" onChange={handlechange} placeholder="email" />
          <Input name="password" onChange={handlechange} placeholder="password" />
          <Input name="password_confirm" onChange={handlechange} placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
