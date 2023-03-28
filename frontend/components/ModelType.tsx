
const ModelType = ({ model, setModel }: any) => {
  return (
    <div className='model-selector'>
      <div className={`button ${model === '' ? 'active' : ''}`} 
        onClick={() => {  
        setModel('');
      }}>Standard</div>
      <div className={`button ${model === '/shakespeare' ? 'active' : ''}`} 
        onClick={() => {
        setModel('/shakespeare')
      }}>Shakespeare</div>
    </div>
  )
}

export default ModelType;