import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import "../../Assets/Styles/Form/rateInfo.scss";

const RateInfo = () => {
    const handleRow=()=>{
        console.log("clicked handle row")
    }
    return (
        <div className='rate-info-section'>
            <h5>RateInfo</h5>
            <div className='rate-info'>
                <table>
                    <thead>
                        <tr>
                            <th>Hall</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            <th>No of PAX</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='individual-row'>
                            <td> <input type='text'  placeholder='1' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='250' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='1' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='1000' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='' className='rate-info-input'/></td>
                        </tr>
                        <tr className='individual-row'>
                            <td> <input type='text'  placeholder='1' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='250' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='1' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='1000' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='' className='rate-info-input'/></td>
                        </tr>
                        <tr className='individual-row'>
                            <td> <input type='text'  placeholder='1' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='250' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='1' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='1000' className='rate-info-input'/></td>
                            <td> <input type='text'  placeholder='' className='rate-info-input'/></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleRow}><AiOutlinePlus/></button>
            </div>
        </div>
    )
}

export default RateInfo