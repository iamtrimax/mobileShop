import React, { useState, useEffect } from "react";
import "../Banner/Banner.css";
import { Link } from "react-router-dom";
import fetchWithAuth from "../../utils/fetchWithAuth";

const Banner = () => {
  // const banner = [slide1, slide2, slide3, slide4, slide5];
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fetchAllBanner = async () => {
    try {
      const fetchData = await fetchWithAuth("http://localhost:3000/api/get-banner", {
        method: "GET",
        credentials: "include",
      });

      const dataRes = await fetchData.json();
      if (dataRes.success && Array.isArray(dataRes.data)) {
        // Lấy danh sách hình ảnh từ tất cả phần tử trong `data`
        const dataImage = dataRes.data.flatMap((item) => item || []);
        setBanners(dataImage);
      } else {
        setBanners([]); // Đảm bảo banners luôn là một mảng
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setBanners([]); // Đảm bảo banners luôn là một mảng
    }
  };
  useEffect(() => {
    fetchAllBanner();
  }, [banners.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners?.length);
    }, 3000); // Chuyển ảnh mỗi 3 giây

    return () => clearInterval(interval);
  }, [banners?.length]);

  return (
    <div className="container">
      <div className="slide">
        {banners.map((bannerItem, index) => (
          <Link to={`product/${bannerItem?.productId?._id}`} key={index}>
            <img
              className={`imgBanner ${index === currentIndex ? "active" : ""}`}
              src={bannerItem.image}
              alt={`Slide ${index + 1}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banner;
