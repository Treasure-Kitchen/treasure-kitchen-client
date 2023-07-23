import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { COVER_IMAGE } from '../../../../settings/settings'

const MainCover = () => {
  return (
    <Row className="m-0 mt-3" style={{minHeight: '35vh'}}>
        <Col sm={12} md={6} lg={5}>
            <h1 className="mt-3 p-0 d-flex justify-content-center align-items-center rounded-3">
            <Image 
                src={`${COVER_IMAGE}`} 
                rounded
                fluid
            />
            </h1>
        </Col>
        <Col sm={12} md={6} lg={7}>
            <Row className="p-0 m-0 d-flex justify-content-center align-items-center">
            <h1 className="Heading text-center p-0 m-0">Eat Good, Feel<span className="TreasureText"> Treasured.</span></h1>
            </Row>
        </Col>
    </Row>
  )
}

export default MainCover