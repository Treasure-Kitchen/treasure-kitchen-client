import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FLOWER_IMAGE, colors, numbers } from './settings/settings';

const Layout = () => {
  const {dishes} = useSelector((state) => state.dishes);
  const navigate = useNavigate();
  const cartColor = dishes && dishes.length > 0 ? colors.Gold : colors.Grey;
  
  const onClick = () => {
    navigate('/orders/add', { replace: true });
  }

  return (
    <Container fluid className='App m-0 px-0' style={{paddingTop: '10vh', backgroundImage: `url(${FLOWER_IMAGE})`, height: '100%', backgroundSize: 'cover'}}>
        <Outlet />
        <Button className='CartButton DeLink' disabled={dishes.length <= 0} onClick={onClick}>
          <FaShoppingCart size={30} color={cartColor}/>
          <sub className='text-danger fw-bold'>
            {
              dishes.length <= numbers.Nine ?
              dishes.length :
              `${numbers.Nine}+`
            }
          </sub>
        </Button>
    </Container>
  )
}

export default Layout