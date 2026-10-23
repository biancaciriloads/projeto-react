
import { useState } from "react";

export default function StateUseState() {
  const [contador, setContador] = useState(0);

  return (
    <article className="concept">
      <span className="number">07</span>

      <h2>State e useState</h2>

      <p>
        O estado permite que um componente guarde informações
        e atualize a interface quando esses valores mudam.
      </p>

      <h3>Exemplo: contador</h3>

      <pre><code>{`import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <section>
      <p>Valor: {contador}</p>

      <button
        onClick={() =>
          setContador((valor) => valor + 1)
        }
      >
        Incrementar
      </button>
    </section>
  );
}`}</code></pre>

      <h3>Teste na prática</h3>

      <p>
        Clique no botão para alterar o estado e observar
        a atualização da interface.
      </p>

      <div className="example-output">
        <p>Contador: {contador}</p>

        <button
          onClick={() =>
            setContador((valor) => valor + 1)
          }
        >
          Incrementar
        </button>

        <button
          onClick={() => setContador(0)}
        >
          Zerar
        </button>
      </div>

      <div className="note">
        <strong>Desafio:</strong> adicione um botão para
        diminuir o contador sem permitir valores negativos.
      </div>
    </article>
  );
}
