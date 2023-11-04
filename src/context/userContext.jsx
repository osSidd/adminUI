import React, { useReducer } from "react";
import { createContext } from "react";

export const UserContext = createContext()

function updateState(arr, state){
    return {
        ...state,
        userData: arr,
        displayData: arr.slice(state.start, state.end)
    }
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_DATA':
            return {
                ...state,
                userData: action.payload.userData,
                noOfPages: action.payload.noOfPages,
                displayData: action.payload.displayData,
                length: action.payload.length,
            }
        
        case 'CHANGE_PAGE':
            return {
                ...state,
                start: action.payload.start,
                end: action.payload.end,
                displayData: state.userData.slice(action.payload.start, action.payload.end)
            }
        
        case 'TOGGLE_SELECT':
            const arr = state.userData.map(data => ({
                ...data,
                checked: data.id === action.payload.id ? action.payload.checked : data.checked
            }))
            return updateState(arr, state)
        
        case 'SELECT_ALL':
            const temp = state.userData.map(item => ({...item, checked: parseInt(item.id) <= state.end ? action.payload : item.checked}))
            return updateState(temp, state)

        case 'UPDATE_ROW':
            const tempo = state.userData.map(item => ({...item, edit: item.id === action.payload ? !item.edit : item.edit}))
            return updateState(tempo, state)
        
        case 'HANDLE_CHANGE':
            const tempor = state.userData.map(item => ({...item, [action.payload.name]: item.id === action.payload.id ? action.payload.value : item[action.payload.name]}))
            return updateState(tempor, state)

        case 'DELETE_SELECTED':
            const tempArr = state.userData.filter(data => !data.checked && data.id !== action.payload)
            return {
                ...state,
                userData: tempArr,
                displayData: tempArr.slice(state.start, state.end),
                noOfPages: parseInt(state.userData.length/10)+1
            }
        
        case 'DELETE_ALL':
            const arra = state.userData.filter(data => !data.checked)
            return updateState(arra, state)
        
        case 'SEARCH_DATA':
            return {
                ...state,
                displayData: state.userData.filter(item => item.name.toLowerCase() === action.payload.toLowerCase() || item.email.toLowerCase() === action.payload.toLowerCase() || item.role.toLowerCase() === action.payload.toLowerCase()).slice(state.start, state.end)
            }
        
        default:
            return state        
    }
}

export default function UserContextProvider({children}){

    const [state, dispatch] = useReducer(reducer, {
        userData: [],
        noOfPages: 1,
        displayData: [],
        start:0,
        end:10,
        length:0,
    })

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}