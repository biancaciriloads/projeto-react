function Saudacao() {
  return <p className="example-output">Olá, turma!</p>;
}

function Mensagem() {
  return <p className="example-output">Bem-vindos ao React!</p>;
}

export default function Componentes() {
  return (
    <article className="concept">
      <span className="number">02</span>
      <h2>Componentes</h2>
      <p>
        Componentes são partes reutilizáveis da interface.
        Podemos criar vários componentes e utilizá-los juntos.
      </p>

      <h3>Exemplo</h3>
      <pre><code>{`function Saudacao() {
  return <p>Olá, turma!</p>;
}

function Mensagem() {
  return <p>Bem-vindos ao React!</p>;
}`}</code></pre>

      <h3>Resultado</h3>
      <Saudacao />
      <Mensagem />
    </article>
  );
}