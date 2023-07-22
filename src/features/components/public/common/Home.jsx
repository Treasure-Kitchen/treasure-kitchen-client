import { Col, Container, Image, Row } from "react-bootstrap"
import { COVER_IMAGE } from "../../../../settings/settings"

const Home = () => {
  return (
    <Container fluid className="m-0 p-0" >
      <Row className="m-0 p-0">
          <Row className="m-0" style={{minHeight: '35vh'}}>
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
                <h1 className="Heading text-center p-0 m-0">Eat Good, Feel Treasured.</h1>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <h1 className="FedericaFont fw-2 text-center"><span>Men</span><span>u</span></h1>
          </Row>
      </Row>
    </Container>
  )
}

export default Home