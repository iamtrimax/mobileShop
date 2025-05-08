import React, { useCallback, useContext, useEffect, useState } from "react";
import fetchWithAuth from "../../utils/fetchWithAuth";
import displayCurrency from "../../helper/displayCurrency";
import { Link, useNavigate } from "react-router-dom";
import "../Cart/Cart.css";
import Context from "../../context/context";
import { toast } from "react-toastify";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const {fetchCountCarts} = useContext(Context)
  const navigate = useNavigate();
  const fetchCart = async () => {
    const fetchApi = await fetchWithAuth(
      "http://localhost:3000/api/get-carts",
      {
        method: "get",
        credentials: "include",
      }
    );

    const dataRes = await fetchApi.json();
    if (dataRes.success) {
      setCartItems(dataRes.data.items);
    }
    if (dataRes.error) {
      console.log("error...", dataRes.message);
    }
  };

  // Tính tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const increaseCart = async(productId, quantity)=>{
    const fetchApi= await fetchWithAuth("http://localhost:3000/api/update-cart",{
        method: "post",
        credentials: "include",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify({
            productId,
            quantity:quantity+1
        })
    })
    const dataRes = await fetchApi.json();

    if(dataRes.success) {
        fetchCart()
        fetchCountCarts()
    }
    if (dataRes.error) {
        console.log(dataRes.message);
        
    }
  }
  const decreaseCart = async(productId, quantity)=>{
    if (quantity <= 1) return;
    const fetchApi= await fetchWithAuth("http://localhost:3000/api/update-cart",{
        method: "post",
        credentials: "include",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify({
            productId,
            quantity:quantity-1
        })
    })
    const dataRes = await fetchApi.json();

    if(dataRes.success) {
        fetchCart()
        fetchCountCarts()
    }
    if (dataRes.error) {
        console.log(dataRes.message);
        
    }
  }
  const deleteCart = async(productId)=>{
    const fetchApi= await fetchWithAuth("http://localhost:3000/api/delete-cart",{
        method: "post",
        credentials: "include",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify({
            productId,
        })
    })
    const dataRes = await fetchApi.json();

    if(dataRes.success) {
        toast.success(dataRes.message); 
        fetchCart()
        fetchCountCarts()
    }
    if (dataRes.error) {
        toast.error(dataRes.message);
    }
  }
  const onClickGoOn = () => {
    navigate("/");
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h4>Giỏ hàng trống</h4>
          <p className="text-muted">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
          <button className="btn btn-primary" onClick={onClickGoOn}>
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "10%" }}>
                    Ảnh
                  </th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col" className="text-center">
                    Giá
                  </th>
                  <th scope="col" className="text-center">
                    Số lượng
                  </th>
                  <th scope="col" className="text-center">
                    Thành tiền
                  </th>
                  <th scope="col" className="text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.productId.productImage[0]}
                        alt={item.name}
                        className="img-thumbnail"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                    </td>
                    <td>
                      <h6 className="mb-0">{item.productId.productName}</h6>
                    </td>
                    <td className="text-center">
                      {displayCurrency(item.price)}
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-sm btn-outline-secondary quantity-control"onClick={()=>{decreaseCart(item.productId._id, item.quantity)}}>
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center mx-2 quantity-input no-spinner"
                          value={item.quantity}
                          min="1"
                        />
                        <button className="btn btn-sm btn-outline-secondary quantity-control" onClick={()=>{increaseCart(item.productId._id, item.quantity)}}>
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      {displayCurrency(item.price * item.quantity)}
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-danger" onClick={()=>{deleteCart(item.productId._id)}}>
                        <i className="bi bi-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row justify-content-end mt-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Tổng cộng</h5>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tạm tính:</span>
                    <span>{displayCurrency(total)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Phí vận chuyển:</span>
                    <span className="text-success">Miễn phí</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>Tổng tiền:</span>
                    <span className="text-danger">
                      {displayCurrency(total)}
                    </span>
                  </div>
                  <button className="btn btn-primary w-100 mt-3 py-2">
                    Tiến hành thanh toán
                  </button>
                  <button
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={onClickGoOn}
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
