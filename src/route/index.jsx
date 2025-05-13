import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/HomePage/Home";
import Login from "../page/loginPage/login";
import Signup from "../page/signupPage/signUp";
import AdminPanel from "../page/AdminPanelPage/AdminPanel";
import AllUser from "../page/allUserPage/AllUser";
import AllProduct from "../page/AllProductapage/AllProduct";
import AllBanner from "../page/AllBanner/AllBanner";
import AdminRoute from "./AdminRoute";
import Page403 from "../page/403Page/Page403";
import Products from "../page/products/Products";
import ProductDetail from "../page/ProductDetail/productDetail";
import Cart from "../page/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/sign-up",
                element: <Signup/>
            },
            {
                path:"/products",
                element:<Products/>
            },
            {
                path:"/403-page",
                element:<Page403/>
            },
            {
                path:"/product/:id",
                element:<ProductDetail/>
            },
            {
                path:"/cart",
                element:(
                    <PrivateRoute>
                        <Cart/>
                    </PrivateRoute>
                )
            },
            {
                path:"/admin-panel",
                element: (
                    <AdminRoute>
                        <AdminPanel/>
                    </AdminRoute>
                ),
                children :[
                    {
                        path:"all-users",
                        element: <AllUser/>
                    },
                    {
                        path:"all-products",
                        element: <AllProduct/>
                    },
                    {
                        path:"all-banner",
                        element: <AllBanner/>
                    }
                ]
            },
        ]
    }
])
export default Router;