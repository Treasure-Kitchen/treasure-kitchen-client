import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Spinner, FloatingLabel } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProfileQuery, useUpdateNameMutation } from "../../../api/userApi";
import { COVER_IMAGE } from "../../../../settings/settings";
import { FaUserEdit } from "react-icons/fa";

const UpdateName = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const { data: profile } = useGetProfileQuery(user?.user?.id);
  const [updateName, { data, isLoading, isSuccess, isError, error }] = useUpdateNameMutation();

  const [formData, setFormData] = useState({
    name: profile?.displayName
  });
  const { name } = formData;

  useEffect(() => {
    if(isError){
        toast.error(error?.data?.message)
    }

    if(isSuccess || data){
        toast.success(data?.message);
        navigate('/user-profile', { replace: true });
    }
}, [user, isError, isSuccess, error, navigate, data]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const goBack = () => {
    navigate('/user-profile', { replace: true })
  }

  const [validated, setValidated] = useState(false);
  
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    if(name){
        const data = { id: profile?._id, formData: formData }
        await updateName(data)
    }
  };

  return (
    <Container fluid>
      <Row className="p-0 m-0 mt-5 mb-5 d-flex justify-content-center align-items-center m-auto">
        <Col sm={0} md={2} lg={3} className="m-0 p-0"></Col>
        <Col sm={12} md={8} lg={6} className="d-flex justify-content-center align-items-center mt-5">
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="forms">
            <h4 className='text-center fw-5 text-white pt-3'>
              <FaUserEdit /> Update Names
            </h4>
            <Row className="mb-3">
              <Col lg={12} className='mb-1 m-0 p-1'>
                <FloatingLabel label='John Doe'>
                  <Form.Control 
                    type="text"
                    autoComplete="off"
                    required      
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="John Doe"/>
                    <Form.Control.Feedback type="invalid">Name is required!</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            <Row lg={12} className="m-auto m-0 p-0">
              <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1 p-1">
                  <Button type="submit" className='loginButton noOutline w-100 p-2 btn-secondary' onClick={goBack} disabled={isLoading}>Back</Button>
              </Col>
              <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1 p-1">
                  { isLoading ? 
                      <Button type="submit" className='loginButton w-100 noOutline p-1 BtnColor'><Spinner /></Button> :
                      <Button type="submit" className='loginButton w-100 p-2 noOutline BtnColor'>Save</Button>
                  }
              </Col>
            </Row>
            </Row>
          </Form>
        </Col>
        <Col sm={0} md={2} lg={3} className="m-0 p-0"></Col>
      </Row>
    </Container>
  )
}

export default UpdateName