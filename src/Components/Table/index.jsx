import React from 'react'
import StandardDate from './../StandardDate/index';

const AccordionTable = ({ headers }) => {
    return (
        <div className='responsive-accordion-table'>
            <table>
                <tbody>
                    <tr>
                    <td className='extend-width-200'>{headers.idtblbanquetReservation}</td>
                    <td className='extend-width-200'>{headers.Name}</td>
                    <td className='extend-width-pax'>{headers.NoOfPax}</td>
                    <td className='extend-width-150'>{headers.Outlet_Name}</td>
                    <td className='extend-width-200'><StandardDate date={headers.reservationDate}/></td>
                    <td className='extend-width-200'><StandardDate date={headers.reservationForDate}/></td>
                    <td className='extend-width-150'>{headers.hall_names}</td>
                    <td>{headers.reservationState}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AccordionTable