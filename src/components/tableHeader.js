import createElement from "../utils/createElement"
import Wrapper from "../utils/wrapper"

function TableHeader(){

    const headers = ['checkbox', 'name', 'email', 'role', 'actions']

    const tr = createElement('tr')

    headers.forEach(header => {
        const th = createElement('th')

        if(header === 'checkbox'){
            const input = createElement('input')
            input.type = 'checkbox'
            th.appendChild(input)
        }   
        else{
            th.innerText = header
        }
        tr.appendChild(th)
    })

    return tr
}

export default Wrapper(TableHeader)