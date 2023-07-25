import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { COVER_IMAGE } from '../../../../settings/settings'

const VerifyEmployeeEmail = () => {
  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="App" style={{backgroundImage: `url(${COVER_IMAGE})`}}>
        <Row className="color-overlay d-flex justify-content-center align-items-center">
          
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
              <Card.Body className="d-flex justify-content-center flex-column align-items-center"></Card.Body>
            </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default VerifyEmployeeEmail