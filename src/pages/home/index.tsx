import {ReactElement, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Form, useActionData} from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export async function action({request}): any{
    try{
        const formData = await request.formData();
        formData.append('content', 'New file!') // guilded require this

        if (formData.get("file[0]").name === ""){
            return {
                error: "File empty!"
            }
        }

        const resp = await fetch(import.meta.env.VITE_WEBHOOK_URL,{
            method: "POST",
            body: formData
        })
        const respJson = await resp.json()
        let url : any = respJson.content.document.nodes[1].data.src.split('?')[0]
        url = url.split('WebhookPrimaryMedia')
        url = `https://cdn.gilcdn.com/WebhookPrimaryMedia${url[1]}`

        const temp : string[] = JSON.parse(localStorage.getItem("url-list"))
        console.log(temp)
        temp.push(url)
        localStorage.setItem("url-list", JSON.stringify(temp))

        return {
            url
        }
    }catch (e) {
        return e
    }
}

const fileTypes: String[] = ["JPG", "PNG", "GIF"];

export default function Home(): ReactElement {
    const [file, setFile] = useState<any>(null)
    const [copied, setCopied] = useState<boolean>(false)

    const actionData = useActionData()

    const handleChange = (file): void => {
        setFile(file);
    };

    return (
        <>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="align-items-center justify-content-center text-center w-50">
                    <Form method={"POST"} encType={"multipart/form-data"}>
                        <FileUploader handleChange={handleChange} name="file[0]" types={fileTypes}/>
                        {
                            actionData?.error ?
                                <p className={"border border-light bg-danger text-white mt-4 border-opacity-50 p-2"}>{actionData?.error}</p>
                                :
                                null
                        }
                        <p className={"border border-primary mt-4 border-opacity-50 p-2"}>{file ? `File name: ${file.name}` : "no files selected yet"}</p>
                        <button type="submit" className="btn btn-light mt-2">Get url!</button>
                    </Form>
                    {
                        actionData?.url ?
                            <div className="mt-4">
                                <CopyToClipboard text={actionData?.url as string} onCopy={() => setCopied(true)}>
                                    <span className={"user-select-all text-wrap"} role={"button"}>{actionData?.url}</span>
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