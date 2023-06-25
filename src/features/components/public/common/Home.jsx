import { Container, Row } from "react-bootstrap"

const Home = () => {
  return (
    <Container fluid>
      <Row className="App" style={{backgroundImage: 'url(https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg)'}}>
        <Row className="color-overlay d-flex justify-content-center align-items-center">
          <h1 className="AppHeading text-center">Treasure Kitchen</h1>
        </Row>
      </Row>
      <Row>Hello</Row>
    </Container>
  )
}

export default Home