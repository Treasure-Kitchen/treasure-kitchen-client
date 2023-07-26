import { Container, Row, Spinner } from 'react-bootstrap';
import MainCover from '../common/MainCover';
import TopImageCard from '../common/cards/TopImageCard';
import { useParams } from 'react-router-dom';
import { useGetMenuByIdQuery } from '../../../api/menuApi';

const MenuList = () => {
    const { id } = useParams();
    const { data: menu, isLoading } = useGetMenuByIdQuery(id);

  return (
    <Container fluid className="m-0 p-0" >
      <Row className="m-0 p-0">
          <MainCover />
          <Row className="mt-3 mb-5 m-auto">
            {
                isLoading ?
                <Spinner className='m-auto'/> :
                <>
                    <h1 className="FedericaFont fw-2 mb-0">{menu?.name}</h1>
                    <span className="UnderLine"></span>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-3 m-auto d-flex justify-content-center align-items-center">
                      {
                        menu.dishes.length > 0 ?
                        menu.dishes.map(dish => (
                          <TopImageCard key={dish?._id} dish={dish}/>
                        )) :
                        <></>
                      }
                    </Row>
                </>
            }
          </Row>
      </Row>
    </Container>
  )
}

export default MenuList