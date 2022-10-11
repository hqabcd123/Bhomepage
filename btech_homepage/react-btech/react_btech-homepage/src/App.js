import './App.css';
import React, {useEffect, useState} from 'react';
import FileUploadUI from './Component/js/ImageUpload';
import NavScrollExample from './Component/js/Bootstramp';


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
    <div className='State-form'>
      <form method="post">
      {inputfield.map((form, index) => {
          return (
            <div key={index}>
              <input type="checkbox"
                name="check"
                onChange={e => handleChangeEvent(e, index)}
              />
              <input
                name='air'
                placeholder='air'
                onChange={e => handleChangeEvent(e, index)}
                value={form.air}
              />
              <input
                name='suray'
                placeholder='suray'
                onChange={e => handleChangeEvent(e, index)}
                value={form.suray}
              />
              <input
                name='pump'
                placeholder='pump'
                onChange={e => handleChangeEvent(e, index)}
                value={form.pump}
              />
              <button type='button' onClick={() => handleRemoveEvent(index)}>Remove</button>
            </div>
          )
        })}
        <button type='button' onClick={handleOnClickEvent}>insert</button>
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

const Command = () => {
  return(
    <div className='Command'>
    <a>コメント：</a>
      <textarea name="command" id="" cols="20" rows="5"></textarea>
    </div>
  );
}


function App() {
  useEffect(() => {
    document.title = "report"
  });
  return (
    <div className="App">
      <NavScrollExample></NavScrollExample>
      <StatementForm></StatementForm>
      <FileUploadUI></FileUploadUI>
      <Command></Command>
    </div>
  );
}

export default App;
