import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from 'semantic-ui-react'
import React,{ useState} from "react";

const ModalView =(props)=> {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <span>

            <a style={{color: 'white',fontFamily: 'Helvetica'}} onClick={handleShow}>Read more ...</a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Actor Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="show-grid">
                            <Col xs={10} md={6}>
                                <Image wrapped size='large' src={`data:image/jpeg;base64,${props.actorImage}`} />
                            </Col>
                            <Col xs={8} md={6}>
                                <p style={{fontSize:'20px'}} className="font-weight-bold">{props.actorName}</p>
                                <p className="font-weight-bold">Date of birth: </p><p>{props.actorDateOfBirth}</p>
                                 <p className="font-weight-bold">Place of birth: </p><p>{props.actorPlaceOfBirth}</p>
                                 <p className="font-weight-bold">Short Biography: </p><p>{props.actorBiography}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
};

export default ModalView;
