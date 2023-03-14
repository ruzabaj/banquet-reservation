import React, {useState} from 'react';
import { BsPen } from "react-icons/bs";
import EditModal from '../Modals/EditModal';
import PaymentTableHeader from './PaymentTableHeader';

const PaymentTable = ({ header }) => {
    const [editShow, setEditShow] = useState(false);

    const handleCloseEdit = () => setEditShow(false);
    const handleShowEdit = () => setEditShow(true);

    return (
        <div className='rate-details-responsive'>
            <table>
                <PaymentTableHeader header={header}/>
                <tbody>
                    <tr>
                        <td></td>
                        <td>123<BsPen onClick={handleShowEdit}/></td>
                        <td>123<BsPen onClick={handleShowEdit}/></td>
                        <td></td>
                        <div>
                            <button className='btn-confirm'>Confirm</button>
                        </div>
                    </tr>
                </tbody>
            </table>
            <EditModal show={editShow} handleCloseEdit={handleCloseEdit} header={header}/>
        </div>

    )
}

export default PaymentTable