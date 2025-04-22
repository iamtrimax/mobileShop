import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import UploadBanner from "../../components/UploadBanner/UploadBanner";
import fetchWithAuth from "../../utils/fetchWithAuth";

const AllBanner = () => {
  const [banners, setBanners] = useState([]);
  const [upload, setUpload] = useState(false);
  const fetchAllBanner = async () => {
    try {
      const fetchData = await fetchWithAuth("http://localhost:3000/api/get-banner", {
        method: "GET",
        credentials: "include",
      });

      const dataRes = await fetchData.json();
      console.log("API Response:", dataRes); // Kiểm tra dữ liệu trả về từ API

      if (dataRes.success && Array.isArray(dataRes.data)) {
        // Lấy danh sách hình ảnh từ tất cả phần tử trong `data`
        const dataBanner = dataRes.data.flatMap((item) => item || []);
        setBanners(dataBanner);
      } else {
        console.error("Invalid data format:", dataRes);
        setBanners([]); // Đảm bảo banners luôn là một mảng
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setBanners([]); // Đảm bảo banners luôn là một mảng
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    const deleteBanner = await fetchWithAuth(
      "http://localhost:3000/api/delete-banner",
      {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ bannerId }),
      }
    );
    console.log("id banner", bannerId);

    const dataRes = await deleteBanner.json();

    if (dataRes.success) {
      toast.success(dataRes.message);
      setBanners((preveData) =>
        preveData.filter((banner) => banner._id !== bannerId)
      );
    }
    if (dataRes.error) {
      toast.error(dataRes.message);
    }
  };
  useEffect(() => {
    fetchAllBanner();
  }, [banners]);
  return (
    <>
      <div className="container">
        <div className="upload position-fixed bottom-0 my-3 mx-4 end-0">
          <div className="mt-3">
            <button
              className="btnAddProduct btn btn-secondary"
              data-bs-toggle="modal"
              onClick={() => {
                setUpload(true);
              }}
            >
              upload banner
            </button>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Mã sản phảm</th>
              <th>Tên sản phẩm</th>
              <th>ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={banner?.image}
                      alt=""
                      width={"200px"}
                      height={"100px"}
                    />
                  </td>
                  <td>{banner?.productId?._id}</td>
                  <td>{banner?.productId?.productName}</td>
                  <td>{moment(banner?.createdAt).format("ll")}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger delete"
                      onClick={() => handleDeleteBanner(banner?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        upload&&(
          <UploadBanner
            onclose={()=>{setUpload(false)}}
            fetchData={fetchAllBanner}
          />
        )
      }
    </>
  );
};

export default AllBanner;
