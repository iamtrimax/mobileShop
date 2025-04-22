import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import uploadImage from '../../helper/uploadImage';
import { FaCloudArrowUp } from 'react-icons/fa6';
import fetchWithAuth from '../../utils/fetchWithAuth';

const UploadProduct = ({onClose, fetchData}) => {

      const fileInputRef = useRef(null);
      const [data, setData] = useState({
        productName: "",
        brandName: "",
        productImage: [],
        price: "",
        sellingPrice: "",
        screen: "",
        camera: "",
        os: "",
        RAM: "",
        ROM: "",
        quantity: "",
        description: "",
      });
      const handleUploadClick = () => {
        fileInputRef.current.click();
      };
      const handleHideModal = () => {
        document.getElementById("myForm").reset();
        fileInputRef.current.value = "";
        setData((prevData) => ({
          ...prevData,
          productImage: [],
        }));
      };
      const handleOnchange = (e) => {
        const { name, value } = e.target;
    
        setData((preve) => {
          return {
            ...preve,
            [name]: value,
          };
        });
      };
      const handleUploadImageProduct = async (e) => {
        const file = e.target.files[0];
    
        const uploadImageCloudinary = await uploadImage(file);
    
        setData((preve) => {
          console.log("imageurl.....", uploadImageCloudinary.url);
    
          return {
            ...preve,
            productImage: [...preve.productImage, uploadImageCloudinary.url],
          };
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetchWithAuth("http://localhost:3000/api/upload-product", {
          method: "post",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const dataRes = await response.json();
    
        if (dataRes.success) {
          toast.success(dataRes.message);
          handleHideModal();
          fetchData();
        }
        if (dataRes.error) {
          toast.error(dataRes.message);
        }
        onClose()
      };
    
  return (
    <>
       <div className="modal show d-block" id="productModal">
        <div className="modal-dialog">
          <div className="modal-content text-dark">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">thêm sản phẩm vào cửa hàng</h4>
              <button
                type="button"
                className="btn-close"
                id="btnCloseModal"
                onClick={onClose}
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <form id="myForm" onSubmit={handleSubmit}>
                <label htmlFor="">Tên sản phẩm</label>
                <input
                  type="text"
                  name="productName"
                  id=""
                  className="form-control"
                  placeholder="nhập tên sản phẩm...."
                  onChange={handleOnchange}
                />
                <br />
                <label htmlFor="">Tên hãng</label>
                <input
                  type="text"
                  name="brandName"
                  id=""
                  className="form-control"
                  placeholder="nhập tên công ty...."
                  onChange={handleOnchange}
                />
                <br />
                <label htmlFor="">Giá</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                  onChange={handleOnchange}
                />
                <label htmlFor="">Giá khuyến mãi</label>
                <input
                  type="number"
                  name="sellingPrice"
                  id="sellingPrice"
                  className="form-control"
                  onChange={handleOnchange}
                />
                <label className="form-label fw-bold">Hình ảnh sản phẩm</label>
                <div className="upload-box" onClick={handleUploadClick}>
                  <input
                    type="file"
                    id="fileInput"
                    ref={fileInputRef}
                    className="d-none"
                    accept="image/*"
                    multiple
                    onChange={handleUploadImageProduct}
                  />
                  {/* <i
                    className="bi bi-cloud-upload"
                    style={{fontSize: "30px", color: "#6c757d"}}
                  ></i> */}
                  <FaCloudArrowUp
                    className="bi bi-cloud-upload"
                    style={{ fontSize: "30px", color: "#6c757d" }}
                  />
                  <span className="d-block text-muted">
                    Upload product image
                  </span>
                </div>

                <div className="images d-flex mt-3" id="imageContainer">
                  {/* <!-- Hình ảnh được chọn sẽ xuất hiện ở đây --> */}
                  {data?.productImage.map((image, index) => {
                    return (
                      <div key={index}>
                        <img src={image} className="imgProduct" alt="" width={"50px"} height={"50px"}/>
                      </div>
                    );
                  })}
                </div>
                <p className="error-text">Please upload product image</p>
                <label htmlFor="">Màn hình</label>
                <input
                  type="text"
                  name="screen"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                />
                <br />
                <label htmlFor="">Camera</label>
                <input
                  type="text"
                  name="camera"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                />
                <br />
                <label htmlFor="">Hệ điều hành</label>
                <input
                  type="text"
                  name="os"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                />
                <br />
                <label htmlFor="">RAM</label>
                <input
                  type="text"
                  name="RAM"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                />
                <br />
                <label htmlFor="">ROM</label>
                <input
                  type="text"
                  name="ROM"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                />
                <br />
                <label htmlFor="">số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                />
                <br />
                <label htmlFor="">mô tả</label>
                <textarea
                  className="form-control"
                  rows="5"
                  id="description"
                  name="description"
                  onChange={handleOnchange}
                ></textarea>
                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary btn-block"
                   // data-bs-dismiss="modal"
                  >
                    Đăng bán
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

export default UploadProduct