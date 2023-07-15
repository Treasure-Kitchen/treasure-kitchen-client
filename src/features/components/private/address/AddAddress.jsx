import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { COVER_IMAGE } from '../../../../settings/settings'
import { useNavigate } from 'react-router-dom'

const AddAddress = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    line1: '',
    line2: '',
    locality: '',
    postalCode: '',
    adminArea: '',
    country: ''
  });

  const { line1, line2, locality, postalCode, adminArea, country} = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const goBack = () => {
    navigate(-1, { replace: true });
  }

  const [validated, setValidated] = useState(false);
  const handleSubmit = (e) => {

  }

  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="App" style={{backgroundImage: `url(${COVER_IMAGE})`}}>
      </Row>
      <Row className="m-0 p-0" style={{position: 'absolute', top: '50%', left: '0', right: '0'}}>
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
                                type="text"
                                autoComplete="off"
                                required      
                                id="line1"
                                name="line1"
                                value={line1}
                                onChange={onChange}
                                placeholder="1, 123 Street"/>
                                <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg={12} className='mb-2 py-2'>
                        <Form.Group>
                            <Form.Control 
                                className="p-2"
                                type="text"   
                                id="line2"
                                name="line2"
                                value={line2}
                                onChange={onChange}
                                required
                                placeholder="Road 4"/>
                                <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Row lg={12} className="m-auto">
                        <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-2">
                            <Button type="submit" className='loginButton noOutline w-100 p-2 btn-secondary' onClick={goBack} disabled={false}>Back</Button>
                        </Col>
                        <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-2">
                            { false ? 
                                <Button type="submit" className='loginButton w-100 noOutline p-1' style={{background: '#583010'}}><Spinner /></Button> :
                                <Button type="submit" className='loginButton w-100 p-2 noOutline' style={{background: '#583010'}}>Save</Button>
                            }
                        </Col>
                    </Row>
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

export default AddAddress