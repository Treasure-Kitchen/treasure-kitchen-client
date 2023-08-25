import React, { useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { monthsInts, yearsInts } from '../../../../settings/settings';

const Payment = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const goBack = () => {
        navigate(-1, { replace: true });
    }

    const handleSubmit = (e) => {
        setValidated(true)
    }

  return (
    <Container fluid className="PaddingTop">
      <Row className="p-0 m-0 pb-5 d-flex justify-content-center align-items-center m-auto">
        <Col sm={0} md={3} lg={4} className="m-0 p-0"></Col>
        <Col sm={12} md={6} lg={4} className="d-flex justify-content-center align-items-center mt-5 m-0 p-0">
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="forms">
                <h3 className='fw-6 fw-bold DarkGreen pt-3'>
                    Card Details
                </h3>
                <Row className="mb-3">
                    <Col lg={12} className='mb-1 m-0 p-1'>
                    <FloatingLabel label='CARD NUMBER'>
                        <Form.Control 
                        type="text"
                        autoComplete="off"
                        required      
                        id="line1"
                        name="line1"
                        value={''}
                        onChange={''}/>
                        <Form.Control.Feedback type="invalid">Card Number is required!</Form.Control.Feedback>
                    </FloatingLabel>
                    </Col>
                    <Row lg={12} className='m-auto m-0 p-0'>
                        <Col sm={12} md={6} className='mb-1 m-0 p-1'>
                            <Form.Group>
                                <Form.Select
                                    required
                                    className='p-3'
                                    id="country"
                                    name="country"
                                    value={''}
                                    onChange={''}>
                                    { monthsInts.map((month, index) => (
                                        index === 0 ?
                                        <option value="" key={index} disabled selected hidden>{month}</option> :
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Month is required!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} className='mb-1 m-0 p-1'>
                            <Form.Group as={Col} className='mb-2'>
                                <Form.Select
                                    required
                                    id="adminArea"
                                    className='p-3'
                                    name="adminArea"
                                    value={''}
                                    onChange={''}>
                                    <option disabled selected hidden>YEAR</option>
                                    { yearsInts().map((year, index) => (
                                        index === 0 ?
                                        <option value="" key={index} disabled selected hidden>{year}</option> :
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Year is required!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row lg={12} className='m-auto m-0 p-1'>
                        <Col className='mb-1 m-0 p-0'>
                            <FloatingLabel label='CVV'>
                            <Form.Control 
                                type="text"
                                autoComplete="off"
                                id="locality"
                                name="locality"
                                value={''}
                                onChange={''}/>
                            </FloatingLabel>
                        </Col>
                        <Col className='mb-1 m-0 p-0 px-1'>
                            <div class="text-white">
                                <p>What's this?</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className='m-0 p-0'>
                        <Col className="d-flex justify-content-center align-items-center mb-1 p-1">
                            { false ? 
                                <Button type="submit" className='loginButton w-100 noOutline p-2 BtnColor'><Spinner /></Button> :
                                <Button type="submit" className='loginButton w-100 p-3 noOutline BtnColor' disabled={false}>Proceed</Button>
                            }
                        </Col>
                    </Row>
                    <Row className='m-0 p-0'>
                        <Col className="d-flex justify-content-center align-items-center mb-1 p-1">
                            <Button type="submit" className='loginButton noOutline w-100 p-3 btn-secondary' onClick={goBack} disabled={false}>Back</Button>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Col>
        <Col sm={0} md={3} lg={4} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default Payment