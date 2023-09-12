import { Col, Container, Row, Spinner, Toast } from 'react-bootstrap';
import MainCover from '../common/MainCover';
import { useParams } from 'react-router-dom';
import { useGetMenuByIdQuery } from '../../../api/menuApi';
import DishForCart from '../../private/dish/DishForCart';

const MenuList = () => {
  const { id } = useParams();
  const { data: menu, isLoading } = useGetMenuByIdQuery(id);

  return (
    <Container fluid className="m-0 p-0" >
      <Row className="m-0 p-0">
          <MainCover />
          <Row className="mt-3 mb-5 m-auto m-0 p-0">
          <h1 className="FedericaFont fw-2 mb-0">{menu?.name}</h1>
            <span className="UnderLine"></span>
            <section>
              <div className="housing pb-5">
                <Col className="items">
                  {
                      isLoading ?
                      <Spinner className="m-auto mt-5"/> :
                      <>
                        {
                        menu?.dishes?.length > 0 ?
                          menu?.dishes?.map(dish => (
                            <Row key={dish?._id} className="item-2 forms py-2 m-0 p-0 mb-2 Box">
                              <DishForCart dish={dish} />
                            </Row>     
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
          </Row>
      </Row>
    </Container>
  )
}

export default MenuList