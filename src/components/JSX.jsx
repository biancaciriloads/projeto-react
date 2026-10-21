import { useState } from "react";

export default function JSX() {
  const [nome, setNome] = useState("Ana");

  return (
    <article className="concept">
      <span className="number">01</span>
      <h2>JSX</h2>
      <p>
        JSX permite escrever estruturas semelhantes ao HTML
        dentro do JavaScript para criar interfaces React.
      </p>

      <h3>Exemplo</h3>
      <pre><code>{`const nome = "Ana";
<h3>Olá, {nome}!</h3>`}</code></pre>

      <h3>Experimente</h3>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome"
      />

      <div className="preview">
        <h3>Olá, {nome || "visitante"}!</h3>
      </div>

      <h3>Regras básicas</h3>
      <ul>
        <li>Use chaves para inserir JavaScript.</li>
        <li>Use <code>className</code> para definir classes CSS.</li>
        <li>Feche todas as tags JSX.</li>
      </ul>
    </article>
  );
}