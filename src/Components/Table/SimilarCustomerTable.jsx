import React from 'react'

const SimilarCustomerTable = ({ headers, contents, showCreditDetail }) => {
    return (
        <div className='responsive-credit-user-table'>
            <table>
                <tr className='credit-header'>
                    {similarHeader.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                {creditData.map((detail, index) => (
                    <tr key={index}
                        tabIndex="1"
                        className='position-sticky'
                        onClick={() => showCreditDetail(detail.customerID,
                            detail.customerEmail,
                            detail.customerPhone,
                            detail.customerType,
                            detail.customerVAT)}>
                        <td>{detail.customerEmail}</td>
                        <td>{detail.customerPhone}</td>
                        <td>{detail.customerType}</td>
                        <td>{detail.customerVAT}</td>
                        <button tabIndex="1"
                            onClick={() => showCreditDetail(detail.customerID,
                                detail.customerEmail,
                                detail.customerPhone,
                                detail.customerType,
                                detail.customerVAT)}
                            className="btn-details">Show Detail</button>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default SimilarCustomerTable