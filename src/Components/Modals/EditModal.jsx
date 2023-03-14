import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaymentTableHeader from "../Table/PaymentTableHeader";
import axios from 'axios';

const EditModal = ({ handleCloseEdit, show, rateID, pax }) => {
    
const baseUrl= process.env.REACT_APP_BASE_URL;
const headerEdit=["Rate Name", "Rate Amount", "No. Of Pax"];

const [editValues, setEditValues]=useState({
    RateName: "",
    RateAmount: "",
    NoOfPax: ""
})
const handleInputChange = (event) => {
    const {id, value}=event.target;
    setEditValues({...editValues, [id]:value})
  };

console.log(editValues, "values")
    const handleEdit = () => {
        axios.post(`${baseUrl}/rateEdit`,
            {
                idtblbanquetRate_details: `${rateID}`,
                RateName: editValues.RateName,
                RateAmount: editValues.RateAmount,
                NoOfPax: editValues.NoOfPax,
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
                <table className='edit-table'>
                    <PaymentTableHeader header={headerEdit} />
                    <tbody>
                        <tr>
                            <td><input type={"text"} value={editValues.RateName} id="RateName" placeholder={""} className="edit-input"  onChange={handleInputChange}/></td>
                            <td><input type={"text"} value={editValues.RateAmount} id="RateAmount" placeholder={""} className="edit-input" onChange={handleInputChange}/></td>
                            <td><input type={"text"} value={editValues.NoOfPax} id="NoOfPax" placeholder={pax} className="edit-input" onChange={handleInputChange}/></td>
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