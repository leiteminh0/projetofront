import { useState } from 'react'

function Indicadores() {
  // Indicadores possui nome, descricao e URL, sem relacionamentos.
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [url, setUrl] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (descricao.trim() === '') novosErros.descricao = 'Informe a descricao'
    if (url.trim() === '') novosErros.url = 'Informe a URL'
    setErros(novosErros)
    const temErros = Object.keys(novosErros).length > 0
    setSalvo(!temErros)
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de Indicadores</h2>
      {salvo && <div className="alert alert-success">Indicador cadastrado com sucesso!</div>}
      <form onSubmit={salvar} noValidate>
        <div className="mb-3"><label htmlFor="indicadores-nome" className="form-label">Nome</label><input id="indicadores-nome" className={`form-control ${erros.nome ? 'is-invalid' : ''}`} value={nome} onChange={(event) => setNome(event.target.value)} />{erros.nome && <div className="invalid-feedback">{erros.nome}</div>}</div>
        <div className="mb-3"><label htmlFor="indicadores-descricao" className="form-label">Descricao</label><input id="indicadores-descricao" className={`form-control ${erros.descricao ? 'is-invalid' : ''}`} value={descricao} onChange={(event) => setDescricao(event.target.value)} />{erros.descricao && <div className="invalid-feedback">{erros.descricao}</div>}</div>
        <div className="mb-3"><label htmlFor="indicadores-url" className="form-label">URL</label><input id="indicadores-url" type="url" className={`form-control ${erros.url ? 'is-invalid' : ''}`} value={url} onChange={(event) => setUrl(event.target.value)} />{erros.url && <div className="invalid-feedback">{erros.url}</div>}</div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default Indicadores
