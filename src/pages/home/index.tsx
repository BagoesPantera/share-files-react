import {ReactElement, useRef, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Form} from "react-router-dom";

export async function action({request}): Promise<void>{
    try{
        const formData = await request.formData();
        formData.append('content', 'New file!') // guilded require this

        const resp = await fetch(import.meta.env.VITE_WEBHOOK_URL,{
            method: "POST",
            body: formData
        })
        const respJson = await resp.json()
        const url = respJson.content.document.nodes[1].data.src.split('?')[0]

        // console.log(formData)
        console.log(url)
        return null
    }catch (e) {
        return e
    }
}

const fileTypes: String[] = ["JPG", "PNG", "GIF"];

export default function Home(): ReactElement {
    const [file, setFile]: any = useState(null);
    const form = useRef(null)
    const handleChange = (file): void => {
        setFile(file);
        // form.current.submit()
        console.log(file)
    };

    return (
        <>
            <Form method={"POST"} encType={"multipart/form-data"} ref={form}>
                <FileUploader handleChange={handleChange} name="file[0]" types={fileTypes} required={true} />
                <button type="submit">klik</button>
            </Form>
            <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
        </>
    )
}