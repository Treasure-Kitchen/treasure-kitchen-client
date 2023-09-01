import React from 'react'
import { Button, Col, Container, Row, Spinner, Toast } from 'react-bootstrap'
import Reservation from './Reservation'
import { Link, useNavigate } from 'react-router-dom'
import { useGetUserReservationsQuery } from '../../../api/reservationApi'

const Reservations = () => {
  const { data: reservations, isLoading } = useGetUserReservationsQuery('');
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1, { replace: true });
  }
  return (
    <Container className="mt-5">
        <section>
            <div className="housing pb-5">
                <Row className="mb-3 px-2">
                    <h4 className='h3 fw-bold pt-3 mb-0 pb-0 DarkGreen'>My Reservations <Link className='FloatRight fs-6 p-0 m-0' to='/reservations/add'>Add</Link></h4>
                    <span className="Border25"></span>
                </Row>
                <Col className="items">
                    {
                        isLoading ?
                            <Spinner className="m-auto mt-5"/> :
                            <>
                                {
                                    reservations?.Data.length > 0 ?
                                    reservations?.Data?.map(reservation => (
                                            <div key={reservation?._id} className="item forms DarkLemon py-2">
                                                <Reservation reservation={reservation} />
                                            </div>
                                        )) :
                                    <Toast className='m-auto' bg='secondary'>
                                        <Toast.Body className='text-white'>
                                            <p>You have no Reservation. <Link to='/reservations/add' className='fw-bold DarkGreen FloatRight'>Add</Link></p>
                                        </Toast.Body>
                                    </Toast>
                                }
                            </>
                    }
                </Col>
                <Button onClick={goBack} className='ButtonToLink FloatRight p-2'>Back</Button>
            </div>
        </section>
    </Container>
  )
}

export default Reservations