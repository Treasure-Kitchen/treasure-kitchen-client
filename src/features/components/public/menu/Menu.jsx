import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = ({menu}) => {
  return (
    <Row className='m-0 p-0 h-50'>
        <Card>
            <Card.Img variant="top" src={menu?.dishes[0]?.photo} style={{maxHeight: '160px', maxWidth: '240px', margin: 'auto'}}/>
        </Card>
        <h3 className="MenuName text-center py-2">{menu?.name}</h3>
        <Col className='content'>
            <p className='fw-bold text-center'>{menu?.description}</p>
            <Link to={`/menus/${menu?._id}`} className="m-auto LinkToButton p-2 text-primary">SHOP NOW</Link>
        </Col>
    </Row>
  )
}

export default Menu