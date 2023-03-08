function TableRows({ rowsData, deleteTableRows, handleChange, resHall, calculateProduct }) {

    return (
        rowsData.map((data, index) => {
            const { HallName, RateName, RateAmount, NoOfPax } = data;
            let product = data.RateAmount * data.NoOfPax;
            return (
                <tr key={index}>
                    <td>{resHall[index+1]}</td>
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