
function debounce(fn, delay){
    let timer
    return function(){
        const context = this
        const args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(context, args), delay)
    }
}

function compare(val1, val2){
    return val1.toLowerCase() === val2.toLowerCase()
}

function getPages(data=[], noOfRows=10){
    const arr = []
    for(let i = 0; i<(Math.floor(data.length/noOfRows)+1); i++){
        arr.push(i)
    }
    return arr
}

function deleteAll(arr){
    let tempArr = [...arr]
    let temp = tempArr.filter(item => item.selected)
    temp.forEach(item => {
        tempArr.splice(tempArr.lastIndexOf(item),1)
    })
    return tempArr
}

function deleteOne(arr, id){
    let temp = [...arr]
    let item = temp.find(item => item.id === id)
    temp.splice(temp.indexOf(item),1)
    return temp
}

export {
    debounce,
    compare,
    getPages,
    deleteAll,
    deleteOne,
}