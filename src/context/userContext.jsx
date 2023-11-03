import React, { useReducer } from "react";
import { createContext } from "react";

export const UserContext = createContext()

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
        
        case 'TOGGLE_INPUT':
            const arr = state.userData.map(data => ({
                ...data,
                checked: data.id === action.payload.id ? action.payload.checked : data.checked
            }))
            return {
                ...state,
                userData: arr,
                displayData: arr.slice(state.start, state.end) 
            }
        
        case 'SELECT_ALL':
            const temp = state.userData.map(item => ({...item, checked: parseInt(item.id) <= state.end ? action.payload : item.checked}))
            return {
                ...state,
                userData: temp,
                displayData: temp.slice(state.start, state.end)
            }

        case 'DELETE_SELECTED':
            const tempArr = state.userData.filter(data => !data.checked)
            return {
                ...state,
                userData: tempArr,
                displayData: tempArr.slice(state.start, state.end),
                noOfPages: parseInt(state.userData.length/10)+1
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