import { Container, Row, Col, Spinner, Toast} from 'react-bootstrap';
import { FaBook, FaGlobeAfrica } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const isLoading = false;
  const isError = false;

  return (
    <Container fluid>
        <Row className='py-5'>
            <Col sm={0} md={1} lg={2}></Col>
            <Col sm={12} md={10} lg={8}>
                {
                  isLoading ?
                    <Col className='m-auto p-0 m-0 mt-5 mb-5 d-flex justify-content-center align-items-center'>
                      <Spinner />
                    </Col> :
                  isError ?
                    <Toast className='m-auto mt-5' bg='danger'>
                      <Toast.Body className='text-white'>
                          <p>An error occurred fetching details. Please refresh. <Link to='/contact' className='fw-bold'>Contact Treasure Kitchen</Link> if issue persists.</p>
                      </Toast.Body>
                    </Toast> :
                  <>
                    <Row className='mt-5 mb-3 text-center mx-3'>
                      <h2 className='fw-bold'>GET TO KNOW US</h2>
                      <p className='forms mt-3 text-white fw-bold'>Your values. Core values help the reader connect with you and your business on a personal level.</p>
                    </Row>
                    <Row>
                      <Col sm={12} md={6}>
                          <Row 
                              className='my-auto mx-1 mb-3 AboutHover forms'
                              style={ {
                                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                                  padding: '1rem',
                                  minHeight: '16rem'} }>
                              <Col className='mb-3'>
                                  <Row>
                                      <div className='text-center mb-2'>
                                          <div className="pt-2 DarkRoundBg">
                                              <FaBook color='#161B02' size={28}/>
                                          </div>
                                      </div>
                                      <h3 className='text-center BoldText'>Our Mission</h3>
                                      <p className='text-center text-white'>A mission statement. This describes the purpose of your business as it relates to the industry or market you serve.</p>
                                  </Row>
                              </Col>   
                          </Row>
                      </Col>
                      <Col sm={12} md={6}>
                          <Row 
                              className='my-auto mx-1 mb-3 forms AboutHover' 
                              style={ {
                                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                                  padding: '1rem',
                                  minHeight: '16rem'} }>
                              <Col className='mb-3'>
                                  <Row>
                                      <div className='text-center mb-2'>
                                          <div className="pt-2 DarkRoundBg">
                                              <FaGlobeAfrica color='#161B02' size={28}/>
                                          </div>
                                      </div>
                                      <h3 className='text-center BoldText'>Our Vision</h3>
                                      <p className='text-center text-white'>A vision statement. Outline the future of your business in this section.</p>
                                  </Row>
                              </Col>
                          </Row>
                      </Col>
                    </Row>
                  </>
                }
            </Col>
            <Col sm={0} md={1} lg={2}></Col>
        </Row>
    </Container>
  )
}

export default About