import { useMemo } from "react";
import { useNavigate } from "react-router";
import SearchBar from "./SearchBar";
import StockCard from "./StockCard";

const CATEGORIES = {
  all:  { filter: "Todos os níveis",    path: "/" },
  high: { filter: "Mais valorizadas",   path: "/mais-valorizadas" },
  mid:  { filter: "Medianas",           path: "/medianas" },
  low:  { filter: "Pouco valorizadas",  path: "/pouco-valorizadas" },
};

const SORT_OPTIONS = [
  { value: "name",        label: "Ticker (A–Z)" },
  { value: "change-desc", label: "Variação (maior)" },
  { value: "change-asc",  label: "Variação (menor)" },
  { value: "price-desc",  label: "Preço (maior)" },
  { value: "price-asc",   label: "Preço (menor)" },
];

function sortStocks(list, sort) {
  const copy = [...list];
  switch (sort) {
    case "change-desc": return copy.sort((a, b) => b.changePercent - a.changePercent);
    case "change-asc":  return copy.sort((a, b) => a.changePercent - b.changePercent);
    case "price-desc":  return copy.sort((a, b) => b.price - a.price);
    case "price-asc":   return copy.sort((a, b) => a.price - b.price);
    default:            return copy.sort((a, b) => a.symbol.localeCompare(b.symbol));
  }
}

export default function CatalogoAcoes({
  categorized,
  counts,
  category,
  status,
  error,
  query,
  setQuery,
  sort,
  setSort,
}) {
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = categorized;
    if (category !== "all") base = base.filter((s) => s.valuation === category);
    if (q) base = base.filter(
      (s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q),
    );
    return sortStocks(base, sort);
  }, [categorized, category, query, sort]);

  function resetFilters() {
    setQuery("");
    navigate("/");
  }

  return (
    <>
      {status === "demo" && (
        <div className="banner banner-warn" role="status">
          Não foi possível conectar à API ({error}). Exibindo dados de demonstração.
        </div>
      )}

      <section className="stats" aria-label="Resumo do mercado">
        <div className="stat">
          <span className="stat-label">Ações</span>
          <strong className="stat-value">{counts.all}</strong>
        </div>
        <div className="stat">
          <span className="stat-label">Em alta</span>
          <strong className="stat-value up">
            {categorized.filter((s) => s.changePercent >= 0).length}
          </strong>
        </div>
        <div className="stat">
          <span className="stat-label">Em baixa</span>
          <strong className="stat-value down">
            {categorized.filter((s) => s.changePercent < 0).length}
          </strong>
        </div>
        <div className="stat">
          <span className="stat-label">Mais valorizadas</span>
          <strong className="stat-value">{counts.high}</strong>
        </div>
      </section>

      <section className="toolbar">
        <SearchBar value={query} onChange={setQuery} />

        <label className="filter">
          <span className="sr-only">Nível de valorização</span>
          <select
            value={category}
            onChange={(e) => navigate(CATEGORIES[e.target.value].path)}
            aria-label="Filtrar por nível de valorização"
          >
            {Object.entries(CATEGORIES).map(([key, { filter }]) => (
              <option key={key} value={key}>{filter}</option>
            ))}
          </select>
        </label>

        <label className="sort">
          <span className="sr-only">Ordenar por</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar ações"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      </section>

      <p className="result-count" aria-live="polite">
        {status === "loading"
          ? "Carregando ações…"
          : <>
              {filtered.length} de {counts.all} ações
              {category !== "all" && ` · ${CATEGORIES[category].filter.toLowerCase()}`}
            </>}
      </p>

      {status === "loading" ? (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="stock-card skeleton" aria-hidden="true">
              <div className="sk-line sk-title" />
              <div className="sk-line sk-sub" />
              <div className="sk-line sk-price" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <p>
            {query
              ? `Nenhuma ação encontrada para “${query}”.`
              : "Nenhuma ação nesta categoria."}
          </p>
          <button type="button" onClick={resetFilters}>Limpar filtros</button>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </>
  );
}