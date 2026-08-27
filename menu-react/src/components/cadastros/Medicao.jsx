import { useState } from 'react'

function Medicao() {
  // Medicao relaciona Safra, Equipamento e TipoInformacao.
  const [safra, setSafra] = useState('')
  const [equipamento, setEquipamento] = useState('')
  const [tipoInformacao, setTipoInformacao] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (safra.trim() === '') novosErros.safra = 'Selecione a safra'
    if (equipamento.trim() === '') novosErros.equipamento = 'Selecione o equipamento'
    if (tipoInformacao.trim() === '') novosErros.tipoInformacao = 'Selecione o tipo de informacao'
    if (valor.trim() === '') novosErros.valor = 'Informe o valor'
    if (data.trim() === '') novosErros.data = 'Informe a data'
    setErros(novosErros)
    const temErros = Object.keys(novosErros).length > 0
    setSalvo(!temErros)
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de Medicao</h2>
      {salvo && <div className="alert alert-success">Medicao cadastrada com sucesso!</div>}
      <form onSubmit={salvar} noValidate>
        <div className="mb-3"><label htmlFor="medicao-safra" className="form-label">Safra</label><select id="medicao-safra" className={`form-select ${erros.safra ? 'is-invalid' : ''}`} value={safra} onChange={(event) => setSafra(event.target.value)}><option value="">Selecione</option><option value="Safra 2025">Safra 2025</option><option value="Safra 2026">Safra 2026</option></select>{erros.safra && <div className="invalid-feedback">{erros.safra}</div>}</div>
        <div className="mb-3"><label htmlFor="medicao-equipamento" className="form-label">Equipamento</label><select id="medicao-equipamento" className={`form-select ${erros.equipamento ? 'is-invalid' : ''}`} value={equipamento} onChange={(event) => setEquipamento(event.target.value)}><option value="">Selecione</option><option value="Sensor 01">Sensor 01</option><option value="Sensor 02">Sensor 02</option></select>{erros.equipamento && <div className="invalid-feedback">{erros.equipamento}</div>}</div>
        <div className="mb-3"><label htmlFor="medicao-tipo" className="form-label">TipoInformacao</label><select id="medicao-tipo" className={`form-select ${erros.tipoInformacao ? 'is-invalid' : ''}`} value={tipoInformacao} onChange={(event) => setTipoInformacao(event.target.value)}><option value="">Selecione</option><option value="Temperatura">Temperatura</option><option value="Umidade">Umidade</option></select>{erros.tipoInformacao && <div className="invalid-feedback">{erros.tipoInformacao}</div>}</div>
        <div className="mb-3"><label htmlFor="medicao-valor" className="form-label">Valor</label><input id="medicao-valor" type="number" step="0.01" className={`form-control ${erros.valor ? 'is-invalid' : ''}`} value={valor} onChange={(event) => setValor(event.target.value)} />{erros.valor && <div className="invalid-feedback">{erros.valor}</div>}</div>
        <div className="mb-3"><label htmlFor="medicao-data" className="form-label">Data</label><input id="medicao-data" type="datetime-local" className={`form-control ${erros.data ? 'is-invalid' : ''}`} value={data} onChange={(event) => setData(event.target.value)} />{erros.data && <div className="invalid-feedback">{erros.data}</div>}</div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default Medicao
