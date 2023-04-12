import { Calendar } from 'rc-nepali-calendar';
// import NepaliDate from 'nepali-date-converter';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from "../../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import { ADToBS, BSToAD, findLastDayOfMonthOfAdDate, findLastDayOfMonthOfBsDate } from "ad-bs-date-conversion";
import "../../Assets/Styles/Availability/availability.scss";

function Nepalidate() {
    const nepaliMonthhash = {
        '01': 'Baishakh',
        '02': 'Jestha',
        '03': 'Ashadh',
        '04': 'Sharawan',
        '05': 'Bhadra',
        '06': 'Ashwin',
        '07': 'Kartik',
        '08': 'Mangsir',
        '09': 'Poush',
        '10': 'Magh',
        '11': 'Falgun',
        '12': 'Chaitra'
    };
    const nepaliMonthhashReverse = {
        'Baishakh': '01',
        'Jestha': '02',
        'Ashadh': '03',
        'Sharawan': '04',
        'Bhadra': '05',
        'Ashwin': '06',
        'Kartik': '07',
        'Mangsir': '08',
        'Poush': '09',
        'Magh': '10',
        'Falgun': '11',
        'Chaitra': '12'
    }
    const nepaliEnglishMonths = {
        "Baishakh": "बैशाख",
        "Jestha": "जेठ",
        "Ashadh": "असार",
        "Sharawan": "श्रावण",
        "Bhadra": "भदौ",
        "Ashwin": "आश्विन",
        "Kartik": "कार्तिक",
        "Mangsir": "मङ्सिर",
        "Poush": "पौष",
        "Magh": "माघ",
        "Falgun": "फाल्गुन",
        "Chaitra": "चैत्र"
    };

    const [token,
        setToken] = useState("");
    let navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        let tokenCheck = localStorage.getItem("tokens");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("tokens"))
        }
    }, []);

    const dropdownMontharray = [
        {
            name: 'Baishakh',
            value: 'Baishakh'
        }, {
            name: 'Jestha',
            value: 'Jestha'
        }, {
            name: 'Ashadh',
            value: 'Ashadh'
        }, {
            name: 'Sharawan',
            value: 'Sharawan'
        }, {
            name: 'Bhadra',
            value: 'Bhadra'
        }, {
            name: 'Ashwin',
            value: 'Ashwin'
        }, {
            name: 'Kartik',
            value: 'Kartik'
        }, {
            name: 'Mangsir',
            value: 'Mangsir'
        }, {
            name: 'Poush',
            value: 'Poush'
        }, {
            name: 'Magh',
            value: 'Magh'
        }, {
            name: 'Falgun',
            value: 'Falgun'
        }, {
            name: 'Chaitra',
            value: 'Chaitra'
        }
    ];
    const [currentYearINT,
        setcurrentYearINT] = useState("");
    const [currentMonthINT,
        setcurrentMonthINT] = useState("");
    const [selectedMonth,
        setselectedMonth] = useState("");
    const [dateSelectedState,
        setdateSelectedState] = useState(false);
    const [calendarStartDate,
        setcalendarStartDate] = useState("2080-01-01");

    const selectMonth = (monthname) => {
        setparticularErrorState(false);
        setentireMonthErrorState(false);
        setallMonthSelectedState(false);
        setselectParticularDateState(false);
        let currentDate = new Date()
            .toISOString()
            .slice(0, 10);
        let convertedDate = ADToBS(currentDate);

        setshowCalendar(false);
        let converteddatestringyear = parseInt(convertedDate.slice(0, 4));
        let converteddatestringmonth = parseInt(nepaliMonthhashReverse[monthname]);
        let formattedconverteddatestringmonth;
        converteddatestringmonth < 10
            ? formattedconverteddatestringmonth = `0${converteddatestringmonth}`
            : formattedconverteddatestringmonth = converteddatestringmonth;
        setcurrentMonthINT(`${formattedconverteddatestringmonth}`);
        setcurrentYearINT(`${converteddatestringyear}`);
        setselectedMonth(monthname);
        let calendarstart = `${converteddatestringyear}-${nepaliMonthhashReverse[monthname]}-01`;
        calendarstart = new Date(BSToAD(calendarstart));
        setcalendarStartDate(calendarstart);
    }
    useEffect(() => {
        if (selectedMonth) {
            setdateSelectedState(true);
        }
    }, [selectedMonth]);
    const [selectParticularDateState,
        setselectParticularDateState] = useState(false);
    const [allMonthSelectedState,
        setallMonthSelectedState] = useState(false);
    const particularDateSelected = () => {
        setshowCalendar(true);
        setselectParticularDateState(true);
        setallMonthSelectedState(false);
    };
    const [particularDateDataLoaded,
        setparticularDateDataLoaded] = useState(false);
    const [entireMonthScheduleArray,
        setentireMonthScheduleArray] = useState([]);
    const [particularMonthScheduleArray,
        setparticularMonthScheduleArray] = useState([]);
    const [selectedParticularMonth,
        setselectedParticularMonth] = useState("");
    const [showCalendar,
        setshowCalendar] = useState(false);
    const [particularErrorDetails,
        setparticularErrorDetails] = useState("");
    const [particularErrorState,
        setparticularErrorState] = useState(false);
    const [entireMonthErrorDetails,
        setentireMonthErrorDetails] = useState("");
    const [entireMonthErrorState,
        setentireMonthErrorState] = useState(false);

    const handleDatechange = (ad, bs) => {
        setparticularErrorState(false);
        setparticularDateDataLoaded(false);
        let { bsDate, bsMonth, bsYear } = bs;
        bsDate < 10
            ? bsDate = `0${bsDate}`
            : bsDate = bsDate
        bsMonth < 10
            ? bsMonth = `0${bsMonth}`
            : bsMonth = bsMonth
        let bsendTime = `${bsYear}-${bsMonth}-${bsDate}`;
        setselectedParticularMonth(bsendTime);
        // let bsstartdate = `${bsYear}-${bsMonth}-01`; let nepaliMonthinEnglish =
        // nepaliMonthhash[bsMonth]; console.log(nepaliMonthinEnglish) let
        // EnglishNepaliMonthinNepali = nepaliEnglishMonths[nepaliMonthinEnglish]
        // console.log(bsstartdate, bsendTime, nepaliMonthinEnglish,
        // EnglishNepaliMonthinNepali);

        axios
            .post(`${baseUrl}/schedulewithMiti`, {
                token: `${token}`,
                yearMonth: `${bsendTime}`,
                typeRange: `PARTICULAR`
            })
            .then((response) => {
                setparticularMonthScheduleArray(response
                    ?.data);
                setshowCalendar(false);
                setparticularDateDataLoaded(true);
            })
            .catch((error) => {
                setparticularErrorDetails("No data available.");
                setshowCalendar(false);
                setparticularErrorState(true);
                setentireMonthErrorState(false);
            });
    };

    const entireMonthSelected = () => {
        setentireMonthErrorState(false);
        setparticularErrorState(false);
        setparticularDateDataLoaded(false);
        setselectParticularDateState(false);
        setallMonthSelectedState(true);
        if (currentYearINT && currentYearINT !== "" && currentMonthINT && currentMonthINT !== "") {
            let entireMonthString = `${currentYearINT}-${currentMonthINT}`;
            axios
                .post(`${baseUrl}/schedulewithMiti`, {
                    token: `${token}`,
                    yearMonth: `${entireMonthString}`,
                    typeRange: `ALL`
                })
                .then((response) => {
                    let responsearray = response
                        ?.data;
                    responsearray = responsearray.sort(function (a, b) {
                        return new Date(a.reservationMitiFor) - new Date(b.reservationMitiFor)
                    });
                    setentireMonthScheduleArray(responsearray);
                })
                .catch((error) => {
                    setshowCalendar(false);
                    setentireMonthErrorState(true);
                    setentireMonthErrorDetails("No data available.");
                    setparticularErrorState(false);
                });
        };
    }

    useEffect(() => {
        if (entireMonthScheduleArray && entireMonthScheduleArray.length > 0) {
            let newsortedArraywithDateorder = entireMonthScheduleArray.sort(function (a, b) {
                return new Date(a.reservationForDate) - new Date(b.reservationForDate)
            });

        }
    }, [entireMonthScheduleArray])

    const parseDateObject = (datestring) => {
        let a = new Date(datestring)
            .toISOString()
            .slice(0, 10);
        return a;
    }
    return (
        <div >
            <Navbar />
            <div className="d-flex justify-content-center mt-2">

                <SelectSearch
                    options={dropdownMontharray}
                    onChange={(e) => {
                        selectMonth(e)
                    }}
                    name="MonthList"
                    placeholder="Choose the month"
                    defaultValue={selectedMonth} />
            </div>

            {dateSelectedState &&
                <div className="">
                    <div className="selectbuttons">
                        <button type="button" className="btn btn-danger" onClick={entireMonthSelected}>Entire Month</button>
                        <button type="button" className="btn btn-info" onClick={particularDateSelected}>Select Date</button>
                    </div>

                    {!entireMonthErrorState && allMonthSelectedState && 
                    <div className="entireMonthselectedDiv">
                        <div className="monthly">
                            <div className="selectedmonthname">
                                {selectedMonth}
                            </div>
                            <div className="monthlytable">
                                <div className='table-responsive text-nowrap'>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ReservationID</th>
                                                <th>Name</th>
                                                <th>reservationMitiFor</th>
                                                <th>Pax</th>
                                                <th>reservationForDate</th>
                                                <th>reservationDate</th>
                                                <th>reservationMiti</th>
                                                <th>Timeslot</th>
                                                <th>PaymentStauts</th>
                                                <th>Billno</th>
                                                <th>TotalDue</th>
                                                <th>
                                                    <div className="col-1">
                                                        <small>
                                                            Payment
                                                        </small>
                                                        <small className='text-muted'>(Excluding Advance)</small>
                                                    </div>
                                                </th>
                                                <th>AdvanceAmount</th>
                                                <th>RemainingAmount</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {entireMonthScheduleArray.map((info, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{info.banquetReservationID || ""}</th>
                                                        <td>{info.customerName || ""}</td>
                                                        <td>{info.reservationMitiFor || ""}</td>
                                                        <td>{info.paxCount || ""}</td>
                                                        <td>{parseDateObject(info.reservationForDate) || ""}</td>
                                                        <td>{parseDateObject(info.reservationDate) || ""}</td>
                                                        <td>{info.reservationMiti || ""}</td>
                                                        <td>{info.timeslot || ""}</td>
                                                        <td>{info.paymentStauts === "None"
                                                            ? "No payment yet"
                                                            : info.paymentStauts || "No payment made"}</td>
                                                        <td>{info
                                                            ?.paymentDetails
                                                            ?.billno || "Not billed"}</td>
                                                        <td>{info
                                                            ?.paymentDetails
                                                            ?.TotalCredit || ""}</td>
                                                        <td>{info
                                                            ?.paymentDetails
                                                            ?.TotalPaymentMade || ""}</td>
                                                        <td>{info
                                                            ?.paymentDetails
                                                            ?.AdvanceAmount || ""}</td>
                                                        <td>{info
                                                            ?.paymentDetails
                                                            ?.RemainingAmount || ""}</td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>
                    </div>
                    }
                    {entireMonthErrorState && <div className="monthlyerror d-flex justify-content-center mt-5">
                        {entireMonthErrorDetails}
                    </div>}
                    {showCalendar && selectParticularDateState && <div className="d-flex justify-content-center mt-5">
                        <Calendar
                            defaultDate={new Date(calendarStartDate)}
                            onChange={(ad, bs) => handleDatechange(ad, bs)} />

                    </div>
                    }
                    {selectParticularDateState && particularDateDataLoaded && <div className="particulardateDataLoaded">

                        <div className="container">
                            <div className="particularMonth">
                                {selectedParticularMonth}
                            </div>

                        </div>

                        <div className='table-responsive text-nowrap'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ReservationID</th>
                                        <th>Name</th>
                                        <th>reservationMitiFor</th>
                                        <th>Pax</th>
                                        <th>reservationForDate</th>
                                        <th>reservationDate</th>
                                        <th>reservationMiti</th>
                                        <th>Timeslot</th>
                                        <th>PaymentStauts</th>
                                        <th>Billno</th>
                                        <th>TotalDue</th>
                                        <th>
                                            <div className="col-1">
                                                <small>
                                                    Payment
                                                </small>
                                                <small className='text-muted'>(Excluding Advance)</small>
                                            </div>
                                        </th>
                                        <th>AdvanceAmount</th>
                                        <th>RemainingAmount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {particularMonthScheduleArray.map((info, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{info.banquetReservationID || ""}</th>
                                                <td>{info.customerName || ""}</td>
                                                <td>{info.reservationMitiFor || ""}</td>
                                                <td>{info.paxCount || ""}</td>
                                                <td>{parseDateObject(info.reservationForDate) || ""}</td>
                                                <td>{parseDateObject(info.reservationDate) || ""}</td>
                                                <td>{info.reservationMiti || ""}</td>
                                                <td>{info.timeslot || ""}</td>
                                                <td>{info.paymentStauts === "None"
                                                    ? "No payment yet"
                                                    : info.paymentStauts || "No payment made"}</td>
                                                <td>{info
                                                    ?.paymentDetails
                                                    ?.billno || "Not billed"}</td>
                                                <td>{info
                                                    ?.paymentDetails
                                                    ?.TotalCredit || ""}</td>
                                                <td>{info
                                                    ?.paymentDetails
                                                    ?.TotalPaymentMade || ""}</td>
                                                <td>{info
                                                    ?.paymentDetails
                                                    ?.AdvanceAmount || ""}</td>
                                                <td>{info
                                                    ?.paymentDetails
                                                    ?.RemainingAmount || ""}</td>
                                            </tr>
                                        )
                                    })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    }
                    {particularErrorState && <div className='d-flex justify-content-center mt-5 particularerror'>
                        {particularErrorDetails}
                    </div>}
                </div>
            }

        </div>
    )
}

export default Nepalidate