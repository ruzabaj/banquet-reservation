import React from 'react'

const SubmitBtn = ({ event, handle }) => {
    return (
        <div className={event} onClick={handle}>
            <button type="submit" className='btn'>{event}</button>
        </div>

    )
}

export default SubmitBtn