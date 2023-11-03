import { useEffect} from "react";
import useUserContext from './useUserContext'

export default function useFetch(url){
    
    const {dispatch} = useUserContext()

    async function fetchData(){
        try{
            const response = await fetch(url)
            if(response.ok){
                const data = await response.json()
                const userData = data.map(item => ({...item, checked: false}))
                dispatch({
                    type: 'SET_DATA',
                    payload: {
                        userData,
                        noOfPages: parseInt(data.length/10) + 1,
                        displayData: userData.slice(0,10),
                        length: data.length,
                    }
                })
            }
        }catch(err){
            console.log(err)
        }
    }

    console.log('hi')
    
    useEffect(() => {
        fetchData()
        console.log('bye')
    }, [url])
}