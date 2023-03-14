import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaymentTableHeader from "../Table/PaymentTableHeader";
import axios from 'axios';

const EditModal = ({ handleCloseEdit, show, header }) => {
    const handleEdit = () => {
        axios.post(`http://banquet.silverlinepos.com/rateEdit`,
            {
                idtblbanquetRate_details: "",
                RateName: "",
                RateAmount: "",
                NoOfPax: "",
                token: "test"
            })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <Modal show={show} onHide={handleCloseEdit} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table>
                    <PaymentTableHeader header={header} />
                    <tbody>
                        <tr>
                            <td></td>
                            <td><input type={"text"} /></td>
                            <td><input type={"text"} /></td>
                            <td></td>
                            {/* <div>
                                <button className='btn-confirm'>Confirm</button>
                            </div> */}
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button onClick={handleEdit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditModal