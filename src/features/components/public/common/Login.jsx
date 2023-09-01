import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Spinner, FloatingLabel } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../api/authApi";
import { toast } from "react-toastify";
import { setAuth } from "../../../auth/authSlice";

const Login = () => {
  //const userId = document.cookie.replace(/(?:(?:^|.*;\s*)profile\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  // const google = () => {
  //   window.open("http://localhost:5500/auth/google", "_self");
  // }
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [login, { data: user, isLoading, isSuccess, isError, error }] = useLoginMutation();

  const [formData, setFormData] = useState({
    emailAddress: '',
    password: ''
  });
  const { emailAddress, password } = formData;

  useEffect(() => {
    if(isError){
        toast.error(error?.data?.message)
    }

    if(isSuccess || user){
        toast.success("Login successful");
        dispatch(setAuth(user))
        navigate(from, { replace: true });
    }
}, [user, isError, isSuccess, error, navigate, dispatch, from]);

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
    if(password && emailAddress){
      await login(formData)
    }
  };

  return (
    <Container fluid>
      <Row className="p-0 m-0 mt-5 pb-5 d-flex justify-content-center align-items-center m-auto">
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6} className="mt-3">
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="forms">
            <h4 className='text-center fw-5 text-white pt-3'>
              <FaSignInAlt /> Sign In
            </h4>
            <Row className="mb-3">
              <Col lg={12} className='mb-1 m-0 p-1'>
                <FloatingLabel label="Email address" className="mb-2">
                  <Form.Control 
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
              <Col lg={12} className="mb-3 text-white">
                <span>No account? <Link to='/register' className="">Sign up</Link></span><br/>
                <span><Link to='/user-password-reset' className="">Forgot password?</Link></span>
              </Col>
              <Col lg={12} className="d-flex justify-content-center align-items-center p-1 m-0">
                { isLoading ? 
                    <Button type="submit" className='loginButton noOutline p-1 BtnColor'><Spinner /></Button> :
                    <Button type="submit" className='loginButton p-2 noOutline BtnColor' disabled={isLoading}><FaSignInAlt/> Sign In</Button>
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

export default Login