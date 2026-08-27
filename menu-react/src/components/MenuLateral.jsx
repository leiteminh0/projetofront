import { useState } from 'react'

function MenuLateral({ aberto, onSelecionarCadastro }) {
  const [cadastroAberto, setCadastroAberto] = useState(false)

  function alterarCadastro() {
    setCadastroAberto(!cadastroAberto)
  }

  return (
    <aside
      className={`menu-lateral bg-dark text-white ${aberto ? 'aberto' : 'fechado'}`}
    >
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
        <button
          type="button"
          className="btn btn-outline-light text-start"
          onClick={alterarCadastro}
        >
          Cadastro {cadastroAberto ? '▾' : '▸'}
        </button>
        {cadastroAberto && (
          <div className="d-grid gap-1 ms-3">
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('safra')}>Safra</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('unidade')}>Unidade</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('equipamento')}>Equipamento</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('medicao')}>Medicao</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('unidadeMedida')}>UnidadeMedida</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('tipoInformacao')}>TipoInformacao</button>
            <button type="button" className="btn btn-outline-light text-start" onClick={() => onSelecionarCadastro('indicadores')}>Indicadores</button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default MenuLateral