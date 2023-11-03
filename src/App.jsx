import React from "react"

import './App.scss'
import Table from "./components/table"
import Searchpanel from "./components/search/search"
import PageBtns from "./components/pageBtns/pageBtns"

export default function App(){
    return (
        <div>
            <Searchpanel/>
            <Table/>
            <PageBtns/>
        </div>
    )
}