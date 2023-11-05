import { useState, useEffect } from "react"
import { getPages } from "../utils/functions"

export default function usePageBtns(userData, noOfRows){

    const [currentPage, setCurrentPage] = useState(1)

    const [index, setIndex] = useState({
        start: 0,
        end: noOfRows,
    })

    const [pages, setPages] = useState(getPages())

    useEffect(() => {
        setPages(getPages(userData))
    }, [userData])    

    function changePage(e){

        const id = e.target.id
        const lstPgStIndex =  Math.floor(userData.length/noOfRows)*noOfRows
        const lstPgEnIndex = userData.length
        
        switch(id){
            case 'first':
                setIndex({
                    start: 0,
                    end: noOfRows,
                })
                setCurrentPage(1)
                return
            
            case 'prev':
                setIndex(prev => ({
                    start: prev.start === 0 ? 0 : prev.start - noOfRows,
                    end: prev.end === noOfRows ? noOfRows : (prev.end === lstPgEnIndex ? lstPgStIndex : prev.end - noOfRows),
                }))
                return

            case 'no':
                const i = parseInt(e.target.dataset.i)
                setIndex({
                    start: noOfRows*i,
                    end: noOfRows*(i+1)
                })
                setCurrentPage(i+1)
                return

            case 'next':
                setIndex(prev => ({
                    start: prev.start === lstPgStIndex ? lstPgStIndex : prev.start + noOfRows,
                    end: prev.end === lstPgEnIndex ? lstPgEnIndex : prev.end + noOfRows, 
                }))
                return
            
            case 'last':
                setIndex({
                    start: lstPgStIndex,
                    end: lstPgEnIndex,
                })
                setCurrentPage(Math.ceil(userData.length/noOfRows))
                return
        }
    }

    return {
        currentPage,
        index,
        pages,
        changePage,
    }
}