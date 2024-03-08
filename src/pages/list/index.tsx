import {ReactElement} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

export default function List(): ReactElement {

    const urlLists : string[] = JSON.parse(localStorage.getItem("url-list"))

    return (
        <>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="flex align-items-center justify-content-center w-50">
                    <table className="table table-active">
                        <thead className={"text-center"}>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Url</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            urlLists.map((urlList : string, index : number) => (
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <CopyToClipboard text={urlList} onCopy={() => alert("Copied!")}>
                                        <td  role={"button"}>{urlList}</td>
                                    </CopyToClipboard>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}