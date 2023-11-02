import createElement from "../utils/createElement";
import Wrapper from "../utils/wrapper";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import useFetch from "../hooks/useFetch";

function Table(){

    const table = createElement('table')

    table.appendChild(TableHeader)
    
    useFetch()
        .then(data => {
            data.forEach(dd => {               
                const tr = TableBody(dd)
                table.appendChild(tr)
            })
        })

    return table
}

export default Wrapper(Table)