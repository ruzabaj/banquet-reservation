import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ReactModal from '../../Components/Modals';
import StandardDate from "../../Components/StandardDate";

const PaymentHistory = ({ paymentList,
    customerID,
    reservationForDate,
    rateDetailAmt,
    rateDetailPax,
    reservatorID,
    setDetailList, state }) => {
    const [paymentAmt, setPaymentAmt] = useState("");
    let selectedReservationForDate = new Date(reservationForDate).toISOString().substring(0, 10);

    let baseUrl = process.env.REACT_APP_BASE_URL;

    let total = rateDetailAmt * rateDetailPax;

    const calculatVAT = () => {
        const obtainedVAT = (0.13) * total;
        const totalAfterVAT = total + obtainedVAT;
        const remainingBalance = totalAfterVAT - paymentAmt;
        const onlyVAT = obtainedVAT;
        const afterVAT = totalAfterVAT;
        const balance = remainingBalance;
        return [onlyVAT, afterVAT, balance];
    }

    //store the returned array into an array
    const [onlyVAT, afterVAT, balance] = calculatVAT();

    useEffect(() => {
        paymentList.forEach((item) => {
            setPaymentAmt(item.PaymentAmount)
        })
    }, [paymentList])

    const handleFinalise = () => {
        axios.post(`${baseUrl}/finalize`,
            {
                customerID: `${customerID}`,
                banquetreservationID: `${reservatorID}`,
                token: "test"
            })
            .then((res) => {
                // console.log(res)
            })
            .catch((error) => {
                // console.log(error)
            })

        axios.post(`${baseUrl}/getStarted`, {
            token: `test`
        })
            .then((response) => {
                setDetailList(response.data)
            })
            .catch((error) => {
                // console.log(error)
            })
    }
    const [cancelModal, setCancelModal] = useState(false);

    const handleCloseModal = () => setCancelModal(false);
    const handleShowModal = () => setCancelModal(true);

    const handleShowCancelModal = () => {
        handleShowModal();
    }

    const handleCancel = (id) => {
        if (id) {
            axios.post(`${baseUrl}/cancel`,
                {
                    customerID: `${id}`,
                    banquetreservationID: `${reservatorID}`,
                    token: "test"
                })
                .then((res) => {
                    // console.log(res)
                    handleCloseModal()
                })
                .catch((error) => {
                    // console.log(error)
                })
        }

        axios.post(`${baseUrl}/getStarted`, {
            token: `test`
        })
            .then((response) => {
                setDetailList(response.data)
            })
            .catch((error) => {
                // console.log(error)
            })
    }

    const checkNan = (sales) => {
        if (sales) {
            let value = parseFloat(sales).toLocaleString(undefined, { maximumFractionDigits: 3 });
            return value
        }
        else {
            return ""
        }
    }

    return (
        <div className='border-payment-history'>
            <div className='responsive-payment-history-table'>
                <table className='payment-history-table'>
                    <thead>
                        <tr className='position-sticky'>
                            <th>SN</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody >
                        {paymentList.map((pay, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><StandardDate date={pay.paymentDate} /></td>
                                <td>{pay.PaymentAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>

            </div>
            <div className='style-payment-footer'>
                <div className='calculations-payment'>
                    <label>Sub-Total : <span>{checkNan(total)}</span></label>
                    <label>VAT : <span>{checkNan(onlyVAT)}</span></label>
                    <label>Total : <span>{checkNan(afterVAT)}</span></label>
                    <label>Advance : <span>{checkNan(paymentAmt)}</span></label>
                    <label>Remaining Balance :<span>{checkNan(balance)}</span> </label>
                </div>
                
                {(state === "Cancelled") ? "" :
                    <div className='payment-button'>
                        <button className='btn-finalise'
                            onClick={handleFinalise}
                        >Finalise</button>
                        <button className='btn-cancel'
                            onClick={handleShowCancelModal}
                        >Cancel</button>
                    </div>
                }
                <ReactModal
                    show={cancelModal}
                    message={"Are you sure you want to cancel?"}
                    buttonOne={"Yes"}
                    buttonTwo={"No"}
                    handleTarget={() => handleCancel(customerID)}
                    handleClose={handleCloseModal}
                />
            </div>
        </div>
    )
}

export default PaymentHistory