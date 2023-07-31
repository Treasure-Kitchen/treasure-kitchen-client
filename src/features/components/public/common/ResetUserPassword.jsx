import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../api/authApi';
import { toast } from 'react-toastify';
import { Button, Card, Col, Container, Row, Spinner, Form, FloatingLabel } from 'react-bootstrap';
import { FaUndo } from 'react-icons/fa';

const ResetUserPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailAddress: '',
  })
  const [validated, setValidated] = useState(false);
  const { emailAddress } = formData;
  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
      }))
  };

  const [resetPassword, { data, isLoading, isError, error, isSuccess }] = useResetPasswordMutation();
  useEffect(() => {
    if(isError){
      toast.error(error?.data?.message)
    }
  }, [isError, error]);

  useEffect(() => {
    if(isSuccess || data){
      toast.success(data?.message);
      navigate('/', { replace: true });
    }
  }, [isSuccess, data, navigate])
  
  const handleSubmit = async (e) => {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
      }
      setValidated(true);
    e.preventDefault();
    if(emailAddress){
      await resetPassword(formData)
    }
  }

  return (
    <Container fluid>
      <Row className="p-0 m-0 mt-5 mb-5 d-flex justify-content-center align-items-center">
        <Col sm={0} md={3} lg={4}></Col>
        <Col sm={12} md={6} lg={4} className='mt-3'>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className='forms'>
            <h4 className='text-center fw-5 text-white pt-3'>
              <FaUndo /> Reset Password
            </h4>
            <Row className="mb-3">
              <Col lg={12} className='mb-1 m-0 p-1'>
                <FloatingLabel label='Email Address'>
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
              <Col lg={12} className="mb-2 text-white">
                <span>Back to <Link to='/login'>Login</Link></span><br/>
              </Col>
              <Col lg={12} className="d-flex justify-content-center align-items-center m-0 p-1">
                { isLoading ? 
                    <Button type="submit" className='loginButton noOutline p-1 BtnColor'><Spinner /></Button> :
                    <Button type="submit" className='loginButton p-2 noOutline BtnColor' disabled={isLoading}><FaUndo/> Reset Password</Button>
                }
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={0} md={3} lg={4}></Col>
      </Row>
    </Container>
  )
}

export default ResetUserPassword