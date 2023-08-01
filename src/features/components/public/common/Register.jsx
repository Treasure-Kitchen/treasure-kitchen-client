import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Spinner, FloatingLabel } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../../api/userApi";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
  //const userId = document.cookie.replace(/(?:(?:^|.*;\s*)profile\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  // const google = () => {
  //   window.open("http://localhost:5500/auth/google", "_self");
  // }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUp, { data, isSuccess, isError, error, isLoading }] = useSignUpMutation();
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  })
  const { name, emailAddress, password, confirmPassword } = formData;

  useEffect(() => {
    if(isError){
        toast.error(error?.data?.message)
    }

    if(isSuccess || data){
        toast.success(data?.message);
        navigate(-1);
    }
}, [data, isError, isSuccess, error, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const [validated, setValidated] = useState(false); 
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } 
    setValidated(true);
    e.preventDefault();
    if(name && emailAddress && password){
      await signUp(formData)
    }
  };

  return (
    <Container fluid>
      <Row className="p-0 m-0 mt-5 pb-5 m-auto d-flex justify-content-center align-items-center">
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6} className="mt-3">
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="forms">
            <h4 className='text-center fw-5 text-white pt-3'>
              <FaUserPlus /> Sign Up
            </h4>
            <Row className="mb-3">
              <Col lg={12} className='mb-1 m-0 p-1'>
                <FloatingLabel label="First & Last Name" className="mb-2">
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    required      
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="John Doe"/>
                  <Form.Control.Feedback type="invalid">First & Last Names are required!</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col lg={12} className='mb-1 m-0 p-1'>
                <FloatingLabel label='Email Address' className="mb-2">
                  <Form.Control
                    className="p-2"
                    type="email"
                    autoComplete="off"
                    required      
                    id="emailAddress"
                    name="emailAddress"
                    value={emailAddress}
                    onChange={onChange}
                    placeholder="example@email.com"/>
                  <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col lg={12} className='mb-1 m-0 p-1'>
                <FloatingLabel label='Password' className="mb-2">
                  <Form.Control 
                    className="p-2"
                    type="password"   
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    placeholder="Password"/>
                  <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col lg={12} className='mb-1 m-0 p-1'>
                <FloatingLabel label='Confirm Password' className="mb-2">
                  <Form.Control
                    className="p-2"
                    type="password"   
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    required
                    placeholder="Confirm password"/>
                  <Form.Control.Feedback type="invalid">Confirm Password is required!</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col lg={12} className="mb-2 text-white">
                <span>Have an account? <Link to='/login'>Sign in!</Link></span><br/>
              </Col>
              <Col lg={12} className="d-flex justify-content-center align-items-center p-1 m-0">
                { isLoading ? 
                    <Button type="submit" className='loginButton noOutline p-1'><Spinner /></Button> :
                    <Button type="submit" className='loginButton p-2 noOutline BtnColor' disabled={isLoading}><FaUserPlus/> Sign Up</Button>
                }
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={0} md={2} lg={3}></Col>
      </Row>
    </Container>
  )
}

export default Register