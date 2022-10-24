import './App.css';
import React, {useEffect, useState} from 'react';
import NavScrollExample from './Component/js/Bootstramp';
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import ReportForm from './ReportFrom';
import StatementForm from './Component/js/StatementForm'

const CustomerName = (props) => {
  return (
    <div>
      <p className=' text-xl '>お客先名：{props.name}</p>
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
