import React, { useState } from 'react';
import { currencies } from '../../../../settings/settings';
import { useDispatch, useSelector } from 'react-redux';
import { addDish, removeDish } from '../../../dish/dishSlice';
import { toast } from 'react-toastify';
import { Button, Card, Col } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const DishForCart = ({dish}) => {
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
                        <p className='MinHeightthOne'></p> :
                      length > 0 && length <= 200 ?
                        <p className='MinHeightthOne'>{dish?.description}</p> :
                      length > 200 && readMore ?
                      <>
                        <p className='MinHeightthOne'>
                            {dish?.description}
                            <span className='m-0 p-0'>
                                {button}
                            </span>
                        </p>
                      </> :
                      <>
                        <p className='MinHeightthOne'>
                            {dish?.description.substring(0, 200)}
                            <span className='m-0 p-0'>
                                {button}
                            </span>
                        </p>
                      </>;
  return (
    <>
        <img src={`${dish?.photo}`} alt={`${dish?.name}`} className='DishImageH'/>
        <Card.Body className='px-3 py-3'>
            <Card.Title className='fw-bold'>{dish?.name}</Card.Title>
            <Card.Footer>
                <span className='fw-bold text-muted'>{currencies.Naira}{dish?.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                <span className='FloatRight Cursored px-1'>
                    {
                        dishes.includes(dish?._id) ?
                        <FaShoppingCart color='gold' size={30} onClick={onRemoveDish}/> :
                        <FaShoppingCart color='#161B02' size={30} onClick={onAddDish}/>
                    }
                </span>
            </Card.Footer>
        </Card.Body>
        <Col className='content'>
            <p className='fw-bold'>{description}</p>
            <span className='FloatRight Cursored px-1'>
                {
                    dishes.includes(dish?._id) ?
                    <Button className='btn-danger' onClick={onRemoveDish}>Remove From Cart</Button> :
                    <Button onClick={onAddDish}>Add To Cart</Button>
                }
            </span>
        </Col>
    </>
  )
}
export default DishForCart;