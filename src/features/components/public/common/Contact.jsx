import { Button, Col, Container, FloatingLabel, Form, Row, Spinner, Toast } from "react-bootstrap"
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { toEmailLink, toPhoneLink } from "../../../../settings/helpers"
import { useState } from "react"

const Contact = () => {
  //const { data: contact, isLoading } = useGetContactQuery();
  const isLoading = false;
  const isError = false;
  const contact = {
    address: {
      line1: "234 3-Arms Zone",
      line2: "",
      city: "Abuja",
      postalCode: "90132",
      country: "Nigeria"
    },
    emails: [
      "info@treasure-kitchen.com"
    ],
    phones: [
      {
        phoneNumber: "+2348035222858",
        ext: ""
      }
    ]
  }
  const line1 = contact?.address ? `${contact?.address?.line1}` : ''
  const address = line1 && contact?.address?.line2 ?
                  `${line1}, ${contact?.address?.line2}, ${contact?.address?.city} (${contact?.address?.postalCode}). ${contact?.address?.country}.` :
                  `${line1}, ${contact?.address?.city} (${contact?.address?.postalCode}). ${contact?.address?.country}.`;

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
                    
  };

  return (
    <Container fluid>
      <Row className='py-5'>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8} className='py-5'>
          <Row className='mb-3 text-center'>
              <h2 className='fw-bold'>GET IN TOUCH</h2>
          </Row>
          {
            isLoading ?
              <Col className='m-auto p-0 m-0 mt-5 mb-5 d-flex justify-content-center align-items-center'>
                <Spinner />
              </Col> :
            isError ?
              <Toast className='m-auto' bg='danger'>
                  <Toast.Body className='text-white'>
                      <p>An error occurred fetching details. Please refresh. <Link to='/contact' className='fw-bold'>Contact Treasure Kitchen</Link> if issue persists.</p>
                  </Toast.Body>
              </Toast> :
            <Row>
              <Col lg={4} md={12}>
                <Row className='my-auto mx-1 mb-3'>
                  <Col 
                    className='text-center AboutHover forms' 
                    sm={12} md={4} lg={12}
                    style={ {
                      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                      padding: '1rem',
                      minHeight: '8rem'} }>
                    <FaMapMarkerAlt size={30} color="#161B02"/>
                    <h6 className='mb-1 DarkGreen'>Address</h6>
                    <p className='text-white w-75 m-auto SmallFont'>{address}</p>
                  </Col>
                  <Col 
                    className='text-center AboutHover forms' 
                    sm={12} md={4} lg={12}
                    style={ {
                      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                      padding: '1rem',
                      minHeight: '8rem'} }
                    >
                    <FaPhoneAlt size={20} color="#161B02"/>
                    <h6 className='mb-1 DarkGreen'>Phone</h6>
                    {
                      contact?.phones && contact?.phones.map(phone => (
                        <p className='text-white w-75 m-auto SmallFont mb-1' key={phone?.phoneNumber}>
                          <a className='text-white' href={toPhoneLink(phone?.phoneNumber, phone?.ext)}>{phone?.phoneNumber} {phone?.ext}</a>
                        </p>
                      ))
                    }
                  </Col>
                  <Col 
                    className='text-center AboutHover forms' 
                    sm={12} md={4} lg={12}
                    style={ {
                      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', 
                      padding: '1rem',
                      minHeight: '8rem'} }>
                    <FaEnvelope size={20} color="#161B02"/>
                    <h6 className='mb-1 DarkGreen'>Email</h6>
                    {
                      contact?.emails && contact?.emails.map(email =>(
                        <p className='text-white w-75 m-auto SmallFont mb-1' key={email}>
                          <a className='text-white' href={toEmailLink(email)}>{email}</a>
                        </p>
                      ))
                    }
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={8}>
                <Row className='mb-3 text-center mx-1 forms p-0 m-0' style={ {boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',padding: '1rem',minHeight: '24rem'} }>
                  <Form className='py-3' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-1">
                      <p className='text-center text-justify text-white'>For enquiries, please refer to the <Link to="/faq" className="DarkGreen">FAQ section</Link> or send us a message below.</p>
                      <Col sm={12} md={6} className='mb-2'>
                        <FloatingLabel label='Your Name'>
                          <Form.Control 
                            type="text"   
                            id="name"
                            name="name"
                            required
                            placeholder='Name'
                            />
                          <Form.Control.Feedback type="invalid">Name field is required!</Form.Control.Feedback>
                        </FloatingLabel>                   
                      </Col>
                      <Col sm={12} md={6} className='mb-2'>
                        <FloatingLabel label='Your Email'>
                          <Form.Control 
                              type="email"   
                              id="email"
                              name="email"
                              required
                              placeholder='Email address'
                          />
                          <Form.Control.Feedback type="invalid">Email field is required!</Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Form.Group as={Col} className='mb-2'>
                        <Form.Control
                          required
                          as='textarea'
                          rows={5}
                          id="careerSummary"
                          name="careerSummary"
                          placeholder='Write Your Message'
                        />
                        <Form.Control.Feedback type="invalid">Message field is required!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Col sm={0} md={2} lg={3}></Col>
                      <Col sm={12} md={8} lg={6}>
                        { false ? 
                          <Button type="submit" className='loginButton p-2 noOutline BtnColor' disabled>
                              Sending...
                          </Button> :
                          <Button type="submit" className='loginButton p-2 noOutline BtnColor'>Send</Button>
                        }
                      </Col>
                      <Col sm={0} md={2} lg={3}></Col>
                    </Row>
                  </Form>
                </Row>
              </Col>
          </Row>
          }
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
      </Row>
    </Container>
  )
}

export default Contact