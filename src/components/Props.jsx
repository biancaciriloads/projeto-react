// Componente filho: recebe as informações pelas props
function Cartao(props) {
  return (
    <div className="example-output">
      <h3>{props.titulo}</h3>
      <p>{props.descricao}</p>
    </div>
  );
}

// Componente principal
export default function Props() {
  return (
    <article className="concept">
      <span className="number">03</span>
      <h2>Props</h2>

      <p>
        Props são informações enviadas de um componente
        pai para um componente filho.
      </p>

      <h3>1. Definindo o componente</h3>
      <pre><code>{`function Cartao(props) {
  return (
    <div>
      <h3>{props.titulo}</h3>
      <p>{props.descricao}</p>
    </div>
  );
}`}</code></pre>

      <h3>2. Enviando informações</h3>
      <pre><code>{`<Cartao
  titulo="React Lab"
  descricao="Aprendendo React"
/>

<Cartao
  titulo="JavaScript"
  descricao="Fundamentos da programação"
/>`}</code></pre>

      <h3>3. Resultado</h3>
      <Cartao
        titulo="React Lab"
        descricao="Aprendendo React"
      />
      <Cartao
        titulo="JavaScript"
        descricao="Fundamentos da programação"
      />
    </article>
  );
}