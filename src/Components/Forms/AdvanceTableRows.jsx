function AdvanceTableRows({ paymentData, deletePaymentRows, handlePaymentChange }) {

    return (
        paymentData.map((data, index) => {
            const { PaymentAmount} = data;
            return (
                <div key={index} className="display-flex">
                    <div className="adv-payment"><input type="text" value={PaymentAmount} id="PaymentAmount" onChange={(evnt) => (handlePaymentChange(index, evnt))} className="advance-payment-input" /></div>
                    <div>
                        <button className="sub-icon"  onClick={() => (deletePaymentRows(index))}>x</button>
                    </div>
                </div>
            )
        })
    )
}

export default AdvanceTableRows;