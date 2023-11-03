import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function TableHeader(){
    
    const {dispatch} = useContext(UserContext)
    const headers = ['input', 'name', 'email', 'role', 'actions']
    
    function selectAll(e){
        const checked = e.target.checked

        dispatch({
            type: 'SELECT_ALL',
            payload: checked
        })
    }

    return(
        <thead>
            <tr>
                {
                    headers.map(header => (
                        <th key={header}>{header === 'input' ? <input onClick={selectAll} type="checkbox"/> : header}</th>
                    ))
                }
            </tr>
        </thead>
    )
}