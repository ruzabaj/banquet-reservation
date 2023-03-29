import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PaymentModal = ({show, handleClose, handleOptions, handleChange, handlePay, ids}) => {
    
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>Amount</label>
                    <input type="text" placeholder="Amount" onChange={handleChange}/>
                </div>
                <div>
                    <label>Payment Mode</label>
                    <select onChange={handleOptions}>
                        <option>Please select a payment mode</option>
                        <option value="Cash">Cash</option>
                        <option value="Mobile Payment">Mobile Payment</option>
                        <option value="Cheque">Cheque</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={()=>handlePay(ids)}>Pay</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PaymentModal