import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../AdminPanelPage/AdminPanel.css";
import "/src/app.css";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <>
      <div className="row">
        <div className="col-sm-3 sideBar scrollbar-none bg-dark text-white text-center">
          <div className="userInfor">
            <FaRegUser /> 
            <p className="fs-5">{user?.data?.username}</p>
            <p>{user?.data?.role}</p>
          </div>
          <div className="user-product">
            <Link to={"all-users"} className="navlink text-secondary">
              All user
            </Link>
            <br />
            <Link to={"all-products"} className="navlink text-secondary">
              All product
            </Link>
            <br/>
            <Link to={"all-banner"} className="navlink text-secondary">
              All banner
            </Link>
          </div>
        </div>
        <main className="main-content col-sm-9 list text-white p-3 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
