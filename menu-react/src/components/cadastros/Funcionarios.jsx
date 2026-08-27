import { useState } from 'react'

function Funcionarios() {
  // Estados controlados pelos campos do formulário.
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [setor, setSetor] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  // Impede o recarregamento e valida os campos antes de salvar.
  function salvar(event) {
    event.preventDefault()
    const novosErros = {}

    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (email.trim() === '') novosErros.email = 'Informe o email'
    if (telefone.trim() === '') novosErros.telefone = 'Informe o telefone'
    if (setor.trim() === '') novosErros.setor = 'Informe o setor'

    setErros(novosErros)
    setSalvo(Object.keys(novosErros).length === 0)
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de Funcionários</h2>
      {salvo && <div className="alert alert-success">Funcionário cadastrado com sucesso!</div>}
      <form onSubmit={salvar} noValidate>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input id="nome" className={`form-control ${erros.nome ? 'is-invalid' : ''}`} value={nome} onChange={(event) => setNome(event.target.value)} />
          {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" type="email" className={`form-control ${erros.email ? 'is-invalid' : ''}`} value={email} onChange={(event) => setEmail(event.target.value)} />
          {erros.email && <div className="invalid-feedback">{erros.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input id="telefone" className={`form-control ${erros.telefone ? 'is-invalid' : ''}`} value={telefone} onChange={(event) => setTelefone(event.target.value)} />
          {erros.telefone && <div className="invalid-feedback">{erros.telefone}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="setor" className="form-label">Setor</label>
          <input id="setor" className={`form-control ${erros.setor ? 'is-invalid' : ''}`} value={setor} onChange={(event) => setSetor(event.target.value)} />
          {erros.setor && <div className="invalid-feedback">{erros.setor}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default Funcionarios