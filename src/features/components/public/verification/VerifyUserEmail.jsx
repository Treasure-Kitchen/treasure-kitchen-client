import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import Success from '../common/toasts/Success'
import { Link, useLocation } from 'react-router-dom'
import { useConfirmEmailMutation } from '../../../api/authApi'
import Danger from '../common/toasts/Danger'

const VerifyUserEmail = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const [verifyUserEmail, { isError, error, isSuccess, isLoading }] = useConfirmEmailMutation();
  const [content, setContent] = useState(<></>);

  useEffect(() => {
    async function verify(data) {
      await verifyUserEmail(data)
    }
    if(token){
      const data = { token: token };
      verify(data);
    }
  }, [token, verifyUserEmail])

  useEffect(() => {
    if(isError){
      setContent(<p>{error.data.message}. Go to <Link to='/' className='fw-bold'>Home</Link></p>)
    }
    if(isSuccess){
      setContent(<p>Email confirmation successful. Please process to <Link to='/login' className='fw-bold'>Login</Link></p>)
    }
  }, [isError, error, isSuccess]);

  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="App" style={{backgroundImage: 'url(https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg)'}}>
        <Row className="color-overlay d-flex justify-content-center align-items-center">
          
        </Row>
      </Row>
      <Row className="m-0 p-0" style={{position: 'absolute', top: '70%', left: '0', right: '0'}}>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
        <Col xs={12} sm={10} md={8} lg={6} className="d-flex justify-content-center align-items-center">
          <Card
              bg='light'
              className="m-1 w-100 BoxShadow"
              style={{minHeight: '30vh'}}
            >
              <Card.Body className="d-flex justify-content-center flex-column align-items-center">
                {
                  isLoading ?
                  <Spinner /> :
                  <>
                    {
                      isSuccess ?
                      <Success message={content} /> :
                      isError ?
                      <Danger message={content} /> :
                      <></>
                    }
                  </>
                }
              </Card.Body>
            </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default VerifyUserEmail