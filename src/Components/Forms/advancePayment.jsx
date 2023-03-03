import React, { useState } from 'react'
import "../../Assets/Styles/Form/advancePayment.scss";
import "../../Assets/Styles/Addbtn.scss";
import { AiOutlinePlus } from "react-icons/ai";
import AdvanceTableRows from './AdvanceTableRows';

const AdvancePayment = ({paymentData, addPaymentRows, deletePaymentRows, handlePaymentChange}) => {
  // const todayDate = new Date().toISOString().substring(0, 10);
  // const [rowsData, setRowsData] = useState([]);

  // const addTableRows = () => {
  //   const rowsInput = {
  //     PaymentAmount: '',
  //     paymentDate: todayDate,
  //   }
  //   setRowsData([...rowsData, rowsInput])
  // }

  // const deleteTableRows = (index) => {
  //   const rows = [...rowsData];
  //   rows.splice(index, 1);
  //   setRowsData(rows);
  // }

  // const handleChange = (index, evnt) => {
  //   const { id, value } = evnt.target;
  //   const rowsInput = [...rowsData];
  //   rowsInput[index][id] = value;
  //   setRowsData(rowsInput);
  //   console.log("now row input", rowsInput)
  // }

  return (
    <div className='advance-field'>
      <h5> Advance Payment </h5>
      <div className='advance-payment-width'>
        <button className='add-icon' onClick={addPaymentRows}><AiOutlinePlus /></button>
      </div>
      <div className="row">
        <div className="rate-info col-lg-12 col-sm-8">
          <AdvanceTableRows paymentData={paymentData} deletePaymentRows={deletePaymentRows} handlePaymentChange={handlePaymentChange} />
        </div>
      </div>
    </div >
  )
}

export default AdvancePayment