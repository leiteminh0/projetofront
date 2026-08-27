import { useState } from 'react'

function Equipamento() {
  // Equipamento possui nome e relacionamento com Unidade.
  const [nome, setNome] = useState('')
  const [unidade, setUnidade] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (unidade.trim() === '') novosErros.unidade = 'Selecione a unidade'
    setErros(novosErros)
    const temErros = Object.keys(novosErros).length > 0
    setSalvo(!temErros)
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de Equipamento</h2>
      {salvo && <div className="alert alert-success">Equipamento cadastrado com sucesso!</div>}
      <form onSubmit={salvar} noValidate>
        <div className="mb-3"><label htmlFor="equipamento-nome" className="form-label">Nome</label><input id="equipamento-nome" className={`form-control ${erros.nome ? 'is-invalid' : ''}`} value={nome} onChange={(event) => setNome(event.target.value)} />{erros.nome && <div className="invalid-feedback">{erros.nome}</div>}</div>
        <div className="mb-3"><label htmlFor="equipamento-unidade" className="form-label">Unidade</label><select id="equipamento-unidade" className={`form-select ${erros.unidade ? 'is-invalid' : ''}`} value={unidade} onChange={(event) => setUnidade(event.target.value)}><option value="">Selecione</option><option value="Unidade Norte">Unidade Norte</option><option value="Unidade Sul">Unidade Sul</option><option value="Unidade Central">Unidade Central</option></select>{erros.unidade && <div className="invalid-feedback">{erros.unidade}</div>}</div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default Equipamento
