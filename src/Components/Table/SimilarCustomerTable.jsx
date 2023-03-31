import React from 'react'

const SimilarCustomerTable = ({headers, contents, showDetail}) => {
    return (
        <div className='responsive-credit-user-table'>
            <table className='responsive'>
                <tr className='credit-header'>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                {contents.map((detail, index) => (
                    <tr key={index} tabIndex="1" className='position-sticky'
                        onClick={() => showDetail(detail.customerID, detail.customerEmail,
                            detail.customerPhone, detail.customerType, detail.customerVAT)}>
                        <td>{detail.customerEmail}</td>
                        <td>{detail.customerPhone}</td>
                        <td>{detail.customerType}</td>
                        <td>{detail.customerVAT}</td>
                        <button onClick={() => showDetail(detail.customerID, detail.customerEmail, detail.customerPhone,
                            detail.customerType, detail.customerVAT)}
                            className="btn-details">Show Detail</button>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default SimilarCustomerTable