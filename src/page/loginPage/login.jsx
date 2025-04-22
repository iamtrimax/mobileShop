import React, { useContext, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../../context/context';
import fetchWithAuth from '../../utils/fetchWithAuth';
const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        
        const {name, value} = e.target
        setData((preve) =>{
            return{
                ...preve,
                [name]: value,
            }
        })
    }
    const{fetchUserDetails} = useContext(Context)
    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetchWithAuth("http://localhost:3000/api/login",{
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()
        if(dataApi.success){
            toast.success("Đăng nhập thành công")
            localStorage.setItem("token", dataApi.data)
            console.log(dataApi);
            fetchUserDetails()
            navigate("/")
        }
        if(dataApi.error){
            toast.error("kiểm tra email/ password")
        }
    }
  return (
    <div className='container-fluid'>
        <section className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h3 className="text-center">Đăng nhập</h3>
                        <form className="login w-100" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control w-100" id="email" name='email' value={data.email} onChange={handleOnChange} placeholder="Nhập email" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Mật khẩu</label>
                                <input type="password" className="form-control w-100" id="password" name='password' value={data.password} onChange={handleOnChange} placeholder="Nhập mật khẩu" required/>
                            </div>
                            <button type="submit" className="btn btn-dark w-100">Đăng nhập</button>
                            <div className="text-end mt-2">
                                <a href="#" className="forgotPass text-secondary text-decoration-none">Quên mật khẩu?</a>
                            </div>
                            <div className="text-center">
                                <label htmlFor="">Bạn chưa có tài khoản? <Link to={"/sign-up"} >Đăng ký</Link></label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Login