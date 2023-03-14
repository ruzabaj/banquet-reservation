import React from 'react'
import StandardDate from './../StandardDate/index';

const AccordionTable = ({ headers }) => {
    return (
        <div className='responsive-accordion-table'>
            <table>
                <tbody>
                    <tr>
                    <td className='extend-width '>{headers.Name}</td>
                    <td>{headers.NoOfPax}</td>
                    <td>{headers.Outlet_Name}</td>
                    <td><StandardDate date={headers.reservationDate}/></td>
                    <td><StandardDate date={headers.reservationForDate}/></td>
                    <td>{headers.hall_names}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AccordionTable