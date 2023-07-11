import { Button, Col, Row, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { FaGoogle, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  //const userId = document.cookie.replace(/(?:(?:^|.*;\s*)profile\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const google = () => {
    window.open("http://localhost:5500/auth/google", "_self");
  }

  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="App" style={{backgroundImage: 'url(https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg)'}}>
        <Row className="color-overlay d-flex justify-content-center align-items-center">
          <h1 className="AppHeading text-center">Register</h1>
        </Row>
      </Row>
      <Row className="m-0 p-0" style={{position: 'absolute', top: '65%', left: '0', right: '0'}}>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
        <Col xs={12} sm={10} md={8} lg={6} className="d-flex justify-content-center align-items-center">
          <Card
              bg='light'
              className="m-1 w-100 BoxShadow"
              style={{minHeight: '30vh'}}
            >
              <Card.Body className="d-flex justify-content-center flex-column align-items-center">
                <Form>
                  <Row className="mb-3">
                    <Col lg={12} className='mb-2 my-2'>
                        <Form.Group>
                            <Form.Control
                                className="p-2"
                                type="text"
                                autoComplete="off"
                                required      
                                id="name"
                                name="name"
                                value=''
                                onChange=''
                                placeholder="John Doe"/>
                        </Form.Group>
                    </Col>
                    <Col lg={12} className='mb-2 my-2'>
                        <Form.Group>
                            <Form.Control
                                className="p-2"
                                type="text"
                                autoComplete="off"
                                required      
                                id="name"
                                name="name"
                                value=''
                                onChange=''
                                placeholder="example@email.com"/>
                        </Form.Group>
                    </Col>
                    <Col lg={12} className='mb-2 my-2'>
                        <Form.Group>
                            <Form.Control 
                                className="p-2"
                                type="password"   
                                id="password"
                                name="password"
                                value=''
                                onChange=''
                                required
                                placeholder="Password"/>
                        </Form.Group>
                    </Col>
                    <Col lg={12} className='mb-2 my-2'>
                        <Form.Group>
                            <Form.Control
                                className="p-2"
                                type="password"   
                                id="confirmPassword"
                                name="confirmPassword"
                                value=''
                                onChange=''
                                required
                                placeholder="Confirm password"/>
                        </Form.Group>
                    </Col>
                    <Col lg={12} className="mb-2">
                      <span>Have an account? <Link to='/login'>Sign in!</Link></span><br/>
                    </Col>
                    <Col lg={12} className="d-flex justify-content-center align-items-center">
                      { false ? 
                          <Button type="submit" className='loginButton'>
                              {/* <Spinners /> */}
                          </Button> :
                          <Button type="submit" className='loginButton p-2 noOutline' style={{background: '#583010'}}><FaSignInAlt/> Sign In</Button>
                      }
                    </Col>
                  </Row>
                </Form>
                <Card.Text className="google loginButton text-center p-2" onClick={google}><FaGoogle /> Google</Card.Text>
              </Card.Body>
            </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default Register