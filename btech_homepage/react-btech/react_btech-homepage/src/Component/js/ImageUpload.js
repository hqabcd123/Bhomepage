import { useState } from "react"
import '../css/ImageUpload.css';


function FileUploadUI() {

    const [file, setfile] = useState([]);

    const data = new FormData();
    file.map((image) => {
        data.append("images[]", image);
        return null;
    });

    const handleChangeEvent = (e) => {
        if (!e.target.files) return;
        console.log(e.target.files);
        console.log(...e.target.files);
        setfile(file => ([...file, ...e.target.files]));
    };

    return (
        <div>
            <div className=" object-cover h-48 w-96 ">
                <h3 className=" text-lg ">写真をアップロード: </h3>
                <input type="file"
                    className="
                    block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-none 
                    file:text-base file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    "
                    multiple
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={handleChangeEvent}
                />
            </div>
            <div className=" grid grid-cols-4 gap-4 ">
                {file.map((image, index) => {
                    return (
                        <div id="image" key={index}>
                            <img src={URL.createObjectURL(image)} alt=""/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default FileUploadUI