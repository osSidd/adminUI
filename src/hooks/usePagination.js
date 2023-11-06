import { useState, useEffect} from "react"

import { compare, getPages, deleteAll, deleteOne } from "../utils/functions"

export default function usePagination(noOfRows){

    const [userData, setUserData] = useState([])
    const [data, setData] = useState(userData)
    const [selectAll, setSelectAll] = useState({checked:false, bool: false, pageNo:1})
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(getPages())
    const [index, setIndex] = useState({
        start: 0,
        end: noOfRows,
    })

   
    useEffect(() => {

        async function fetchData(){
            try{
                const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')

              if(response.ok){
                    const data = await response.json()
                    const arr = data.map(item => ({...item, edit: false, selected: false}))
                    setUserData(arr)
                    setData(arr)
                }
            }catch(err){
                console.log(err)
            }
        }

        fetchData()
    }, [])


    useEffect(() => {
        setPages(getPages(userData))
    }, [userData])    


    useEffect(() => {
        setSelectAll(prev => ({
            ...prev,
            checked: prev.pageNo === currentPage ? prev.bool : false
        }))
    }, [currentPage])

    function changePage(e){

        const id = e.target.id
        const lstPgStIndex =  Math.floor(userData.length/noOfRows)*noOfRows
        const lstPgEnIndex = userData.length
        const lastPage = Math.ceil(userData.length/noOfRows)

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
                setCurrentPage(prev => prev === 1 ? 1 : prev - 1)
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
                setCurrentPage(prev => prev === lastPage ? lastPage : prev + 1)
                return
            
            case 'last':
                setIndex({
                    start: lstPgStIndex,
                    end: lstPgEnIndex,
                })
                setCurrentPage(lastPage)
                return
        }
    }

    function toggleRowCheckbox(e){
        const {checked, id} = e.target
        setUserData(prev => (prev.map(item => ({
            ...item,
            selected: item.id === id ? checked : item.selected
        }))))
    }

    function editRow(e){
        const id = e.target.id
        let temp = userData.map(item => ({...item, edit: item.id === id ? !item.edit : item.edit}))
        setUserData(temp)
        setData(temp)
    }

    function handleChange(e){
        const {id, name, value} = e.target
        let temp = userData.map(item => ({
            ...item,
            [name]: item.id === id ? value : item[name]
        }))
        setUserData(temp)
        setData(temp)
    }

    function selectData(arr, checked){
        let temp = arr.map(item => {
        const start = (currentPage-1)*noOfRows
        const end = currentPage*noOfRows
        return {
            ...item,
            selected: arr.indexOf(item) >= start && arr.indexOf(item) < end ? checked : item.selected
            }
        })
        return temp
    }

    function toggleSelectAll(e){
        const checked = e.target.checked
        setSelectAll({checked: checked, bool:checked, pageNo: currentPage})
        
        setUserData(selectData(userData, checked))
        setData(selectData(data, checked))
    }
    
    function deleteSelectedRow(e){
        const id = e.target.id

        const arr = id === 'delete' ? deleteAll(data) : deleteOne(data, id) 

        setUserData(arr)
        setData(arr)
        
        if(id === 'delete'){
            setSelectAll(prev => ({
                ...prev,
                checked:false
            }))
            return
        }
    }

    function handleSearch(e){
        const value = e.target.value

        if(value === ''){
            setUserData(data)
            return
        }else{
            setUserData(data.filter(item => compare(item.name, value) || compare(item.email, value) || compare(item.role, value)))
            // setPages(getPages(userData))
        }
    }

    return {
        userData,
        selectAll,
        currentPage,
        index,
        pages,
        changePage,
        toggleRowCheckbox,
        editRow,
        handleChange,
        toggleSelectAll,
        deleteSelectedRow,
        handleSearch
    }
}