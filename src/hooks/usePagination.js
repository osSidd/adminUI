import { useState, useEffect} from "react"

import { compare } from "../utils/functions"
import usePageBtns from "./usePageBtns"

export default function usePagination(noOfRows){

    const [userData, setUserData] = useState([])
    const [data, setData] = useState(userData)

    const {currentPage} = usePageBtns(userData, noOfRows)

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

    const [selectAll, setSelectAll] = useState({checked:false, pageNo:1})

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

    function toggleSelectAll(e){
        setSelectAll(prev => ({checked: e.target.checked, pageNo: currentPage}))
        setUserData(prev => (prev.map(item => ({
            ...item,
            selected: prev.indexOf(item) < noOfRows*currentPage ? !item.selected : item.selected 
        }))))
    }

    function deleteSelectedRow(e){
        const id = e.target.id
        if(id === 'delete'){
            setUserData(prev => (prev.filter(item => !item.selected)))
            setSelectAll(false)
            return
        }
        setUserData(prev => (prev.filter(item => item.id !== id)))
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
        toggleRowCheckbox,
        editRow,
        handleChange,
        toggleSelectAll,
        deleteSelectedRow,
        handleSearch
    }
}