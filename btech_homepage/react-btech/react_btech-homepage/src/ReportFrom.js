import './Component/css/ReportForm.css';
import Draggable from 'react-draggable';
import { useEffect, useState } from 'react';
import axios from 'axios';

//https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable
//useful source code for develop own draggable elemnt


const RedHeader = (props) => {

    let [DetalPosition, setDetalPosition] = useState({
        x: 0,
        y: 0,
    });

    const handleDrag = (e, ui) => {
        let x = DetalPosition.x + ui.deltaX;
        let y = DetalPosition.y + ui.deltaY;
        console.log(DetalPosition.x);
        setDetalPosition({
            x: x,
            y: y,
        });
    }

    return(
        <Draggable 
            onDrag={(e, ui) => handleDrag(e, ui)}
            position={null}
        >
            <div >
                <p 
                    className=' text-red-500 text-4xl font-bold text-right'
                    // onClick={(e) => handleClickEvent(e)}
                >{props.name}</p>
                <br />
                <p className=' text-right'>x: {DetalPosition.x}, y: {DetalPosition.y} </p>
            </div>
        </Draggable>
    );
}

const StateMentSheet = (props) => {
    const [Sheet, setSheet] = useState(null);

    useEffect(() => {
        const baseURL = ''
        const getData = () => {
            axios.get(baseURL).then(res => {
                setSheet(res.data);
            })
        }
    }, [])

    return (
        <div>
            //
        </div>
    );
}

function ReportForm() {

    return (
        <div>
            {/* <NavScrollExample></NavScrollExample> */}
            <RedHeader name="CONFIDENTIAL"></RedHeader>
            ReportForm
        </div>

    );
}

export default ReportForm;