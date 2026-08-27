import { useState } from 'react'

function TipoInformacao() {
  // TipoInformacao relaciona-se com UnidadeMedida.
  const [nome, setNome] = useState('')
  const [unidadeMedida, setUnidadeMedida] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (unidadeMedida.trim() === '') novosErros.unidadeMedida = 'Selecione a unidade de medida'
    setErros(novosErros)
    const temErros = Object.keys(novosErros).length > 0
    setSalvo(!temErros)
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de TipoInformacao</h2>
      {salvo && <div className="alert alert-success">TipoInformacao cadastrado com sucesso!</div>}
      <form onSubmit={salvar} noValidate>
        <div className="mb-3"><label htmlFor="tipoInformacao-nome" className="form-label">Nome</label><input id="tipoInformacao-nome" className={`form-control ${erros.nome ? 'is-invalid' : ''}`} value={nome} onChange={(event) => setNome(event.target.value)} />{erros.nome && <div className="invalid-feedback">{erros.nome}</div>}</div>
        <div className="mb-3"><label htmlFor="tipoInformacao-unidade" className="form-label">UnidadeMedida</label><select id="tipoInformacao-unidade" className={`form-select ${erros.unidadeMedida ? 'is-invalid' : ''}`} value={unidadeMedida} onChange={(event) => setUnidadeMedida(event.target.value)}><option value="">Selecione</option><option value="Quilograma (kg)">Quilograma (kg)</option><option value="Litro (L)">Litro (L)</option><option value="Celsius (C)">Celsius (C)</option></select>{erros.unidadeMedida && <div className="invalid-feedback">{erros.unidadeMedida}</div>}</div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default TipoInformacao
