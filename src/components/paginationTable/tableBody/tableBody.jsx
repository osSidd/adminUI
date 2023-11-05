import React from "react"

import './tableBody.scss'

import { debounce } from "../../../utils/functions"

export default function TableBody(props){

    const {
        userData, 
        index,
        toggleRowCheckbox, 
        handleChange, 
        editRow, 
        deleteSelectedRow 
    } = props

    console.log(index)
    
    return (
        <tbody>
            {
                userData.length ?

                userData.slice(index.start, index.end).map(data => {
                    return (
                        <tr key={data.id} className={data.selected ? 'selected' : undefined}>

                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={data.selected} 
                                    id={data.id} 
                                    onChange={toggleRowCheckbox}
                                />
                            </td>
                            
                            <TableData condition={data.edit ? 'hide-row' : 'show-row name'}>
                                {data.name}
                            </TableData>
                            <TableData condition={data.edit ? 'show-row' : 'hide-row'}>
                                <EditInput
                                    name='name'
                                    id={data.id}
                                    defaultVal={data.name}
                                    onChange={debounce(handleChange, 500)}
                                />
                            </TableData>

                            <TableData condition={data.edit ? 'hide-row' : 'show-row email'}>
                                {data.email}
                            </TableData>
                            <TableData condition={data.edit ? 'show-row' : 'hide-row'}>
                                <EditInput
                                    name='email'
                                    id={data.id}
                                    defaultVal={data.email}
                                    onChange={debounce(handleChange, 500)}
                                />
                            </TableData>

                            <TableData condition={data.edit ? 'hide-row' : 'show-row role'}>
                                {data.role}
                            </TableData>
                            <TableData condition={data.edit ? 'show-row' : 'hide-row'}>
                                <EditInput
                                    name='role'
                                    id={data.id}
                                    defaultVal={data.role}
                                    onChange={debounce(handleChange, 500)}
                                />
                            </TableData>
                            
                            <td>
                                {
                                    data.edit ? 
                                    
                                    <Btn id={data.id} onClick={editRow}>
                                        <i className="icon edit fa fa-check-square-o"></i> 
                                    </Btn> :

                                    <Btn id={data.id} onClick={editRow}>
                                        <i className=" icon edit fa fa-edit"></i>
                                    </Btn>
                                }
                                <Btn id={data.id} onClick={deleteSelectedRow}>
                                    <i className=" icon delete fa fa-trash-o"></i>
                                </Btn>
                            </td>
                        </tr>
                    )
                }) : <tr><td>No entries</td></tr>
            }
        </tbody>
    )
}

function TableData({condition, children}){
    return(
        <td className={condition}>{children}</td>
    )
}

function EditInput({id, name, defaultVal, onChange}){
    return (
        <input 
            className="edit-input" 
            type="text" 
            id={id} 
            name={name} 
            defaultValue={defaultVal} 
            onChange={onChange}
        />
    )
}

function Btn({id, onClick, children}){
    return (
        <button id={id} onClick={onClick}>
            {children}
        </button>
    )
}