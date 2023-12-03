import React, { useEffect, useState } from 'react'
import { AiOutlineControl } from 'react-icons/ai'

function Controls(props) {
  const { videoConfig, setVideoConfig } = props;
  const [open, setOpen] = useState(false);
  
  const [play, setPlay] = useState(false);
  const [frontFile, setFrontFile] = useState('');
  const [backFile, setBackFile] = useState('');

  useEffect(() => {
  }, [play, frontFile, backFile]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const monitor = e.target.id;

    if (monitor === 'front') {
      setFrontFile(URL.createObjectURL(file));
    } else {
      setBackFile(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    setVideoConfig({
      'file-front': frontFile,
      'file-back': backFile,
      'state': play ? 'play' : 'pause',
      'time': '0'
    });
  }, [frontFile, backFile, play]);

  return (
    <div className='controls-wrapper'>
      {!open && <div className='controls-bubble' onClick={() => {setOpen(true)}}>
        <AiOutlineControl size={"3rem"} color='white' />
      </div>}
      {open && <div className='controls-container'>
        <div className='controls-header'>Controls</div>
        <div className='controls-body'>
          <button id='play' onClick={() => {setPlay(val => !val)}}>{!play ? "Play" : "Pause"}</button>
          <input className='file-upload' id='front' type="file" name="file" onChange={handleFileUpload} />
          <input className='file-upload' id='back' type="file" name="file" onChange={handleFileUpload} />
          <button id='close' onClick={() => {setOpen(false)}}>Close</button>
        </div>
      </div>}
    </div>
  )
}

export default Controls