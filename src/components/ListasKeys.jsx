import { useState } from "react";

export default function ListasKeys() {
  const [frutas, setFrutas] = useState(["Maçã", "Banana", "Uva"]);
  const [novaFruta, setNovaFruta] = useState("");

  function adicionarFruta() {
    if (!novaFruta.trim()) return;
    setFrutas([...frutas, novaFruta.trim()]);
    setNovaFruta("");
  }

  function removerFruta(frutaRemover) {
    setFrutas(frutas.filter((fruta) => fruta !== frutaRemover));
  }

  return (
    <article className="concept">
      <span className="number">05</span>
      <h2>Listas e keys</h2>
      <p>
        Use <code>map()</code> para renderizar listas e <code>key</code>
        para identificar cada item de forma única.
      </p>

      <h3>Exemplo de código</h3>
      <pre><code>{`{frutas.map((fruta) => (
  <li key={fruta}>{fruta}</li>
))}`}</code></pre>

      <h3>Experimente</h3>
      <input
        value={novaFruta}
        onChange={(e) => setNovaFruta(e.target.value)}
        placeholder="Digite uma fruta"
      />
      <button onClick={adicionarFruta}>Adicionar</button>

      <ul className="fruit-list">
        {frutas.map((fruta) => (
          <li key={fruta}>
            {fruta}
            <button onClick={() => removerFruta(fruta)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <p className="note">
        Cada item possui uma key que ajuda o React a identificar
        os elementos da lista durante as atualizações.
      </p>
    </article>
  );
}