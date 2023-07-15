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
      <Row className="m-0 p-0" style={{position: 'absolute', top: '45%', left: '0', right: '0'}}>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
        <Col xs={12} sm={10} md={8} lg={6} className="d-flex justify-content-center align-items-center">
          <Card
              bg='light'
              className="m-1 w-100 BoxShadow"
              style={{minHeight: '30vh'}}
            >
              <Card.Body className="d-flex justify-content-center flex-column align-items-center">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-1">
                    <Col lg={12} className='mb-1 py-2'>
                        <Form.Group>
                            <Form.Control 
                                className="p-2"
                                type="text"
                                required      
                                id="line1"
                                name="line1"
                                value={line1}
                                onChange={onChange}
                                placeholder="Address Line 1"/>
                                <Form.Control.Feedback type="invalid">Address line 1 is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg={12} className='mb-1 py-2'>
                        <Form.Group>
                            <Form.Control 
                                className="p-2"
                                type="text"   
                                id="line2"
                                name="line2"
                                value={line2}
                                onChange={onChange}
                                placeholder="Address Line 2"/>
                        </Form.Group>
                    </Col>
                    <Row className="m-0 p-0">
                      <Col sm={12} md={6} className='mb-1 py-2'>
                        <Form.Group>
                          <Form.Control 
                            type="text"   
                            id="locality"
                            name="locality"
                            value={locality}
                            onChange={onChange}
                            required
                            placeholder='State/Locality'
                          />
                          <Form.Control.Feedback type="invalid">State/Locality is required!</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={6} className='mb-1 py-2'>
                        <Form.Group>
                          <Form.Control 
                            type="text"   
                            id="postalCode"
                            name="postalCode"
                            value={postalCode}
                            onChange={onChange}
                            required
                            placeholder='Postal Code'
                          />
                          <Form.Control.Feedback type="invalid">Postal code is required!</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className='m-0 p-0 mb-1'>
                      <Form.Group as={Col} sm={12} md={6} className='mb-1'>
                        <Form.Label className='px-1'>Select Country</Form.Label>
                        <Form.Select
                            required
                            id="country"
                            name="country"
                            value={country}
                            onChange={onChange}
                          >
                            <option></option>
                            { [{id: 1, name: 'Azerbaijan'}, {id: 2, name: 'Canada'}, {id: 3, name: 'Nigeria'}, {id: 4, name: 'USA'}].map(country => (
                                <option key={country?.id} value={country?.name}>{country?.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Country is required!</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} sm={12} md={6} className='mb-1'>
                        <Form.Label className='px-1'>Select State</Form.Label>
                        <Form.Select
                            required
                            id="adminArea"
                            name="adminArea"
                            value={adminArea}
                            onChange={onChange}
                          >
                            <option></option>
                            { [{id: 1, name: 'Abia'}, {id: 2, name: 'Federal Capital Territory'}, {id: 3, name: 'Kwara'}, {id: 4, name: 'Lagos'}].map(state => (
                                <option key={state?.id} value={state?.name}>{state?.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">State is required!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row lg={12} className="m-auto m-0 p-0">
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