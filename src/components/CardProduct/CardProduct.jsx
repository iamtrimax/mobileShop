import React, { useContext } from 'react'
import displayCurrency from '../../helper/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../../helper/addToCart'
import Context from '../../context/context'
import ScrollTop from '../../helper/Scrolltop'

const CardProduct = ({data}) => {
  const {fetchCountCarts} = useContext(Context)
  const handleAddToCart = async(e, productId) => {
    await addToCart(e,productId)
    fetchCountCarts()
  }
  return (
   <>
         <Link to={`/product/${data?._id}`} className="card mx-5 mb-5 text-decoration-none" style={{ width: "250px" }}>
           <img
             className="card-img-top"
             src={data.productImage[0]}
             alt="Card image"
             width="100px"
             height="100px"
             onClick={ScrollTop}
           />
           <div className="card-body">
             <h4 className="card-title fs-6 text-centerA">{data.productName}</h4>
             <p className="text-secondary d-flex justify-content-center">
               <span className="me-2">{data.RAM}</span>
               <span>{data.ROM}</span>
             </p>
             <div className="d-flex justify-content-between">
               <p className="card-text fs-5">
                 {displayCurrency(data.sellingPrice || data.price)}
               </p>
               {data?.sellingPrice && (
                 <p className="sellingPrice card-text text-center fs-5 text-secondary">
                   {displayCurrency(data.price)}
                 </p>
               )|| ""}
             </div>
             <div className="action d-grid">
               <button className= "btn btn-outline-primary btn-block" onClick={(e) => {handleAddToCart(e, data?._id)}}>
                <span>Thêm vào giỏ hàng</span>
               </button>
             </div>
           </div>
         </Link>
       </>
  )
}

export default CardProduct