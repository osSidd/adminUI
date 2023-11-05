import React from "react"

import './tableHeader.scss'

function TableHeader({headers, selectAll, toggleSelectAll}){
    return (
        <thead>
            <tr>
                <th>
                    <input 
                        type="checkbox" 
                        checked={selectAll.checked} 
                        onChange={toggleSelectAll}
                    />
                </th>
                {headers.map(item => <th key={item}>{item}</th>)}
            </tr>
        </thead>
    )
}

export default TableHeader