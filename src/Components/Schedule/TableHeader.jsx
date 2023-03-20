import React from 'react'
import moment from 'moment';

const TableHeader = () => {
    var date = moment();

    let calculateNextDays = (num) => {
        let tomorrow = date.add(num, 'days');
        let resultDays = tomorrow.format('dddd')
        let result = tomorrow._d.toISOString().substring(0, 10)
        return [resultDays, result]
    }

    return (
            <thead>
                <tr>
                    <th></th>
                    <th>{calculateNextDays()}</th>
                    <th>{calculateNextDays(1)}</th>
                    <th>{calculateNextDays(1)}</th>
                    <th>{calculateNextDays(1)}</th>
                    <th>{calculateNextDays(1)}</th>
                    <th>{calculateNextDays(1)}</th>
                    <th>{calculateNextDays(1)}</th>
                </tr>
            </thead>
    )
}

export default TableHeader