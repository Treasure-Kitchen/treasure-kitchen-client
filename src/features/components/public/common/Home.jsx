import { Container, Row } from "react-bootstrap"
import { COVER_IMAGE } from "../../../../settings/settings"

const Home = () => {
  return (
    <Container fluid>
      <Row className="App" style={{backgroundImage: `url(${COVER_IMAGE})`}}>
        <Row className="color-overlay d-flex justify-content-center align-items-center">
          <h1 className="AppHeading text-center">Treasure Kitchen</h1>
        </Row>
      </Row>
      <Row>Hello</Row>
    </Container>
  )
}

export default Home