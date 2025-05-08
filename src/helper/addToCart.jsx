import { toast } from "react-toastify"
import fetchWithAuth from "../utils/fetchWithAuth"

const addToCart = async(e, id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const fetchApi = await fetchWithAuth("http://localhost:3000/api/add-to-cart",{
        method: "post",
        credentials:"include",
        headers:{
            "content-type" :"application/json"
        },
        body: JSON.stringify({
            productId: id
        })
    })
    const dataRes = await fetchApi.json()

    if(dataRes.success) {
        toast.success(dataRes.message)
    }
    if(dataRes.error) {
        toast.error(dataRes.message)
    }
    return dataRes
}
export default addToCart