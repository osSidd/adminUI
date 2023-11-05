import React, { useEffect, useState } from "react";
import './pagination.scss'

export default function Pagination({noOfRows}){  

    const [userData, setUserData] = useState([])
    const [data, setData] = useState(userData)

    const [selectAll, setSelectAll] = useState(false)

    const [pages, setPages] = useState(getPages())
    const [currentPage, setCurrentPage] = useState(1)

    console.log('hi')

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

    const [index, setIndex] = useState({
        start: 0,
        end: noOfRows,
    })

    useEffect(() => {
        setPages(getPages(userData))
    }, [userData])

    // useEffect(() => {
    //     setSelectAll(prev => ({
    //         ...prev,
    //         checked: prev.start === index.start && prev.end === index.end ? (prev.checked ? true : false) : false
    //     }))
    // }, [index])

    const headers = ['name', 'email', 'role', 'actions']

    function getPages(data=[]){
        const arr = []
        for(let i = 0; i<(Math.floor(data.length/noOfRows)+1); i++){
            arr.push(i)
        }
        return arr
    }

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

    function toggleRowCheckbox(e){
        const {checked, id} = e.target
        setUserData(prev => (prev.map(item => ({
            ...item,
            selected: item.id === id ? checked : item.selected
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

    function debounce(fn, delay){
        let timer
        return function(){
            const context = this
            const args = arguments
            clearTimeout(timer)
            timer = setTimeout(() => fn.apply(context, args), delay)
        }
    }

    function toggleSelectAll(e){
        setSelectAll(prev => !prev)
        setUserData(prev => (prev.map(item => ({
            ...item,
            selected: prev.indexOf(item) < noOfRows*currentPage ? !item.selected : item.selected 
        }))))
    }

    function compare(val1, val2){
        return val1.toLowerCase() === val2.toLowerCase()
    }

    function handleSearch(e){
        const value = e.target.value
    
        if(value === ''){
            setUserData(data)
            return
        }else{
            setUserData(data.filter(item => compare(item.name, value) || compare(item.email, value) || compare(item.role, value)))
        }
    }

    return (
        <div className="container">
            <input className="search-box" type="search" onChange={debounce(handleSearch, 750)} placeholder="search by full name, email, role"/>
            <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" checked={selectAll} onChange={toggleSelectAll}/>
                        </th>
                        {headers.map(item => <th key={item}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.length ? 
                        userData.slice(index.start, index.end).map(data => {
                            return (
                                <tr key={data.id} className={data.selected && 'selected'}>
                                    <td>
                                        <input type="checkbox" checked={data.selected} id={data.id} onChange={toggleRowCheckbox}/>
                                    </td>
                                    <td className={data.edit ? 'hide-row' : 'show-row name'}>{data.name}</td>
                                    <td className={data.edit ? 'show-row' : 'hide-row'}>
                                        <input className="edit-input" type="text" id={data.id} name="name" defaultValue={data.name} onChange={debounce(handleChange, 500)}/>
                                    </td>
                                    <td className={data.edit ? 'hide-row' : 'show-row email'}>{data.email}</td>
                                    <td className={data.edit ? 'show-row' : 'hide-row'}>
                                        <input className="edit-input" type="text" id={data.id} name="email" defaultValue={data.email} onChange={debounce(handleChange, 500)}/>
                                    </td>
                                    <td className={data.edit ? 'hide-row' : 'show-row role'}>{data.role}</td>
                                    <td className={data.edit ? 'show-row' : 'hide-row'}>
                                        <input className="edit-input" type="text" id={data.id} name="role" defaultValue={data.role} onChange={debounce(handleChange, 500)}/>
                                    </td>
                                    <td>
                                        <button id={data.id} onClick={editRow}>
                                           {data.edit 
                                            ?   <i className="icon edit fa fa-check-square-o"></i> 
                                            :   <i className=" icon edit fa fa-edit"></i>
                                            }
                                        </button>
                                        <button id={data.id} onClick={deleteSelectedRow}>
                                            <i className=" icon delete fa fa-trash-o"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) : <tr><td>No such entry</td></tr>
                    }
                </tbody>
            </table>
            </div>
            <div className="btn-container">
                
                <button id="delete" onClick={deleteSelectedRow} className="delete-selected">delete selected</button>
                
                <div className="page-btn-container">

                    <button id="first" onClick={changePage} disabled={currentPage===1?true:false} className= "page-icon page-btn">
                        <span><i className="fa fa-angle-double-left"></i></span>
                    </button>
                    
                    <button id="prev" onClick={changePage} disabled={currentPage===1?true:false} className="page-icon page-btn">
                        <span><i className="fa fa-angle-left"></i></span>
                    </button>
                    
                    {
                        pages.map(i => 
                            <button onClick={changePage} key={i+1} id="no" data-i={i} className={currentPage===(i+1)?"current-page page-btn" : "page-btn"}>
                                {i+1}
                            </button>)
                    }
                    
                    <button id="next" onClick={changePage} disabled={currentPage===(Math.ceil(userData.length/noOfRows))?true:false} className="page-icon page-btn">
                        <span><i className="fa fa-angle-right"></i></span>
                    </button>
                    
                    <button id="last" onClick={changePage} disabled={currentPage===(Math.ceil(userData.length/noOfRows))?true:false} className="page-icon page-btn">
                        <span><i className="fa fa-angle-double-right"></i></span>
                    </button>
                </div>
            </div>
        </div>
    )
}