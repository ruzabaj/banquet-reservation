import React from 'react'
import StandardDate from './../StandardDate/index';

const AccordionTable = ({ headers }) => {
    function selectColor(status) {
        switch (status) {
          case 'Started':
            return 'green';
          case 'Finalised':
            return 'purple'
          case 'Cancelled':
            return 'red'
          default:
            return ''
        }
      }
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
                    <td style={{color :selectColor(headers.reservationState)}}>{headers.reservationState}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AccordionTable