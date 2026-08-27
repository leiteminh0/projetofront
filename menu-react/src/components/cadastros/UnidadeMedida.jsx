import { useState } from 'react'

function UnidadeMedida() {
  // UnidadeMedida possui nome e simbolo.
  const [nome, setNome] = useState('')
  const [simbolo, setSimbolo] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (simbolo.trim() === '') novosErros.simbolo = 'Informe o simbolo'
    setErros(novosErros)
    const temErros = Object.keys(novosErros).length > 0
    setSalvo(!temErros)
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de UnidadeMedida</h2>
      {salvo && <div className="alert alert-success">UnidadeMedida cadastrada com sucesso!</div>}
      <form onSubmit={salvar} noValidate>
        <div className="mb-3"><label htmlFor="unidadeMedida-nome" className="form-label">Nome</label><input id="unidadeMedida-nome" className={`form-control ${erros.nome ? 'is-invalid' : ''}`} value={nome} onChange={(event) => setNome(event.target.value)} />{erros.nome && <div className="invalid-feedback">{erros.nome}</div>}</div>
        <div className="mb-3"><label htmlFor="unidadeMedida-simbolo" className="form-label">Simbolo</label><input id="unidadeMedida-simbolo" className={`form-control ${erros.simbolo ? 'is-invalid' : ''}`} value={simbolo} onChange={(event) => setSimbolo(event.target.value)} />{erros.simbolo && <div className="invalid-feedback">{erros.simbolo}</div>}</div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default UnidadeMedida
