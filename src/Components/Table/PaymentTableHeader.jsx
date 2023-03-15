import React from 'react'

const PaymentTableHeader = ({header}) => {
    return (
        <thead>
            <tr>
                {header.map((headings, index) => (
                    <th key={index}>{headings}</th>
                ))}
            </tr>
        </thead>
    )
}

export default PaymentTableHeader