import React from 'react'
import { useSelector } from 'react-redux'

const Checkout = () => {
    const { dishes } = useSelector((state) => state.dishes)
  return (
    <div>
        {dishes}
    </div>
  )
}

export default Checkout