import React from 'react'

const Availability = ({ headers, dinnerFirst, dinnerSecond }) => {
    return (
        <table className='table-availability'>
            <th className='headings'></th>
            {headers.map((item, index) => (
                <th className='headings' key={index}>{item}</th>
            ))}
            <tr>
                <th className='headings'>Hall 1</th>
                {dinnerFirst.map((info, index) => (
                    <td className={info.date ? 'unavailable' : 'available'} key={index}>{info.customerName}
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