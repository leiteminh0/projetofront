import { useEffect, useState } from 'react'
import { listar, cadastrar, atualizar, excluir } from '../../services/indicadorService.js'

function Indicadores({ onAtualizar }) {
  const [indicadores, setIndicadores] = useState([])
  const [id, setId] = useState(null)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [url, setUrl] = useState('')
  const [erros, setErros] = useState({})
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => { carregar() }, [])

  async function carregar() {
    setCarregando(true)
    setErro('')
    try {
      const dados = await listar()
      setIndicadores(dados)
      if (onAtualizar) onAtualizar(dados)
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  function editar(indicador) {
    setId(indicador.Id ?? indicador.id ?? null)
    setNome(indicador.Nome ?? indicador.nome ?? '')
    setDescricao(indicador.Descricao ?? indicador.descricao ?? '')
    setUrl(indicador.Url ?? indicador.url ?? '')
    setErros({})
    setMensagem('')
    setErro('')
  }

  function limpar() {
    setId(null)
    setNome('')
    setDescricao('')
    setUrl('')
    setErros({})
    setMensagem('')
    setErro('')
  }

  async function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (descricao.trim() === '') novosErros.descricao = 'Informe a descricao'
    if (url.trim() === '') novosErros.url = 'Informe a URL'
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    setErro('')
    try {
      if (id) {
        await atualizar(id, { Nome: nome, Descricao: descricao, Url: url })
        setMensagem('Indicador atualizado com sucesso!')
      } else {
        await cadastrar({ Nome: nome, Descricao: descricao, Url: url })
        setMensagem('Indicador cadastrado com sucesso!')
      }
      limpar()
      await carregar()
    } catch (e) {
      setErro(e.message)
    }
  }

  async function remover(indicador) {
    const idRemover = indicador.Id ?? indicador.id
    if (!window.confirm(`Excluir "${indicador.Nome ?? indicador.nome}"?`)) return
    setErro('')
    try {
      await excluir(idRemover)
      setMensagem('Indicador excluído com sucesso!')
      await carregar()
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <section className="p-4">
      <h2 className="mb-3">Cadastro de Indicadores</h2>

      {mensagem && <div className="alert alert-success">{mensagem}</div>}
      {erro && <div className="alert alert-danger">{erro}</div>}

      <form onSubmit={salvar} noValidate className="mb-4">
        <div className="mb-3">
          <label htmlFor="indicadores-nome" className="form-label">Nome</label>
          <input id="indicadores-nome" className={`form-control ${erros.nome ? 'is-invalid' : ''}`} value={nome} onChange={(e) => setNome(e.target.value)} />
          {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="indicadores-descricao" className="form-label">Descricao</label>
          <input id="indicadores-descricao" className={`form-control ${erros.descricao ? 'is-invalid' : ''}`} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          {erros.descricao && <div className="invalid-feedback">{erros.descricao}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="indicadores-url" className="form-label">URL</label>
          <input id="indicadores-url" type="url" className={`form-control ${erros.url ? 'is-invalid' : ''}`} value={url} onChange={(e) => setUrl(e.target.value)} />
          {erros.url && <div className="invalid-feedback">{erros.url}</div>}
        </div>
        <button type="submit" className="btn btn-primary me-2">{id ? 'Atualizar' : 'Salvar'}</button>
        {id && <button type="button" className="btn btn-secondary" onClick={limpar}>Cancelar</button>}
      </form>

      {carregando && <p className="text-muted">Carregando...</p>}

      {!carregando && indicadores.length === 0 && (
        <p className="text-muted">Nenhum indicador cadastrado.</p>
      )}

      {!carregando && indicadores.length > 0 && (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Descricao</th>
              <th>URL</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {indicadores.map((ind) => (
              <tr key={ind.Id ?? ind.id}>
                <td>{ind.Id ?? ind.id}</td>
                <td>{ind.Nome ?? ind.nome}</td>
                <td>{ind.Descricao ?? ind.descricao}</td>
                <td>{ind.Url ?? ind.url}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => editar(ind)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => remover(ind)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Indicadores
