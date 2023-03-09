import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import AccordionTable from '../Table';
import "../../Assets/Styles/Accordion/accordion.scss";

const AccordionDetail = ({ detailList }) => {
    // const header = ["one", "two", "three"]

    return (
        <Accordion defaultActiveKey="0" flush className='style-accordion'>
            <div className='accordion-table-header'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>No. of PAX</th>
                            <th>Outlet Selected</th>
                            <th>Reservation Date</th>
                            <th>Reservation For Date</th>
                            <th>Hall Names</th>
                        </tr>
                    </thead>
                </table>
            </div>
            {detailList.map((accord, index) => (
                <Accordion.Item eventKey={index} key={index}>
                    {console.log("=>", accord)}
                    <Accordion.Header>

                        <AccordionTable headers={accord} />
                    </Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            ))}

        </Accordion>
    )
}

export default AccordionDetail

