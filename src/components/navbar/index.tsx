import {NavLink} from "react-router-dom";
import {ReactElement} from "react";

export default function Navbar(): ReactElement{
    return (
        <div className={"position-absolute w-100"}>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Shary</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav ms-auto">
                            <NavLink to={"/"} className={"nav-link"}>Home</NavLink>
                            <NavLink to={"/about"} className={"nav-link"}>About</NavLink>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}