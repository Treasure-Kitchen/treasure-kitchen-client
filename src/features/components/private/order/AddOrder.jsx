import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useGetProfileQuery } from '../../../api/userApi';
import { FloatingLabel, Form, Spinner, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { colors, currencies } from '../../../../settings/settings';
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import { addDish, clearDishes, removeDish } from '../../../dish/dishSlice';
import { toast } from 'react-toastify';
import { useGetDishesByIdsQuery } from '../../../api/dishApi';
import { useCreateOrderMutation } from '../../../api/orderApi';
import { formatMoneyTo2DP } from '../../../../settings/helpers';

const AddOrder = () => {
    const {user} = useSelector((state) => state.auth?.user);
    const {dishes} = useSelector((state) => state.dishes);
    const itemsIds = dishes?.join();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [total, setTotal] = useState();

    const { data: profile, isLoading, isError } = useGetProfileQuery(user?.id);
    const { data, isLoading: isLoadingDish } = useGetDishesByIdsQuery(itemsIds);
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
            navigate(`/orders/${createData?.id}/payment`, { replace: true });
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
        }
        setValidated(true);
        e.preventDefault();
        if(phoneNumber && dishes.length > 0 && profile?.address){
            const data = { phoneNumber: phoneNumber, dishes: dishes }
            await createOrder(data);
        } else if(dishes?.length <= 0){
            toast.info("You must add one or more items to place an order")
        } else if (!phoneNumber) {
            toast.info("Please enter your phone number.")
        } else if (!address) {
            toast.info("Please go to your profile to add the delivery address.")
        }
    };

  return (
    <Container fluid style={{marginTop: '10vh'}} className='pb-5'>
        <Row className=''>
            <h2 className='fw-bold pt-3 mb-0 pb-0 DarkGreen Border25'>Check Out</h2>
        </Row>
        <Row className='mt-2 d-flex justify-content-center'>
            <Col sm={0} md={3} lg={4}></Col>
            <Col sm={12} md={6} lg={4}>
                <Row className='p-2'>
                    {
                        isLoading || isLoadingDish ?
                            <Spinner className='m-auto'/> :
                        isError ?
                            <Toast className='m-auto' bg='danger'>
                                <Toast.Body className='text-white'>
                                    <p>An error occurred fetching details. Please refresh. <Link to='/contact' className='fw-bold'>Contact Treasure Kitchen</Link> if issue persists.</p>
                                </Toast.Body>
                            </Toast> :
                        <>
                            <div className='p-2 text-white m-0 forms py-3'>
                                <h5 className='mx-2 fw-bold'>Delivery Address</h5>
                                {
                                    profile?.address ?
                                    <p className='text-white border-2 p-2' style={{border: '1px solid #1B1610', minHeight: '3rem', borderRadius: '0.6rem'}}>{address} <Link to={`/address/${profile?.address?._id}/edit`} state={profile?.address}>Edit</Link></p> :
                                    <>
                                        <p className='text-white'>No address found. <Link to='/address/add'>Add</Link></p>
                                    </>
                                }
                                <h5 className='fw-bold' style={{borderBottom: '2px solid #1B1610'}}>Items</h5>
                                <div className='DarkBorderBottom-2'>
                                    {
                                        data?.length > 0 ?
                                        data?.map(dish => (
                                            <p className="" key={dish?._id}>
                                                <span className="fw-bold">{dish?.name}</span>
                                                <span className='FloatRight Cursored px-2'>
                                                {
                                                    dishes?.includes(dish?._id) ?
                                                    <FaTimesCircle color='red' onClick={() => onRemoveDish(dish?._id)}/> :
                                                    <FaPlusCircle color={`${colors.Gold}`} onClick={() => onAddDish(dish?._id)}/>
                                                }
                                            </span>
                                                <span className="FloatRight">{currencies.Naira}{formatMoneyTo2DP(dish?.price)}</span>
                                            </p>
                                        )) :
                                        <></>
                                    }
                                </div>
                                <div>
                                    <span className='fw-bold'>TOTAL: </span>
                                    <span className='fw-bold text-muted FloatRight'>{currencies.Naira}{formatMoneyTo2DP(total)}</span>
                                </div>
                                
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row className="py-3">
                                        <Col lg={12} className='mb-2'>
                                            <FloatingLabel label='Phone Number: +1234567890'>
                                                <Form.Control 
                                                    type="tel"
                                                    autoComplete="off"
                                                    required      
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={phoneNumber}
                                                    onChange={onChange}/>
                                                    <Form.Control.Feedback type="invalid">Phone number is required!</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>
                                        <Row lg={12} className='m-auto p-0 m-0'>
                                            <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1">
                                                <Button type="submit" className='loginButton noOutline w-100 p-2 btn-secondary' onClick={goBack} disabled={isCreateLoading}>Back</Button>
                                            </Col>
                                            <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1">
                                            { isCreateLoading ? 
                                                <Button type="submit" className='loginButton w-100 noOutline p-1' style={{background: '#583010'}} disabled={isCreateLoading}><Spinner /></Button> :
                                                <Button type="submit" className='loginButton w-100 p-2 noOutline BtnColor' style={{background: '#583010'}} disabled={isLoading && isLoadingDish}>Place Order</Button>
                                            }
                                            </Col>
                                        </Row>
                                    </Row>
                                </Form>
                            </div>
                        </>
                    }
                </Row>
            </Col>
            <Col sm={0} md={3} lg={4}></Col>
        </Row>
    </Container>
  )
}

export default AddOrder