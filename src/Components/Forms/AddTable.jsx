import { useState } from "react";
import TableRows from "./TableRows";
import "../../Assets/Styles/Form/rateInfo.scss";
import "../../Assets/Styles/Addbtn.scss";
import { AiOutlinePlus } from "react-icons/ai";

function AddDeleteTableRows({ halls, rowsData, showTable, buttonRef, addTableRows, deleteTableRows, handleChange, resHall, timeSlot }) {
    return (
        <div className="">
            <div className='full-width'>
                <div className="handle-add">
                    <h5>RateInfo</h5>
                    <button 
                    className={"add-icon"}
                    disabled={showTable}
                     onClick={()=>addTableRows()} ref={buttonRef}
                    ><AiOutlinePlus /></button>
                </div>
            </div>
            <div className="row">
                <div className="rate-info col-lg-12 col-sm-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Hall</th>
                                <th>Time Slot</th>
                                <th>Rate Name</th>
                                <th>Amount</th>
                                <th>No of PAX</th>
                                <th>Total</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} halls={halls} timeSlot={timeSlot} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}
export default AddDeleteTableRows
