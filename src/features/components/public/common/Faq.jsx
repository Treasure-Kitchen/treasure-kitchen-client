import React from 'react'
import { Accordion, Col, Container, Row, Spinner, Toast } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Faq = () => {
  const faqs = [
    {
        _id: 1,
        question: "How do I register?",
        answer: `The registration icon is situated at the top-right corner of the page on large screens and bottom of the navigation page when you expand the breadcrumb on smaller screens. You will required to enter your email and password. A confirmation email would be sent to you upon successful registration. 
        You can enjoy ordering your favorite dishes and reserving a seat at Treasure Kitchen after confirmation`
    },
    {
        _id: 2,
        question: "How do I order on Treasure Kitchen?",
        answer: `You have to log in first to be able to place an order. 
        On successful log in, You can proceed to our Menus page and select the dishes you will like to order. 
        When you're done, you can then click the floating Cart icon at the bottom of the page or through the Our Page dropdown on the menu to checkout your order. 
        You'll be required to have added your address, otherwise a link is available to redirect you to the page where you can fill in your or edit your deleivery address. 
        Other information required is your phone number which you can conveniently enter during the checkout. 
        You can also remove order items from the checkout page if you want to. Proceed to save your order after reviewing the details and you'll be redirected to payment payment.`
    },
    {
        _id: 3,
        question: "How soon before I receive my orders?",
        answer: `After payment, one of our Staff will confirm your order and it will be dispatched immediately for delivery.
        Depending on your location within the city, you're expected to take delivery of your order in 30 minutes after payment`
    },
    {
        _id: 4,
        question: "Can I cancel my order?",
        answer: `When you place an order, you have an option not to make any payment yet. 
        The order will be cancelled automatically after one hour. You can also cancel it within this time.
        For paid orders however, this can not be cancelled as we dispatch immediately you make payment.`
    }
  ]
  
  return (
    <Container fluid>
      <Row className='py-5' style={{minHeight: '30rem'}}>
        <Col sm={0} md={2} lg={3}></Col>
        <Col sm={12} md={8} lg={6} className='py-5'>
          <Row className='mb-3 text-center'>
              <h2 className='fw-bold'>FREQUENTLY ASKED QUESTIONS</h2>
          </Row>
          <Row>
          <Accordion>
            { false ? 
              <div>
                <Spinner />
              </div> :
              <>
                {
                  faqs?.length > 0 ?
                  faqs && faqs?.map(faq => (
                    <Accordion.Item eventKey={faq?._id}>
                      <Accordion.Header>{faq?.question}</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          {faq?.answer}
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  )) :
                  <Toast className='m-auto mt-5' bg='danger'>
                    <Toast.Body className='text-white'>
                        <p>No Frequently Asked Question found. Please check back later or <Link to='/contact' className='fw-bold'>Contact Treasure Kitchen</Link> if you think this is an error.</p>
                    </Toast.Body>
                  </Toast>
                }
              </>
            }
          </Accordion>
          </Row>
        </Col>
        <Col sm={0} md={2} lg={3}></Col>
      </Row>
    </Container>
  )
}

export default Faq