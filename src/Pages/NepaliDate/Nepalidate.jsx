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
    const nepaliyearList = [{ "name": 2079, "value": 2079 }, { "name": 2080, "value": 2080 }, { "name": 2081, "value": 2081 }, { "name": 2082, "value": 2082 }, { "name": 2083, "value": 2083 }, { "name": 2084, "value": 2084 }, { "name": 2085, "value": 2085 }, { "name": 2086, "value": 2086 }, { "name": 2087, "value": 2087 }, { "name": 2088, "value": 2088 }, { "name": 2089, "value": 2089 }, { "name": 2090, "value": 2090 }, { "name": 2091, "value": 2091 }, { "name": 2092, "value": 2092 }, { "name": 2093, "value": 2093 }, { "name": 2094, "value": 2094 }, { "name": 2095, "value": 2095 }, { "name": 2096, "value": 2096 }, { "name": 2097, "value": 2097 }, { "name": 2098, "value": 2098 }, { "name": 2099, "value": 2099 }, { "name": 2100, "value": 2100 }, { "name": 2101, "value": 2101 }, { "name": 2102, "value": 2102 }, { "name": 2103, "value": 2103 }, { "name": 2104, "value": 2104 }, { "name": 2105, "value": 2105 }, { "name": 2106, "value": 2106 }, { "name": 2107, "value": 2107 }, { "name": 2108, "value": 2108 }, { "name": 2109, "value": 2109 }, { "name": 2110, "value": 2110 }, { "name": 2111, "value": 2111 }, { "name": 2112, "value": 2112 }, { "name": 2113, "value": 2113 }, { "name": 2114, "value": 2114 }, { "name": 2115, "value": 2115 }, { "name": 2116, "value": 2116 }, { "name": 2117, "value": 2117 }, { "name": 2118, "value": 2118 }, { "name": 2119, "value": 2119 }, { "name": 2120, "value": 2120 }, { "name": 2121, "value": 2121 }, { "name": 2122, "value": 2122 }, { "name": 2123, "value": 2123 }, { "name": 2124, "value": 2124 }, { "name": 2125, "value": 2125 }, { "name": 2126, "value": 2126 }, { "name": 2127, "value": 2127 }, { "name": 2128, "value": 2128 }, { "name": 2129, "value": 2129 }, { "name": 2130, "value": 2130 }, { "name": 2131, "value": 2131 }, { "name": 2132, "value": 2132 }, { "name": 2133, "value": 2133 }, { "name": 2134, "value": 2134 }, { "name": 2135, "value": 2135 }, { "name": 2136, "value": 2136 }, { "name": 2137, "value": 2137 }, { "name": 2138, "value": 2138 }, { "name": 2139, "value": 2139 }, { "name": 2140, "value": 2140 }, { "name": 2141, "value": 2141 }, { "name": 2142, "value": 2142 }, { "name": 2143, "value": 2143 }, { "name": 2144, "value": 2144 }, { "name": 2145, "value": 2145 }, { "name": 2146, "value": 2146 }, { "name": 2147, "value": 2147 }, { "name": 2148, "value": 2148 }, { "name": 2149, "value": 2149 }, { "name": 2150, "value": 2150 }, { "name": 2151, "value": 2151 }, { "name": 2152, "value": 2152 }, { "name": 2153, "value": 2153 }, { "name": 2154, "value": 2154 }, { "name": 2155, "value": 2155 }, { "name": 2156, "value": 2156 }, { "name": 2157, "value": 2157 }, { "name": 2158, "value": 2158 }, { "name": 2159, "value": 2159 }, { "name": 2160, "value": 2160 }, { "name": 2161, "value": 2161 }, { "name": 2162, "value": 2162 }, { "name": 2163, "value": 2163 }, { "name": 2164, "value": 2164 }, { "name": 2165, "value": 2165 }, { "name": 2166, "value": 2166 }, { "name": 2167, "value": 2167 }, { "name": 2168, "value": 2168 }, { "name": 2169, "value": 2169 }, { "name": 2170, "value": 2170 }, { "name": 2171, "value": 2171 }, { "name": 2172, "value": 2172 }, { "name": 2173, "value": 2173 }, { "name": 2174, "value": 2174 }, { "name": 2175, "value": 2175 }, { "name": 2176, "value": 2176 }, { "name": 2177, "value": 2177 }, { "name": 2178, "value": 2178 }, { "name": 2179, "value": 2179 }, { "name": 2180, "value": 2180 }, { "name": 2181, "value": 2181 }, { "name": 2182, "value": 2182 }, { "name": 2183, "value": 2183 }, { "name": 2184, "value": 2184 }, { "name": 2185, "value": 2185 }, { "name": 2186, "value": 2186 }, { "name": 2187, "value": 2187 }, { "name": 2188, "value": 2188 }, { "name": 2189, "value": 2189 }, { "name": 2190, "value": 2190 }, { "name": 2191, "value": 2191 }, { "name": 2192, "value": 2192 }, { "name": 2193, "value": 2193 }, { "name": 2194, "value": 2194 }, { "name": 2195, "value": 2195 }, { "name": 2196, "value": 2196 },
    { "name": 2197, "value": 2197 }, { "name": 2198, "value": 2198 },
    { "name": 2199, "value": 2199 }, { "name": 2200, "value": 2200 }]

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
        // setcurrentYearINT(`${converteddatestringyear}`);
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
                setparticularMonthScheduleArray(response?.data);
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
    const [selectedYear, setselectedYear] = useState("");
    const [yearSelected, setyearSelected] = useState(false);
    const selectedYearlist = (e) => {
        setselectedYear(e)
    }
    useEffect(() => {
        if (selectedYear) {
            setcurrentYearINT(`${selectedYear}`);
            setyearSelected(true);
        }
    }, [selectedYear])

    return (
        <div >
            <Navbar />
            <div className="d-flex justify-content-center mt-2">
            {/* nepaliyearList */}
            <SelectSearch
                    options={nepaliyearList}
                    onChange={(e) => {
                        selectedYearlist(e)
                }}
                    name="yearList"
                    placeholder="Choose the year"
                    defaultValue={selectedYear}/>
               { yearSelected && <SelectSearch
                    options={dropdownMontharray}
                    onChange={(e) => {
                    selectMonth(e)
                }}
                    name="MonthList"
                    placeholder="Choose the month"
                    defaultValue={selectedMonth}/>}
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