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
            <h3>Add image: </h3>
            <input type="file"
                multiple
                accept="image/*,.png,.jpg,.jpeg,.gif"
                onChange={handleChangeEvent}
            />
            {file.map((image, index) => {
                return (
                    <div id="image" key={index}>
                        <img className={converseCol(index)} src={URL.createObjectURL(image)} alt=""/>
                    </div>
                );
            })}
        </div>
    );
}
export default FileUploadUI