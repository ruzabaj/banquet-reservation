import React from 'react'
import DatePicker from "react-datepicker";

const DatePickerInput = ({ selectedDate, setSelectedDate }) => {
    return (
        <div>
            <DatePicker dateFromat='YYYY-MM-dd' selected={selectedDate} onChange={(date) => setSelectedDate(date)}/>
        </div>
    )
}

export default DatePickerInput