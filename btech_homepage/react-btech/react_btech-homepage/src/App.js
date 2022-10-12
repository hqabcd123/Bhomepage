import './App.css';
import React, {useEffect, useState} from 'react';
import FileUploadUI from './Component/js/ImageUpload';
import NavScrollExample from './Component/js/Bootstramp';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ReportForm from './ReportFrom';

function StatementForm() {
  let count = 0;
  const [inputfield, setinputfield] = useState([
    {
      id:count++,
      check: 'off',
      air: '',
      suray: '',
      pump: '',
    }
  ])
  
  const handleOnClickEvent = () => {
    let newfield = {
      id:count++,
      check: 'off',
      air: '',
      suray: '',
      pump: '',
    }
    setinputfield([...inputfield, newfield]);
  };

  const handleChangeEvent = (e, index) => {
    let newfield = [...inputfield];
    newfield[index][e.target.name] = e.target.value
    console.log(inputfield);
    setinputfield(newfield);
  };

  const handleRemoveEvent = (index) => {
    let newfield = [...inputfield];
    newfield.splice(index, 1);
    setinputfield(newfield);
  }

  return (
    <div>
      <div className='State-form grid grid-cols-1 gap-y-2'>
        {inputfield.map((form, index) => {
            return (
              <div key={index} className=" grid grid-cols-7" >
                <span className=' basis-1 '>レポートに載せますか？</span>
                <input type="checkbox"
                  name="check"
                  className=' basis-1 '
                  onChange={e => handleChangeEvent(e, index)}
                />
                <span className=' basis-1 ' >条件データ:</span>
                <input
                  name='air'
                  className=' border-2 border-black '
                  placeholder='air'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.air}
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
    </div>
  );
}

const Command = () => {
  return(
    <div >
    <p className=' text-lg '>コメント：</p>
      <textarea name="command" id="" className='
        w-full text-base
        border-2 border-soild border-black
        ease-in-out
      ' ></textarea>
    </div>
  );
}

function Main(){

  const navigate = useNavigate();

  const toJson = async (res) => {
    const json = await res.json();
    console.log(json);
    return json;
  }

  const handleAPIEvent = async () => {
    const res = await fetch('http://localhost:8000/report/react/', {
      method: 'GET',
    })
    return await toJson(res);
  }

  return(
    <div >
      <form action="" method="post">
        <StatementForm></StatementForm>
        <FileUploadUI></FileUploadUI>
        <Command></Command>
        <button onClick={() => navigate('/reportForm')}>レポート作成</button>
      </form>
      <button onClick={handleAPIEvent} >Here</button>
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
