import React, {  useEffect } from 'react'
import fetchWithAuth from '../../utils/fetchWithAuth'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {

    const params = useParams()
    const fetchDetailProduct = async () => {
        const fetchData = await fetchWithAuth(`http://localhost:3000/api/product-detail/${params?.id}`,{
            method: "get",
            credential:"include"
        })
        const dataRes = await fetchData.json()

        if(dataRes.success) {
            console.log(dataRes.data);
        }
        if(dataRes.error) {
            console.log(dataRes.message);
        }
    }
    useEffect(() => {
        fetchDetailProduct()
    },[])
  return (
    <div>productDetail</div>
  )
}

export default ProductDetail