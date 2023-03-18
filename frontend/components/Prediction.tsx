import { useState, useEffect, useRef } from "react";

const Prediction = () => {

  const [text, setText] = useState("Hello");
  const [predictiveText, setPredictiveText] = useState(['my', 'name', 'is', 'Rahul', 'R']);

  const inputRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    inputRef.current.focus();
  }, [])

  function handleChange(e: any) {
    const { value } = e.target;
    setText(value);
  }

  function onKeyDown(e:any) {
    if (e.key === "Tab") {
      e.preventDefault();
      if (predictiveText.length >= 1){
        // @ts-ignore
        inputRef.current.value = text + ' ' + predictiveText[0];
        setText(text + " " + predictiveText[0]);
        predictiveText.shift();
      }
    }
  };

  return (
    <>
    <div className="header">
      <span className="input-text">{text} </span> 
      <span className="output-prediction">{
        predictiveText.map((word) => (<span key={word}>{word} </span>))
      }</span>
    </div>
    <input type="text" className="textbox" ref={inputRef} placeholder="Start typing here" onChange={handleChange} onKeyDown={onKeyDown}/>
    </>
  )
}

export default Prediction;