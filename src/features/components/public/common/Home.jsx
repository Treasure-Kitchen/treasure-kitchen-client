import { Col, Container, Row, Spinner, Toast } from "react-bootstrap";
import MainCover from "./MainCover";
import { useGetAllMenuQuery } from "../../../api/menuApi";
import { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useGetAllMenuQuery();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    if(data?.length > 0){
      setMenus(data.filter((menu) => {
        return menu?.dishes.length > 0;
      }))
    }
  }, [data])
  
  return (
    <Container fluid className="m-0 p-0" >
      <Row className="m-0 p-0">
          <MainCover />
          <Row className="mt-3 mb-5 m-auto">
            <h1 className="FedericaFont fw-2 mb-0">Treasure Menus</h1>
            <span className="UnderLine"></span>
            {
              isLoading ?
              <Spinner className="m-auto" /> :
              <>
                <section>
                  <div className="housing pb-5">
                    <Col className="items">
                    {
                      isLoading ?
                        <Spinner className="m-auto mt-5"/> :
                          <>
                          {
                            menus?.length > 0 ?
                              menus?.map(menu => (
                                <Link 
                                  to={`/menus/${menu?._id}`} key={menu?._id} 
                                  className="item forms DarkLemon py-2 Box"
                                  style={{textDecoration: 'none'}}
                                >
                                  <Menu menu={menu}/>
                                </Link>
                              )) :
                            <Toast className='m-auto' bg='secondary'>
                              <Toast.Body className='text-white'>
                                <p>No menu item to display at the moment. Please check back again later.</p>
                              </Toast.Body>
                            </Toast>
                          }
                          </>
                    }
                    </Col>
                  </div>
                </section>
              </>
            }
          </Row>
      </Row>
    </Container>
  )
}

export default Home