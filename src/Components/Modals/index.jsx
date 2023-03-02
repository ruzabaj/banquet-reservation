import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../Assets/Styles/modal.scss";

const ReactModal = ({ show, handleClose }) => {
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='register-img'>
                        <img className="register" src='./reg.png' alt='register-successfully' />
                    </div>
                        <p className='reg'>Congratulation!! You have registerd successfully!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} className="modal-close">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReactModal