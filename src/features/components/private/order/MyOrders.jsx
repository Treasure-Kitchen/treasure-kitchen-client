import { Badge, Col, Container, Row, Spinner, Toast } from "react-bootstrap";
import { useGetUserOrdersQuery } from "../../../api/orderApi";
import { Link } from "react-router-dom";
import { orderStatus } from "../../../../settings/settings";

const MyOrders = () => {
    const { data: orders, isLoading } = useGetUserOrdersQuery('');
    console.log(orders)
  return (
    <Container className="mt-5">
        <section>
            <div className="housing">
                <Row className="mb-3">
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
                                            <div key={order?._id} className="item forms">
                                                <Badge bg={`${orderStatus[order?.status]}`}>{order?.status}</Badge>
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
            </div>
        </section>
    </Container>
  )
}

export default MyOrders;