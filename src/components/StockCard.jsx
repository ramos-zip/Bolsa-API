const VALUATION_LABELS = {
  high: { short: 'Alta',  full: 'Mais valorizada' },
  mid:  { short: 'Média', full: 'Mediana' },
  low:  { short: 'Baixa', full: 'Pouco valorizada' },
}

function formatCurrency(value, currency) {
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency || 'BRL',
    }).format(value)
  } catch {
    return String(value)
  }
}

function formatPercent(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export default function StockCard({ stock }) {
  const positive  = stock.changePercent >= 0
  const valuation = stock.valuation && VALUATION_LABELS[stock.valuation]

  return (
    <article className="stock-card">
      <div className="stock-head">
        <div className="stock-id">
          <div className="ticker-row">
            <span className="ticker">{stock.symbol}</span>
            {valuation && (
              <span
                className={`valuation-pill valuation-${stock.valuation}`}
                title={`Nível de valorização: ${valuation.full} (faixa de preço)`}
              >
                {valuation.short}
              </span>
            )}
          </div>
          <span className="stock-name" title={stock.name}>{stock.name}</span>
        </div>
        {stock.logo ? (
          <img className="logo" src={stock.logo} alt="" loading="lazy" />
        ) : (
          <span className="logo logo-fallback" aria-hidden="true">
            {stock.symbol.slice(0, 2)}
          </span>
        )}
      </div>

      <div className="stock-body">
        <span className="price">{formatCurrency(stock.price, stock.currency)}</span>
        <span className={`badge ${positive ? 'up' : 'down'}`}>
          {positive ? '▲' : '▼'} {formatPercent(stock.changePercent)}
        </span>
      </div>

      <div className="stock-foot">
        <span className="meta">
          {stock.market}
          {stock.sector ? ` • ${stock.sector}` : ''}
        </span>
        <span className={`change ${positive ? 'up' : 'down'}`}>
          {positive ? '+' : ''}
          {stock.change.toFixed(2)}
        </span>
      </div>
    </article>
  )
}