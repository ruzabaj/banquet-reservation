import React, {useState} from 'react';
import { BsPen } from "react-icons/bs";
import EditModal from '../Modals/EditModal';
import PaymentTableHeader from './PaymentTableHeader';

const PaymentTable = ({ header, rateList}) => {
    const [editShow, setEditShow] = useState(false);

    const handleCloseEdit = () => setEditShow(false);
    const handleShowEdit = () => setEditShow(true);

    const calculateTotal=(amt, pax)=>{
        const total= amt*pax;
        return total;
    }
    return (
        <div className='rate-details-responsive'>
            <table>
                <PaymentTableHeader header={header}/>
                <tbody>
                {rateList.map((info)=>(
                    <tr>
                        <td >{info.HallName}</td>
                        <td>{info.RateName}<BsPen onClick={handleShowEdit}/></td>
                        <td>{info.RateAmount}<BsPen onClick={handleShowEdit}/></td>
                        <td>{info.NoOfPax}<BsPen onClick={handleShowEdit}/></td>
                        <td>{calculateTotal(info.RateAmount, info.NoOfPax)}</td>
                        <div>
                            <button className='btn-confirm'>Confirm</button>
                        </div>
                        <EditModal show={editShow} handleCloseEdit={handleCloseEdit} header={header} hall={info.HallName} pax={info.NoOfPax} rateID={info.idtblbanquetRate_details}/>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default PaymentTable