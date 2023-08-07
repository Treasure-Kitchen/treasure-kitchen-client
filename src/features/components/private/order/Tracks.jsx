import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Track from './Track';

const Tracks = () => {
    const { id } = useParams();
    console.log(id);
    const tracks = [
      {_id: 1, status: 'Pending', dateTime: '2023-08-01 11:15'},
      {_id: 2, status: 'Cancelled', dateTime: '2023-08-01 11:30'},
      {_id: 3, status: 'Pending', dateTime: '2023-08-03 13:04'},
      {_id: 4, status: 'Placed', dateTime: '2023-08-03 13:07'},
      {_id: 5, status: 'Confirmed', dateTime: '2023-08-03 14:35'},
      {_id: 6, status: 'Completed', dateTime: '2023-08-03 15:15'}
    ]
  return (
    <Container className='py-5'>
      <Row className="px-2">
          <h2 className='fw-bold pt-3 mb-0 pb-0 DarkGreen Border25'>
            Tracks: <br/>
            <span className='SmallFont'>Order#: {id}</span>
          </h2>
      </Row>
      <section className="timeline-section">
        <div className="timeline-items">
          {
            tracks && tracks?.map(track => (
              <Track track={track} />
            ))
          }
        </div>
      </section>
    </Container>
  )
}

export default Tracks