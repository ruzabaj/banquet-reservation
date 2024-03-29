import React, { useState } from 'react';
import { BsPen } from "react-icons/bs";
import EditModal from '../Modals/EditModal';
import PaymentTableHeader from './PaymentTableHeader';

const PaymentTable = ({ header,
    setDetailList,
    setRateDetailList,
    setRateDetailPax,
    setRateDetailAmt,
    setPaymentList,
    rateList,
    customerID,
    reservationDate,
    id,
    date,
    reservtionID
     }) => {
    const [editShow, setEditShow] = useState(false);

    const handleCloseEdit = () => setEditShow(false);
    const handleShowEdit = () => setEditShow(true);

    const calculateTotal = (amt, pax) => {
        const total = amt * pax;
        return total;
    }
    return (
        <div className='rate-details-responsive'>
            <table>
                <PaymentTableHeader header={header} />
                <tbody>
                    {rateList.map((info, index) => (
                        <tr key={index}>
                            <td >{info.HallName}<BsPen onClick={handleShowEdit} /></td>
                            <td>{info.RateName}<BsPen onClick={handleShowEdit} /></td>
                            <td>{info.RateAmount}<BsPen onClick={handleShowEdit} /></td>
                            <td>{info.NoOfPax}<BsPen onClick={handleShowEdit} /></td>
                            <td>{calculateTotal(info.RateAmount, info.NoOfPax)}</td>
                            <EditModal
                                id={id}
                                date={date}
                                show={editShow}
                                header={header}
                                handleCloseEdit={handleCloseEdit}
                                setDetailList={setDetailList}
                                setRateDetailList={setRateDetailList}
                                setRateDetailAmt={setRateDetailAmt}
                                setRateDetailPax={setRateDetailPax}
                                rateName={info.RateName}
                                rateAmt={info.RateAmount}
                                pax={info.NoOfPax}
                                HallName={info.HallName}
                                rateID={info.idtblbanquetRate_details}
                                setPaymentList={setPaymentList}
                                customerID={customerID}
                                reservationDate={reservationDate} 
                                reservtionID={reservtionID}
                                />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default PaymentTable