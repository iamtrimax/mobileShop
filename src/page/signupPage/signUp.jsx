import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import fetchWithAuth from "../../utils/fetchWithAuth";
const Signup = () => {
    const [data, setData] = useState({
        username:"",
        email:"",
        password:"",
        rePassword:"",
    });
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {name, value} = e.target;

        setData((preve) =>{
            return{
                ...preve,
                [name]:value,
            }
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()

        const dataResponse = await fetchWithAuth("http://localhost:3000/api/signup",{
            method:"post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success) {
            toast.success(dataApi.message)
            navigate("/login")
        }

        if(dataApi.error) {
            toast.error(dataApi.message)
        }

    }
  return (
    <>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h3 className="text-center">Đăng ký</h3>
              <form className="signUp w-100" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control w-100"
                    id="userName"
                    name="username"
                    placeholder="Nhập tên đăng nhập"
                    value={data.username}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control w-100"
                    id="email"
                    name="email"
                    placeholder="Nhập email"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control w-100"
                    id="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={handleOnChange}
                    value={data.password}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rePassword" className="form-label">
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control w-100"
                    id="rePassword"
                    name="rePassword"
                    placeholder="Nhập lại mật khẩu"
                    onChange={handleOnChange}
                    value={data.rePassword}
                    required
                  />
                </div>
                <button className="btn btn-dark w-100">
                  Đăng ký
                </button>
                <div className="text-center">
                  <label htmlFor="">
                    Bạn đã có tài khoản? <Link to={"/login"}>Đăng Nhập</Link>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
