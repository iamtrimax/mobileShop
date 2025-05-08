import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import logo from "/src/assets/logo.png";
import "../Header/Header.css";
import fetchWithAuth from "../../utils/fetchWithAuth";
import Context from "../../context/context";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);
  const handleLogout = async () => {
    const fethData = await fetchWithAuth("http://localhost:3000/api/logout", {
      method: "get",
      credentials: "include",
    });
    const data = await fethData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      localStorage.clear("token");
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="container-fluid">
      <header className="bg-dark py-3 text-center w-100">
        <Link to={"/"}>
          <img src={logo} alt="Logo" width="30%" className="mb-3" />
        </Link>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mynavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Khuyến mãi
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={"products"} className="nav-link" href="#">
                    Điện thoại
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Tin tức
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Liên hệ
                  </a>
                </li>
              </ul>

              {/* Search */}
              <form className="d-flex w-50 text-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Bạn cần tìm gì?......"
                  aria-label="Search"
                />
                <button className="btn btn-dark" type="submit">
                  <CiSearch className="text-white fs-3" />
                </button>
              </form>

              <ul className="navbar-nav ms-3">
                {user?.data?._id ? (
                  <>
                    <li className="nav-item">
                      <Link to={"cart"} className="nav-link position-relative">
                        <FaShoppingCart className="fs-3" />
                        <div className="countCart bg-danger position-absolute top-0 end-0">
                          <p className="">{context?.countCarts}</p>
                        </div>
                      </Link>
                    </li>

                    {/* User Dropdown */}
                    <div
                      className="user text-white mx-3 dropdown"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <button
                        type="button"
                        className="btn dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <FaRegUser className="text-secondary" />
                        <span className="username text-white mx-2">
                          {user?.data?.username}
                        </span>
                      </button>
                      {user?.data?.role === "ADMIN" && (
                        <ul
                          className={`dropdown-menu bg-dark ${
                            isDropdownOpen ? "show" : ""
                          }`}
                        >
                          <li>
                            <Link
                              to={"admin-panel"}
                              className="dropdown-item text-white"
                            >
                              Admin panel
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>

                    {/* Logout */}
                    <li className="li-login nav-item" onClick={handleLogout}>
                      <a className="nav-link">
                        <i className="bi bi-box-arrow-in-left me-2"></i>
                        <span>Đăng xuất</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="li-login nav-item">
                    <Link to={"/login"} className="nav-link">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      <span>Đăng nhập</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
