import { useState } from "react"
import '../css/ImageUpload.css';


function FileUploadUI() {

    const [file, setfile] = useState([]);

    const ColObj = {
        0:'grid-cols-1',
        1:'grid-cols-2',
        2:'grid-cols-3',
        3:'grid-cols-4',
    };

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

    const converseCol = (index) => {
        let newIndex = 0;
        if (index > 3) newIndex = index%3;
        else newIndex = index;
        console.log('index: ' + newIndex);
        console.log(ColObj[newIndex]);
        return ColObj[newIndex];
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
                            <img className={converseCol(index)} src={URL.createObjectURL(image)} alt=""/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default FileUploadUI