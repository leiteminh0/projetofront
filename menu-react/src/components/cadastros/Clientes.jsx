import { useState } from 'react'

function Clientes() {
  // Estados controlados dos dados de contato e endereco.
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvarCliente(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (email.trim() === '') novosErros.email = 'Informe o email'
    if (telefone.trim() === '') novosErros.telefone = 'Informe o telefone'
    if (endereco.trim() === '') novosErros.endereco = 'Informe o endereco'
    setErros(novosErros)
    setSalvo(Object.keys(novosErros).length === 0)
  }

  return <Formulario titulo="Clientes" mensagem="Cliente" salvar={salvarCliente} salvo={salvo} campos={[
    ['nome', 'Nome', nome, setNome], ['email', 'Email', email, setEmail], ['telefone', 'Telefone', telefone, setTelefone], ['endereco', 'Endereco', endereco, setEndereco],
  ]} erros={erros} />
}

function Formulario({ titulo, mensagem, salvar, salvo, campos, erros }) {
  return <section className="p-4"><h2 className="mb-3">Cadastro de {titulo}</h2>{salvo && <div className="alert alert-success">{mensagem} cadastrado com sucesso!</div>}<form onSubmit={salvar} noValidate>{campos.map(([campo, rotulo, valor, alterar]) => <div className="mb-3" key={campo}><label htmlFor={`cliente-${campo}`} className="form-label">{rotulo}</label><input id={`cliente-${campo}`} type={campo === 'email' ? 'email' : 'text'} className={`form-control ${erros[campo] ? 'is-invalid' : ''}`} value={valor} onChange={(event) => alterar(event.target.value)} />{erros[campo] && <div className="invalid-feedback">{erros[campo]}</div>}</div>)}<button type="submit" className="btn btn-primary">Salvar</button></form></section>
}

export default Clientes
