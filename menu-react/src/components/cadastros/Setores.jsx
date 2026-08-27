import { useState } from 'react'

function Setores() {
  // Estados controlados do setor, responsavel e descricao.
  const [nome, setNome] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvarSetor(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (responsavel.trim() === '') novosErros.responsavel = 'Informe o responsavel'
    if (descricao.trim() === '') novosErros.descricao = 'Informe a descricao'
    setErros(novosErros)
    setSalvo(Object.keys(novosErros).length === 0)
  }

  return <Formulario titulo="Setores" mensagem="Setor" salvar={salvarSetor} salvo={salvo} campos={[
    ['nome', 'Nome', nome, setNome], ['responsavel', 'Responsavel', responsavel, setResponsavel], ['descricao', 'Descricao', descricao, setDescricao],
  ]} erros={erros} />
}

function Formulario({ titulo, mensagem, salvar, salvo, campos, erros }) {
  return <section className="p-4"><h2 className="mb-3">Cadastro de {titulo}</h2>{salvo && <div className="alert alert-success">{mensagem} cadastrado com sucesso!</div>}<form onSubmit={salvar} noValidate>{campos.map(([campo, rotulo, valor, alterar]) => <div className="mb-3" key={campo}><label htmlFor={`setor-${campo}`} className="form-label">{rotulo}</label><input id={`setor-${campo}`} className={`form-control ${erros[campo] ? 'is-invalid' : ''}`} value={valor} onChange={(event) => alterar(event.target.value)} />{erros[campo] && <div className="invalid-feedback">{erros[campo]}</div>}</div>)}<button type="submit" className="btn btn-primary">Salvar</button></form></section>
}

export default Setores
