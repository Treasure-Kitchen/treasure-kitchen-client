import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Danger from '../../public/common/toasts/Danger';
import { useGetDishesByIdsQuery } from '../../../api/dishApi';

const Checkout = () => {
    const { dishes } = useSelector((state) => state.dishes);
    const itemsIds = dishes?.join();
    const { data, isLoading, isError } = useGetDishesByIdsQuery(itemsIds);
    
  return (
    <div>
        {
          isLoading ? 
          <Spinner /> :
          isError ?
          <Danger message={'An error occured trying to fetch dishes in the cart. Please try again later.'}/> :
          data && data.map(dish => (
            <p key={dish?._id}>{dish?._id}, {dish?.name}, {dish?.description}</p>
          ))
        }
    </div>
  )
}

export default Checkout