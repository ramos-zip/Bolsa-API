export default function Sobre() {
  return (
    <section className="sobre">
      <h1>Sobre o Painel de Ações</h1>
      <p>
        Este painel foi criado para acompanhar o mercado de ações de forma
        simples: todas as empresas são organizadas automaticamente em três
        faixas de valorização — <strong>mais valorizadas</strong>,{' '}
        <strong>medianas</strong> e <strong>pouco valorizadas</strong> — com
        base no preço unitário (tercis de preço).
      </p>
      <p>
        Os dados são carregados de uma API configurável via variáveis de
        ambiente (<code>VITE_API_BASE_URL</code> e <code>VITE_API_TOKEN</code>).
        Enquanto a API não estiver disponível, a aplicação exibe um conjunto
        de dados de demonstração com empresas da B3.
      </p>
      <p>
        Use a <strong>busca</strong> para filtrar por ticker ou nome da empresa,
        os <strong>tabs do cabeçalho</strong> (ou o filtro) para navegar entre
        as categorias de valorização, e a <strong>ordenação</strong> para
        visualizar por variação ou preço.
      </p>
      <p>
        <strong>Stack:</strong> React 19, Vite 8, React Router e CSS puro.
        Consulte o <code>README.md</code> do repositório para instruções de
        instalação, configuração de API e estrutura do projeto.
      </p>
    </section>
  );
}