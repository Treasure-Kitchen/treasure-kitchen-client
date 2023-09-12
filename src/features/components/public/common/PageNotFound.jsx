import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    const goHome = () => navigate('/');

  return (
    <Container>
            <Row className='py-5'>
                <Col sm={0} md={2} lg={4}></Col>
                <Col sm={12} md={8} lg={4} className='mt-5'>
                    <div className="forms p-3">
                        <Card.Body>
                            <h2 className='text-danger fw-bold text-center'>404</h2>
                            <Card.Text className="text-muted fw-bold text-center">Page Not Found</Card.Text>
                            <Card.Text>
                                <Button className='loginButton p-2 noOutline BtnColor' onClick={goHome}>Go Home</Button>
                            </Card.Text>
                        </Card.Body>
                    </div>
                </Col>
                <Col sm={0} md={2} lg={4}></Col>
            </Row>
    </Container>
  )
}

export default PageNotFound