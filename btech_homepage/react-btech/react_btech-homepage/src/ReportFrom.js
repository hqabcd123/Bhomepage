import NavScrollExample from './Component/js/Bootstramp';
import './Component/css/ReportForm.css';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

function ChangePosition(e){
    console.log('hello');
    let x = e.target.offsetLeft;
    let y = e.target.offsetTop;

    let coords = {
        x: e.clintX - e.target.offsetLeft,
        y: e.clintY - e.target.offsetTop,
    }

    return coords;
}


const Cap = () => {

    let [Style, setStyle] = useState({
        position: 'relative',
        right: '0px',
        top: '0px'
    })

    const handleClickEvent = (e) => {
        let newStyle = {...Style};
        console.log(newStyle);
        let temp = ChangePosition(e);
        console.log('temp: ' + temp.x);
        newStyle['right'] = temp.x + 'px';
        setStyle(newStyle)
    };

    return(
        <Draggable>
            <div 
                style={Style}
                onMouseDown={(e) => handleClickEvent(e)}
            >
                <p 
                    className=' text-red-500 text-4xl font-bold text-right'
                    style={Style}
                    // onClick={(e) => handleClickEvent(e)}
                >CONFIDENTIAL</p>
            </div>
        </Draggable>
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