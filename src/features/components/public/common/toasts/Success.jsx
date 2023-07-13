import React from 'react'
import { Toast } from 'react-bootstrap'

const Success = ({ message }) => {
  return (
    <Toast className="d-inline-block m-1" bg='success'>
        <Toast.Body className='text-white'>{message}</Toast.Body>
    </Toast>
  )
}

export default Success