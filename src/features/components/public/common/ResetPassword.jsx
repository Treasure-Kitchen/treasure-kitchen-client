import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../api/authApi';
import { toast } from 'react-toastify';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

const ResetPassword = () => {
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
      toast.error(error.data.message)
    }
  }, [isError, error]);

  useEffect(() => {
    if(isSuccess || data){
      toast.success(data.message);
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
    await resetPassword(formData)
  }
  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="p-0 m-0 mt-5 mb-5 d-flex justify-content-center align-items-center">
        <Col sm={0} md={3} lg={4}></Col>
        <Col sm={12} md={6} lg={4}>
          <Card bg='light' className="m-1 w-100 BoxShadow">
            <Card.Body className="d-flex justify-content-center flex-column align-items-center">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col lg={12} className='mb-2 py-2'>
                    <Form.Group>
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
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="mb-3">
                    <span>Back to <Link to='/login'>Login</Link></span><br/>
                  </Col>
                  <Col lg={12} className="d-flex justify-content-center align-items-center">
                    { isLoading ? 
                        <Button type="submit" className='loginButton noOutline p-1' style={{background: '#583010'}}><Spinner /></Button> :
                        <Button type="submit" className='loginButton p-2 noOutline' style={{background: '#583010'}}>Reset Password</Button>
                    }
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={0} md={3} lg={4}></Col>
      </Row>
    </Container>
  )
}

export default ResetPassword