import { useState } from 'react'

function Safra() {
  // Safra possui nome e periodo com datas de inicio e fim.
  const [nomeSafra, setNomeSafra] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (nomeSafra.trim() === '') novosErros.nomeSafra = 'Informe o nome da safra'
    if (dataInicio.trim() === '') novosErros.dataInicio = 'Informe a data de inicio'
    if (dataFim.trim() === '') novosErros.dataFim = 'Informe a data de fim'
    setErros(novosErros)
    const temErros = Object.keys(novosErros).length > 0
    setSalvo(!temErros)
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de Safra</h2>
      {salvo && <div className="alert alert-success">Safra cadastrada com sucesso!</div>}
      <form onSubmit={salvar} noValidate>
        <div className="mb-3"><label htmlFor="nomeSafra" className="form-label">Nome da Safra</label><input id="nomeSafra" className={`form-control ${erros.nomeSafra ? 'is-invalid' : ''}`} value={nomeSafra} onChange={(event) => setNomeSafra(event.target.value)} />{erros.nomeSafra && <div className="invalid-feedback">{erros.nomeSafra}</div>}</div>
        <div className="mb-3"><label htmlFor="dataInicio" className="form-label">Data de Inicio</label><input id="dataInicio" type="date" className={`form-control ${erros.dataInicio ? 'is-invalid' : ''}`} value={dataInicio} onChange={(event) => setDataInicio(event.target.value)} />{erros.dataInicio && <div className="invalid-feedback">{erros.dataInicio}</div>}</div>
        <div className="mb-3"><label htmlFor="dataFim" className="form-label">Data de Fim</label><input id="dataFim" type="date" className={`form-control ${erros.dataFim ? 'is-invalid' : ''}`} value={dataFim} onChange={(event) => setDataFim(event.target.value)} />{erros.dataFim && <div className="invalid-feedback">{erros.dataFim}</div>}</div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default Safra
