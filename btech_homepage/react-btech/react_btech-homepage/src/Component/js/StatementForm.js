import { useState } from "react"
import '../css/ImageUpload.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function StatementForm() {
  const list = {
    apparatus: '',
    gun: '',
    regulator: '',
    suray: '',
    pump: '',
    surayflow:'',
    check: false,
  };

  const state = {
    '装置':'apparatus',
    '研磨材':'suray',
    'エア圧':'regulator',
    '処理速度':'speed',
    '処理時間':'time',
    '投射距離':'distance',
    '投射角度':'angal',
    '回転数':'round',
    'ポンプ圧':'pump',
    'スラリー流量':'surayfo',
  };

  const surayBrowser = [
    'WA#320',
    'WA#2000',
    'WA#800',
    'GH0.1-0.2',
  ];

  let [inputfield, setinputfield] = useState([
    list
  ])

  const navigate = useNavigate();
  
  
  const handleOnClickEvent = (e, index) => {
    let newfield = list;
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

  const [fileLink, setfileLink] = useState([]);
  const handleIMGChangeEvent = async(e) => {
      if (!e.target.files) return;

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
      let newIMGCommand = [...IMGCommand];
      for (let i = 0; i < temp.length; i++) {
        newIMGCommand.push({IMGbox:false, command:''});
      }
      setfileLink(newfileLink);
      setIMGCommand(newIMGCommand);
      console.log(newIMGCommand);
  };

  const [IMGCommand, setIMGCommand] = useState([])
  const handleIMGCommandEvent = (e, index) => {
    let newFileCommand = [...IMGCommand];
    newFileCommand[index][e.target.name] = e.target.value;
    setIMGCommand(newFileCommand);
    console.log(newFileCommand);
  }
  const handleIMGCheckBoxEvent = (e, index) => {
    let newFileCommand = [...IMGCommand];
    newFileCommand[index][e.target.name] = (newFileCommand[index][e.target.name] === true? false : true);
    setIMGCommand(newFileCommand);
    console.log(newFileCommand);
  }


  return (
    <div>
      <datalist id="surayBrowser">
        {surayBrowser.map((form, index) => {
          return <option value={form}></option>;
        })}
      </datalist>
      <div className='State-form grid grid-cols-1 gap-y-2'>
        {inputfield.map((form, index) => {
            return (
              <div key={index} className=" grid grid-cols-12" >
                <span className=' basis-1 '>レポートに載せますか？</span>
                <input type="checkbox"
                  name={'check'}
                  className=' basis-1 '
                  onChange={e => handleChekcboxChangeEvent(e, index)}
                />
                <span className=' basis-1 ' >条件データ:</span>
                <input
                  name='apparatus'
                  className=' border-2 border-black '
                  placeholder='装置'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form['apparatus']}
                />
                <input
                  name='gun'
                  className=' border-2 border-black '
                  placeholder='ガン'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form['gun']}
                />
                <input
                  name='regulator'
                  className=' border-2 border-black '
                  placeholder='エア圧'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.regulator}
                />
                <input
                  list="surayBrowser"
                  name='suray'
                  className=' border-2 border-black '
                  placeholder='研磨材'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.suray}
                />
                <input
                  name='regulator'
                  className=' border-2 border-black '
                  placeholder='処理速度'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.regulator}
                />
                <input
                  name='regulator'
                  className=' border-2 border-black '
                  placeholder='処理時間'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.regulator}
                />
                <input
                  name='regulator'
                  className=' border-2 border-black '
                  placeholder='投射距離'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.regulator}
                />
                <input
                  name='regulator'
                  className=' border-2 border-black '
                  placeholder='投射角度'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.regulator}
                />
                <input
                  name='regulator'
                  className=' border-2 border-black '
                  placeholder='回転数'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.regulator}
                />
                <input
                  name='pump'
                  className=' border-2 border-black '
                  placeholder='ポンプ圧'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.pump}
                />
                <input
                  name='surayflow'
                  className=' border-2 border-black '
                  placeholder='スラリー流量'
                  onChange={e => handleChangeEvent(e, index)}
                  value={form.surayflow}
                />
                <input
                  name='pump'
                  className=' border-2 border-black '
                  placeholder='ポンプ圧'
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
                        <input type="checkbox" name="IMGbox" onChange={(e) => handleIMGCheckBoxEvent(e, index)} />
                        <input
                          name="command" 
                          className=" border-2 border-soild border-black "
                          onChange={e => handleIMGCommandEvent(e, index)}
                        ></input>
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
      <p onClick={() => {navigate('/reportForm')}}>aaaaaa</p>
    </div>
  );
}
export default StatementForm