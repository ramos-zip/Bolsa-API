const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://brapi.dev/api'
const TOKEN = import.meta.env.VITE_API_TOKEN ?? ''

function normalize(raw) {
  return {
    symbol: String(raw.symbol ?? raw.stock ?? '').toUpperCase(),
    name: raw.shortName ?? raw.name ?? raw.longName ?? raw.symbol ?? '—',
    price: Number(raw.regularMarketPrice ?? raw.close ?? 0),
    change: Number(raw.regularMarketChange ?? raw.change ?? 0),
    changePercent: Number(
      raw.regularMarketChangePercent ?? raw.changePercent ?? 0,
    ),
    logo: raw.logo ?? null,
    sector: raw.sector ?? null,
    currency: raw.currency ?? 'BRL',
    market: raw.market ?? 'B3',
  }
}

export async function fetchStocks({ signal } = {}) {
  const params = new URLSearchParams()
  if (TOKEN) params.set('token', TOKEN)

  const url = `${BASE_URL}/quote/list${params.size ? `?${params}` : ''}`
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Falha ao buscar ações (HTTP ${response.status})`)
  }

  const data = await response.json()
  const list = data.stocks ?? data.results ?? data.data ?? []

  return list.map(normalize)
}