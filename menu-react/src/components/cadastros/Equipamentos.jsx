import { useState } from 'react'

function Equipamentos() {
  // Estados controlados do patrimonio, setor e status.
  const [nome, setNome] = useState('')
  const [patrimonio, setPatrimonio] = useState('')
  const [setor, setSetor] = useState('')
  const [status, setStatus] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvarEquipamento(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (patrimonio.trim() === '') novosErros.patrimonio = 'Informe o patrimonio'
    if (setor.trim() === '') novosErros.setor = 'Informe o setor'
    if (status.trim() === '') novosErros.status = 'Informe o status'
    setErros(novosErros)
    setSalvo(Object.keys(novosErros).length === 0)
  }

  return <Formulario titulo="Equipamentos" mensagem="Equipamento" salvar={salvarEquipamento} salvo={salvo} campos={[
    ['nome', 'Nome', nome, setNome], ['patrimonio', 'Patrimonio', patrimonio, setPatrimonio], ['setor', 'Setor', setor, setSetor], ['status', 'Status', status, setStatus],
  ]} erros={erros} />
}

function Formulario({ titulo, mensagem, salvar, salvo, campos, erros }) {
  return <section className="p-4"><h2 className="mb-3">Cadastro de {titulo}</h2>{salvo && <div className="alert alert-success">{mensagem} cadastrado com sucesso!</div>}<form onSubmit={salvar} noValidate>{campos.map(([campo, rotulo, valor, alterar]) => <div className="mb-3" key={campo}><label htmlFor={`equipamento-${campo}`} className="form-label">{rotulo}</label><input id={`equipamento-${campo}`} className={`form-control ${erros[campo] ? 'is-invalid' : ''}`} value={valor} onChange={(event) => alterar(event.target.value)} />{erros[campo] && <div className="invalid-feedback">{erros[campo]}</div>}</div>)}<button type="submit" className="btn btn-primary">Salvar</button></form></section>
}

export default Equipamentos
