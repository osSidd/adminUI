import React from "react"
import useUserContext from "../../hooks/useUserContext"

export default function TableBody(){

    const {displayData, dispatch} = useUserContext()

    function selectRow(e){
        const {id, checked} = e.target

        dispatch({
            type: 'TOGGLE_INPUT',
            payload: {
                id,
                checked,
            }
        })
    }

    function deleteRow(e){
        dispatch({
            type: 'DELETE_SELECTED'
        })
    }

    return (
        <tbody>
            {
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
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.role}</td>
                        <td>
                            <button>edit</button>
                            <button onClick={deleteRow}>delete</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}