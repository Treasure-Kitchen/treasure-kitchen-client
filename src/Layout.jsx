import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './features/components/public/common/NavigationBar';

const Layout = () => {
  return (
    <div className="App" style={{backgroundImage: 'url(https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg)'}}>
        <NavigationBar />
        <Outlet />
    </div>
  )
}

export default Layout