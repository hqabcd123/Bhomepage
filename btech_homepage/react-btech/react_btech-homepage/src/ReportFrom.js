import NavScrollExample from './Component/js/Bootstramp';
import './Component/css/ReportForm.css';
import { useState } from 'react';

function changePosition(){
    //do something
}


const Cap = () => {

    let [Style, setStyle] = useState({
        position: 'absolute',
        right: '100px',
        top: '25px'
    })

    const handleClickEvent = () => {
        let newStyle = {...Style};
        console.log(newStyle);
        newStyle['right'] = '500px';
        setStyle(newStyle)
    };

    return(
        <div style={Style}>
            <p 
                className=' text-red-500 text-4xl font-bold text-right'
                style={Style}
                onClick={handleClickEvent}
            >CONFIDENTIAL</p>
        </div>
    );
}


function ReportForm() {
    return (
        <div>
            <NavScrollExample></NavScrollExample>
            <Cap></Cap>
            ReportForm
        </div>

    );
}

export default ReportForm;