import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { COVER_IMAGE } from "../../../../settings/settings";
import Danger from './toasts/Danger';

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
          <Row className="m-0" style={{minHeight: '35vh'}}>
            <Col sm={12} md={6} lg={5}>
              <h1 className="mt-3 p-0 d-flex justify-content-center align-items-center rounded-3">
                <Image 
                  src={`${COVER_IMAGE}`} 
                  rounded
                  fluid
                />
              </h1>
            </Col>
            <Col sm={12} md={6} lg={7}>
              <Row className="p-0 m-0 d-flex justify-content-center align-items-center">
                <h1 className="Heading text-center p-0 m-0">Eat Good, Feel<span className="TreasureText"> Treasured.</span></h1>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3 mb-5 m-auto">
            <h1 className="FedericaFont fw-2 text-center mb-5">Menu</h1>
            <Col sm={0} md={1} lg={2}></Col>
            <Col sm={12} md={10} lg={8}>
              <Row xs={1} md={2} className="g-3 d-flex justify-content-center align-items-center">
                {menus.length > 0 ?
                  menus.map(menu => (
                    menu.dishes.length > 0 ?
                    <Col key={menu.id}>
                      <Card className="text-center">
                        <Card.Img src={menu.dishes[0].url}/>
                        <Card.ImgOverlay>
                          <Card.Title>{menu.name}</Card.Title>
                          <Card.Body className="m-auto" style={{margin: 'auto'}}>
                            <Button variant="primary" className="m-auto">Shop now</Button>
                          </Card.Body>
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
    </Container>
  )
}

export default Home