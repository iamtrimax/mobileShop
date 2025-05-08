import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react"; // Import useState cho trạng thái loading
import Context from "./context/context";
import fetchWithAuth from "./utils/fetchWithAuth";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State để kiểm tra đang load dữ liệu
  const [countCarts, setCountCarts] = useState(0) 
  const fetchUserDetails = async () => {
    try {
      const dataReponse = await fetchWithAuth("http://localhost:3000/api/user-details", {
        method: "get",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // accessToken từ localStorage
        }
      });

      const dataApi = await dataReponse.json();
      console.log(dataApi);
      
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi)); // Lưu user vào Redux
      }
    } catch (error) {
      console.log("Error fetching user details: ", error);
    } finally {
      setLoading(false); // Set loading là false khi dữ liệu đã tải xong
    }
  };
  const fetchCountCarts = async() =>{
    const fetchApi = await fetchWithAuth("http://localhost:3000/api/count-carts",{
      method: "get",
      credentials: "include",
    })
    const dataRes = await fetchApi.json();
    if(dataRes.success) {
      setCountCarts(dataRes?.data?.count);
    }
    if(dataRes.error) {
      console.log(dataRes.message);
    }
  }
  useEffect(() => {
    
    fetchUserDetails();
    fetchCountCarts();
  }, []);

  
  if (loading) {
    // Nếu đang load dữ liệu user, có thể hiển thị loading
    return <div>Loading...</div>;
  }

  return (
    <Context.Provider value={{ fetchUserDetails, countCarts, fetchCountCarts }}>
      <ToastContainer position="top-right" />
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </Context.Provider>
  );
}

export default App;
