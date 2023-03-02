import React from 'react'
import "../../Assets/Styles/selectSearch.scss";
import SelectSearch from 'react-select-search';

const SelectSearchInput = ({List}) => {
    return (
        <div>
            <SelectSearch options={List}
            //  placeholder={} 
             />
        </div>
    )
}

export default SelectSearchInput