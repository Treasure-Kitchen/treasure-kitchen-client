import { Link, useNavigate } from 'react-router-dom';
import '../../../../App.css';
import {FaUserPlus, FaSignInAlt, FaShoppingCart, FaPhoneAlt, FaSignOutAlt, FaUser, FaHome, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../auth/authSlice';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Logo from './Logo';
import { numbers } from '../../../../settings/settings';

const NavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { dishes } = useSelector((state) => state.dishes);

    const onLogout = () => {
        dispatch(logout());
        navigate('/', { replace: true });
    }

    const onClick = () => {
        navigate('/add-order', { replace: true });
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top NavigationBar">
        <div className="container">
            <Link className="navbar-brand fs-4" to="/">
                <Logo />
            </Link>
            <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* Sidebar */}
            <div className="offcanvas offcanvas-start OffCanvas" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header text-white border-bottom">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                        <Logo />
                    </h5>
                    <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
                    <ul className="navbar-nav justify-content-around fs-5 align-items-center flex-grow-1 pe-3">
                        <li className="nav-item">
                            <Link aria-current="page" className="nav-link" to="/" ><FaHome size={30}/></Link>
                        </li>
                        <li className="nav-item">
                            <Link aria-current="page" className="nav-link" to="/about" ><FaQuestionCircle size={30}/></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact"><FaPhoneAlt size={30}/></Link>
                        </li>
                        <li className="nav-item">
                            <Button className='nav-link DeLink' disabled={dishes.length <= 0} onClick={onClick}>
                                <FaShoppingCart size={30}/>
                                <sub className='text-danger fw-bold'>
                                    {
                                    dishes.length <= numbers.Nine ?
                                    dishes.length :
                                    `${numbers.Nine}+`
                                    }
                                </sub>
                            </Button>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link" to="/reservations"><FaCalendarAlt size={30}/></Link>
                        </li>
                    </ul>
                    <div 
                        className='d-flex justify-content-center text-white py-1 px-2 rounded-4 flex-lg-row fs-5 align-items-center gap-3'
                        style={{backgroundColor: '#CFD4D9'}}
                    >
                        { user ? 
                            <>
                                <OverlayTrigger placement='left' overlay={
                                    <Tooltip>Profile</Tooltip>
                                }>
                                    <Link to='/user-profile' className='text-white text-center px-2 text-decoration-none'><FaUser color='#040406'/></Link>
                                </OverlayTrigger> |
                                <OverlayTrigger placement='bottom' overlay={
                                    <Tooltip>Logout</Tooltip>
                                }>
                                    <Button onClick={onLogout} className='DeLink text-center px-2 text-decoration-none'><FaSignOutAlt color='#040406'/></Button>
                                </OverlayTrigger>
                            </> :
                            <>
                                <OverlayTrigger placement='left' overlay={
                                    <Tooltip>Login</Tooltip>
                                }>
                                    <Link to='/login' className='text-white text-center px-2 text-decoration-none'><FaSignInAlt color='#040406'/></Link>
                                </OverlayTrigger> <span style={{color: '#040406'}}>|</span>
                                <OverlayTrigger placement='bottom' overlay={
                                    <Tooltip>Register</Tooltip>
                                }>
                                    <Link to='/register' className='text-white text-center px-2 text-decoration-none'><FaUserPlus color='#040406'/></Link>
                                </OverlayTrigger> 
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default NavigationBar;