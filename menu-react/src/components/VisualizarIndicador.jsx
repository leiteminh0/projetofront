function VisualizarIndicador({ indicador }) {
  if (!indicador) {
    return (
      <section className="p-4">
        <div className="alert alert-warning">
          Nenhum indicador selecionado.
        </div>
      </section>
    )
  }

  const url = indicador.Url ?? indicador.url ?? ''
  const nome = indicador.Nome ?? indicador.nome ?? ''

  return (
    <section className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">{nome}</h2>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm"
          >
            Abrir em nova aba ↗
          </a>
        )}
      </div>

      {url ? (
        <>
          <iframe
            key={url}
            src={url}
            title={nome || 'Indicador'}
            allowFullScreen
            style={{
              display: 'block',
              width: '100%',
              height: '80vh',
              border: 'none',
            }}
          />
          <p className="text-muted small mt-2 mb-0">
            Tela em branco? O link pode não permitir incorporação. Use o botão
            "Abrir em nova aba" ou cadastre um link de incorporação do Power BI.
          </p>
        </>
      ) : (
        <div className="alert alert-warning">
          Este indicador não possui URL configurada.
        </div>
      )}
    </section>
  )
}

export default VisualizarIndicador
