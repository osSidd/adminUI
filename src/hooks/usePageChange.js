import useUserContext from "./useUserContext"

export default function usePageChange(){

    const {start, end, noOfPages,length, dispatch} = useUserContext()

    function pageNo(e){
        const id = e.target.id

        switch(id){
            case 'first':
                dispatch({
                    type:'CHANGE_PAGE',
                    payload: {
                        start: 0,
                        end: 10,
                        greet: 'hi'
                    }
                })
                return
            
            case 'last':
                dispatch({
                    type:'CHANGE_PAGE',
                    payload: {
                        start: (noOfPages-1) *10,
                        end: length,
                    }
                })
                return
            
            case 'prev':
                dispatch({
                    type:'CHANGE_PAGE',
                    payload: {
                        start: start === 0 ? 0 : (end >= length ? (noOfPages-2)*10 : start - 10),
                        end: end === 10 ? end : (end >= length ? (noOfPages-1)*10 : end - 10),
                    }
                })
                return
            
            case 'next':
                dispatch({
                    type:'CHANGE_PAGE',
                    payload: {
                        start: start === 40 ? 40 : start + 10,
                        end: end === (length-1)*10 ? end : end + 10,
                    }
                })
                return
            
            default:
                dispatch({
                    type:'CHANGE_PAGE',
                    payload: {
                        start: parseInt(id) *10,
                        end: (parseInt(id)+1) *10,
                    }
                })
                return
        }        
    }

    function deleteSelected(e){
        dispatch({
            type: 'DELETE_ALL',
        })
    }

    return {
        noOfPages,
        pageNo,
        deleteSelected,
    }
}