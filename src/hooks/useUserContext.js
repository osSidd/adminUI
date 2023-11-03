import { useContext } from "react"
import { UserContext } from "../context/userContext"

export default function useUserContext(){
    
    const {userData, noOfPages, displayData, length, start, end, dispatch} = useContext(UserContext)
        console.log( displayData)
    return {
        displayData,
        noOfPages,
        start,
        end,
        dispatch,
        length,
    }
}