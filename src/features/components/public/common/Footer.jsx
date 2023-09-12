import { Col, Container, Row } from "react-bootstrap";
import { FaEnvelope, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getCurrentYear } from '../../../../settings/helpers'

const Footer = () => {
  return (
    <Container fluid className="Footer">
        <Row className="pt-5">
            <h3 className="p-0 m-0 text-center fw-bold">Treasure Kitchen</h3>
        </Row>
        <Row className="pt-3 m-auto">
            <Col className="d-flex justify-content-center align-items-center">
                <span className="mx-2"><Link to='/' className="LinkToText">HOME</Link></span>
                <span className="mx-2"><Link to='/about' className="LinkToText">ABOUT</Link></span>
                <span className="mx-2"><Link to='/contact' className="LinkToText">CONTACT</Link></span>
                <span className="mx-2"><Link to='/faq' className="LinkToText">FAQs</Link></span>
            </Col>
        </Row>
        <Row className="pt-3">
            <Col className="d-flex justify-content-center align-items-center">
                <a className="mx-2 LinkToText" target="_blank" rel="noreferrer" href='https://www.facebook.com/toba.ojo1'><FaFacebook size={25}/></a>
                <a className="mx-2 LinkToText" target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/toba-ojo-13439490'><FaLinkedin size={25}/></a>
                <a className="mx-2 LinkToText" target="_blank" rel="noreferrer" href='mailto:info@treasure-kitchen.com'><FaEnvelope size={25}/></a>
                <a className="mx-2 LinkToText" target="_blank" rel="noreferrer" href='https://wa.me/2348035222858'><FaWhatsapp size={25}/></a>
            </Col>
        </Row>
        <Row className="pt-5">
            <Col className="d-flex justify-content-center align-items-bottom">
                <p className="SmallFont MutedForDarkGreen">Copyright &copy; {getCurrentYear()}. All Rights Reserved.</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer