import React from "react";
import './search.scss'

import { debounce } from "../../utils/functions";

export default function SearchBox({handleSearch}){
    
    return (
        <input 
            className="search-box" 
            type="search" 
            onChange={debounce(handleSearch, 750)} 
            placeholder="search by full name, email, role"
        />
    )
}