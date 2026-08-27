import { useState } from 'react'

function Unidade() {
  // Unidade possui apenas o nome.
  const [nome, setNome] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    setErros(novosErros)
    const temErros = Object.keys(novosErros).length > 0
    setSalvo(!temErros)
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de Unidade</h2>
      {salvo && <div className="alert alert-success">Unidade cadastrada com sucesso!</div>}
      <form onSubmit={salvar} noValidate>
        <div className="mb-3"><label htmlFor="unidade-nome" className="form-label">Nome</label><input id="unidade-nome" className={`form-control ${erros.nome ? 'is-invalid' : ''}`} value={nome} onChange={(event) => setNome(event.target.value)} />{erros.nome && <div className="invalid-feedback">{erros.nome}</div>}</div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default Unidade
