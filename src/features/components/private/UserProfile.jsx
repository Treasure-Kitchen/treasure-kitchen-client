import React from 'react'
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import { DUMMY_USER_PHOTO } from '../../../settings/settings'

const UserProfile = () => {
  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="App" style={{backgroundImage: 'url(https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg)'}}>
      </Row>
      <Row className="m-0 p-0" style={{position: 'absolute', top: '50%', left: '0', right: '0'}}>
        <Col className='' sm={12} md={6} style={{minHeight: '40vh'}}>
            <Card bg='light' className='BoxShadow my-1' style={{height: '20vh'}}>
                <Image
                    src= {DUMMY_USER_PHOTO}
                    fluid
                    thumbnail
                    alt="Profile Photo"
                    className='h-100 w-50 m-auto'
                />
            </Card>
            <Card className='BoxShadow my-1' style={{minHeight: '20vh'}}>
                <ListGroup variant="flush">
                    <ListGroup.Item className='bgColor'>Name:</ListGroup.Item>
                    <ListGroup.Item className='bgColor'>Email:</ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        <Col className='' sm={12} md={6} style={{minHeight: '40vh'}}>
            <Card bg='light' className='BoxShadow my-1' style={{minHeight: '20vh'}}>
                <Card.Header>My Orders</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item className='bgColor'>Order 1</ListGroup.Item>
                    <ListGroup.Item className='bgColor'>Order 2</ListGroup.Item>
                </ListGroup>
            </Card>
            <Card bg='light' className='BoxShadow my-1'style={{minHeight: '20vh'}} >
                <Card.Header>My Reservations</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item className='bgColor'>Reservation 1</ListGroup.Item>
                    <ListGroup.Item className='bgColor'>Reservation 2</ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile