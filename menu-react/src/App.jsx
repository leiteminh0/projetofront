import { useState } from 'react'
import Header from './components/Header.jsx'
import MenuLateral from './components/MenuLateral.jsx'
import Conteudo from './components/Conteudo.jsx'
import Safra from './components/cadastros/Safra.jsx'
import Unidade from './components/cadastros/Unidade.jsx'
import Equipamento from './components/cadastros/Equipamento.jsx'
import Funcionarios from './components/cadastros/Funcionarios.jsx'
import Medicao from './components/cadastros/Medicao.jsx'
import UnidadeMedida from './components/cadastros/UnidadeMedida.jsx'
import TipoInformacao from './components/cadastros/TipoInformacao.jsx'
import Indicadores from './components/cadastros/Indicadores.jsx'
import Usuarios from './components/cadastros/Usuarios.jsx'
import Login from './components/Login.jsx'
import VisualizarIndicador from './components/VisualizarIndicador.jsx'
import CadastroApi from './components/CadastroApi.jsx'
import './App.css'

function App() {
  const [menuAberto, setMenuAberto] = useState(true)
  const [cadastroSelecionado, setCadastroSelecionado] = useState('')
  const [indicadores, setIndicadores] = useState([])
  const [indicadorSelecionado, setIndicadorSelecionado] = useState(null)

  function alterarMenu() {
    setMenuAberto(!menuAberto)
  }

  function visualizarIndicador(indicador) {
    setIndicadorSelecionado(indicador)
    setCadastroSelecionado('visualizarIndicador')
  }

  return (
    <>
      <Header />
      <div className="layout">
        <MenuLateral
          aberto={menuAberto}
          onSelecionarCadastro={setCadastroSelecionado}
          indicadores={indicadores}
          onVisualizarIndicador={visualizarIndicador}
        />
        <main className="area-conteudo">
          <div className="p-3 border-bottom bg-white">
            <button type="button" className="btn btn-primary" onClick={alterarMenu}>
              ☰ Menu
            </button>
          </div>
          {cadastroSelecionado === 'safra' && <Safra />}
          {cadastroSelecionado === 'safras' && <CadastroApi recurso="safras" />}
          {cadastroSelecionado === 'unidades' && <CadastroApi recurso="unidades" />}
          {cadastroSelecionado === 'unidadesMedidaApi' && <CadastroApi recurso="unidadesMedida" />}
          {cadastroSelecionado === 'equipamentosApi' && <CadastroApi recurso="equipamentos" />}
          {cadastroSelecionado === 'tiposInformacaoApi' && <CadastroApi recurso="tiposInformacao" />}
          {cadastroSelecionado === 'medicoesApi' && <CadastroApi recurso="medicoes" />}
          {cadastroSelecionado === 'unidade' && <Unidade />}
          {cadastroSelecionado === 'equipamento' && <Equipamento />}
          {cadastroSelecionado === 'funcionarios' && <Funcionarios />}
          {cadastroSelecionado === 'medicao' && <Medicao />}
          {cadastroSelecionado === 'unidadeMedida' && <UnidadeMedida />}
          {cadastroSelecionado === 'tipoInformacao' && <TipoInformacao />}
          {cadastroSelecionado === 'indicadores' && <Indicadores onAtualizar={setIndicadores} />}
          {cadastroSelecionado === 'usuarios' && <Usuarios />}
          {cadastroSelecionado === 'login' && <Login />}
          {cadastroSelecionado === 'visualizarIndicador' && <VisualizarIndicador indicador={indicadorSelecionado} />}
          {!cadastroSelecionado && <Conteudo />}
        </main>
      </div>
    </>
  )
}

export default App
