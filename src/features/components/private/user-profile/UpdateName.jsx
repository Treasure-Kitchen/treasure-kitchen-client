import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProfileQuery, useUpdateNameMutation } from "../../../api/userApi";
import { COVER_IMAGE } from "../../../../settings/settings";

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
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-100">
                  <Row className="mb-3">
                    <Col lg={12} className='mb-2 py-2'>
                        <Form.Group>
                            <Form.Control 
                                className="p-2"
                                type="text"
                                autoComplete="off"
                                required      
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                placeholder="John Doe"/>
                                <Form.Control.Feedback type="invalid">Name is required!</Form.Control.Feedback>
                        </Form.Group>
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

export default UpdateName