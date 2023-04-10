import React from 'react'
import classNames from "classnames";


const Availability = ({ headers, nepaliHeader, dinnerFirst, dinnerSecond }) => {
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
    // console.log(adbs.ad2bs("1990/8/10"))

    return (
        <div>
            <table className='table-availability'>
            </table>

            <table className='table-availability'>
                <thead>
                    <tr>
                        <th className='headings'></th>
                        {nepaliHeader.map((nepaliDate, index) => (
                            <th className='headings' key={index}>{nepaliDate.strDayOfWeek} {nepaliDate.year}/{nepaliDate.month}/{nepaliDate.day}</th>
                        ))}
                    </tr>
                </thead>
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
                            <p className='pax-count'>
                                {info.date ? ((info.paymentDetails?.RemainingAmount <= 0) ? "PAX : " : "Bill No : ") : ""}
                                {(info.paymentDetails?.RemainingAmount <= 0) ? info.paxCount : info.paymentDetails?.billno}
                            </p>
                            {(info.paymentDetails?.RemainingAmount <= 0) ? "" : info.paymentDetails?.RemainingAmount}
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className='headings'>Hall 2</th>
                    {dinnerSecond && dinnerSecond.map((info, index) => (
                        <td className={checkUndefined(info.paymentDetails?.billno, info.date)} key={index}>{info.customerName}
                            <p className='pax-count'>
                                {info.date ? ((info.paymentDetails?.RemainingAmount <= 0) ? "PAX : " : "Bill No : ") : ""}
                                {(info.paymentDetails?.RemainingAmount <= 0) ? info.paxCount : info.paymentDetails?.billno}</p>
                            {(info.paymentDetails?.RemainingAmount <= 0) ? "" : info.paymentDetails?.RemainingAmount}
                        </td>

                    ))}
                </tr>
            </table>
        </div>

    )
}

export default Availability