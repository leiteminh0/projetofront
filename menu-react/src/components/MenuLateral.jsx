import { useState } from 'react'

function MenuLateral({ aberto, onSelecionarCadastro, indicadores = [], onVisualizarIndicador }) {
  const [cadastroAberto, setCadastroAberto] = useState(false)
  const [indicadoresAberto, setIndicadoresAberto] = useState(false)

  function alterarCadastro() {
    setCadastroAberto(!cadastroAberto)
  }

  function alterarIndicadores() {
    setIndicadoresAberto(!indicadoresAberto)
  }

  return (
    <aside className={`menu-lateral bg-dark text-white ${aberto ? 'aberto' : 'fechado'}`}>
      <h2 className="h6 text-uppercase mb-3">Menu</h2>
      <div className="d-grid gap-2">
        <button type="button" className="btn btn-outline-light text-start">
          Início
        </button>
        <button type="button" className="btn btn-outline-light text-start">
          Produtos
        </button>
        <button type="button" className="btn btn-outline-light text-start">
          Relatórios
        </button>
        <button type="button" className="btn btn-outline-light text-start">
          Configurações
        </button>
        <button type="button" className="btn btn-outline-info text-start" onClick={() => onSelecionarCadastro('login')}>
          Login
        </button>

        <button type="button" className="btn btn-outline-light text-start" onClick={alterarIndicadores}>
          Indicadores {indicadoresAberto ? '▾' : '▸'}
        </button>
        {indicadoresAberto && (
          <div className="d-grid gap-1 ms-3">
            <button type="button" className="btn btn-outline-warning text-start btn-sm" onClick={() => onSelecionarCadastro('indicadores')}>
              + Gerenciar
            </button>
            {indicadores.map((ind) => (
              <button
                key={ind.Id ?? ind.id}
                type="button"
                className="btn btn-outline-light text-start btn-sm"
                onClick={() => onVisualizarIndicador(ind)}
              >
                {ind.Nome ?? ind.nome}
              </button>
            ))}
            {indicadores.length === 0 && (
              <span className="text-secondary small ms-1">Nenhum indicador</span>
            )}
          </div>
        )}

        <button type="button" className="btn btn-outline-light text-start" onClick={alterarCadastro}>
          Cadastro {cadastroAberto ? '▾' : '▸'}
        </button>
        {cadastroAberto && (
          <div className="d-grid gap-1 ms-3">
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('usuarios')}>Usuários</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('safra')}>Safra</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('unidade')}>Unidade</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('equipamento')}>Equipamento</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('funcionarios')}>Funcionários</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('medicao')}>Medicao</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('unidadeMedida')}>UnidadeMedida</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('tipoInformacao')}>TipoInformacao</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('indicadores')}>Indicadores</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('safras')}>Safras (API)</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('unidades')}>Unidades (API)</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('unidadesMedidaApi')}>Unidades de medida (API)</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('equipamentosApi')}>Equipamentos (API)</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('tiposInformacaoApi')}>Tipos de informação (API)</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('medicoesApi')}>Medições (API)</button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default MenuLateral
