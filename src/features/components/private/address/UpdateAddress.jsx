import { useEffect, useState } from 'react';
import { Col, Container, Row, Form, FloatingLabel, Button, Spinner } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateAddressMutation } from '../../../api/userApi';
import { toast } from 'react-toastify';
import { useGetAllCountriesQuery } from '../../../api/addressApi';

const UpdateAddress = () => {
  const [validated, setValidated] = useState(false);
  const [states, setStates] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state;
  const { data: countries, isLoading: isCountryLoading } = useGetAllCountriesQuery('?includeStates=true');

  const goBack = () => {
    navigate(-1, { replace: true })
  }

  const [formData, setFormData] = useState({
    line1: address?.line1,
    line2: address?.line2,
    locality: address?.locality,
    postalCode: address?.postalCode,
    adminArea: address?.adminArea,
    country: address?.country
  });
  const { line1, line2, locality, postalCode, adminArea, country} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  useEffect(() => {
    const data = countries?.filter((ct) => {
      return ct?.name === country;
    });
    
    if(data?.length > 0){
      setStates(data[0]?.states)
    }
  }, [countries, country]);

  const [updateAddress, { data, isError, error, isLoading, isSuccess}] = useUpdateAddressMutation();

  useEffect(() => {
    if(isError){
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if(isSuccess || data){
      toast.success(data?.message);
      navigate(-1, { replace: true });
    }
  })

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    if(line1 && locality && postalCode && adminArea && country){
      const data = { id: address?._id, formData: formData }
      await updateAddress(data);
    }
  }

  return (
    <Container fluid>
      <Row className="p-0 m-0 mt-5 pb-5 d-flex justify-content-center align-items-center m-auto">
        <Col sm={0} md={2} lg={3} className="m-0 p-0"></Col>
        <Col sm={12} md={8} lg={6} className="d-flex justify-content-center align-items-center mt-5">
          {
            isCountryLoading ?
            <Spinner /> :
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="forms">
              <h4 className='text-center fw-5 text-white pt-3'>
                <FaMapMarkerAlt /> Update Address
              </h4>
              <Row className="mb-3">
                <Col lg={12} className='mb-1 m-0 p-1'>
                  <FloatingLabel label='Address Line 1'>
                    <Form.Control 
                      type="text"
                      autoComplete="off"
                      required      
                      id="line1"
                      name="line1"
                      value={line1}
                      onChange={onChange}/>
                      <Form.Control.Feedback type="invalid">Address Line 1 is required!</Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col lg={12} className='mb-1 m-0 p-1'>
                  <FloatingLabel label='Address Line 2'>
                    <Form.Control 
                      type="text"
                      autoComplete="off"
                      id="line2"
                      name="line2"
                      value={line2}
                      onChange={onChange}/>
                  </FloatingLabel>
                </Col>
                <Row lg={12} className='m-auto m-0 p-0'>
                  <Col sm={12} md={7} className='mb-1 m-0 p-1'>
                    <FloatingLabel label='City/Locality'>
                      <Form.Control 
                        type="text"
                        autoComplete="off"
                        id="locality"
                        name="locality"
                        value={locality}
                        onChange={onChange}/>
                    </FloatingLabel>
                  </Col>
                  <Col sm={12} md={5} className='mb-1 m-0 p-1'>
                    <FloatingLabel label='Postal/Zip Code'>
                      <Form.Control 
                        type="text"
                        autoComplete="off"
                        id="postalCode"
                        name="postalCode"
                        value={postalCode}
                        onChange={onChange}/>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row lg={12} className='m-auto m-0 p-0'>
                  <Col sm={12} md={6} className='mb-1 m-0 p-1'>
                    <Form.Group>
                      <Form.Label className='text-white'>Select Country</Form.Label>
                      <Form.Select
                        required
                        id="country"
                        name="country"
                        value={country}
                        onChange={onChange}>
                        <option></option>
                        { countries && countries?.map(country => (
                            <option key={country?._id} value={country?.name}>{country?.name}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Country is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6} className='mb-1 m-0 p-1'>
                    <Form.Group as={Col} className='mb-2'>
                      <Form.Label className='text-white'>Select State</Form.Label>
                      <Form.Select
                        required
                        id="adminArea"
                        name="adminArea"
                        value={adminArea}
                        onChange={onChange}>
                        <option></option>
                        { states && states?.map(state => (
                            <option key={state?._id} value={state?.name}>{state?.name}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">State is required!</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row lg={12} className="m-auto m-0 p-0">
                  <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1 p-1">
                      <Button type="submit" className='loginButton noOutline w-100 p-2 btn-secondary' onClick={goBack} disabled={isLoading}>Back</Button>
                  </Col>
                  <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1 p-1">
                      { isLoading ? 
                        <Button type="submit" className='loginButton w-100 noOutline p-1 BtnColor'><Spinner /></Button> :
                        <Button type="submit" className='loginButton w-100 p-2 noOutline BtnColor' disabled={isLoading}>Save</Button>
                      }
                  </Col>
                </Row>
              </Row>
            </Form>
          }
        </Col>
        <Col sm={0} md={2} lg={3} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default UpdateAddress;