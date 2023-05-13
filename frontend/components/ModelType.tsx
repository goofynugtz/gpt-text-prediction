
const ModelType = ({ model, setModel }: any) => {
  return (
    <div className='model-selector'>
      <div
        className={`button ${model === '/v1/' ? 'active' : ''}`}
        onClick={() => setModel('/v1/')}
      >Standard</div>
      <div
        className={`button ${model === '/v1/shakespeare/' ? 'active' : ''}`}
        onClick={() => setModel('/v1/shakespeare/')
        }>Shakespeare</div>
      <div
        className={`button ${model === '/v2/' ? 'active' : ''}`}
        onClick={() => setModel('/v2/')
        }>GPT 2</div>
    </div>
  )
}

export default ModelType;