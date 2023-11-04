import React, { useContext, useRef, useState } from "react"
import useUserContext from "../../hooks/useUserContext"

export default function Searchpanel(){

    const searchRef = useRef('')
    const {dispatch} = useUserContext()

    function debounce(fn){    
        let timer
        return function(){
            clearTimeout(timer)
            timer = setTimeout(() => fn.apply(this), 500)
        }    
    }

    function searchData(){
        
        dispatch({
            type: 'SEARCH_DATA',
            payload: searchRef.current.value,
        })
    }

    return(
        <div>
            <input ref={searchRef} onChange={debounce(searchData)} placeholder="search by name, email or role"/>
        </div>
    )
}