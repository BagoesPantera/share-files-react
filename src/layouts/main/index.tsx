import Navbar from "../../components/navbar";
import {Outlet} from "react-router-dom";
import {ReactElement} from "react";

export default function MainLayout(): ReactElement {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}