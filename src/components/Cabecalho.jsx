import { NavLink } from "react-router";

const LINKS = [
  { to: "/",                    label: "Todas",             key: "all",  end: true },
  { to: "/mais-valorizadas",    label: "Mais Valorizadas",  key: "high" },
  { to: "/medianas",            label: "Medianas",          key: "mid"  },
  { to: "/pouco-valorizadas",   label: "Pouco Valorizadas", key: "low"  },
];

export default function Cabecalho({ counts = {}, onRefresh, refreshing = false }) {
  return (
    <header className="cabecalho">
      <a className="pular-conteudo" href="#conteudo">Pular para o Conteúdo</a>
      <div className="container cabecalho-conteudo">
        <NavLink to="/" className="marca" aria-label="Ir para o catálogo completo">
          <span aria-hidden="true">📈</span> Painel de Ações
        </NavLink>

        <nav aria-label="Navegação por nível de valorização" className="cabecalho-nav">
          {LINKS.map(({ to, label, key, end }) => (
            <NavLink
              key={key}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? " ativo" : ""}`}
            >
              {label}
              <span className="tab-count">{counts[key] ?? 0}</span>
            </NavLink>
          ))}

          <NavLink
            to="/sobre"
            className={({ isActive }) => `nav-link${isActive ? " ativo" : ""}`}
          >
            Sobre
          </NavLink>
        </nav>

        {onRefresh && (
          <button
            type="button"
            className="refresh-btn"
            onClick={onRefresh}
            disabled={refreshing}
          >
            {refreshing ? "Atualizando…" : "↻ Atualizar"}
          </button>
        )}
      </div>
    </header>
  );
}