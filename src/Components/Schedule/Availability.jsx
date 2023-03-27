import React from 'react'
import classNames from "classnames";

const Availability = ({ headers, dinnerFirst, dinnerSecond }) => {
    function selectColor(status) {
        switch (status) {
            case "":
                return 'blue';
            case null:
                return 'red'
            default:
                return 'green'
        }
    }

    return (
        <table className='table-availability'>
            <th className='headings'></th>
            {headers.map((item, index) => (
                <th className='headings' key={index}>{item}</th>
            ))}
            <tr>
                <th className='headings'>Hall 1</th>
                {dinnerFirst.map((info, index) => (
                    <td
                        className={(!(info.paymentDetails?.billno)?? "payment") && info.date ? 'unavailable' : 'available'}
                        key={index}>{info.customerName}
                        <p className='pax-count'>{info.paxCount}</p>
                    </td>
                ))}
            </tr>
            <tr>
                <th className='headings'>Hall 2</th>
                {dinnerSecond.map((info, index) => (
                    <td className={info.date ? 'unavailable' : 'available'} key={index}>{info.customerName}
                        <p className='pax-count'>{info.paxCount}</p>

                    </td>
                ))}
            </tr>
        </table>

    )
}

export default Availability