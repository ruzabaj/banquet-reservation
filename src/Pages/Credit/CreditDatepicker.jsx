import React from 'react'
import DatePickerInput from '../../Components/Datepicker';

const CreditDatepicker = ({ handleChange, dateOne, setDateOne, dateTwo, setDateTwo, handleFilter }) => {
    return (
        <div className='flex-datepicker'>
            <div className='dropdown-filter'>
                <label id="dropdown-basic">
                    Filter By
                </label>
                <select className='toggle-category'
                    onChange={handleChange}>
                    <option >Select an option </option>
                    <option value="All">All</option>
                    <option value="Ranged">Date Range</option>
                </select>
            </div>
            <div>
                <label>From: </label>
                <DatePickerInput
                    selectedDate={dateOne}
                    setSelectedDate={setDateOne} />
            </div>
            <div>
                <label>To : </label>
                <DatePickerInput
                    selectedDate={dateTwo}
                    setSelectedDate={setDateTwo} />
            </div>
            <button className='btn-filter-credit'
                onClick={handleFilter}>View Credit Left</button>
        </div>
    )
}

export default CreditDatepicker