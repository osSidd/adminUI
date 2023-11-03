import React from "react"
import usePageChange from "../../hooks/usePageChange"

export default function PageBtns(){

    const {noOfPages, pageNo, deleteSelected} = usePageChange()

    function pageNoBtn(){
        let btnArr = []
        
        for(let i=0; i<noOfPages; i++)
            btnArr.push(<button id={i} onClick={pageNo} key={i}>{i+1}</button>)
        
        return btnArr
    }

    return (
        <>
            <button onClick={deleteSelected}>delete selected</button>
            <button onClick={pageNo} id="first">First</button>
            <button id="prev" onClick={pageNo}>prev</button>
            { pageNoBtn() }
            <button id="next" onClick={pageNo}>next</button>
            <button onClick={pageNo} id="last">last</button>
        </>
    )
}