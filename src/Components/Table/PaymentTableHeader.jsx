import React from 'react'

const PaymentTableHeader = ({header}) => {
    return (
        <thead>
            <tr>
                {header.map((headings, index) => (
                    <th key={index}>{headings}</th>
                ))}
                <th></th>
            </tr>
        </thead>
    )
}

export default PaymentTableHeader