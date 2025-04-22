import { useRef, useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import uploadImage from "../../helper/uploadImage";
import { toast } from "react-toastify";
import fetchWithAuth from "../../utils/fetchWithAuth";

const UpdateProduct = ({ data, onClose, fetchData }) => {
  const fileInputRef = useRef(null);
  const [dataProduct, setDataProduct] = useState({
    ...data,
    productName: data?.productName || "",
    brandName: data?.brandName || "",
    productImage: data?.productImage || [],
    price: data?.price || "",
    sellingPrice: data?.sellingPrice || "",
    screen: data?.screen || "",
    camera: data?.camera || "",
    os: data?.os || "",
    RAM: data?.RAM || "",
    ROM: data?.ROM || "",
    quantity: data?.quantity || "",
    description: data?.description || "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setDataProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async(e) => {
    e.preventDefault();
    const dataResponse = await fetchWithAuth("http://localhost:3000/api/update-product",{
      method: "post",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataProduct)
    })

    const dataRes  = await dataResponse.json();

    if(dataRes.success) {
      toast.success(dataRes.message);
    }
    if(dataRes.error) {
      toast.error(dataRes.message,)
    }


    onClose(); // Đóng modal sau khi cập nhật
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleUploadImageProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setDataProduct((preve) => {
      console.log("imageurl.....", uploadImageCloudinary.url);

      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content text-dark">
          <div className="modal-header">
            <h4 className="modal-title">Chỉnh sửa sản phẩm</h4>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form id="myForm" onSubmit={handleUpdateSubmit}>
              <label htmlFor="">Tên sản phẩm</label>
              <input
                type="text"
                name="productName"
                id=""
                value={dataProduct?.productName}
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
                value={dataProduct?.brandName}
                placeholder="nhập tên công ty...."
                onChange={handleOnchange}
              />
              <br />
              <label htmlFor="">Giá</label>
              <input
                type="number"
                name="price"
                id="price"
                value={dataProduct?.price}
                className="form-control"
                onChange={handleOnchange}
              />
              <label htmlFor="">Giá khuyến mãi</label>
              <input
                type="number"
                name="sellingPrice"
                id="sellingPrice"
                className="form-control"
                value={dataProduct?.sellingPrice}
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
                <span className="d-block text-muted">Upload product image</span>
              </div>

              <div className="images d-flex mt-3" id="imageContainer">
                {/* <!-- Hình ảnh được chọn sẽ xuất hiện ở đây --> */}
                {dataProduct?.productImage.map((image, index) => {
                  return (
                    <div key={index}>
                      <img src={image} className="imgProduct" alt=""  width={"50px"} height={"50px"}/>
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
                value={dataProduct?.screen}
                className="form-control"
                onChange={handleOnchange}
              />
              <br />
              <label htmlFor="">Camera</label>
              <input
                type="text"
                name="camera"
                id=""
                value={dataProduct?.camera}
                className="form-control"
                onChange={handleOnchange}
              />
              <br />
              <label htmlFor="">Hệ điều hành</label>
              <input
                type="text"
                name="os"
                id=""
                value={dataProduct?.os}
                className="form-control"
                onChange={handleOnchange}
              />
              <br />
              <label htmlFor="">RAM</label>
              <input
                type="text"
                name="RAM"
                id=""
                value={dataProduct?.RAM}
                className="form-control"
                onChange={handleOnchange}
              />
              <br />
              <label htmlFor="">ROM</label>
              <input
                type="text"
                name="ROM"
                id=""
                value={dataProduct?.ROM}
                className="form-control"
                onChange={handleOnchange}
              />
              <br />
              <label htmlFor="">số lượng</label>
              <input
                type="number"
                name="quantity"
                id=""
                value={dataProduct?.quantity}
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
                value={dataProduct?.description}
                onChange={handleOnchange}
              ></textarea>
              <div className="d-grid">
                <button
                  className="btn btn-outline-primary btn-block"
                  data-bs-dismiss="modal"
                >
                 Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
