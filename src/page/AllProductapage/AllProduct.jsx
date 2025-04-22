import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AllProductapage/AllProduct.css";
import CardProductAdminPanel from "../../components/CardProductAdminPanel/cardProductAdminPanel";
import UploadProduct from "../../components/UploadProduct/UploadProduct";
import fetchWithAuth from "../../utils/fetchWithAuth";

const AllProduct = () => {
  const [productList, setProductList] = useState([]);
  const [upload, setUpload] = useState(false);
  const fetchAllProduct = async () => {
    const fetchData = await fetchWithAuth("http://localhost:3000/api/get-products", {
      method: "get",
      credentials: "include",
    });
    const dataRes = await fetchData.json();
    setProductList(dataRes.data);
  };
  useEffect(() => {
    fetchAllProduct();
    
  }, [productList]);
  return (
    <>
      <div className="container-fluid">
        <div className="upload position-fixed bottom-0 my-3 mx-4 end-0">
          <div className="mt-3">
            <button
              className="btnAddProduct btn btn-secondary"
              onClick={() => {
                setUpload(true);
              }}
            >
              upload product
            </button>
          </div>
        </div>
        <div className="products d-flex flex-wrap my-5 justify-content-start">
          {productList.map((product, index) => (
            <CardProductAdminPanel
              data={product}
              fetchData={fetchAllProduct}
              key={index}
            />
          ))}
        </div>
      </div>
      {/* <!-- modal thêm sản phẩm --> */}
      {upload && (
        <UploadProduct
          onClose={() => setUpload(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </>
  );
};

export default AllProduct;
