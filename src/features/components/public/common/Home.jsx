import { Carousel, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { COVER_IMAGE } from "../../../../settings/settings";
import Danger from './toasts/Danger';
import { Link } from "react-router-dom";
import MainCover from "./MainCover";

const Home = () => {
  const data = [
    {
      name: 'Africana',
      id: 1,
      dishes: [
        {
          name: 'Party Jollof',
          url: COVER_IMAGE,
          description: 'Jollof Rice',
          price: 1450.00
        },
        {
          name: 'Party Jollof',
          url: COVER_IMAGE,
          description: 'Jollof Rice',
          price: 1450.00
        },
        {
          name: 'Party Jollof',
          url: COVER_IMAGE,
          description: 'Jollof Rice',
          price: 1450.00
        }
      ]
    },
    {
      name: 'Continental',
      id: 2,
      dishes: [
        {
          name: 'Party Jollof',
          url: COVER_IMAGE,
          description: 'Jollof Rice',
          price: 1450.00
        },
        {
          name: 'Party Jollof',
          url: COVER_IMAGE,
          description: 'Jollof Rice',
          price: 1450.00
        }
      ]
    },
    {
      name: 'Orient',
      id: 3,
      dishes: [
        {
          name: 'Party Jollof',
          url: COVER_IMAGE,
          description: 'Jollof Rice',
          price: 1450.00
        }
      ]
    },
    {
      name: 'Exotic',
      id: 4,
      dishes: [
        {
          name: 'Party Jollof',
          url: COVER_IMAGE,
          description: 'Jollof Rice',
          price: 1450.00
        },
        {
          name: 'Party Jollof',
          url: COVER_IMAGE,
          description: 'Jollof Rice',
          price: 1450.00
        }
      ]
    },
    {
      name: 'Rubbish',
      id: 4,
      dishes: []
    }
  ];

  const menus = data.filter((menu) => {
    return menu.dishes.length > 0;
  });

  return (
    <Container fluid className="m-0 p-0" >
      <Row className="m-0 p-0">
          <MainCover />
          <Row className="mt-3 mb-5 m-auto">
            <h1 className="FedericaFont fw-2 mb-0">Treasure Menus</h1>
            <span className="UnderLine"></span>
            {
              false ?
              <Spinner className="m-auto" /> :
              <>
                <Col sm={0} md={2} lg={3}></Col>
                <Col sm={12} md={8} lg={6} className="d-flex align-items-center justify-content-center">
                  {
                    menus.length > 0 ?
                    <Carousel fade>
                      {
                        menus && menus.map(menu => (
                          menu?.dishes.length > 0 ?
                          <Carousel.Item>
                            <Image 
                                src={menu?.dishes[0]?.url} 
                                rounded
                                fluid
                                className="w-100"
                                alt={menu?.name}
                            />
                            <Carousel.Caption>
                                <h3 className="MenuName">{menu?.name}</h3>
                                <Link to={`/menus/${menu?.id}`} className="m-auto LinkToButton mb-2">Shop now</Link>
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