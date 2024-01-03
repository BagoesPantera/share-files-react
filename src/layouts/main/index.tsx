import Navbar from "../../components/navbar";
import {Outlet} from "react-router-dom";
import {ReactElement} from "react";

export default function MainLayout(): ReactElement {

    // set the localstorage first so there is no error xD
    if (localStorage.getItem("url-list") == null){
        localStorage.setItem("url-list", JSON.stringify([]))
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}