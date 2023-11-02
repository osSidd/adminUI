import createElement from "../utils/createElement";
import Icon from "./icon";

function TableBody(dd){
    const tr = createElement('tr')

    const input = createElement('input')
    input.type = 'checkbox'
    tr.appendChild(input)


    for(let key in dd){
        if(key !== 'id'){
            const td = createElement('td')
            td.innerText = dd[key]
            tr.appendChild(td)
        }
    }

    const action = createElement('td')
    
    

    const editBtn = createElement('span', Icon('fa fa-edit'))
    const deleteBtn = createElement('span', Icon('fa fa-trash-o'))

    action.appendChild(editBtn)
    action.appendChild(deleteBtn)

    tr.appendChild(action)

    return tr
}

export default TableBody