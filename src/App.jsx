import React, { useEffect, useState } from "react";

import './App.scss'
import Pagination from "./components/pagination/pagination"

export default function App(){

    return (
        <div className="App">
            <Pagination
                noOfRows={10}
            />
        </div>
    )
}