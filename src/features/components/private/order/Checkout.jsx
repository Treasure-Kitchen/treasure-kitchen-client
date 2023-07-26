import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetDishesByIdsMutation } from '../../../api/dishApi';
import { Spinner } from 'react-bootstrap';
import Danger from '../../public/common/toasts/Danger';

const Checkout = () => {
    const { dishes } = useSelector((state) => state.dishes);
    const [getListOfDishes, { data, isLoading, isError, error }] = useGetDishesByIdsMutation();
    useEffect(() => {
      if(dishes.length > 0){
        const fetchdishes = async() => {
          await getListOfDishes({ dishes: dishes });
        }
        fetchdishes()
      }
    }, [dishes, getListOfDishes]);
  return (
    <div>
        {
          isLoading ? 
          <Spinner /> :
          isError ?
          <Danger message={error?.data}/> :
          data && data.map(dish => (
            <p key={dish?._id}>{dish?._id}, {dish?.name}, {dish?.description}</p>
          ))
        }
    </div>
  )
}

export default Checkout