import React from 'react'
import "../../Assets/Styles/Credit/credit.scss";
import Dropdown from 'react-bootstrap/Dropdown';

const Credit = () => {
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
                        <p>Amount : <span> Rs 1000</span></p>
                    </div>
                    <div className='credit-border-bottom'>
                        <label>Sam Colection</label>
                        <p>Amount : <span> Rs 10000</span></p>
                        <p>Payment 1 : <span> Rs 1500</span></p>
                    </div>
                </div>
            </div>
            <div className='make-credit'>
                credit layout two
            </div>
        </div>
    )
}

export default Credit