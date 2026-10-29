// src/services/api.js
const BASE = (import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:1880').replace(/\/+$/, '')
export const ROTAS = {
 safras: '/api/safra',
 unidades: '/api/unidade',
 unidadesMedida: '/api/unidademedida',
 equipamentos: '/api/equipamentos',
 tiposInformacao: '/api/tipoinformacao',
 medicoes: '/api/medicao'
}
export async function api(recurso, metodo = 'GET', dados = null, id = null) {
 const rota = ROTAS[recurso]
 if (!rota) throw new Error(`Configure a rota de ${recurso}`)
 const url = BASE + rota + (id == null ? '' : `/${encodeURIComponent(id)}`)
 const resposta = await fetch(url, {
 method: metodo,
 headers: dados == null ? undefined : {'Content-Type': 'application/json'},
 body: dados == null ? undefined : JSON.stringify(dados)
 })
 if (!resposta.ok) {
 const detalhe = (await resposta.text()).trim().slice(0, 200)
 throw new Error(`HTTP ${resposta.status}: ${metodo} ${url}${detalhe ? ` — ${detalhe}` : ''}`)
 }
 if (resposta.status === 204) return null
 const texto = await resposta.text()
 if (!texto) return null
 try {
 return JSON.parse(texto)
 } catch (erro) {
 throw new Error(`Resposta inválida da API: ${metodo} ${url} não retornou JSON`, {cause: erro})
 }
}