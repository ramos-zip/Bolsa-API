# 📈 Painel de Ações

Aplicação front-end para consulta e exploração de ações da B3, com
**categorização automática por nível de valorização** e filtros por
busca, categoria e ordenação. Pensada para ser plugada em qualquer API
de cotações (brapi, Finnhub, Alpha Vantage, API interna etc.) sem
alterar a UI.

---

## ✨ Funcionalidades

- **Catálogo completo** de ações, com ticker, nome, preço atual,
  variação do dia (% e absoluta), setor e mercado.
- **Categorização automática** em três faixas de valorização por
  tercis de preço:
  - 🟦 **Mais Valorizadas** — ⅓ superior da faixa de preço
  - 🟨 **Medianas** — ⅓ intermediário
  - ⬜ **Pouco Valorizadas** — ⅓ inferior
- **Navegação por categorias no cabeçalho** (rotas reais, links
  compartilháveis): `/`, `/mais-valorizadas`, `/medianas`,
  `/pouco-valorizadas`.
- **Busca por ticker ou nome da empresa** com filtro em tempo real.
- **Filtro por nível de valorização** sincronizado com as abas do
  cabeçalho (escolher no `<select>` navega para a rota equivalente).
- **Ordenação** por ticker, variação (maior/menor) ou preço (maior/menor).
- **Estados de UI** completos: loading (skeletons), erro, vazio e
  fallback com dados de demonstração quando a API não está acessível.
- **Acessibilidade**: link “Pular para o conteúdo”, `aria-pressed`,
  `aria-live`, labels associados aos controles, foco visível.
- **Página Sobre** com contexto do projeto.

---

## 🧱 Stack

| Camada           | Ferramenta                    |
| ---------------- | ----------------------------- |
| Biblioteca UI    | React 19                      |
| Bundler / Dev    | Vite 8                        |
| Roteamento       | React Router (v7)             |
| Estilo           | CSS puro com custom properties |
| Lint             | ESLint 10                     |

---

## 🚀 Como rodar

Requisitos: **Node.js ≥ 20.19** (ou ≥ 22.12) e npm.

```bash
# instalar dependências
npm install

# modo desenvolvimento (http://localhost:5173)
npm run dev

# build de produção
npm run build

# pré-visualizar build
npm run preview

# lint
npm run lint