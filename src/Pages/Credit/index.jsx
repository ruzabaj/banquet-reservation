import React from 'react'
import "../../Assets/Styles/Credit/credit.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import { Steps } from 'antd';
import { AiOutlineSearch } from "react-icons/ai";
import DatePickerInput from '../../Components/Datepicker';

const Credit = () => {
    const description = 'This is a description.';
    return (
        <div className='credit-page'>
            <div className='credit-info'>
                <h5>Credit Summary</h5>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        Options
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Cash</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Credit Card</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className='credit-remaining'>
                    <div className='credit-border-bottom'>
                        <label>Greta Colection</label>
                        <div className='same-width'>
                            <p>Amount : </p>
                            <span> Rs 10000</span>
                        </div>
                    </div>
                    <div className='credit-border-bottom'>
                        <label>Sam Colection</label>
                        <div className='same-width'>
                            <p>Amount : </p>
                            <span> Rs 10000</span>
                        </div>
                        <div className='same-width'>
                            <p>Payment 1 : </p>
                            <span>Rs 1500</span>
                        </div>
                    </div>
                </div>
                <div className='show-calculation'>
                    <div className='same-width'>
                        <p>Total : </p>
                        <span> Rs 10000</span>
                    </div>
                </div>
                <button className='btn-pay'>Make Payment</button>
                <button className='btn-cancel'>Cancel Payment</button>
            </div>
            <div className='make-credit'>
                {/* credit layout two */}
                {/* <Steps
                    direction="vertical"
                    current={0}
                    items={[
                        {
                            title: 'Cash',
                            description,
                        },
                        {
                            title: 'Credit',
                            description,
                        },
                        {
                            title: 'Mobile Payment',
                            description,
                        },
                    ]}
                /> */}
                <div className='background-credit'>
                <label>Filter : </label>
                <div className='custom-filter'>

                    <div className='input-search'>
                        <span className='eyeglass-icon'><AiOutlineSearch /></span>
                        <input type="text" placeholder="Search" className='filter-search' />
                        <span className='text-search'>Search</span>
                    </div>
                    
                    

                    <Dropdown className='toggle-category'>
                        <Dropdown.Toggle id="dropdown-basic">
                            Filter by Categories
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Cash</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Credit Card</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <Dropdown className='toggle-category'>
                        <Dropdown.Toggle id="dropdown-basic">
                            Type
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Cash</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Credit Card</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    <button className='btn-filter'>Filter</button>
                </div>
                <div className='flex-datepicker'>
                        <div>
                            <label>Start Date: </label>
                            <DatePickerInput />
                        </div>
                        <div>
                            <label>End Date : </label>
                            <DatePickerInput />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Credit