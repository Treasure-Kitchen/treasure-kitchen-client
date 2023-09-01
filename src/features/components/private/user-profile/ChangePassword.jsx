import { useEffect, useState } from "react"
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap"
import {  FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../api/authApi";
import { useSelector } from "react-redux";
import { roles } from "../../../../settings/settings";
import { toast } from "react-toastify";

const ChangePawword = () => {
    const { user } = useSelector((state) => state.auth?.user);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    const { newPassword, confirmNewPassword } = formData;

    const [changeUserPassword, { data: userData, isLoading: isUserLoading, isError: isUserError, error: userError, isSuccess: isUserSuccess }] = useChangePasswordMutation();

    const goBack = () => {
        navigate(-1, { replace: true })
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    };

    useEffect(() => {
        if(isUserError){
            toast.error(userError?.data?.message);
        }
    }, [isUserError, userError, isUserSuccess, userData])

    useEffect(() => {
        if(isUserSuccess || userData){
            toast.success(userData?.message);
            navigate(-1, { replace: true })
        }
    }, [isUserSuccess, userData, navigate])

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();
        if(newPassword && confirmNewPassword){
            if(user?.role === roles.User){
                const data = { id: user?.id, formData: formData};
                await changeUserPassword(data);
            }
        }
    }

  return (
    <Container fluid className="PaddingTop">
		<Row className="p-0 m-0 mb-5 d-flex justify-content-center align-items-center">
            <Col sm={0} md={2} lg={3} className="m-0 p-0"></Col>
            <Col sm={12} md={8} lg={6} className="d-flex justify-content-center align-items-center mt-5">
                {
                    isUserLoading ?
                    <Spinner /> :
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="forms">
                        <h4 className='text-center fw-5 text-white pt-3'>
                            <FaLock /> Change Password
                        </h4>
                        <Row className="mb-3">
                            <Col lg={12} className='mb-1 m-0 p-1'>
                                <FloatingLabel label='New Password'>
                                    <Form.Control 
                                        type="password"
                                        autoComplete="off"
                                        required      
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={onChange}/>
                                    <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col lg={12} className='mb-1 m-0 p-1'>
                                <FloatingLabel label='Confirm New Password'>
                                    <Form.Control 
                                        type="password"
                                        autoComplete="off"
                                        required
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        value={confirmNewPassword}
                                        onChange={onChange}/>
                                    <Form.Control.Feedback type="invalid">Confirm Password is required!</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Row lg={12} className="m-auto m-0 p-0">
                                <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1 p-1">
                                    <Button type="submit" className='loginButton noOutline w-100 p-2 btn-secondary' onClick={goBack} disabled={isUserLoading}>Back</Button>
                                </Col>
                                <Col sm={12} md={6} className="d-flex justify-content-center align-items-center mb-1 p-1">
                                    { isUserLoading ? 
                                        <Button type="submit" className='loginButton w-100 noOutline p-1 BtnColor'><Spinner /></Button> :
                                        <Button type="submit" className='loginButton w-100 p-2 noOutline BtnColor' disabled={isUserLoading}>Save</Button>
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

export default ChangePawword