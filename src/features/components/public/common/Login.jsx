import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5500/auth/google", "_self");
  }
  return (
    <Container fluid style={{position: 'relative'}}>
      <Row className="App" style={{backgroundImage: 'url(https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg)'}}>
        <Row className="color-overlay d-flex justify-content-center align-items-center">
          <h1 className="AppHeading text-center">Welcome</h1>
        </Row>
      </Row>
      <Row className="m-0 p-0" style={{position: 'absolute', top: '70%', left: '0', right: '0'}}>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
        <Col xs={12} sm={10} md={8} lg={6} className="d-flex justify-content-center align-items-center">
          <Card
              bg='light'
              className="m-1 w-100 BoxShadow"
              style={{minHeight: '30vh'}}v
            >
              <Card.Header className="text-center fs-5">Login/Sign Up</Card.Header>
              <Card.Body className="d-flex justify-content-center flex-column align-items-center">
                <Card.Text className="google loginButton text-center" onClick={google}><FaGoogle /> Google</Card.Text>
                <Card.Text className="facebook loginButton text-center"><FaFacebookF /> Facebook</Card.Text>
                <Card.Text className="twitter loginButton text-center"><FaTwitter /> Twitter</Card.Text>
              </Card.Body>
            </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default Login