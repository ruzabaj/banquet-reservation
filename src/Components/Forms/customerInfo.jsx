import React from 'react'
import "../../Assets/Styles/Form/customerForm.scss";

const CustomerInfo = () => {
    return (
        <section className='customer'>
            <h5>Customer Information</h5>
            <div className='row customer-info'>
                <div className='customer-info-input col-lg-3'>
                    <label>Name</label>
                    <div>
                        <input type='text' name='name' placeholder='Ram Shrestha' />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3'>
                    <label>Address</label>
                    <div>
                        <input type='text' name='address' placeholder='kalinchok' />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3'>
                    <label>Phone</label>
                    <div>
                        <input type='text' name='address' placeholder='984113556' />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3'>
                    <label>Email</label>
                    <div>
                        <input type='text' name='address' placeholder='example@gmail.com ' />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3'>
                    <label>Country</label>
                    <div>
                        <input type='text' name='address' placeholder='Nepal' />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3'>
                    <label>Type</label>
                    <div className='radio-type'>
                        <div>
                            <input type="radio" id="individual" name="type" value="Individual" />
                            <label for="individual">Individual</label>
                        </div>
                        <div>
                            <input type="radio" id="company" name="type" value="Company" />
                            <label for="company">Company</label>
                        </div>
                    </div>
                </div>
                <div className='customer-info-input col-lg-3'>
                    <label>PAN no.</label>
                    <div>
                        <input type='number' name='pan number' placeholder='122456778' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomerInfo