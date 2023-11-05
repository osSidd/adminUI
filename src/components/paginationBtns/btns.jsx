import React from "react"

import './btns.scss'

export default function PaginationBtns({userData, currentPage, pages, changePage, deleteSelectedRow}){
    
    const noOfPages = Math.ceil(userData.length/10)

    return (
        <div className="btn-container">
                
                <button 
                    id="delete" 
                    onClick={deleteSelectedRow} 
                    className="delete-selected"
                >
                    delete selected
                </button>
                
                <div className="page-btn-container">

                    <Button
                        id="first" 
                        onClick={changePage} 
                        disabledCondition={currentPage === 1} 
                        className="page-icon page-btn"
                        icon="fa fa-angle-double-left"                        
                    />

                    <Button
                        id="prev" 
                        onClick={changePage} 
                        disabledCondition={currentPage === 1} 
                        className="page-icon page-btn"
                        icon="fa fa-angle-left"                        
                    />
                    
                    {
                        pages.map(i => 
                            <button 
                                onClick={changePage} 
                                key={i+1} 
                                id="no" 
                                data-i={i} 
                                className={currentPage === (i+1) ? "current-page page-btn" : "page-btn"}
                            >
                                {i+1}
                            </button>)
                    }
                    
                    
                    <Button
                        id="next" 
                        onClick={changePage} 
                        disabledCondition={currentPage === noOfPages} 
                        className="page-icon page-btn"
                        icon="fa fa-angle-right"                        
                    />

                    <Button
                        id="last" 
                        onClick={changePage} 
                        disabledCondition={currentPage === noOfPages} 
                        className="page-icon page-btn"
                        icon="fa fa-angle-double-right"                        
                    />
                </div>
            </div>
    )
}

function Button({id, onClick, disabledCondition, className, icon}){
    return(
        <button
            id={id}
            onClick={onClick}
            disabled={disabledCondition}
            className={className}
        >
            <span><i className={icon}></i></span>
        </button>
    ) 
}