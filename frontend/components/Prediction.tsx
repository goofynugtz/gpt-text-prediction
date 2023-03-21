import { useState, useEffect, useRef } from "react";
import axios from 'axios';

const Prediction = () => {
  const [idleTime, setIdleTime] = useState(0);
  const [savedText, setSavedText] = useState("Hello");
  const [predictiveText, setPredictiveText] = useState('World...');
  const [autocomplete, setAutocomplete] = useState(false);
  const inputRef = useRef(null);
  
  const onKeyboardActivity = () => setIdleTime(0);
  
  useEffect(() => {
    // @ts-ignore
    inputRef.current.focus();
  })
  
  useEffect(() => {
    let interval: any = null;
    const onIntervalTick = () => {
      if (idleTime < 300){
        setIdleTime(idleTime+1);
      }
    }
    interval = setInterval(onIntervalTick, 2);
    window.addEventListener("keydown", onKeyboardActivity);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", onKeyboardActivity);
    };
  });
  
  async function f() {
    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/`, {
        "body": savedText
      }
    );
    let cutout = savedText?.length
    res['data'] = res['data'].slice(cutout)
    setPredictiveText(res['data'])
  }

  useEffect(() => {
    if (idleTime >= 300) {
      // @ts-ignore
      if (inputRef.current?.value.length > 0){
        f();
      }
    }
  }, [idleTime]);

  function handleChange(e: any) {
    const { value } = e.target;
    setSavedText(value);
  }

  const onKeyDown = (e:any) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (predictiveText.length >= 1){
        let _predictiveText:any = String(predictiveText).match(/(\b\W?\w+\'*\w\b'?)/g)
        // @ts-ignore
        inputRef.current.value = savedText + " " + _predictiveText[0];
        setSavedText(savedText + " " + _predictiveText[0]);
        _predictiveText.shift()
        setPredictiveText(_predictiveText);
      }
    }
    else if(e.key === predictiveText[0]){
      setAutocomplete(true)
      let _temp = predictiveText;
      setSavedText(savedText + _temp[0]);
      setPredictiveText(_temp.slice(1))
      // setAutocomplete(false)
    }
    else setAutocomplete(false)
  };

  return (
    <>
    <div className="header">
      {
      autocomplete? 
      <span className="input-text">{savedText}</span>
      :
      <span className="input-text">{savedText} </span>
      }
      <span className="output-prediction">{predictiveText}</span>
    </div>
    <input type="text" className="textbox" ref={inputRef} placeholder="Start typing here" onChange={handleChange} onKeyDown={onKeyDown}/>
    </>
  )
}

export default Prediction;