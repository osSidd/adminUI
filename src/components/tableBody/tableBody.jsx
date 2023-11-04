import React, { useState } from "react"
import useUserContext from "../../hooks/useUserContext"

import './tableBody.scss'

export default function TableBody(){

    const {displayData, dispatch} = useUserContext()

    function editRow(e){        
        const id = e.target.id

        dispatch({
            type: 'UPDATE_ROW',
            payload: id
        })
    }

    function handleChange(e){
        const {name, value} = e.target
        const id = e.target.dataset.id

        dispatch({
            type: 'HANDLE_CHANGE',
            payload: {
                id,
                name,
                value,
            }
        })
    }

    function selectRow(e){
        const {id, checked} = e.target

        dispatch({
            type: 'TOGGLE_SELECT',
            payload: {
                id,
                checked,
            }
        })
    }

    function deleteRow(e){
        dispatch({
            type: 'DELETE_SELECTED',
            payload: e.target.id
        })
    }

    return (
        <tbody>
            {
                displayData.length ? 
                displayData.map(data => (
                    <tr key={data.id}>
                        <td>
                            <input 
                                type="checkbox"
                                id={data.id}
                                name="check"
                                onChange={selectRow} 
                                checked={data.checked}
                            />
                        </td>
                        
                        <td className={data.edit ? 'hide-edit' : 'display-edit'}>{data.name}</td>
                        <td className={data.edit ? 'display-edit' : 'hide-edit'}>
                            <input data-id={data.id} type="text" name="name" value={data.name} onChange={handleChange}/>
                        </td>

                        <td className={data.edit ? 'hide-edit' : 'display-edit'}>{data.email}</td>
                        <td className={data.edit ? 'display-edit' : 'hide-edit'}>
                            <input data-id={data.id} type="text" name="email" value={data.email} onChange={handleChange}/>
                        </td>

                        <td className={data.edit ? 'hide-edit' : 'display-edit'}>{data.role}</td>
                        <td className={data.edit ? 'display-edit' : 'hide-edit'}>
                            <input data-id={data.id} type="text" name="role" value={data.role} onChange={handleChange}/>
                        </td>    
                        <td>
                            <button id={data.id} onClick={editRow}>{data.edit ? 'update' : 'edit'}</button>
                            <button id={data.id} onClick={deleteRow}>delete</button>
                        </td>
                    </tr>
                )) : 
                <tr>
                    <td>Entry not found</td>
                </tr>
            }
        </tbody>
    )
}