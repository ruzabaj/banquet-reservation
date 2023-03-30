import React from 'react'
import "../../Assets/Styles/selectSearch.scss";
import SelectSearch from 'react-select-search';

const SelectSearchInput = ({ defaultName, List, text, setSelectedItem }) => {
    return (
        <div>
            <SelectSearch
                search
                defaultValue={defaultName}
                options={List}
                placeholder={text}
                onChange={(event) => setSelectedItem(event)}
            />
        </div>
    )
}

export default SelectSearchInput