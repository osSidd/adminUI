import createElement from "../utils/createElement"

export default function Icon(iconClass){

    const cssClass = iconClass.split(' ')

    const icon = createElement('i')
    icon.classList.add(cssClass[0])
    icon.classList.add(cssClass[1])

    return icon
}

