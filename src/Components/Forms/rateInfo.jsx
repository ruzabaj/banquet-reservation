import React, { useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import "../../Assets/Styles/Addbtn.scss";
import "../../Assets/Styles/Form/rateInfo.scss";

const RateInfo = ({ halls }) => {
    // const [pax, setPax] = useState("");
    // const [amount, setAmount] = useState("");
    // const handleAmount=(event)=>{
    //     setAmount(event.target.value)
    // }
    // const handlePAX=(event)=>{
    //     setPax(event.target.value)
    // }
    // let total=pax*amount
    // console.log(pax, "here PAX")
    // console.log(amount, "here amount")

    const handleRow = () => {
        console.log("clicked handle row")
    }

    return (
        <div className='rate-info-section'>
            <div className='full-width'>
                <div className="handle-add">
                    <h5>RateInfo</h5>
                    <button className='add-icon' onClick={handleRow}><AiOutlinePlus /></button>
                </div>
            </div>
            {/* <div className='rate-info'>
                <table>
                    <thead>
                        <tr>
                            <th>Hall</th>
                            <th>Rate Name</th>
                            <th>Amount</th>
                            <th>No of PAX</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='individual-row'>
                            <td> {halls} </td>
                            <td> <input type='text' placeholder='250' className='rate-info-input' /></td>
                            <td> <input type='text' placeholder='1' className='rate-info-input' onChange={handleAmount}/></td>
                            <td> <input type='text' placeholder='1000' className='rate-info-input' onChange={handlePAX}/></td>
                            <td> {total}</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
        </div>
    )
}

export default RateInfo