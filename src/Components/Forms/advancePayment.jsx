import React, { useState } from 'react'
import "../../Assets/Styles/Form/advancePayment.scss";
import "../../Assets/Styles/Addbtn.scss";
import { AiOutlinePlus } from "react-icons/ai";
import AdvanceTableRows from './AdvanceTableRows';

const AdvancePayment = ({ showPaymentAdd, paymentData, addPaymentRows, handleAdvancedPayment, deletePaymentRows, handlePaymentChange, handleSelectChange }) => {
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
      <div style={{ display: "flex" }}>
        <h5> Advance Payment </h5>
        {/* {showPaymentAdd &&
          <div className='advance-payment-width'>
            <button className='add-icon' onClick={addPaymentRows}><AiOutlinePlus /></button>
          </div>
        } */}
      </div>
      <div className="row">
        <div className="payment-info col-lg-12 col-sm-8">
          <select onChange={handleSelectChange}>
            <option value="">Please select a payment option</option>
            <option value="Cash">Cash</option>
            <option value="Mobile Payment">Mobile Payment</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>
        {showPaymentAdd && 
        <div>
          <p>Enter Advance Payment Below</p>
          <input type='text' placeholder='amount' onChange={handleAdvancedPayment}/>
        </div>
        }
        <div className="payment-info col-lg-12 col-sm-8">
          <AdvanceTableRows paymentData={paymentData} deletePaymentRows={deletePaymentRows} handlePaymentChange={handlePaymentChange} />
        </div>
      </div>
    </div >
  )
}

export default AdvancePayment