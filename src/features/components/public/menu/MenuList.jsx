import { Container, Row, Spinner } from 'react-bootstrap';
import MainCover from '../common/MainCover';
import { COVER_IMAGE } from '../../../../settings/settings';
import TopImageCard from '../common/cards/TopImageCard';

const MenuList = () => {
    const menu = {
        name: 'Africana',
        id: 1,
        dishes: [
          {
            _id: 1,
            name: 'Party Jollof',
            url: COVER_IMAGE,
            description: 'I am party rider',
            price: 1450.00
          },
          {
            _id: 2,
            name: 'Fried Rice',
            url: COVER_IMAGE,
            description: 'It will return a substring containing the first 250 characters of item.description (or the whole string if its shorter than 250 chars',
            price: 1450.00
          },
          {
            _id: 3,
            name: 'Ghana Jollof',
            url: COVER_IMAGE,
            description: 'It will return a substring containing the first 250 characters of item.description (or the whole string if its shorter than 250 chars',
            price: 1450.00
          },
          {
            _id: 4,
            name: 'White Rice',
            url: COVER_IMAGE,
            description: 'It will return a substring containing the first 250 characters of item.description (or the whole string if its shorter than 250 chars',
            price: 1450.00
          },
          {
            _id: 5,
            name: 'Coconut Rice',
            url: COVER_IMAGE,
            description: 'It will return a substring containing the first 250 characters of item.description (or the whole string if its shorter than 250 chars',
            price: 1450.00
          }
        ]
      }

  return (
    <Container fluid className="m-0 p-0" >
      <Row className="m-0 p-0">
          <MainCover />
          <Row className="mt-3 mb-5 m-auto">
            {
                false ?
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