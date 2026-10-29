// ATENÇÃO: os nomes dos campos abaixo (Id, Nome, Descricao, Url) seguem o padrão
// já usado em Indicadores.jsx. Se a API do Node-RED retornar nomes diferentes
// (ex: id, nome, descricao, url em minúsculo), ajuste apenas esta constante:
//
//   CAMPOS: { id: 'id', nome: 'nome', descricao: 'descricao', url: 'url' }
//
// Confirmado até agora: GET /api/indicadores responde com [].
// Não confirmado: formato dos campos, rotas com :id, comportamento de POST/PUT/DELETE.

const BASE_URL = 'http://127.0.0.1:1880/api/indicadores'

async function listar() {
  const resposta = await fetch(BASE_URL)
  if (!resposta.ok) throw new Error(`Erro ao listar indicadores: ${resposta.status}`)
  return resposta.json()
}

async function buscarPorId(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`)
  if (!resposta.ok) throw new Error(`Erro ao buscar indicador ${id}: ${resposta.status}`)
  return resposta.json()
}

async function cadastrar(indicador) {
  const resposta = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(indicador),
  })
  if (!resposta.ok) throw new Error(`Erro ao cadastrar indicador: ${resposta.status}`)
  return resposta.json()
}

async function atualizar(id, indicador) {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(indicador),
  })
  if (!resposta.ok) throw new Error(`Erro ao atualizar indicador ${id}: ${resposta.status}`)
  return resposta.json()
}

async function excluir(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!resposta.ok) throw new Error(`Erro ao excluir indicador ${id}: ${resposta.status}`)
}

export { listar, buscarPorId, cadastrar, atualizar, excluir }
