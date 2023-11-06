import React from "react";

import './App.scss'
import SearchBox from "./components/search/search";
import TableHeader from "./components/paginationTable/tableHeader/tableHeader";
import TableBody from "./components/paginationTable/tableBody/tableBody";
import PaginationBtns from "./components/paginationBtns/btns";

import ErrorBoundary from "./error/errorBoundary";

import usePagination from "./hooks/usePagination";

export default function App(){
    const noOfRows = 10
    const headers = ['name', 'email', 'role', 'actions']

    const {
        userData, 
        selectAll, 
        index,
        currentPage,
        pages,
        changePage,
        handleSearch, 
        toggleSelectAll, 
        toggleRowCheckbox, 
        handleChange, 
        editRow, 
        deleteSelectedRow,
    } = usePagination(noOfRows)
   
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
                        {
                            !userData.length && <tfoot><tr><td>No entries</td></tr></tfoot>
                        }
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