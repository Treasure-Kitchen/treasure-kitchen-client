import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Spinner, Form } from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useResetPasswordMutation } from '../../../api/authApi'
import { toast } from 'react-toastify'

const ChangeForgottenPassword = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const tokenFromRoute = new URLSearchParams(location.search).get('token');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    token: tokenFromRoute
  })

  console.log(formData)
  const [validated, setValidated] = useState(false);
  const { password, confirmPassword, token } = formData;
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
      navigate('/login', { replace: true });
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
    if(token){
        await resetPassword(formData)
    }
  }

  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="App" style={{backgroundImage: 'url(https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg)'}}>
        <Row className="color-overlay d-flex justify-content-center align-items-center">
          <h1 className="AppHeading text-center">Reset Password</h1>
        </Row>
      </Row>
      <Row className="m-0 p-0" style={{position: 'absolute', top: '70%', left: '0', right: '0'}}>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
        <Col xs={12} sm={10} md={8} lg={6} className="d-flex justify-content-center align-items-center">
          <Card
              bg='light'
              className="m-1 w-100 BoxShadow"
              style={{minHeight: '30vh'}}
            >
              <Card.Body className="d-flex justify-content-center flex-column align-items-center">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col lg={12} className='mb-2 py-2'>
                        <Form.Group>
                            <Form.Control 
                                className="p-2"
                                type="password"
                                autoComplete="off"
                                required      
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="example@email.com"/>
                                <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg={12} className='mb-2 py-2'>
                        <Form.Group>
                            <Form.Control 
                                className="p-2"
                                type="password"
                                autoComplete="off"
                                required      
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                placeholder="example@email.com"/>
                                <Form.Control.Feedback type="invalid">Confirm Password is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg={12} className="mb-3">
                      <span>Back to <Link to='/login'>Login</Link></span><br/>
                    </Col>
                    <Col lg={12} className="d-flex justify-content-center align-items-center">
                      { isLoading ? 
                          <Button type="submit" className='loginButton noOutline p-1' style={{background: '#583010'}}><Spinner /></Button> :
                          <Button type="submit" className='loginButton p-2 noOutline' style={{background: '#583010'}}><FaRegEdit/> Change Password</Button>
                      }
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default ChangeForgottenPassword