import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './features/components/public/common/NavigationBar';
import { Container } from 'react-bootstrap';

const Layout = () => {
  return (
    <Container fluid className='m-0 p-0' style={{background: 'wheat', minHeight: '100vh'}}>
        <NavigationBar />
        <Outlet />
    </Container>
  )
}

export default Layout