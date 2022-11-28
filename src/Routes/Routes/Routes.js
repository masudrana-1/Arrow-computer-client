import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import Admin from "../../Pages/Dashboard/Admin/Admin/Admin";
import MyOrder from "../../Pages/Dashboard/Buyer/MyOrder/MyOrder";
import Seller from "../../Pages/Dashboard/Seller/Seller/Seller";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import LogIn from "../../Pages/LogIn/LogIn";
import SignUp from "../../Pages/SignUp/SignUp";
import AllProducts from "../../Pages/AllProducts/AllProducts";
import AddProduct from "../../Pages/Dashboard/Seller/AddProducts/AddProduct";
import Products from "../../Pages/Dashboard/Seller/Products/Products";
import AllSeller from "../../Pages/Dashboard/Admin/AllSeller/AllSeller";
import AllBuyer from "../../Pages/Dashboard/Admin/AllBuyer/AllBuyer";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Buyer from "../../Pages/Dashboard/Buyer/Buyer/Buyer";
import Wishlist from "../../Pages/Dashboard/Buyer/Wishlist/Wishlist";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import SellerRoute from "./SellerRoute/SellerRoute";
import AdminRoute from "./AdminRoute/AdminRoute";

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
                path: '/dashboard/buyer',
                element: <Buyer></Buyer>
            },
            {
                path: '/dashboard/buyer/order',
                element: <MyOrder></MyOrder>
            },
            {
                path: '/dashboard/buyer/wishlist',
                element: <Wishlist></Wishlist>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5000/productCart/${params.id}`)
            },
            {
                path: '/dashboard/seller',
                element: <Seller></Seller>
            },
            {
                path: '/dashboard/seller/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/seller/products',
                element: <Products></Products>
            },
            {
                path: '/dashboard/admin',
                element: <AdminRoute><Admin></Admin></AdminRoute>
            },
            {
                path: '/dashboard/admin/seller',
                element: <AllSeller></AllSeller>
            },
            {
                path: '/dashboard/admin/buyer',
                element: <AllBuyer></AllBuyer>
            },
        ]
    }
])

export default router;