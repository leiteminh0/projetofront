import { useState } from 'react'

function Usuarios() {
  // Estados controlados da credencial e perfil de acesso.
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [perfil, setPerfil] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvarUsuario(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (email.trim() === '') novosErros.email = 'Informe o email'
    if (senha.trim() === '') novosErros.senha = 'Informe a senha'
    if (perfil.trim() === '') novosErros.perfil = 'Informe o perfil'
    setErros(novosErros)
    setSalvo(Object.keys(novosErros).length === 0)
  }

  return <Formulario titulo="Usuarios" mensagem="Usuario" salvar={salvarUsuario} salvo={salvo} campos={[
    ['nome', 'Nome', nome, setNome], ['email', 'Email', email, setEmail], ['senha', 'Senha', senha, setSenha], ['perfil', 'Perfil', perfil, setPerfil],
  ]} erros={erros} />
}

function Formulario({ titulo, mensagem, salvar, salvo, campos, erros }) {
  return <section className="p-4"><h2 className="mb-3">Cadastro de {titulo}</h2>{salvo && <div className="alert alert-success">{mensagem} cadastrado com sucesso!</div>}<form onSubmit={salvar} noValidate>{campos.map(([campo, rotulo, valor, alterar]) => <div className="mb-3" key={campo}><label htmlFor={`usuario-${campo}`} className="form-label">{rotulo}</label><input id={`usuario-${campo}`} type={campo === 'email' ? 'email' : campo === 'senha' ? 'password' : 'text'} className={`form-control ${erros[campo] ? 'is-invalid' : ''}`} value={valor} onChange={(event) => alterar(event.target.value)} />{erros[campo] && <div className="invalid-feedback">{erros[campo]}</div>}</div>)}<button type="submit" className="btn btn-primary">Salvar</button></form></section>
}

export default Usuarios
