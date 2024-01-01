import {ReactElement, useRef, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Form, NavLink, useActionData} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export async function action({request}): Promise<void>{
    try{
        const formData = await request.formData();
        formData.append('content', 'New file!') // guilded require this

        if (formData.get("file[0]").name === ""){
            return null
        }

        const resp = await fetch(import.meta.env.VITE_WEBHOOK_URL,{
            method: "POST",
            body: formData
        })
        const respJson = await resp.json()
        const url = respJson.content.document.nodes[1].data.src.split('?')[0]

        // console.log(formData)
        console.log(url)
        return url
    }catch (e) {
        return e
    }
}

const fileTypes: String[] = ["JPG", "PNG", "GIF"];

export default function Home(): ReactElement {
    const [file, setFile] = useState<any>(null)
    const [copied, setCopied] = useState<boolean>(false)
    const [preview, setPreview] = useState(null)
    const form = useRef(null)

    const url = useActionData()
    const handleChange = (file): void => {
        setFile(file);
        // form.current.submit()
        console.log(file)
    };

    return (
        <>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="align-items-center justify-content-center text-center w-50">
                    <Form method={"POST"} encType={"multipart/form-data"} ref={form}>
                        <FileUploader handleChange={handleChange} name="file[0]" types={fileTypes} required={false}/>
                        <p className={"border border-primary mt-4 border-opacity-50 p-2"}>{file ? `File name: ${file.name}` : "no files selected yet"}</p>
                        <button type="submit" className="btn btn-light mt-2">Get url!</button>
                    </Form>
                    {
                        url ?
                            <div className="mt-4">
                                <CopyToClipboard text={url as string} onCopy={() => setCopied(true)}>
                                    <span className={"user-select-all text-wrap"} role={"button"}>{url}</span>
                                </CopyToClipboard>
                            </div>
                            :
                            null
                    }
                    {copied ? <p className={"text-success mt-2"}>Copied.</p> : null}
                </div>
            </div>
        </>
    )
}