import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './features/components/public/common/NavigationBar';
import { Container } from 'react-bootstrap';
import { COVER_IMAGE } from './settings/settings';

const Layout = () => {
  return (
    <Container fluid className='m-0 p-0 App' style={{ backgroundImage: `url(${COVER_IMAGE})`}}>
        <NavigationBar />
        <Outlet />
    </Container>
  )
}

export default Layout