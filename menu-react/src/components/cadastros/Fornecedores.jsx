import { useState } from 'react'

function Fornecedores() {
  // Estados controlados da identificacao e contato.
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvarFornecedor(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (cnpj.trim() === '') novosErros.cnpj = 'Informe o CNPJ'
    if (telefone.trim() === '') novosErros.telefone = 'Informe o telefone'
    if (email.trim() === '') novosErros.email = 'Informe o email'
    setErros(novosErros)
    setSalvo(Object.keys(novosErros).length === 0)
  }

  return <Formulario titulo="Fornecedores" mensagem="Fornecedor" salvar={salvarFornecedor} salvo={salvo} campos={[
    ['nome', 'Nome', nome, setNome], ['cnpj', 'CNPJ', cnpj, setCnpj], ['telefone', 'Telefone', telefone, setTelefone], ['email', 'Email', email, setEmail],
  ]} erros={erros} />
}

function Formulario({ titulo, mensagem, salvar, salvo, campos, erros }) {
  return <section className="p-4"><h2 className="mb-3">Cadastro de {titulo}</h2>{salvo && <div className="alert alert-success">{mensagem} cadastrado com sucesso!</div>}<form onSubmit={salvar} noValidate>{campos.map(([campo, rotulo, valor, alterar]) => <div className="mb-3" key={campo}><label htmlFor={`fornecedor-${campo}`} className="form-label">{rotulo}</label><input id={`fornecedor-${campo}`} type={campo === 'email' ? 'email' : 'text'} className={`form-control ${erros[campo] ? 'is-invalid' : ''}`} value={valor} onChange={(event) => alterar(event.target.value)} />{erros[campo] && <div className="invalid-feedback">{erros[campo]}</div>}</div>)}<button type="submit" className="btn btn-primary">Salvar</button></form></section>
}

export default Fornecedores
