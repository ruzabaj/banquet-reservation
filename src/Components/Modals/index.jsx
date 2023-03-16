import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../Assets/Styles/modal.scss";

const ReactModal = ({ show, handleClose, handleTarget, message, buttonOne, buttonTwo}) => {
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='register-img'>
                        {/* <img className="register" src='./reg.png' alt='register-successfully' /> */}
                    </div>
                        <p className='reg'>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleTarget} className="modal-close">
                        {buttonOne}
                    </Button>
                    <Button onClick={handleClose} className="modal-close">
                        {buttonTwo}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReactModal