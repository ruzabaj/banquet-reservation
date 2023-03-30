import React from 'react'

const CreditSidebarTop = ({email, phn, type, vatno}) => {
    return (
        <div className='credit-border-bottom'>
            <div className='bill-list'>
                <div className='same-width'>
                    <p>Email : </p>
                    <span>{email}</span>
                </div>
                <div className='same-width'>
                    <p>Phone :</p>
                    <span>{phn}</span>
                </div>
                <div className='same-width'>
                    <p>Type :  </p>
                    <span>{type}</span>
                </div>
                <div className='same-width'>
                    <p>VAT :  </p>
                    <span>{vatno}</span>
                </div>
            </div>
        </div>
    )
}

export default CreditSidebarTop