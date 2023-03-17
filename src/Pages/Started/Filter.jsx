import React from 'react'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import DatePickerInput from './../../Components/Datepicker/index';

const Filter = ({startDate, setStartDate, endDate, setEndDate, handleBtnChange, handleCustomerName, isChecked, setIsChecked, errorMessage, handleFilter}) => {
  return (
    <div className='started-filter'>
    <div className='info-reservation'>
      <Link to="/">
        <div className='style-btn-reservation'>
          <button className='btn-reservation'>Make a reservation</button>
        </div>
      </Link>
    </div>
    <div className='sort-with checkbox'>
      <div className='flex-filter-sort'>
        <div className='filter-accordions'>
          <label>Filter:</label>
          <div className='btn-radio'>
            <input type="radio" id="Started" name="state" value="Started" onChange={handleBtnChange} />
            <label > Started</label>
          </div>
          <div className='btn-radio'>
            <input type="radio" id="Finalised" name="state" value="Finalised" onChange={handleBtnChange} />
            <label >Finalised</label>
          </div>
          <div className='btn-radio'>
            <input type="radio" id="Cancelled" name="state" value="Cancelled" onChange={handleBtnChange} />
            <label > Cancelled</label>
          </div>
        </div>
        <div className='sort-accordions'>
          <label>Sort By:</label>
          <div className='sorting-input'>
            <input type="text" placeholder="Name/ Outlets" onChange={handleCustomerName} />
          </div>
        </div>
        <div className='date-range-checkbox-accordions'>
          <label> Range :</label>
          <div className='date-range-picker'>
            <div className='start-date'>
              {/* <DatePickerInput selectedDate={rangeOne} setSelectedDate={setRangeOne} /> */}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(new Date(date))}
                fixedHeight
              />
            </div>
            <div className='end-date'>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
              {/* <DatePickerInput selectedDate={rangeTwo} setSelectedDate={setRangeTwo} /> */}
            </div>
          </div>
          <div className='handle-checkbox'>
            <div className='checkbox-wrapper'>
              <input type="checkbox" id="reservation" name="reservation" value="Reservation date" onChange={() => setIsChecked(!isChecked)} />
              <label> Search by Reservation For Date</label>
            </div>
          </div>
        </div>
      </div>
      <p className='error'>{errorMessage}</p>
    </div>

    <div className='btn-filter' >
      <button className='filter' onClick={handleFilter}>Filter</button>
    </div>
  </div>
  )
}

export default Filter