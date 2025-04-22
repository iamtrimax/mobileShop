import React, { useEffect, useState } from "react";
import "../products/products.css";
import CardProduct from "../../components/CardProduct/CardProduct";
import fetchWithAuth from "../../utils/fetchWithAuth";
const Products = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    const fetchData = await fetchWithAuth("http://localhost:3000/api/get-products", {
      method: "get",
      credentials: "include",
    });
    const dataRes = await fetchData.json();
    setProduct(dataRes.data);
  };
  useEffect(() => {
    fetchProduct();
  }, [product]);
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {product.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <CardProduct data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
