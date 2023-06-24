import '../../../../App.css';

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top">
        <div className="container">
            <a className="navbar-brand fs-4" href="/">Treasure Kitchen</a>
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
                            <a className="nav-link active" aria-current="page" href="#/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/">Contact</a>
                        </li>
                    </ul>
                    <div className='d-flex justify-content-center flex-lg-row flex-column fs-5 align-items-center gap-3'>
                        <a href="/login" className='text-white'>Login</a>
                        <a 
                            href="/login" 
                            className='text-white text-decoration-none px-3 py-1 rounded-4'
                            style={{backgroundColor: '#553d3a'}}
                            >Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default NavigationBar;