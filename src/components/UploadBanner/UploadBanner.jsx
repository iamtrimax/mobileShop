import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import uploadImage from "../../helper/uploadImage";
import { FaCloudArrowUp } from "react-icons/fa6";
import fetchWithAuth from "../../utils/fetchWithAuth";

const UploadBanner = ({onclose, fetchData}) => {
      const fileInputRef = useRef(null);
      const [data, setData] = useState({
        name:"",
        image:"",
        productId:""
      });
    const handleUploadImageProduct = async(e) => {
        const file = e.target.files[0];
        
            const uploadImageCloudinary = await uploadImage(file);
        
            setData(() => {
              console.log("imageurl.....", uploadImageCloudinary.url);
        
              return {
                image:uploadImageCloudinary.url,
              };
            });
      };
      const handleOnchange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => {
            return{
                ...prevData,
                [name]:value,
            }
        })
        
      }
      const handleSubmit = async(e) => {
        e.preventDefault()
    
        try {
            const fetchApi = await fetchWithAuth("http://localhost:3000/api/create-banner",{
                method: "post",
                credentials:"include",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const dataRes = await fetchApi.json();
        
            if(dataRes.success){
                toast.success(dataRes.message);
                fetchData()
            }
            if(dataRes.error){
                toast.error(dataRes.message)
            }
            onclose()
        } catch (error) {
            console.log(error);
            
        }
      };
      const handleUploadClick = () => {
        fileInputRef.current.click();
      };
  return (
    <>
      <div className="modal show d-block" id="bannerModal" data-bs-backdrop="static">
        <div className="modal-dialog">
          <div className="modal-content text-dark">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">thêm banner</h4>
              <button
                type="button"
                className="btn-close"
                id="btnCloseModal"
                onClick={onclose}
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <form id="myForm" onSubmit={handleSubmit}>
                <label htmlFor="">tên banner:</label>
                <input
                  type="text"
                  name="name"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                />
                <label htmlFor="">hình ảnh</label>
                <div className="upload-box" onClick={handleUploadClick}>
                  <input
                    type="file"
                    id="fileInput"
                    ref={fileInputRef}
                    className="d-none"
                    accept="image/*"
                    onChange={handleUploadImageProduct}
                  />
                  <FaCloudArrowUp
                    className="bi bi-cloud-upload"
                    style={{ fontSize: "30px", color: "#6c757d" }}
                  />
                  <span className="d-block text-muted">Upload banner</span>
                </div>
                <div className="images d-flex mt-3" id="imageContainer">
                  {/* <!-- Hình ảnh được chọn sẽ xuất hiện ở đây --> */}
                  <div>
                    {data?.image && (
                      <img
                        src={data?.image}
                        className="imgProduct"
                        alt=""
                        width={"400px"}
                        height={"100px"}
                      />
                    )}
                  </div>
                </div>
                <label htmlFor="">mã sản phẩm:</label>
                <input
                  type="text"
                  name="productId"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                />
                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary btn-block"
                    // data-bs-dismiss="modal"
                  >
                    Đăng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadBanner;
