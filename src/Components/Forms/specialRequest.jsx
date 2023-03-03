import React from 'react'
import "../../Assets/Styles/Form/specialRequest.scss";

const SpecialRequest = ({handleInputChange}) => {
    return (
        <div className='special-req'>
            <h5>Special Request</h5>
            <div className='special-req-field'>
                <textarea type="text" id="SpecialRequest" className='special-req-textarea' placeholder="Mention your special request" onChange={handleInputChange}/>
            </div>
        </div>
    )
}

export default SpecialRequest