import React from 'react'
import { useParams } from 'react-router-dom'

const Tracks = () => {
    const { id } = useParams();
    console.log(id)
  return (
    <div>Tracks</div>
  )
}

export default Tracks