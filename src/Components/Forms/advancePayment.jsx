import React from 'react'
import "../../Assets/Styles/Form/advancePayment.scss";

const AdvancePayment = () => {
  return (
    <div className='advance-field'>
      <h5>
        Advance Payment
      </h5>
      <div>
        <input type="text" className='advance-payment-input' placeholder="Advance Payment" />
      </div>
    </div>
  )
}

export default AdvancePayment