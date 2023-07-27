import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { colors, currencies } from '../../../../../settings/settings';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addDish, removeDish } from '../../../../dish/dishSlice';
import { toast } from 'react-toastify';

const TopImageCard = ({dish}) => {
  const { dishes } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();

  const onAddDish = () => {
    if(dishes?.length <= 49){
      dispatch(addDish(dish?._id))
    } else {
      toast.info(`You can not add more than ${dishes?.length} item(s) to the Cart.`);
    }
  }

  const onRemoveDish = () => {
    dispatch(removeDish(dish?._id))
  }

  const [readMore,setReadMore] = useState(false);
  const linkName = readMore ? 'Less <<' : 'More >>';
  const button = <Button className='ButtonToLink text-center' onClick={()=>{setReadMore(!readMore)}}>{linkName}</Button>;
  const length = dish.description.length;
  const description = length <= 0 ?
                        <Card.Text className='MinHeightthOne'></Card.Text> :
                      length > 0 && length <= 40 ?
                        <Card.Text className='MinHeightthOne'>{dish?.description}</Card.Text> :
                      length > 40 && readMore ?
                      <>
                        <Card.Text className='MinHeightthOne'>
                            {dish?.description}
                            <span className='m-0 p-0'>
                                {button}
                            </span>
                        </Card.Text>
                      </> :
                      <>
                        <Card.Text className='MinHeightthOne'>
                            {dish?.description.substring(0, 40)}
                            <span className='m-0 p-0'>
                                {button}
                            </span>
                        </Card.Text>
                      </>;

  return (
    <Card className='p-0 m-1 mb-2'>
        <Card.Img variant="top" src={`${dish?.photo}`} style={{maxHeight: '10.2rem'}}/>
        <Card.Body>
            <Card.Title>{dish?.name}</Card.Title>
            {description}
            <Card.Footer>
                <span className='fw-bold text-muted'>{currencies.Naira}{dish?.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                <span className='FloatRight Cursored px-1'>
                    {
                        dishes.includes(dish?._id) ?
                        <FaShoppingCart color={`${colors.Gold}`} size={20} onClick={onRemoveDish}/> :
                        <FaShoppingCart color={`${colors.Grey}`} size={20} onClick={onAddDish}/>
                    }
                </span>
            </Card.Footer>
        </Card.Body>
    </Card>
  )
}

export default TopImageCard