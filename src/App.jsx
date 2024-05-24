import { useState ,useEffect } from 'react';
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductsPage from './pages/products';
import CategoriesPage from './pages/categories';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import CartPage from './pages/cart';
import Home from "./pages/home.jsx"
import Root from "./routes/Root.jsx"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/Navbar/ProtectedRoutes.jsx';
import UserContextProvider from './context/User.jsx';
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://ecommerce-node4-five.vercel.app/products")
    .then(response => response.json())
    .then(data => {setData(data.products);})
  },[])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "/",
          element: <Home data={data}/>,
        },
        {
          path: "/products",

          element:  <ProtectedRoutes>
                      <ProductsPage/>
                    </ProtectedRoutes> ,
        },
        {
          path: "/categories",
          element: <CategoriesPage/>,
        },
        {
          path: "/signin",
          element: <SignInPage/>,
        },
        {
          path: "/signup",
          element: <SignUpPage/>,
        },
        {
          path: "/cart",
          element: <CartPage/>,
        },
        {
          path: "*",
          element: <h1>Error 404 not found</h1>
        },
      ]
    },
    
  ]);
  return (
      <>
        <UserContextProvider>
          <RouterProvider router={router}/>
        </UserContextProvider>
        <ToastContainer/>
      </>
  )
}

export default App
