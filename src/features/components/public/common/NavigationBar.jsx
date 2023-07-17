import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../../../../App.css';
import {FaUserPlus, FaSignInAlt, FaHome, FaShoppingCart, FaBars, FaCalendar, FaInfoCircle, FaPhoneAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../auth/authSlice';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const NavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const onLogout = () => {
        dispatch(logout());
        navigate('/', { replace: true });
        if(!user){
            <Navigate to='/' />
        }
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top">
        <div className="container">
            <Link className="navbar-brand fs-4" to="/">Treasure Kitchen</Link>
            <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* Sidebar */}
            <div className="offcanvas offcanvas-start" style={{background: 'rgba(245, 222, 179, 0.15)', backdropFilter: 'blur(10px)'}} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header text-white border-bottom">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Treasure Kitchen</h5>
                    <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
                    <ul className="navbar-nav justify-content-center fs-5 align-items-center flex-grow-1 pe-3">
                        <li className="nav-item">
                            <Link className="nav-link active mx-2" aria-current="page" to="/"><FaHome /> Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link" to="/about"><FaInfoCircle /> About</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link" to="/contact"><FaPhoneAlt /> Contact</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pages</a>
                            <ul className="dropdown-menu bg-transparent fs-5">
                                <li>
                                    <Link className="dropdown-item text-white" aria-current="page" to="/reservation"><FaCalendar /> Book A Table</Link>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li>
                                    <Link className="dropdown-item text-white" aria-current="page" to="/reservation"><FaShoppingCart /> Place an Order</Link>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li>
                                    <Link className="dropdown-item text-white" aria-current="page" to="/reservation"><FaBars /> Menus</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div 
                        className='d-flex justify-content-center text-white py-1 px-2 rounded-4 flex-lg-row fs-5 align-items-center gap-3'
                        style={{backgroundColor: '#553d3a'}}
                    >
                        { user ? 
                            <>
                                <OverlayTrigger placement='left' overlay={
                                    <Tooltip>Profile</Tooltip>
                                }>
                                    <Link to='/user-profile' className='text-white text-center px-2 text-decoration-none'><FaUser /></Link>
                                </OverlayTrigger> |
                                <OverlayTrigger placement='bottom' overlay={
                                    <Tooltip>Logout</Tooltip>
                                }>
                                    <Button onClick={onLogout} className='DeLink text-white text-center px-2 text-decoration-none'><FaSignOutAlt /></Button>
                                </OverlayTrigger>
                            </> :
                            <>
                                <OverlayTrigger placement='left' overlay={
                                    <Tooltip>Login</Tooltip>
                                }>
                                    <Link to='/login' className='text-white text-center px-2 text-decoration-none'><FaSignInAlt /></Link>
                                </OverlayTrigger> |
                                <OverlayTrigger placement='bottom' overlay={
                                    <Tooltip>Register</Tooltip>
                                }>
                                    <Link to='/register' className='text-white text-center px-2 text-decoration-none'><FaUserPlus /></Link>
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