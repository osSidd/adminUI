
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

export {
    debounce,
    compare,
    getPages,
}