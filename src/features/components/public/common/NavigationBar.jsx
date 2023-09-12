import { Link, useNavigate } from 'react-router-dom';
import '../../../../App.css';
import {FaUserPlus, FaSignInAlt, FaShoppingCart, FaPhoneAlt, FaSignOutAlt, FaUser, FaHome, FaQuestionCircle, FaCalendarAlt, FaBook, FaListAlt, FaUserLock, FaUserShield } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../auth/authSlice';
import Button from 'react-bootstrap/Button';
import Logo from './Logo';
import { numbers, roles } from '../../../../settings/settings';

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
        navigate('/orders/add', { replace: true });
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
                    <ul className="navbar-nav JustifyContent fs-5 align-items-start flex-grow-1 pe-3">
                        <li className="nav-item">
                            <Link aria-current="page" className="nav-link" to="/" ><FaHome size={25}/> Home</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav JustifyContent fs-5 align-items-center flex-grow-1 pe-3">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Our Pages
                            </Link>
                            <ul className="dropdown-menu bg-dark">
                                <li>
                                    <Link aria-current="page" className="dropdown-item text-white" to="/about" ><FaBook color='#CFD4D9'/> About Us</Link>
                                </li>
                                <li>
                                    <Link aria-current="page" className="dropdown-item text-white" to='/contact'><FaPhoneAlt color='#CFD4D9'/> Contact</Link>
                                </li>
                                <li><hr className="dropdown-divider bg-white"/></li>
                                <li>
                                    <Link aria-current="page" className="dropdown-item text-white" to="/faq" ><FaQuestionCircle color='#CFD4D9'/> FAQs</Link>
                                </li>
                            </ul>
                        </li>
                        {
                            user ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="ghf" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Your Pages
                                    </a>
                                    <ul className="dropdown-menu bg-dark">
                                        <li>
                                            <Link className="dropdown-item text-white" to="/my-orders"><FaListAlt color='#CFD4D9'/> Orders</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-white" to="/my-reservations"><FaCalendarAlt color='#CFD4D9'/> Reservations</Link>
                                        </li>
                                        <li><hr className="dropdown-divider bg-white"/></li>
                                        <li>
                                            <Button className='dropdown-item px-3 DeLink text-white' disabled={dishes.length <= 0} onClick={onClick}>
                                                <FaShoppingCart color='#CFD4D9'/>
                                                <sub className='text-danger fw-bold'>
                                                    {
                                                    dishes.length <= numbers.Nine ?
                                                    dishes.length :
                                                    `${numbers.Nine}+`
                                                    }
                                                </sub> Checkout
                                            </Button>
                                        </li>
                                    </ul>
                                </li> :
                                <></>
                        }
                    </ul>
                    <div className='d-flex justify-content-center text-white py-1 px-2 rounded-4 flex-lg-row fs-5 align-items-center gap-3'>
                        <ul className="navbar-nav fs-5 align-items-center flex-grow-1 pe-3">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='bg-light p-2' style={{borderRadius: '35%'}}>
                                        <FaUser color='#161B02'/>
                                    </span>
                                </Link>
                                <ul className="dropdown-menu bg-dark">
                                    {
                                        user ?
                                        <>
                                            {
                                                user?.user?.role === roles.User ?
                                                <li>
                                                    <Link to='/user-profile' className='dropdown-item text-white'><FaUser/> Profile</Link>
                                                </li> :
                                                <li>
                                                    <Link to='/profile' className='dropdown-item text-white'><FaUserLock/> Profile</Link>
                                                </li>
                                            }
                                            <li><hr className="dropdown-divider bg-white"/></li>
                                            <li>
                                                <Button className='dropdown-item px-3 DeLink text-white' onClick={onLogout}>
                                                    <FaSignOutAlt color='#CFD4D9'/> Logout
                                                </Button>
                                            </li>
                                        </> :
                                        <>
                                            <li>
                                                <Link to='/login' className='dropdown-item text-white'><FaSignInAlt/> Login</Link>
                                            </li>
                                            <li>
                                                <Link to='/register' className='dropdown-item text-white'><FaUserPlus/> Register</Link>
                                            </li>
                                            <li><hr className="dropdown-divider bg-white"/></li>
                                            <li>
                                                <Link to='/login' className='dropdown-item text-white'><FaUserShield/> Staff Login</Link>
                                            </li>
                                        </>
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default NavigationBar;