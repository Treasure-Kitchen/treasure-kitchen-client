import { Button, Col, Container, Row, Spinner, Toast } from "react-bootstrap";
import { useGetUserOrdersQuery } from "../../../api/orderApi";
import { Link, useNavigate } from "react-router-dom";
import Order from "./Order";

const MyOrders = () => {
  const { data: orders, isLoading } = useGetUserOrdersQuery('');
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1, { replace: true });
  }

  return (
    <Container className="mt-5">
        <section>
            <div className="housing pb-5">
                <Row className="mb-3 px-2">
                    <h4 className='h3 fw-bold pt-3 mb-0 pb-0 DarkGreen'>My Orders</h4>
                    <span className="Border25"></span>
                </Row>
                <Col className="items">
                    {
                        isLoading ?
                            <Spinner className="m-auto mt-5"/> :
                            <>
                                {
                                    orders?.Data.length > 0 ?
                                        orders?.Data?.map(order => (
                                            <div key={order?._id} className="item forms DarkLemon py-2">
                                                <Order order={order} />
                                            </div>
                                        )) :
                                    <Toast className='m-auto' bg='secondary'>
                                        <Toast.Body className='text-white'>
                                            <p>You have no Order. <Link to='/contact' className='fw-bold DarkGreen FloatRight'>Shop</Link></p>
                                        </Toast.Body>
                                    </Toast>
                                }
                            </>
                    }
                </Col>
                <Button onClick={goBack} className='ButtonToLink FloatRight p-2'>Back</Button>
            </div>
        </section>
    </Container>
  )
}

export default MyOrders;