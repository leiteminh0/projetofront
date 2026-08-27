import { useState } from 'react'
import Header from './components/Header.jsx'
import MenuLateral from './components/MenuLateral.jsx'
import Conteudo from './components/Conteudo.jsx'
import Safra from './components/cadastros/Safra.jsx'
import Unidade from './components/cadastros/Unidade.jsx'
import Equipamento from './components/cadastros/Equipamento.jsx'
import Medicao from './components/cadastros/Medicao.jsx'
import UnidadeMedida from './components/cadastros/UnidadeMedida.jsx'
import TipoInformacao from './components/cadastros/TipoInformacao.jsx'
import Indicadores from './components/cadastros/Indicadores.jsx'
import './App.css'

function App() {
  const [menuAberto, setMenuAberto] = useState(true)
  const [cadastroSelecionado, setCadastroSelecionado] = useState('')

  function alterarMenu() {
    setMenuAberto(!menuAberto)
  }

  return (
    <>
      <Header />
      <div className="layout">
        <MenuLateral aberto={menuAberto} onSelecionarCadastro={setCadastroSelecionado} />
        <main className="area-conteudo">
          <div className="p-3 border-bottom bg-white">
            <button type="button" className="btn btn-primary" onClick={alterarMenu}>
              ☰ Menu
            </button>
          </div>
          {cadastroSelecionado === 'safra' && <Safra />}
          {cadastroSelecionado === 'unidade' && <Unidade />}
          {cadastroSelecionado === 'equipamento' && <Equipamento />}
          {cadastroSelecionado === 'medicao' && <Medicao />}
          {cadastroSelecionado === 'unidadeMedida' && <UnidadeMedida />}
          {cadastroSelecionado === 'tipoInformacao' && <TipoInformacao />}
          {cadastroSelecionado === 'indicadores' && <Indicadores />}
          {!cadastroSelecionado && <Conteudo />}
        </main>
      </div>
    </>
  )
}

export default App
