function TableRows({ rowsData, halls, deleteTableRows, handleChange,  timeSlot }) {

    return (
        rowsData.map((data, index) => {
            const { RateName, RateAmount, NoOfPax } = data;
            let product = data.RateAmount * data.NoOfPax;
            return (
                <tr key={index}>
                    <td value={halls} id="HallName">{halls}</td>
                    <td>{timeSlot}</td>
                    <td><input type="text" value={RateName} id="RateName" onChange={(evnt) => (handleChange(index, evnt))} className="form-control" /> </td>
                    <td><input type="text" value={RateAmount} id="RateAmount" onChange={(evnt) => (handleChange(index, evnt))} className="form-control" /></td>
                    <td><input type="text" value={NoOfPax} id="NoOfPax" onChange={(evnt) => (handleChange(index, evnt))} className="form-control" /> </td>
                    <td>{product}</td>
                    <td><button className="btn-delete" onClick={() => (deleteTableRows(index))}>x</button></td>
                </tr>
            )
        })
    )
}

export default TableRows;