import React from 'react'
import { Button, Container, Row, Spinner, Toast } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Track from './Track';
import { useGetOrderTracksQuery } from '../../../api/orderApi';

const Tracks = () => {
    const { id } = useParams();
    const { data: orderTracks, isLoading, isError } = useGetOrderTracksQuery(id);
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1, { replace: true });
    }

  return (
    <Container className='py-5'>
      <Row className="px-2">
          <h2 className='fw-bold pt-3 mb-0 pb-0 DarkGreen Border25'>
            Tracks: <br/>
            <span className='SmallFont'>Order#: {id}</span>
          </h2>
      </Row>
      {
        isLoading ? 
          <div className='d-flex justify-content-center align-items-center mt-3'>
            <Spinner />
          </div> :
        isError ?
        <Toast className='m-auto mt-3' bg='danger'>
          <Toast.Body className='text-white'>
              <p>An error occurred fetching details. Please refresh. <Link to='/contact' className='fw-bold'>Contact Treasure Kitchen</Link> if issue persists.</p>
          </Toast.Body>
        </Toast> :
        <section className="timeline-section">
          <div className="timeline-items">
            {
              orderTracks && orderTracks?.map(track => (
                <Track key={track?._id} track={track} />
                ))
            }
        </div>
      </section>  
      }
      <Button onClick={goBack} className='ButtonToLink FloatRight p-2'>Back</Button>
    </Container>
  )
}

export default Tracks