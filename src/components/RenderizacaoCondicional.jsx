import { useState } from "react";

export default function RenderizacaoCondicional() {
  const [logado, setLogado] = useState(false);

  return (
    <article className="concept">
      <span className="number">06</span>
      <h2>Renderização condicional</h2>
      <p>
        Exiba conteúdos diferentes conforme uma condição,
        utilizando operadores como ternário e &&.
      </p>

      <h3>Exemplo</h3>
      <pre><code>{`{logado
  ? <p>Bem-vindo!</p>
  : <p>Entre para continuar.</p>
}`}</code></pre>

      <h3>Experimente</h3>
      <button onClick={() => setLogado(!logado)}>
        {logado ? "Sair" : "Entrar"}
      </button>

      <p className="example-output">
        {logado ? "Bem-vindo!" : "Entre para continuar."}
      </p>

      {logado && <p>Você está vendo o conteúdo exclusivo!</p>}

      <p className="note">
        O operador ternário escolhe entre duas opções.
        O operador && exibe um elemento somente se a condição for verdadeira.
      </p>
    </article>
  );
}