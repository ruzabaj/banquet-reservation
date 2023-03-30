import React from 'react'

const CreditLeftTable = ({headers, titles, contents}) => {
    return (
        <div className='responsive-credit-table'>
            <label>{titles}</label>
            <table>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                {contents.map((info) => (
                    <tr>
                        <td>{info.guest}</td>
                        <td>{info.guestEmail}</td>
                        <td>{info.TotalCredit}</td>
                        <td>{info.TotalPaymentMade}</td>
                        <td>{info.AdvanceAmount}</td>
                        <td>{info.RemainingAmount}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default CreditLeftTable