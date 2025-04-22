import React, { useState } from "react";
import "../CardProductAdminPanel/CardProductAdminPanel.css";
import displayCurrency from "../../helper/displayCurrency";
import { toast } from "react-toastify";
import UpdateProduct from "../updateProduct/UpdateProduct";
import fetchWithAuth from "../../utils/fetchWithAuth";

const CardProductAdminPanel = ({ data, fetchData }) => {
  const [edit, setEdit] = useState(false);

  const handleDeleteProduct = async (productId) => {
    const response = await fetchWithAuth("http://localhost:3000/api/delete-product", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const dataRes = await response.json();
    if (dataRes.success) {
      toast.success(dataRes.message);
    } else {
      toast.error(dataRes.message);
    }
  };

  return (
    <>
      <div className="card mt-3" style={{ width: "250px" }}>
        <img
          className="card-img-top"
          src={data.productImage[0]}
          alt="Card image"
          width="100px"
          height="100px"
        />
        <div className="card-body">
          <h4 className="card-title fs-5 text-center">{data.productName}</h4>
          <p className="text-center text-secondary">
            Số lượng: {data.quantity}
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
          <div className="action d-flex justify-content-between">
            <button className="btn btn-primary" onClick={() => setEdit(true)}>
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteProduct(data._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Hiển thị modal UpdateProduct nếu edit = true */}
      {edit && (
        <UpdateProduct
          data={data}
          fetchData={fetchData}
          onClose={() => setEdit(false)}
        />
      )}
    </>
  );
};

export default CardProductAdminPanel;
