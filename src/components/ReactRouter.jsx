
import { useState } from "react";

const rotas = [
  { caminho: "/", nome: "Início", descricao: "Página inicial do React Lab." },
  {
    caminho: "/conceitos",
    nome: "Conceitos",
    descricao: "Catálogo de conceitos da biblioteca React.",
  },
  {
    caminho: "/conceitos/hooks",
    nome: "Hooks",
    descricao: "Estudo dos Hooks e seus exemplos.",
  },
  {
    caminho: "/sobre",
    nome: "Sobre",
    descricao: "Informações sobre o projeto.",
  },
];

export default function ReactRouter() {
  const [rotaAtiva, setRotaAtiva] = useState("/conceitos");

  const rota = rotas.find((item) => item.caminho === rotaAtiva);

  return (
    <article className="concept">
      <span className="number">10</span>
      <h2>React Router</h2>

      <p>
        O React Router permite associar URLs a componentes
        e organizar a navegação entre diferentes páginas
        de uma aplicação React.
      </p>

      <h3>1. Exemplos de rotas</h3>

      <pre><code>{`<Routes>
  <Route path="/" element={<Inicio />} />
  <Route path="/conceitos" element={<Conceitos />} />
  <Route path="/sobre" element={<Sobre />} />
</Routes>`}</code></pre>

      <h3>2. Experimente a navegação</h3>

      <div className="example-output">
        <p>Selecione uma rota:</p>

        <div className="route-buttons">
          {rotas.map((item) => (
            <button
              key={item.caminho}
              type="button"
              onClick={() => setRotaAtiva(item.caminho)}
              aria-pressed={rotaAtiva === item.caminho}
            >
              {item.nome}
            </button>
          ))}
        </div>

        <p>
          <strong>URL:</strong> {rotaAtiva}
        </p>

        <h3>{rota?.nome}</h3>
        <p>{rota?.descricao}</p>
      </div>

      <h3>3. Navegando com Link</h3>

      <pre><code>{`import { Link } from "react-router-dom";

<Link to="/conceitos">Ver conceitos</Link>
<Link to="/sobre">Sobre o projeto</Link>`}</code></pre>

      <h3>4. Parâmetros de rota</h3>

      <pre><code>{`<Route
  path="/conceitos/:id"
  element={<DetalheConceito />}
/>

// Dentro do componente:
const { id } = useParams();`}</code></pre>

      <p className="note">
        Os botões desta demonstração alteram apenas o conteúdo
        local. Para navegar de verdade pela URL, instale e
        configure react-router-dom.
      </p>


    </article>
  );
}
