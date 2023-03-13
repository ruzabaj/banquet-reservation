import React from 'react';

const PaymentTable = ({ header }) => {
    return (
            <div className='rate-details-responsive'>
                <table>
                    <thead>
                        <tr>
                            {header.map((headings, index) => (
                                <td key={index}>{headings}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
            
    )
}

export default PaymentTable