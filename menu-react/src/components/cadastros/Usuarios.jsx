import { useEffect, useRef, useState } from 'react'

function Usuarios() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [foto, setFoto] = useState('')
  const [cameraAberta, setCameraAberta] = useState(false)
  const [erroCamera, setErroCamera] = useState('')
  const [erros, setErros] = useState({})
  const [mensagem, setMensagem] = useState('')
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => () => fecharCamera(), [])

  useEffect(() => {
    if (cameraAberta && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [cameraAberta])

  function selecionarFoto(event) {
    const arquivo = event.target.files[0]
    if (!arquivo) return
    if (!arquivo.type.startsWith('image/')) { setErroCamera('Selecione um arquivo de imagem.'); return }
    const leitor = new FileReader()
    leitor.onload = () => { setFoto(leitor.result); setErroCamera('') }
    leitor.readAsDataURL(arquivo)
  }

  async function abrirCamera() {
    try {
      setErroCamera('')
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      setCameraAberta(true)
    } catch { setErroCamera('Não foi possível acessar a câmera. Verifique a permissão ou selecione uma foto.') }
  }

  function fecharCamera() {
    if (streamRef.current) { streamRef.current.getTracks().forEach((track) => track.stop()); streamRef.current = null }
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraAberta(false)
  }

  function capturarFoto() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    setFoto(canvas.toDataURL('image/jpeg', 0.8)); fecharCamera()
  }

  function salvar(event) {
    event.preventDefault()
    const novosErros = {}
    if (nome.trim() === '') novosErros.nome = 'Informe o nome'
    if (email.trim() === '') novosErros.email = 'Informe o e-mail'
    else if (!email.includes('@')) novosErros.email = 'Informe um e-mail válido'
    if (senha.length < 6) novosErros.senha = 'A senha deve ter pelo menos 6 caracteres'
    if (senha !== confirmarSenha) novosErros.confirmarSenha = 'As senhas não são iguais'
    if (foto === '') novosErros.foto = 'Selecione ou capture uma foto'
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) { setMensagem(''); return }
    localStorage.setItem('usuario', JSON.stringify({ nome, email, senha, foto }))
    setMensagem('Usuário cadastrado com sucesso!')
    setNome(''); setEmail(''); setSenha(''); setConfirmarSenha(''); setFoto('')
  }

  return <section className="p-4"><h2 className="mb-4">Cadastro de Usuário</h2>{mensagem && <div className="alert alert-success">{mensagem}</div>}<form onSubmit={salvar} noValidate><Campo rotulo="Nome" tipo="text" valor={nome} aoAlterar={setNome} erro={erros.nome} /><Campo rotulo="E-mail" tipo="email" valor={email} aoAlterar={setEmail} erro={erros.email} /><Campo rotulo="Senha" tipo="password" valor={senha} aoAlterar={setSenha} erro={erros.senha} /><Campo rotulo="Confirmar senha" tipo="password" valor={confirmarSenha} aoAlterar={setConfirmarSenha} erro={erros.confirmarSenha} /><div className="mb-3"><label className="form-label" htmlFor="foto">Foto</label><input id="foto" type="file" accept="image/*" className={`form-control ${erros.foto ? 'is-invalid' : ''}`} onChange={selecionarFoto} />{erros.foto && <div className="invalid-feedback">{erros.foto}</div>}</div><div className="mb-3"><button type="button" className="btn btn-outline-secondary" onClick={abrirCamera}>Usar câmera</button></div>{erroCamera && <div className="alert alert-warning">{erroCamera}</div>}{cameraAberta && <div className="mb-3"><video ref={videoRef} autoPlay playsInline className="img-thumbnail mb-2" style={{ maxWidth: '320px' }} /><div><button type="button" className="btn btn-success me-2" onClick={capturarFoto}>Capturar foto</button><button type="button" className="btn btn-secondary" onClick={fecharCamera}>Fechar câmera</button></div></div>}<canvas ref={canvasRef} style={{ display: 'none' }} />{foto && <div className="mb-3"><p className="mb-2">Pré-visualização:</p><img src={foto} alt="Foto do usuário" className="img-thumbnail" style={{ width: '180px', height: '180px', objectFit: 'cover' }} /></div>}<button type="submit" className="btn btn-primary">Cadastrar usuário</button></form></section>
}

function Campo({ rotulo, tipo, valor, aoAlterar, erro }) { return <div className="mb-3"><label className="form-label">{rotulo}</label><input type={tipo} className={`form-control ${erro ? 'is-invalid' : ''}`} value={valor} onChange={(event) => aoAlterar(event.target.value)} />{erro && <div className="invalid-feedback">{erro}</div>}</div> }

export default Usuarios
