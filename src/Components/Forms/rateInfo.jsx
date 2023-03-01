import React from 'react'
import "../../Assets/Styles/Form/rateInfo.scss";

const RateInfo = () => {
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
                        <tr>
                            <td> <input type='text'  placeholder='1' /></td>
                            <td> <input type='text'  placeholder='250' /></td>
                            <td> <input type='text'  placeholder='1' /></td>
                            <td> <input type='text'  placeholder='1000' /></td>
                            <td> <input type='text'  placeholder='' /></td>
                        </tr>
                        <tr>
                            <td> <input type='text'  placeholder='1' /></td>
                            <td> <input type='text'  placeholder='250' /></td>
                            <td> <input type='text'  placeholder='1' /></td>
                            <td> <input type='text'  placeholder='1000' /></td>
                            <td> <input type='text'  placeholder='' /></td>
                        </tr>
                        <tr>
                            <td> <input type='text'  placeholder='1' /></td>
                            <td> <input type='text'  placeholder='250' /></td>
                            <td> <input type='text'  placeholder='1' /></td>
                            <td> <input type='text'  placeholder='1000' /></td>
                            <td> <input type='text'  placeholder='' /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RateInfo