import React from "react";

import './App.scss'
import SearchBox from "./components/search/search";
import TableHeader from "./components/paginationTable/tableHeader/tableHeader";
import TableBody from "./components/paginationTable/tableBody/tableBody";
import PaginationBtns from "./components/paginationBtns/btns";

import ErrorBoundary from "./error/errorBoundary";

import usePagination from "./hooks/usePagination";
import usePageBtns from "./hooks/usePageBtns";

export default function App(){
    const noOfRows = 10
    const headers = ['name', 'email', 'role', 'actions']

    const {
        userData, 
        selectAll, 
        handleSearch, 
        toggleSelectAll, 
        toggleRowCheckbox, 
        handleChange, 
        editRow, 
        deleteSelectedRow
    } = usePagination(noOfRows)

    const {
        index, 
        currentPage, 
        pages, 
        changePage
    } = usePageBtns(userData, noOfRows)
   
    return (
        <div className="App">

            <ErrorBoundary>
                <SearchBox
                    handleSearch={handleSearch}
                />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <div className="table-container">
                    <table>
                        <TableHeader
                            headers={headers}
                            selectAll={selectAll}
                            toggleSelectAll={toggleSelectAll}
                        />
                        <TableBody
                            userData={userData}
                            index={index}
                            toggleRowCheckbox={toggleRowCheckbox}
                            handleChange={handleChange}
                            editRow={editRow}
                            deleteSelectedRow={deleteSelectedRow}
                        />
                    </table>
                </div>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <PaginationBtns
                    userData={userData}
                    currentPage={currentPage}
                    pages={pages}
                    changePage={changePage}
                    deleteSelectedRow={deleteSelectedRow}
                />
            </ErrorBoundary>
        </div>
    )
}