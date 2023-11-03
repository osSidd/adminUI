import React from "react"
import TableHeader from "./tableHeader/tableHead"
import TableBody from "./tableBody/tableBody"
import useFetch from "../hooks/useFetch"

export default function Table(){

    useFetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    
    return (
        <table>
            <TableHeader/>
            <TableBody/>
        </table>
    )
}