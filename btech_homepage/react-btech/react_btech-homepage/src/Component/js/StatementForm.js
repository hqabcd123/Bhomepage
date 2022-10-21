import { useState } from "react"
import '../css/ImageUpload.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function StatementForm() {
    let [inputfield, setinputfield] = useState([
      {
        regulator: '',
        suray: '',
        pump: '',
        check: false,
      }
    ])
  
    const navigate = useNavigate();
    
    
    const handleOnClickEvent = (e, index) => {
      let newfield = {
        regulator: '',
        suray: '',
        pump: '',
        check: false,
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
        const body = {
          statement: inputfield,
          command: CommandData,
          img: [...fileLink],
        }
        const baseUrl = 'http://localhost:8000/report/react/'
        console.log(body);
  
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
    const [file, setfile] = useState([]);
    const [fileLink, setfileLink] = useState([]);
  
    // const data = new FormData();
    // file.map((image) => {
    //     data.append("images[]", image);
    //     return null;
    // });
  
    const handleIMGChangeEvent = async(e) => {
        if (!e.target.files) return;
        setfile(file => ([...file, ...e.target.files]));

        let temp = []
        const fs = Array.from(e.target.files);
        fs.map((filel) => {
            temp.push(URL.createObjectURL(filel));
            return null;
        })
        let newfileLink = [...fileLink];
        temp.map(data => {
          newfileLink.push(data);
          return null;
        })
        setfileLink(newfileLink);
    };
  
  
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
                    name='regulator'
                    className=' border-2 border-black '
                    placeholder='air'
                    onChange={e => handleChangeEvent(e, index)}
                    value={form.regulator}
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
                    onChange={handleIMGChangeEvent}
                />
            </div>
            <div className=" grid grid-cols-4 gap-4 ">
                {fileLink.map((image, index) => {
                    return (
                        <div id="image" key={index}>
                          <textarea className=" border-2 border-soild border-black "></textarea>
                          <p>{image}</p>
                          <img className=" object-cover h-48 " src={image} alt=""/>
                        </div>
                    );
                })}
            </div>
        </div>
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
export default StatementForm