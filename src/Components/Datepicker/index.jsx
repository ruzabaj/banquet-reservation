import React from 'react'
import DatePicker from "react-datepicker";

const DatePickerInput = ({ selectedDate, setSelectedDate }) => {
    // const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
            <DatePicker dateFromat='YYYY-MM-dd' selected={selectedDate} onChange={(date) => setSelectedDate(date)}/>
        </div>
    )
}

export default DatePickerInput