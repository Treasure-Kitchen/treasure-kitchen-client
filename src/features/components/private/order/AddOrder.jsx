import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useGetProfileQuery } from '../../../api/userApi';
import { Form, ListGroup, Spinner, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { colors, currencies } from '../../../../settings/settings';
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import { addDish, clearDishes, removeDish } from '../../../dish/dishSlice';
import { toast } from 'react-toastify';
import { useGetDishesByIdsQuery } from '../../../api/dishApi';
import { useCreateOrderMutation } from '../../../api/orderApi';

const AddOrder = () => {
    const {user} = useSelector((state) => state.auth?.user);
    const {dishes} = useSelector((state) => state.dishes);
    const itemsIds = dishes?.join();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [total, setTotal] = useState();

    const { data: profile, isLoading, isError } = useGetProfileQuery(user?.id);
    const { data, isLoading: isLoadingDish, isError: isDishError } = useGetDishesByIdsQuery(itemsIds);
    const [createOrder, { data: createData, isLoading: isCreateLoading, isSuccess, isError: isOrderError, error: orderError }] = useCreateOrderMutation();

    let address = profile?.address?.line1;
    address = profile?.address?.line2 ?
                `${address}, ${profile?.address?.line2}, ${profile?.address?.locality}. ${profile?.address?.adminArea}. ${profile?.address?.country}.` :
                `${address}, ${profile?.address?.locality}. ${profile?.address?.adminArea}. ${profile?.address?.country}.`;
    
    const goBack = () => {
        navigate(-1, { replace: true });
    }

    const onAddDish = (dishId) => {
        if(dishes?.length <= 49){
            dispatch(addDish(dishId))
        } else {
            toast.info(`You can not add more than ${dishes?.length} item(s) to the Cart.`);
        }
    }
    
    const onRemoveDish = (dishId) => {
        dispatch(removeDish(dishId))
    }

    useEffect(() => {
        if(isOrderError){
            toast.error(orderError?.data?.message)
        }
    }, [isOrderError, orderError])

    useEffect(() => {
        if(isSuccess || createData){
            toast.success(createData?.message);
            dispatch(clearDishes());
            navigate(-1, { replace: true });
        }
    }, [createData, isSuccess, dispatch, navigate])

    useEffect(() => {
        if(data?.length > 0){
            const calculateTotal = () => {
                const items = data.filter(dish => dishes.includes(dish?._id));
                let sum = 0;
                items.forEach((item) => {
                    sum += item?.price;
                });
                setTotal(sum);
            }
            calculateTotal();
        }
    }, [data, dishes]);

    const [formData, setFormData] = useState({
        phoneNumber: ''
    });

    const { phoneNumber } = formData;
    const [validated, setValidated] = useState(false);
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }
      
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            setValidated(true);
            e.preventDefault();
            if(phoneNumber && dishes.length > 0 && profile?.address){
                const data = { phoneNumber: phoneNumber, dishes: dishes }
                await createOrder(data);
            }
        }
    };

  return (
    <Container fluid style={{marginTop: '10vh'}} className='pb-5'>
        <Row className='mt-5 d-flex justify-content-center'>
            <Col sm={0} md={3} lg={4}></Col>
            <Col sm={12} md={6} lg={4}>
                <Card style={{minHeight: '30vh'}} className='mb-2'>
                    <Card.Header className='fw-bold fs-4'>Order Details</Card.Header>
                    {
                        isLoading || isLoadingDish ?
                            <Spinner className='m-auto'/> :
                        isError || isDishError ?
                            <Toast className='m-auto' bg='danger'>
                                <Toast.Body className='text-white'>
                                    <p>An error occurred fetching details. Please refresh. <Link to='/contact' className='fw-bold'>Contact Treasure Kitchen</Link> if issue persists.</p>
                                </Toast.Body>
                            </Toast> :
                        <>
                            <Card.Body>
                                <Card.Subtitle className='mx-1'>Delivery Address</Card.Subtitle>
                                <Card.Text className='text-muted p-1' style={{border: '1px solid #1B1610', minHeight: '3rem', borderRadius: '0.6rem'}}>
                                    {
                                        profile?.address ?
                                        <p className='text-muted'>{address} <Link to={`/address/${profile?.address?._id}/edit`}>Edit</Link></p> :
                                        <>
                                            <p className='text-muted'>No address found. <Link to='/address/add'>Add</Link></p>
                                        </>
                                    }
                                </Card.Text>
                                <Card.Subtitle className='fw-bold' style={{borderBottom: '2px solid #1B1610'}}>ITEMS</Card.Subtitle>
                                <ListGroup variant="flush">
                                    {
                                        data?.length > 0 ?
                                        data?.map(dish => (
                                            <ListGroup.Item key={dish?._id} className='p-0 m-0 text-muted'>
                                                <span>{dish?.name}</span>
                                                <span className='FloatRight Cursored px-2'>
                                                    {
                                                        dishes?.includes(dish?._id) ?
                                                        <FaTimesCircle color='red' onClick={() => onRemoveDish(dish?._id)}/> :
                                                        <FaPlusCircle color={`${colors.Gold}`} onClick={() => onAddDish(dish?._id)}/>
                                                    }
                                                </span>
                                                <span className='FloatRight'>{currencies.Naira}{dish?.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                            </ListGroup.Item>
                                        )) :
                                        <></>
                                    }
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                <span className='fw-bold'>Total: </span>
                                <span className='fw-bold text-muted FloatRight'>{currencies.Naira}{total?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </Card.Footer>
                        </>
                    }
                </Card>
                <Card bg='light' className="m-1 w-100 BoxShadow m-auto">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3 p-2">
                            <Col lg={12} className='mb-1'>
                                <Form.Group>
                                    <Form.Label className='RegistrationLabel'>Phone Number</Form.Label>
                                    <Form.Control 
                                        className="p-2"
                                        type="tel"
                                        autoComplete="off"
                                        required      
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={onChange}
                                        placeholder="+1234567890"/>
                                        <Form.Control.Feedback type="invalid">Phone number is required!</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Row lg={12} className='m-auto p-0 m-0'>
                                <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1">
                                    <Button type="submit" className='loginButton noOutline w-100 p-2 btn-secondary' onClick={goBack} disabled={isCreateLoading}>Back</Button>
                                </Col>
                                <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1">
                                { isCreateLoading ? 
                                    <Button type="submit" className='loginButton w-100 noOutline p-1' style={{background: '#583010'}} disabled={isCreateLoading}><Spinner /></Button> :
                                    <Button type="submit" className='loginButton w-100 p-2 noOutline' style={{background: '#583010'}} disabled={isLoading && isLoadingDish}>Place Order</Button>
                                }
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Card>
            </Col>
            <Col sm={0} md={3} lg={4}></Col>
        </Row>
    </Container>
  )
}

export default AddOrder