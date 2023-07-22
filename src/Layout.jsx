import { Outlet } from 'react-router-dom';
import './App.css';
import { Container } from 'react-bootstrap';

const Layout = () => {
  return (
    <Container fluid className='App m-0 px-0' style={{paddingTop: '10vh'}}>
        <Outlet />
    </Container>
  )
}

export default Layout