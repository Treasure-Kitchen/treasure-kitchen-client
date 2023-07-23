import React from 'react'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import MainCover from '../common/MainCover'
import { COVER_IMAGE } from '../../../../settings/settings'

const MenuList = () => {
    const menu = {
        name: 'Africana',
        id: 1,
        dishes: [
          {
            name: 'Party Jollof',
            url: COVER_IMAGE,
            description: 'Jollof Rice',
            price: 1450.00
          },
          {
            name: 'Party Jollof',
            url: COVER_IMAGE,
            description: 'Jollof Rice',
            price: 1450.00
          },
          {
            name: 'Party Jollof',
            url: COVER_IMAGE,
            description: 'Jollof Rice',
            price: 1450.00
          }
        ]
      }

  return (
    <Container fluid className="m-0 p-0" >
      <Row className="m-0 p-0">
          <MainCover />
          <Row className="mt-3 mb-5 m-auto">
            {
                false ?
                <Spinner className='m-auto'/> :
                <>
                    <h1 className="FedericaFont fw-2 mb-0">{menu?.name}</h1>
                    <span className="UnderLine"></span>
                    <Row className="m-auto">
                        <Col sm={0} md={1} lg={2}></Col>
                        <Col sm={12} md={10} lg={8}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={`${menu?.dishes[0].url}`} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>Some quick example text to build on the card title.</Card.Text>
                                    <Card.Footer>Hey</Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={0} md={1} lg={2}></Col>
                    </Row>
                </>
            }
          </Row>
      </Row>
    </Container>
  )
}

export default MenuList