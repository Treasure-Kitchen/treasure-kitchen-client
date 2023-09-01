import Multiselect from "multiselect-react-dropdown"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { COVER_IMAGE, MULTI_SELECT_STYLE } from "../../../../settings/settings";
import { useNavigate } from "react-router-dom";
import { useGetAllDishesQuery } from "../../../api/dishApi";
import { useCreateOrderMutation } from "../../../api/orderApi";
import { toast } from "react-toastify";

const CreateOrder = () => {
    const navigate = useNavigate();
    const [dishesToOrder, setDishesToOrder] = useState([]);
    const { data: dishesFromDb } = useGetAllDishesQuery('');
    const [createOrder, { data, isError, error, isLoading, isSuccess }] = useCreateOrderMutation();

    useEffect(() => {
      if(isError){
        toast.error(error?.data?.message);
      }
    }, [isError, error]);

    useEffect(() => {
      if(isSuccess || data){
        toast.success(data?.message);
        navigate(-1, { replace: true })
      }
    })
    const goBack = () => {
      navigate(-1, { replace: true });
    }
    
    const [formData, setFormData] = useState({
      phoneNumber: ''
    })
    const { phoneNumber } = formData;

    const setSelected = (e) => {
        const dishArr = [];
        e.forEach((dish) => dishArr.push(dish?._id));
        setDishesToOrder(dishArr)
    }

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }
  
    const [validated, setValidated] = useState(false);
    
    const handleSubmit = async (e) => {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        setValidated(true);
        e.preventDefault();
        if(phoneNumber && dishesToOrder.length > 0){
          const data = { phoneNumber: phoneNumber, dishes: dishesToOrder }
          await createOrder(data);
        }
      }
    };

  return (
    <Container style={{position: 'relative'}} fluid>
      <Row className="App" style={{backgroundImage: `url(${COVER_IMAGE})`}}>
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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col lg={12} className='mb-2 py-2'>
                        <Form.Group>
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
                    <Col lg={12} className='mb-2 py-2'>
                      <Multiselect
                        options={dishesFromDb?.Data}
                        displayValue="name"
                        placeholder="Select dishes"
                        avoidHighlightFirstOption={true}
                        showCheckbox={true}
                        onSelect={setSelected}
                        onRemove={setSelected}
                        id="css_custom"
                        style={MULTI_SELECT_STYLE}
                      />
                    </Col>
                    <Row lg={12} className="m-auto">
                        <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-2">
                            <Button type="submit" className='loginButton noOutline w-100 p-2 btn-secondary' onClick={goBack} disabled={isLoading}>Back</Button>
                        </Col>
                        <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-2">
                            { isLoading ? 
                                <Button type="submit" className='loginButton w-100 noOutline p-1' style={{background: '#583010'}}><Spinner /></Button> :
                                <Button type="submit" className='loginButton w-100 p-2 noOutline' style={{background: '#583010'}}>Save</Button>
                            }
                        </Col>
                    </Row>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default CreateOrder