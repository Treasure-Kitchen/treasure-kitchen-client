import { Container, Row } from "react-bootstrap"

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Row className="color-overlay d-flex justify-content-center align-items-center">
          <h1 className="AppHeading text-center">Treasure Kitchen</h1>
        </Row>
      </Row>
    </Container>
  )
}

export default Home