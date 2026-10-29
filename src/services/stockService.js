const BASE_URL = '/api/bolsai'

/**
 * Normaliza a resposta do endpoint /stats da Bolsai.
 * Ele retorna: close, daily_change, daily_change_pct, etc.
 */
function normalize(raw, ticker) {
  return {
    symbol: ticker.replace('.SA', '').toUpperCase(),
    name: raw.name ?? ticker.replace('.SA', '').toUpperCase(), // Bolsai /stats não traz o nome, usamos o ticker
    price: Number(raw.close ?? 0),
    change: Number(raw.daily_change ?? 0),
    changePercent: Number(raw.daily_change_pct ?? 0),
    logo: null, // Bolsai não fornece logo público neste endpoint
    sector: raw.sector ?? null,
    currency: 'BRL',
    market: 'B3',
  }
}

export async function fetchStocks({ symbols = 'PETR4,VALE3', signal } = {}) {
  // Limpa o .SA caso venha do front, pois a Bolsai usa o ticker puro
  const tickers = symbols.split(',').map((t) => t.replace('.SA', '').trim())

  const promises = tickers.map(async (ticker) => {
    const url = `${BASE_URL}/stocks/${ticker}/stats`
    const response = await fetch(url, { signal })

    if (!response.ok) {
      if (response.status === 401) throw new Error('401: Chave da Bolsai inválida ou ausente.')
      if (response.status === 404) throw new Error(`404: Ativo ${ticker} não encontrado na Bolsai.`)
      if (response.status === 429) {
        const retry = response.headers.get('Retry-After') || '60'
        throw new Error(`429: Limite de requisições da Bolsai atingido. Tente novamente em ${retry}s.`)
      }
      throw new Error(`Falha ao buscar ${ticker} (HTTP ${response.status})`)
    }

    const data = await response.json()
    // O endpoint /stats devolve os dados diretamente no root
    return normalize(data, ticker)
  })

  // Executa todas as requisições em paralelo
  return Promise.all(promises)
}