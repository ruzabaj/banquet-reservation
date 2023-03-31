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
    const checkUndefined = (bills, dates) => {

        if (typeof bills !== "string" && !dates) {
            return "available"
        }
        if (typeof bills !== "string" && dates) {
            return "unavailable"
        }
        if (typeof bills !== undefined && dates) {
            return "payment"
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
                {dinnerFirst && dinnerFirst.map((info, index) => (
                    <td
                        className={checkUndefined(info.paymentDetails?.billno, info.date)}
                        key={index}
                    >{info.customerName}
                        <p className='pax-count'>{info.paxCount}</p>
                        {(info.paymentDetails?.RemainingAmount <= 0)?"":info.paymentDetails?.RemainingAmount}
                        {/* {info.paymentDetails?.RemainingAmount?console.log("exists"):console.log("undefined ")} */}
                    </td>
                ))}
            </tr>
            <tr>
                <th className='headings'>Hall 2</th>
                {dinnerSecond && dinnerSecond.map((info, index) => (
                    <td className={checkUndefined(info.paymentDetails?.billno, info.date)} key={index}>{info.customerName}
                        <p className='pax-count'>{info.paxCount}
                        </p>
                        {(info.paymentDetails?.RemainingAmount <= 0)?"":info.paymentDetails?.RemainingAmount}
                    </td>

                ))}
            </tr>
        </table>

    )
}

export default Availability