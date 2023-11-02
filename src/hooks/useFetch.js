async function useFetch(){
    let data = []

    try{
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        
        if(response.ok){
            data = await response.json()
            return data
        }
    }catch(err){
        console.log(err)
    }
}

export default useFetch