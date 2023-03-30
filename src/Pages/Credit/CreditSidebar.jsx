import React from 'react'
import CreditSidebarTop from "./CreditSidebarTop";
import CreditSidebarBottom from "./CreditSidebarBottom";
import PaymentModal from './../../Components/Modals/PaymentModal';

const CreditSidebar = ({ customerEmail, customerPhone,
    customerType, customerVAT,
    creditDetails,
    handleOptions,
    makePayment, customerID,
    handlePay, show, handleClose,
    handleChange, 
    customersName}) => {

    return (
        <div className='credit-info'>
            <div className='credit-remaining'>
                <h5>{customersName}</h5>
                <CreditSidebarTop
                    email={customerEmail}
                    phn={customerPhone}
                    type={customerType}
                    vatno={customerVAT} />

                <CreditSidebarBottom information={creditDetails} />

                <div className='buttons'>
                    <button className='btn-pay'
                        onClick={() => makePayment(customerID)}>
                        Make Payment
                    </button>
                    <PaymentModal
                        show={show}
                        handleClose={handleClose}
                        handleChange={handleChange}
                        handleOptions={handleOptions}
                        handlePay={handlePay}
                        ids={customerID} />
                </div>
            </div>
        </div>
    )
}

export default CreditSidebar