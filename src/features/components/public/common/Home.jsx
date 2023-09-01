import { Carousel, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Danger from './toasts/Danger';
import { Link } from "react-router-dom";
import MainCover from "./MainCover";
import { useGetAllMenuQuery } from "../../../api/menuApi";
import { useEffect, useState } from "react";

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
                <Col sm={0} md={2} lg={3}></Col>
                <Col sm={12} md={8} lg={6} className="d-flex align-items-center justify-content-center">
                  {
                    menus.length > 0 ?
                    <Carousel>
                      {
                        menus && menus.map(menu => (
                          menu?.dishes.length > 0 ?
                          <Carousel.Item key={menu?._id}>
                            <Image 
                                src={menu?.dishes[0]?.photo} 
                                rounded
                                alt={menu?.name}
                                fluid
                            />
                            <Carousel.Caption>
                                <h3 className="MenuName">{menu?.name}</h3>
                                <Link to={`/menus/${menu?._id}`} className="m-auto LinkToButton mb-2">Shop now</Link>
                            </Carousel.Caption>
                          </Carousel.Item> :
                          <></>
                        ))
                      }
                    </Carousel> :
                    <Danger message={'No menu item to display at the moment. Please check back again later.'}/>
                  }
                </Col>
                <Col sm={0} md={2} lg={6}></Col>
              </>
            }
          </Row>
      </Row>
    </Container>
  )
}

export default Home