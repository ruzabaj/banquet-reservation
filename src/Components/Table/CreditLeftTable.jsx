import React from 'react'

const CreditLeftTable = ({headers, titles, contents}) => {
    return (
        <div className='responsive-credit-table'>
            <label>{titles}</label>
            <table className='responsive'>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                {contents.map((info, index) => (
                    <tr key={index}>
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