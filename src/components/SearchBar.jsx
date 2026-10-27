export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por ticker ou empresa (ex: PETR4, Vale…)"
        aria-label="Buscar ações"
      />
      {value && (
        <button
          type="button"
          className="clear-btn"
          onClick={() => onChange('')}
          aria-label="Limpar busca"
        >
          ×
        </button>
      )}
    </div>
  )
}