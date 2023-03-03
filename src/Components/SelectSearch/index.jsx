import React from 'react'
import "../../Assets/Styles/selectSearch.scss";
import SelectSearch from 'react-select-search';

const SelectSearchInput = ({List, text, setSelectedItem}) => {
    return (
        <div>
            <SelectSearch options={List}
             placeholder={text} 
             onChange={(event) => setSelectedItem(event)}
             />
        </div>
    )
}

export default SelectSearchInput