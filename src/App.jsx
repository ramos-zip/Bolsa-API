import { useEffect, useMemo, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router'
import { fetchStocks } from './services/stockService'
import { mockStocks } from './data/mockStocks'
import Cabecalho from './components/Cabecalho'
import CatalogoAcoes from './components/CatalogoAcoes'
import Sobre from './pages/Sobre'
import './App.css'

function categorizeStocks(stocks) {
  if (stocks.length === 0) return []
  const sorted = [...stocks].sort((a, b) => a.price - b.price)
  const n = sorted.length
  const t1 = Math.floor(n / 3)
  const t2 = Math.floor((2 * n) / 3)

  const map = new Map()
  sorted.forEach((s, i) => {
    map.set(s.symbol, i < t1 ? 'low' : i < t2 ? 'mid' : 'high')
  })
  return stocks.map((s) => ({ ...s, valuation: map.get(s.symbol) }))
}

function NaoEncontrado() {
  return (
    <div className="empty">
      <p>Categoria ou página não encontrada.</p>
      <NavLink to="/" style={{ color: 'var(--accent)' }}>Voltar ao catálogo</NavLink>
    </div>
  )
}

export default function App() {
  const [stocks, setStocks] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('name')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setStatus('loading')
      setError(null)
      try {
        // 👇 16 AÇÕES NO TOTAL AGORA
        const data = await fetchStocks({
          symbols: 'PETR4,VALE3,ITUB4,MGLU3,BBDC4,ABEV3,WEGE3,BBAS3,RENT3,PRIO3,SUZB3,ELET3,B3SA3,RADL3,CSAN3,GGBR4', 
          signal: controller.signal 
        })
        
        if (!data.length) throw new Error('A API retornou uma lista vazia.')
        
        setStocks(data)
        setStatus('ready')
      } catch (err) {
        if (controller.signal.aborted) return
        setStocks(mockStocks)
        setError(err.message)
        setStatus('demo')
      }
    }

    load()
    return () => controller.abort()
  }, [reloadKey])

  const categorized = useMemo(() => categorizeStocks(stocks), [stocks])

  const counts = useMemo(() => {
    const c = { all: categorized.length, high: 0, mid: 0, low: 0 }
    categorized.forEach((s) => { if (s.valuation) c[s.valuation]++ })
    return c
  }, [categorized])

  const pageProps = {
    categorized,
    counts,
    status,
    error,
    query,
    setQuery,
    sort,
    setSort,
  }

  return (
    <>
      <Cabecalho
        counts={counts}
        onRefresh={() => setReloadKey((k) => k + 1)}
        refreshing={status === 'loading'}
      />

      <main id="conteudo" className="container app-main">
        <Routes>
          <Route path="/" element={<CatalogoAcoes {...pageProps} category="all" />} />
          <Route path="/mais-valorizadas" element={<CatalogoAcoes {...pageProps} category="high" />} />
          <Route path="/medianas" element={<CatalogoAcoes {...pageProps} category="mid" />} />
          <Route path="/pouco-valorizadas" element={<CatalogoAcoes {...pageProps} category="low" />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>

      <footer className="container app-footer">
        <span>
          Projeto de estudo focado no mercado de ações. Integração configurada em <code>src/services/stockService.js</code>.
        </span>
      </footer>
    </>
  )
}