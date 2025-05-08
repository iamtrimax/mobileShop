// ProductDetail.jsx
import React, { useContext, useEffect, useState } from "react";
import fetchWithAuth from "../../utils/fetchWithAuth";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { FaReply } from "react-icons/fa";
import "../ProductDetail/ProductDetail.css";
import displayCurrency from "../../helper/displayCurrency";
import { toast } from "react-toastify";
import moment from "moment";
import CardProduct from "../../components/CardProduct/CardProduct";
import Context from "../../context/context";
import addToCart from "../../helper/addToCart";

const ProductDetail = () => {
  const params = useParams();
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
  const [products, setProducts] = useState([]);
  const [dataComment, setDataComment] = useState({ comment: "" });
  const [comments, setComments] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageActive, setImageActive] = useState("");
  const [reply, setReply] = useState(false);
  const { fetchCountCarts } = useContext(Context);
  const handleAddToCart = async (e, productId) => {
    await addToCart(e, productId);
    fetchCountCarts();
  };
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  const fecthAllProduct = async () => {
    const fetchData = await fetchWithAuth(
      "http://localhost:3000/api/get-products",
      {
        method: "get",
        credentials: "include",
      }
    );
    const dataRes = await fetchData.json();
    setProducts(dataRes.data);
  };
  const fetchDetailProduct = async () => {
    const fetchData = await fetchWithAuth(
      `http://localhost:3000/api/product-detail/${params?.id}`,
      {
        method: "get",
        credentials: "include",
      }
    );
    const dataRes = await fetchData.json();
    if (dataRes.success) {
      setData(dataRes?.data);
      setImageActive(dataRes?.data?.productImage[0]);
    }
    if (dataRes.error) {
      console.log(dataRes.message);
    }
  };

  const handleActiveImage = (imgUrl) => {
    setImageActive(imgUrl);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataComment((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmitComment = async (content, parentId = null) => {
    const fetchApi = await fetchWithAuth(
      "http://localhost:3000/api/upload-comment",
      {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          parentId: parentId,
          productId: params.id,
          content: content,
        }),
      }
    );
    const dataRes = await fetchApi.json();

    if (dataRes.success) {
      toast.success(dataRes.message);
      setDataComment({ comment: "" });
      fetchComments();
    }
    if (dataRes.error) {
      toast.error(dataRes.message);
    }
  };
  const handleSendComment = () => {
    handleSubmitComment(dataComment.comment);
  };
  const handleReplyComment = (parentId) => {
    handleSubmitComment(dataComment.comment, parentId);
    setReply(false);
  };
  const fetchComments = async () => {
    const fetchData = await fetchWithAuth(
      `http://localhost:3000/api/get-comments/${params?.id}`,
      {
        method: "get",
        credentials: "include",
      }
    );
    const dataRes = await fetchData.json();
    if (dataRes.success) {
      setComments(dataRes?.data);
    }
    if (dataRes.error) {
      console.log(dataRes.message);
    }
  };
  useEffect(() => {
    fetchDetailProduct();
    fetchComments();
    fecthAllProduct();
  }, [params]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-5 col-12 text-center position-relative">
          <div className="imageActive">
            {imageActive && (
              <img
                src={imageActive}
                className="object-fit-contain"
                alt="Product main"
                width="200px"
                height="250px"
              />
            )}
          </div>
          <div className="list-img mt-4 position-absolute text-center">
            {data?.productImage.map((imgUrl, index) => (
              <img
                src={imgUrl}
                className={`object-fit-contain ${
                  imageActive === imgUrl ? "active" : ""
                }`}
                alt=""
                width="100px"
                height="100px"
                key={index}
                onClick={() => handleActiveImage(imgUrl)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-7 col-12">
          <p className="fs-4">{data.productName}</p>
          <div className="d-flex justify-content-start flex-wrap fs-5">
            <span className="mx-3">Giá bán: </span>
            <p className="card-text fs-5">
                 {displayCurrency(data.sellingPrice || data.price)}
               </p>
               {data?.sellingPrice && (
                 <p className="sellingPrice card-text fs-5 text-secondary mx-3">
                   {displayCurrency(data.price)}
                 </p>
               )|| ""}
          </div>
          <div className="mt-3">
            <h5 className="text-center">Thông số kỹ thuật</h5>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Màn hình</th>
                  <td>{data.screen}</td>
                </tr>
                <tr>
                  <th>Camera</th>
                  <td>{data.camera}</td>
                </tr>
                <tr>
                  <th>Hệ điều hành</th>
                  <td>{data.os}</td>
                </tr>
                <tr>
                  <th>RAM</th>
                  <td>{data.RAM}</td>
                </tr>
                <tr>
                  <th>ROM</th>
                  <td>{data.ROM}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary btn-block"
              onClick={(e) => handleAddToCart(e, params.id)}
            >
              Mua hàng
            </button>
          </div>
        </div>
      </div>

      <div className="description row mt-5">
        <div className="col-12 mt-5">
          <h3 className="text-center">Mô tả</h3>
          <p
            className={`description-text fs-5 ${
              isExpanded ? "expanded" : "collapsed"
            }`}
          >
            {data.description}
          </p>
          {data.description.length > 300 && (
            <div className="text-center">
              <button className="btn btn-link" onClick={toggleDescription}>
                {isExpanded ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="comment row mt-3">
        <h4 className="text-center">Đánh giá</h4>
        {!localStorage.getItem("token") ? (
          <div className="alert alert-warning text-center">
            Vui lòng đăng nhập để bình luận
          </div>
        ) : (
          <div className="inputComment p-3">
            <textarea
              className="form-control mb-2"
              placeholder="Đánh giá sản phẩm tại đây..."
              rows="3"
              name="comment"
              onChange={handleOnChange}
              value={dataComment.comment}
            ></textarea>
            <div className="text-end">
              <button
                className="btn btn-primary mx-3 my-3"
                onClick={handleSendComment}
              >
                <IoSend className="fs-5" />
              </button>
            </div>
          </div>
        )}

        {comments?.length > 0 ? (
          comments.map((comment, index) => {
            return (
              <div className="mx-1 row mb-3" key={index}>
                <div className="bg-light rounded p-2 w-100">
                  <h6 className="mb-1">{comment.userId.username}</h6>
                  <p className="mb-0">{comment.content}</p>
                  <div className="my-3 d-flex justify-content-between">
                    <p className="fs-6 text-secondary">
                      {moment(comment?.createdAt).format("ll")}
                    </p>
                    <div className="">
                      {localStorage.getItem("token") && (
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            setReply(true);
                          }}
                        >
                          <FaReply />
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                  {reply && (
                    <div className="input-reply-comment">
                      <textarea
                        className="form-control mb-2"
                        placeholder={`Trả lời đánh giá của ${comment.userId.username}...`}
                        rows="1"
                        name="comment"
                        onChange={handleOnChange}
                        value={dataComment.comment}
                      ></textarea>
                      <div className="text-end">
                        <button
                          className="btn btn-primary mx-3 my-3"
                          onClick={() => {
                            handleReplyComment(comment._id);
                          }}
                        >
                          <IoSend className="fs-5" />
                        </button>
                      </div>
                    </div>
                  )}
                  {comment.replies?.length > 0 && (
                    <div className="commentReply mx-5 my-3">
                      {comment.replies.map((cmtReply, idx) => (
                        <div className="mx-1 row mb-3" key={idx}>
                          <div className="bg-light rounded p-2 w-100">
                            <h6 className="mb-1">{cmtReply.userId.username}</h6>
                            <p className="mb-0">{cmtReply.content}</p>
                            <div className="my-3 d-flex justify-content-between">
                              <p className="fs-6 text-secondary">
                                {moment(cmtReply?.createdAt).format("ll")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center fs-5">Chưa có đánh giá nào</div>
        )}
      </div>
      <div className="mt-3">
        <h4>Sản phẩm liên quan</h4>
        <div className="productRelative d-flex overflow-auto">
          {products
            .filter((p) => {
              return (
                p.brandName === data.brandName &&
                p.productName !== data.productName
              );
            })
            .map((product, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 mt-3"
                key={index}
              >
                <CardProduct data={product}/>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
