import { Button, Col, Container, Row, Toast } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dish from './Dish';

const Dishes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dishes = location.state;

    const goBack = () => {
        navigate(-1, { replace: true })
    }

  return (
    <Container fluid className="mt-5">
        <Row className='mt-5'>
            <Col sm={0} md={1} lg={2}></Col>
            <Col sm={12} md={10} lg={8} className='pb-5'>
                <section>
                    <div className="housing">
                        <Row className="mb-3 px-2">
                            <h4 className='h3 fw-bold pt-3 mb-0 pb-0 DarkGreen'>Dishes</h4>
                            <span className="Border25"></span>
                        </Row>
                        <Col className="items">
                            {
                                dishes?.length > 0 ?
                                    dishes?.map(dish => (
                                        <Row key={dish?._id} className="item-2 forms DarkLemon py-2 m-0 p-0 mb-2 Box">
                                            <Dish dish={dish} />
                                        </Row>
                                    )) :
                                    <Toast className='m-auto' bg='secondary mt-5'>
                                        <Toast.Body className='text-white'>
                                            <p>Nothing to display. <Link to='/' className='fw-bold DarkGreen FloatRight'>Back to Home?</Link></p>
                                        </Toast.Body>
                                    </Toast>
                            }
                        </Col>
                        <Button onClick={goBack} className='ButtonToLink FloatRight p-2'>Back</Button>
                    </div>
                </section>
            </Col>
            <Col sm={0} md={1} lg={2}></Col>
        </Row>
    </Container>
  )
}

export default Dishes