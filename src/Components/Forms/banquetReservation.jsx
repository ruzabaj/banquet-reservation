import React  from 'react'
import "../../Assets/Styles/Form/banquetReservation.scss";

const BanquetReservation = () => {
    return (
        <section className='banquet-reservation'>
            <h5>BanquetReservation</h5>
            <div className='row banquet-reservation-info'>
                <div className='reservation-info col-lg-4'>
                    <label> Reservation Date:</label>
                    <div>
                        <input type='text' name='date' placeholder='2023-02-28' />
                    </div>
                </div>
                <div className='reservation-info col-lg-4'>
                    <label> Reservation For:</label>
                    <div>
                        <input type='text' name='date' placeholder='Shyam Kumar Sharma' />
                    </div>
                </div>
                <div className='reservation-info col-lg-4'>
                    <label>No of PAX:</label>
                    <div>
                        <input type='number' name='PAX' placeholder='500' />
                    </div>
                </div>
                <div className='reservation-info col-lg-4'>
                    <label>Time Slot:</label>
                    <div className='radio-type'>
                        <div>
                            <input type="radio" id="lunch" name="type" value="lunch" />
                            <label for="lunch">Lunch</label>
                        </div>
                        <div>
                            <input type="radio" id="Dinner" name="type" value="Dinner" />
                            <label for="Dinner">Dinner</label>
                        </div>
                        <div>
                            <input type="radio" id="Dinner" name="type" value="Dinner" />
                            <label for="Dinner">Both</label>
                        </div>
                    </div>
                </div>
                <div className='reservation-info col-lg-4'>
                    <label>Hall Selection:</label>
                    <div>
                        <input type='number' name='PAX' placeholder='Hall 1' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BanquetReservation