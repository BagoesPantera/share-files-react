import {ReactElement, useRef, useState} from "react";

export default function About(): ReactElement {


    return (
        <>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="align-items-center justify-content-center text-center w-50">
                    <p>Hello! This project used webhook from Guilded to store your files. For now, max file size is 500MB.</p>
                </div>
            </div>

        </>
    )
}