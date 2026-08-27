import { useState } from 'react'

function Produtos() {
  // Estados controlados da descricao, preco e quantidade.
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function salvarProduto(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (descricao.trim() === '') novosErros.descricao = 'Informe a descricao'
    if (preco.trim() === '') novosErros.preco = 'Informe o preco'
    if (quantidade.trim() === '') novosErros.quantidade = 'Informe a quantidade'
    setErros(novosErros)
    setSalvo(Object.keys(novosErros).length === 0)
  }

  return <Formulario titulo="Produtos" mensagem="Produto" salvar={salvarProduto} salvo={salvo} campos={[
    ['nome', 'Nome', nome, setNome], ['descricao', 'Descricao', descricao, setDescricao], ['preco', 'Preco', preco, setPreco], ['quantidade', 'Quantidade', quantidade, setQuantidade],
  ]} erros={erros} />
}

function Formulario({ titulo, mensagem, salvar, salvo, campos, erros }) {
  return <section className="p-4"><h2 className="mb-3">Cadastro de {titulo}</h2>{salvo && <div className="alert alert-success">{mensagem} cadastrado com sucesso!</div>}<form onSubmit={salvar} noValidate>{campos.map(([campo, rotulo, valor, alterar]) => <div className="mb-3" key={campo}><label htmlFor={`produto-${campo}`} className="form-label">{rotulo}</label><input id={`produto-${campo}`} type={campo === 'preco' || campo === 'quantidade' ? 'number' : 'text'} className={`form-control ${erros[campo] ? 'is-invalid' : ''}`} value={valor} onChange={(event) => alterar(event.target.value)} />{erros[campo] && <div className="invalid-feedback">{erros[campo]}</div>}</div>)}<button type="submit" className="btn btn-primary">Salvar</button></form></section>
}

export default Produtos
