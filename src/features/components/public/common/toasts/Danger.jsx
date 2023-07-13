import React from 'react'
import { Toast } from 'react-bootstrap'

const Danger = ({ message }) => {
  return (
    <Toast className="d-inline-block m-1" bg='danger'>
        <Toast.Body className='text-white'>{message}</Toast.Body>
    </Toast>
  )
}

export default Danger