import React from 'react'
import StandardDate from "../../Components/StandardDate";

const CreditPaymentTable = ({headers, contents}) => {
    return (
        <div className='basic-information'>
            <label>Payment History</label>
            <table>
                <thead>
                    <tr>
                        {headers.map((headings, index) => (
                            <th key={index}> {headings}:</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!contents?.error && contents.map((detail, index) => (
                        <tr key={index}>
                            <td><StandardDate date={detail.paymentDatetime} /></td>
                            <td>{detail.PaymentMode}</td>
                            <td>{detail.PaymentAmount}</td>
                            <td>{detail.paymentType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CreditPaymentTable