import { Card, Col, Container, Row } from "react-bootstrap";
import { COVER_IMAGE } from "../../../../settings/settings";
import Danger from './toasts/Danger';
import { Link } from "react-router-dom";
import MainCover from "./MainCover";

const Home = () => {
  const menus = [
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
  ]

  return (
    <Container fluid className="m-0 p-0" >
      <Row className="m-0 p-0">
          <MainCover />
          <Row className="mt-3 mb-5 m-auto">
            <h1 className="FedericaFont fw-2 mb-0">Treasure Menu</h1>
            <span className="UnderLine"></span>
            <Row className="m-auto">
              <Col sm={0} md={1} lg={2}></Col>
              <Col sm={12} md={10} lg={8}>
                <Row xs={1} md={2} className="g-3 d-flex justify-content-center align-items-center">
                  {menus.length > 0 ?
                    menus.map(menu => (
                      menu.dishes.length > 0 ?
                      <Col key={menu.id}>
                        <Card className="text-center">
                          <Card.Img src={menu.dishes[0].url}/>
                          <Card.ImgOverlay className='d-flex justify-content-center flex-column align-items-center'>
                            <Card.Title className="MenuName">{menu.name}</Card.Title>
                            <Link to={`/menus/${menu?.id}`} className="m-auto LinkToButton">Shop now</Link>
                          </Card.ImgOverlay>
                        </Card>
                      </Col> :
                      <></>
                    )) :
                    <Danger message={'No menu item to display at the moment. Please check back again later.'}/>
                  }
                </Row>
              </Col>
              <Col sm={0} md={1} lg={2}></Col>
            </Row>
          </Row>
      </Row>
    </Container>
  )
}

export default Home