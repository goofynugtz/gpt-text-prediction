import { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { HalfCircleSpinner } from 'react-epic-spinners'

const Prediction = ({model}:any) => {
  const [idleTime, setIdleTime] = useState(0);
  // const [savedText, setSavedText] = useState("Hello");
  const [savedText, setSavedText] = useState("Hello");
  // const [predictiveText, setPredictiveText] = useState('World...');
  const [predictiveText, setPredictiveText] = useState(['World...']);

  const [autocomplete, setAutocomplete] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const onKeyboardActivity = () => setIdleTime(0);

  useEffect(() => {
    // @ts-ignore
    inputRef.current.focus();
  }, [predictiveText])

  useEffect(() => {
    let interval: any = null;
    const onIntervalTick = () => {
      if (idleTime < 300) {
        setIdleTime(idleTime + 1);
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
    setLoading(true)
    console.log(`${process.env.NEXT_PUBLIC_API}${model}`)
    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}${model}`, {
      "body": savedText
    });
    let cutout = savedText?.length
    res['data'] = res['data'].slice(cutout)
    let _data: any = String(res['data']).match(/(\b\W?\w+\'*\w\b'?)/g)
    const n = _data.length
    let _placeholder: any = []
    for (let i = 0; i < n; i++) {
      (function(i){
        setTimeout(() => {
          _placeholder = [..._placeholder, _data[i]]
          setPredictiveText(_placeholder)
          console.log(_placeholder)
        }, Math.random()*i*500);
      })(i)
    }
    setLoading(false)
  }

  useEffect(() => {
    // @ts-ignore
    if (idleTime >= 300 && inputRef.current?.value.length > 0) f();
  }, [idleTime]);

  function handleChange(e: any) {
    const { value } = e.target;
    setSavedText(value);
  }

  const onKeyDown = (e: any) => {
    if (e.key === "Tab") {
      e.preventDefault();
      console.log(predictiveText);
      if (predictiveText.length >= 1) {
        if (wordCount === 0) {
          console.log('haha')
          // @ts-ignore
          inputRef.current.value = savedText + " " + predictiveText[0];
        } else {
          // @ts-ignore
          inputRef.current.value = savedText + predictiveText[0];
        }
        setSavedText(savedText + " " + predictiveText[0]);
        predictiveText.shift();
        setPredictiveText(predictiveText);
      }
    }
    else if (predictiveText[0] != undefined && e.key === predictiveText[0][0]) {
      setAutocomplete(true)
      let _temp = predictiveText[0];
      setSavedText(savedText + _temp[0]);
      if (_temp.slice(1).length > 0) {
        predictiveText[0] = _temp.slice(1)
      } else {
        predictiveText.shift()
      }
      setPredictiveText(predictiveText)
    }
    else setAutocomplete(false)
  };

  return (
    <>
      <div className="header">
        {
          autocomplete ?
            <span className="input-text">{savedText} </span> : <span className="input-text">{savedText} </span>
        }
        {
          loading ?
            <HalfCircleSpinner className="spinner" size={50} /> : <></>
        }
        <span className="output-prediction"> {
          predictiveText.map((e, i: any) => <span key={i}> {e}</span>)
        }</span>
        <input type="text" className="textbox" ref={inputRef} placeholder="Start typing here" onChange={handleChange} onKeyDown={onKeyDown} />
      </div>
    </>
  )
}

export default Prediction;