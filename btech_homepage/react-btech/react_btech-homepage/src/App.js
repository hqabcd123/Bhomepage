import './App.css';
import React, {useEffect, useState} from 'react';
import FileUploadUI from './Component/js/ImageUpload';
import NavScrollExample from './Component/js/Bootstramp';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import ReportForm from './ReportFrom';
import axios from "axios";

const CustomerName = (props) => {
  return (
    <div>
      <p className=' text-xl '>お客先名：{props.name}</p>
    </div>
  );
}

function StatementForm() {
  let [inputfield, setinputfield] = useState([
    {
      regular: '',
      suray: '',
      pump: '',
    }
  ])

  const navigate = useNavigate();
  
  
  const handleOnClickEvent = (e, index) => {
    let newfield = {
      regular: '',
      suray: '',
      pump: '',
    }
    setinputfield([...inputfield, newfield]);
  };

  const handleChangeEvent = (e, index) => {
    let newfield = [...inputfield];
    newfield[index][e.target.name] = e.target.value;
    setinputfield(newfield);
  };

  const handleChekcboxChangeEvent = (e, index) => {
    let newfield = [...inputfield];
    newfield[index][e.target.name] = (newfield[index][e.target.name] === true? false : true);
    console.log(newfield);
    setinputfield(newfield);
  };

  const handleRemoveEvent = (index) => {
    let newfield = [...inputfield];
    newfield.splice(index, 1);
    setinputfield(newfield);
  }

  const PostData = async () => {
    try {
      console.log(inputfield);
      console.log(CommandData);
      const body = {
        statement: inputfield,
        command: CommandData,
      }
      const baseUrl = 'http://localhost:8000/report/react/'

      await axios.post(baseUrl, body, {headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
        .then((response) => {
          //navigate('/reportForm');
          return response.data;
        });
    } catch (error) {
      //alert(error);
    }
  }
  let [CommandData, setCommandData] = useState('');

  const handleCommandChangeEvent = (e) => {
    setCommandData(e.target.value);
  }
      

  return (
    <div>
      <div className='State-form grid grid-cols-1 gap-y-2'>
        {inputfield.map((form, index) => {
            return (
              <div key={index} className=" grid grid-cols-10" >
              <span> {index}: </span>
                <span className=' basis-1 '>レポートに載せますか？</span>
                <input type="checkbox"
                  name={'check'}
                  className=' basis-1 '
                  onChange={e => handleChekcboxChangeEvent(e, index)}
                />
                <span className=' basis-1 ' >条件データ:</span>
                <input
                  name='regular'
                  className=' border-2 border-black '
                  placeholder='air'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.regular}
                />
                <input
                  name='suray'
                  className=' border-2 border-black '
                  placeholder='suray'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.suray}
                />
                <input
                  name='pump'
                  className=' border-2 border-black '
                  placeholder='pump'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.pump}
                />
                <button type='button' onClick={() => handleRemoveEvent(index)}>Remove</button>
              </div>
            )
          })}
      </div>
      <button type='button' onClick={handleOnClickEvent}>insert</button>
      <FileUploadUI></FileUploadUI>
      <div >
        <p className=' text-lg '>コメント：</p>
          <textarea name="command" id="" className='
            w-full text-base
            border-2 border-soild border-black
            ease-in-out'
            onChange={(e) => handleCommandChangeEvent(e)}
            value={CommandData}
        ></textarea>
      </div>
      <button onClick={PostData}>レポート作成</button>
    </div>
  );
}



function Main(){

  let [customerName, setcustomerName] = useState('')

  const toJson = async (res) => {
    const json = await res.json();
    return json;
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('http://localhost:8000/report/react/', {
        method: 'GET',
      })
      res = await toJson(res);
      setcustomerName(res['customer_name']);
    }
    fetchData();
  }, [])

  

  return(
    <div >
      <CustomerName name={customerName}></CustomerName>
      <StatementForm></StatementForm>
      <Link to='/reportForm'>awarwd</Link>
      <br />
    </div>
  );
}

function App() {

  useEffect(() => {
    document.title = "report"
  }, []);

  return (
    <div className="App">
      
      <BrowserRouter>
        <NavScrollExample></NavScrollExample>
        <Routes>
          <Route 
            path='/' element={<Main></Main>}
          />
          <Route 
            path='/reportForm' element={<ReportForm></ReportForm>}
          />
          <Route
            path='*' element={ <div>404 NOT FOUND</div> }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
