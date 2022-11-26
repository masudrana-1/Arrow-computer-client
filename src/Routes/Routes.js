import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import Admin from "../Pages/Dashboard/Admin/Admin";
import Buyer from "../Pages/Dashboard/Buyer/Buyer";
import Seller from "../Pages/Dashboard/Seller/Seller";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import AllProducts from "../Pages/AllProducts/AllProducts";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/products/:product_type',
                element: <AllProducts></AllProducts>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.product_type}`)
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        errorElement: <ErrorPage></ErrorPage>,
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <Buyer></Buyer>
            },
            {
                path: '/dashboard/seller',
                element: <Seller></Seller>
            },
            {
                path: '/dashboard/admin',
                element: <Admin></Admin>
            }
        ]
    }
])

export default router;