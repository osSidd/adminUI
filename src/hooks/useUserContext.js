import { useContext } from "react"
import { UserContext } from "../context/userContext"

export default function useUserContext(){
    
    const {noOfPages, displayData, length, start, end, dispatch} = useContext(UserContext)
    
    console.log(noOfPages)

    return {
        displayData,
        noOfPages,
        start,
        end,
        dispatch,
        length,
    }
}