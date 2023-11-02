export default function createElement(elementType, children=''){
    const element = document.createElement(elementType)

    if(typeof children === 'string') element.innerText = children
    else element.appendChild(children)

    return element
}

// function Element(type, children=''){
    
//     const element = document.createElement(type)

//     function appendNode(node){
//         element.appendChild(node)
//     }

//     return {
//         element,
//         appendNode,
//     }
// }


// class CreateElement{
//     constructor(){}

//     appendChildren(element, arr){
//         const documentFragment = document.documentFragment()

//     }
// }