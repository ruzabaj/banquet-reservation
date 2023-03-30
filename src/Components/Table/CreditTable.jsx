import React from 'react'
import StandardDate from "../../Components/StandardDate";

const CreditTable = ({headers, contents, titles}) => {
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
                        <td>{info.billno}</td>
                        <td>{info.NoOfPax}</td>
                        <td>{info.TimeSlot}</td>
                        <td>{info.advancePayment}</td>
                        <td><StandardDate date={info.reservationDate} /></td>
                        <td><StandardDate date={info.reservationForDate} /></td>
                        <td>{info.Total}</td>
                        <td>{info.subTotal}</td>
                        <td>{info.vatAmount}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default CreditTable