import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPen } from "react-icons/bs";

const EditBilling = ({ show,
    name, changeName,
    email, changeEmail,
    phone, changePhone,
    address, changeAddress,
    vatno, changeVatno,
    handleCloseEditParty, handleUpdateEditParty }) => {
    return (
        <Modal
            show={show}
            onHide={handleCloseEditParty}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit <span><BsPen /></span> </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='editable-fields'>
                    <div className='edit-billing'>
                        <label>Name : </label>
                        <input type='text'
                            id='name'
                            value={name}
                            onChange={changeName} />
                        <span>Required *</span>
                    </div>
                    <div className='edit-billing'>
                        <label>Email :</label>
                        <input type='text'
                            id='email'
                            value={email}
                            onChange={changeEmail} />
                    </div>
                    <div className='edit-billing'>
                        <label>Phone : </label>
                        <input type='text'
                            id='phone'
                            value={phone}
                            onChange={changePhone} />
                    </div>
                    <div className='edit-billing'>
                        <label>Address : </label>
                        <input type='text'
                            id='address'
                            value={address}
                            onChange={changeAddress} />
                    </div>
                    <div className='edit-billing'>
                        <label>Vat no : </label>
                        <input type='text'
                            id='vatno'
                            value={vatno}
                            onChange={changeVatno} required />
                        <span>Required *</span>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditParty}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleUpdateEditParty()}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditBilling