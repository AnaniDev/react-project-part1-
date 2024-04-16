import Navbar from "./../components/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";

function Root (){
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}

export default Root;