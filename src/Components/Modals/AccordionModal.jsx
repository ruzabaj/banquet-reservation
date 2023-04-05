import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import "../../Assets/Styles/Started/edit.scss";

const AccordionModal = ({edit, editAccordion, inputChange, handleSaveEdit, handleCloseEdit,   }) => {
    return (
        <Modal show={edit}
            onHide={handleCloseEdit}
            backdrop='static'
            centered>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='edit-flex'>
                    <div>
                        <label>Time Slot : </label>
                        <input type={"text"} value={editAccordion.TimeSlot}
                            id="TimeSlot"
                            className="edit-input"
                            onChange={inputChange} />
                    </div>
                    <div>
                        <label>Reservation For Date : </label>
                        <input type={"text"}
                            value={editAccordion.reservationForDate}
                            id="reservationForDate"
                            className="edit-input"
                            onChange={inputChange} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button  onClick={handleSaveEdit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AccordionModal