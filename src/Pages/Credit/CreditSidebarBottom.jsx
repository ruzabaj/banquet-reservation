import React from 'react'

const CreditSidebarBottom = ({information}) => {
    const {TotalCredit, AdvanceAmount, TotalPaymentMade, RemainingAmount}= information
    return (
        <div className='credit-border-bottom'>
            <h5>Credit Details</h5>
            <div>
                <div className='same-width'>
                    <p>Total Credit: </p>
                    <span>{TotalCredit}</span>
                </div>
                <div className='same-width'>
                    <p>Advance Amount : </p>
                    <span>{AdvanceAmount}</span>
                </div>
                <div className='same-width'>
                    <p>Total Payment Made: </p>
                    <span>{TotalPaymentMade}</span>
                </div>
                <div className='same-width'>
                    <p>Remaining Amount: </p>
                    <span>{RemainingAmount}</span>
                </div>
            </div>
        </div>
    )
}

export default CreditSidebarBottom