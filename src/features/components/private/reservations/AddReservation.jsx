import { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { toISOLikeDatestring } from '../../../../settings/helpers';
import { useGetAllTablesQuery } from '../../../api/tableApi';
import { useGetAllDurationQuery } from '../../../api/durationApi';
import { useNavigate } from 'react-router-dom';
import { useCreateReservationMutation } from '../../../api/reservationApi';
import { toast } from 'react-toastify';

const AddReservation = () => {
   const [value, setValue] = useState(null);
   const [validated, setValidated] = useState(false);
   const [date, setDate] = useState('');
   const navigate = useNavigate();

   const { data: tables } = useGetAllTablesQuery();
   const { data: durations } = useGetAllDurationQuery();
   const [addReservation, { data, isLoading, isSuccess, isError, error }] = useCreateReservationMutation();
   
   const [formData, setFormData] = useState({
        customerPhone: '',
        duration: 0,
        table: '',
        partySize: 0
    });

    const {
            customerPhone,
            duration, 
            table, 
            partySize 
    } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    };

   useEffect(() => {
    if(value){
        setDate(toISOLikeDatestring(value))
    }
   }, [value])

   useEffect(() => {
    if(isError){
        toast.error(error?.data?.message);
    }

    if(isSuccess || data){
        toast.success(data?.message);
        navigate(-1, { replace: true });
    }
   }, [isError, error, isSuccess, data, navigate])

   const goBack = () => {
    navigate(-1, { replace: true });
   }

   const handleSubmit = async (e) => {
    const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        if(customerPhone && date && duration > 0 && table && partySize > 0){
            const formDetails = {
                customerPhone: customerPhone,
                dateTime: date,
                duration: duration,
                table: table,
                partySize: partySize
            } 
            await addReservation(formDetails)
        }
   }
    
  return (
    <Container className='mt-5'>
        <Row className="mb-3 px-2">
            <h4 className='h3 fw-bold pt-3 mb-0 pb-0 DarkGreen'>Make Reservation</h4>
            <span className="Border25"></span>
        </Row>
        <Row className='mt-5'>
            <Col sm={0} md={2} lg={3}></Col>
            <Col sm={12} md={8} lg={6} className='d-flex justify-content-center align-items-center m-auto'>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="forms">
                    <Row lg={12} className='m-auto m-0 p-0 mt-3'>
                        <Col sm={12} md={7} className='mb-1 m-0 p-1'>
                            <DatePicker
                                inputClass="custom-input"
                                format="YYYY-MM-DD HH:mm"
                                plugins={[
                                    <TimePicker position="bottom" hideSeconds/>
                                ]}
                                placeholder='Select A Date And Time'
                                value={value}
                                onChange={setValue}
                                animations={[
                                    opacity(), 
                                    transition({ from: 35, duration: 800 })
                                ]}
                            />
                        </Col>
                        <Col sm={12} md={5} className='mb-1 m-0 p-1'>
                            <FloatingLabel label='Enter Party Size'>
                                <Form.Control 
                                    type="number"
                                    autoComplete="off"
                                    required      
                                    id="partySize"
                                    name="partySize"
                                    value={partySize}
                                    onChange={onChange}/>
                                <Form.Control.Feedback type="invalid">Party Size is required!</Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row lg={12} className='m-auto m-0 p-0'>
                        <Col sm={12} md={6} className='mb-1 m-0 p-1'>
                            <Form.Group>
                                <Form.Label className='text-white'>Select A Table</Form.Label>
                                <Form.Select
                                    className='p-3'
                                    required
                                    id="table"
                                    name="table"
                                    value={table}
                                    onChange={onChange}>
                                    <option></option>
                                    {  tables && tables?.map(table => (
                                        <option key={table?._id} value={table?._id}>Table {table?.number}: Capacity ({table?.capacity})</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Table is required!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} className='mb-1 m-0 p-1'>
                            <Form.Group as={Col} className='mb-2'>
                                <Form.Label className='text-white'>Select A Time Duration</Form.Label>
                                <Form.Select
                                    required
                                    className='p-3'
                                    id="duration"
                                    name="duration"
                                    value={duration}
                                    onChange={onChange}>
                                    <option></option>
                                    { durations && durations?.map(duration => (
                                        <option key={duration?._id} value={duration?.inFigure}>{duration?.inWords}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Duration is required!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3 m-auto m-0 p-0">
                        <Col lg={12} className='mb-1 m-0 p-1'>
                            <FloatingLabel label='Phone Number'>
                                <Form.Control 
                                    type="tel"
                                    autoComplete="off"
                                    required      
                                    id="customerPhone"
                                    name="customerPhone"
                                    value={customerPhone}
                                    onChange={onChange}/>
                                <Form.Control.Feedback type="invalid">Phone Number is required!</Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                        <Row lg={12} className="m-auto m-0 p-0">
                            <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1 p-1">
                                <Button type="submit" className='loginButton noOutline w-100 p-3 btn-secondary' onClick={goBack} disabled={isLoading}>Back</Button>
                            </Col>
                            <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1 p-1">
                                { isLoading ? 
                                    <Button type="submit" className='loginButton w-100 noOutline p-2 BtnColor'><Spinner /></Button> :
                                    <Button type="submit" className='loginButton w-100 p-3 noOutline BtnColor' disabled={isLoading}>Save</Button>
                                }
                            </Col>
                        </Row>
                    </Row>
                </Form>
            </Col>
            <Col sm={0} md={2} lg={3}></Col>
        </Row>
    </Container>
  )
}

export default AddReservation